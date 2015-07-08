<?php 
require_once 'db.php'; // The mysql database connection script
if(isset($_GET['task'])){
$Name = $_GET['task'];
$MobileNo = $_GET['task'];
$Timestamp = "CURRENT_TIMESTAMP()";

$query="INSERT INTO students(studentName,homeMobileNumber,Date)  VALUES ('$Name', '$MobileNo', '$Timestamp')";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);
}
?>