<?php
if (!empty($_POST)) {
	define('CITY_COUNT', 7);
	$population = $_POST['population'] + 0;
	if ($population > 999) # Gotta protect my CPU...
		$population = 999;
		
	$generations = $_POST['generations'] + 0;
	$elitism = $_POST['elitism'] + 0;
	$names = array();
	$distances = array();
	
	$initialPopulation = array();
	$currentPopulation = array();
	
	# Take user city names and put it into an array
	for ($i = 1; $i <= CITY_COUNT; $i++) {
		$names[$i] = $_POST['name'.$i];
	}
	
	# Take user distance data and put it into a multidimensional array
	for ($i = 1; $i <= CITY_COUNT; $i++) {
		for ($j = 1; $j <= CITY_COUNT; $j++) {
			if (isset($_POST[$i . '_' . $j]))
				$distances[$i][$j] = $_POST[$i . '_' . $j];
			else if (isset($_POST[$j . '_' . $i]))
				$distances[$i][$j] = $_POST[$j . '_' . $i];
			else
				$distances[$i][$j] = 32767;
		}
	}
	
	# Building our initial population
	for($i = 0; $i < $population; $i++) {
		$initialPopulation[$i] = pickRandom();
	}
	
	for ($k = 1; $k <= $generations; $k++) {
		echo "<div><strong>Generation $k</strong></div>\n";
		# Rating population (I do some weird math to figure out their goodness level, not sure if it is good).
		echo "<pre>";
		$i = 0;
		$distanceSum = 0;
		$biggest = 0;
		foreach ($initialPopulation AS $entity) {
			$currentPopulation[$i]['dna'] = $entity;
			$currentPopulation[$i]['rate'] = rate($entity, $distances);
			$distanceSum += $currentPopulation[$i]['rate'];
			if ($currentPopulation[$i]['rate'] > $biggest)
				$biggest = $currentPopulation[$i]['rate'];
			$i++;
		}
		$biggest += 1;
		$chancesSum = 0;
		for ($i = 0; $i < $population; $i++ ) {
			$currentPopulation[$i]['metric'] = $biggest - $currentPopulation[$i]['rate'];
			$chancesSum += $currentPopulation[$i]['metric'];
		}
		for ($i = 0; $i < $population; $i++ ) {
			$currentPopulation[$i]['chances'] = $currentPopulation[$i]['metric'] / $chancesSum;
		}
		util::sort($currentPopulation, 'rate');
		$ceilSum = 0;
		for ($i = 0; $i < $population; $i++ ) {
			$currentPopulation[$i]['floor'] = $ceilSum;
			$ceilSum += $currentPopulation[$i]['chances'];
		}
		debug($currentPopulation);
		echo "</pre>\n";
		if (converging($initialPopulation))
			break;
		#Breeding time
		$initialPopulation = array();
		for ($j = 0; $j < $elitism; $j++) {
			$initialPopulation[] = $currentPopulation[$j]['dna'];
		}
		for ($j = 0; $j < $population - $elitism; $j++) {
			$rouletteMale = rand(0, 100) / 100;
			
			for ($i = $population - 1; $i >= 0; $i--) {
				if ($currentPopulation[$i]['floor'] < $rouletteMale) {
					$dad = $currentPopulation[$i]['dna'];
					break;
				}
			}
			
			$rouletteFemale = rand(0, 100) / 100;
			
			for ($i = $population - 1; $i >= 0; $i--) {
				if ($currentPopulation[$i]['floor'] < $rouletteFemale) {
					$mom = $currentPopulation[$i]['dna'];
					break;
				}
			}
			
			$child = mate($mom, $dad);
			$initialPopulation[] = $child;
		}
		
	}

	echo "<div>The best solution I found is <strong>{$currentPopulation[0]['dna']}</strong> with a mileage of <strong>".rate($currentPopulation[0]['dna'], $distances)."</strong> which took <strong>$k</strong> generations.</div>\n";
}
?>

<?php
function converging($pop) {
	$items = count(array_unique($pop));
	if ($items == 1)
		return true;
	else
		return false;
}
function pickRandom() {
	$choices = array('A', 'B', 'C', 'D', 'E', 'F', 'G');
	shuffle($choices);
	return implode('',$choices);
}

function rate($dna, $distances) {
	$mileage = 0;
	$letters = str_split($dna);
	for ($i = 0; $i < CITY_COUNT - 1; $i++) {
		$mileage += $distances[let2num($letters[$i])][let2num($letters[$i+1])];
	}
	return $mileage;
}

function debug($ar) {
	echo "<table class='debug'>";
	echo "<tr><th>&nbsp;</th><th>DNA</th><th>Fit</th><th>Roulette</th></tr>\n";
	foreach($ar as $element => $value) {
		echo "<tr><td>" . leadingZero($element) . "</td><td>" . $value['dna'] . "</td><td>" . $value['rate'] . "</td><td>" . sprintf("%01.2f", $value['chances'] * 100) . "%</td></tr>\n";
	}
	echo "</table>\n";
}

function leadingZero($value) {
	if ($value < 10)
		$value = '00' . $value;
	else if ($value < 100)
		$value = '0' . $value;
	return $value;
}

function mate($mommy, $daddy) { # VERY INEFFICIENT! Combines genes randomly from both parents and if genes are repeated we do it again.
	$baby = "AAAAAA";
	while (substr_count($baby, 'A') != 1 || substr_count($baby, 'B') != 1 || substr_count($baby, 'C') != 1 || substr_count($baby, 'D') != 1 || substr_count($baby, 'E') != 1 || substr_count($baby, 'F') != 1 || substr_count($baby, 'G') != 1) {
		$baby = "";
		for($i = 0; $i < CITY_COUNT; $i++) {
			$chosen = mt_rand(0,1);
			if ($chosen)
				$baby .= substr($mommy, $i, 1);
			else
				$baby .= substr($daddy, $i, 1);
		}
	}
	return $baby;
}

function let2num($char) {
	if ($char == 'A')
		return 1;
	else if ($char == 'B')
		return 2;
	else if ($char == 'C')
		return 3;
	else if ($char == 'D')
		return 4;
	else if ($char == 'E')
		return 5;
	else if ($char == 'F')
		return 6;
	else if ($char == 'G')
		return 7;
	else
		die("WHOOPS");
}

class util {
    static private $sortfield = null;
    static private $sortorder = 1;
    static private function sort_callback(&$a, &$b) {
        if($a[self::$sortfield] == $b[self::$sortfield]) return 0;
        return ($a[self::$sortfield] < $b[self::$sortfield])? -self::$sortorder : self::$sortorder;
    }
    static function sort(&$v, $field, $asc=true) {
        self::$sortfield = $field;
        self::$sortorder = $asc? 1 : -1;
        usort($v, array('util', 'sort_callback'));
    }
}