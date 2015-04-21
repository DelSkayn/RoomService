<?php



$server = 'putter.vuw.leidenuniv.nl';
$username = 's1542125'; 
$password = ''; 
$database = 'UCRoomService';

$mysqli = new mysqli($server, $username, $password, $database);

if ($mysqli->connect_error) {
die('Could not connect: ' .
$mysqli->connect_error);
}



if(ingelogd){
	$sql = "INSERT INTO UCRoomService (UserName, Comment, TimeStamp)
			Values ('$Username', '$Comment', '$TimeStamp')";
			
}


    


?>
