<?php 
require_once 'db.php'; // The mysql database connection script
if(isset($_GET['rollNo'])){
$RollNo = $_GET['rollNo'];


$query="update students set Date='CURRENT_TIMESTAMP' where rollNumber='$RollNo'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$result = $mysqli->affected_rows;

$json_response = json_encode($result);
}
?>