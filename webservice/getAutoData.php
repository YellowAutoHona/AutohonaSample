<?php
 header("Access-Control-Allow-Origin: *");
require_once('json.php');

$posts=array();


$responses=array();
$responses[]=array('autoid'=>'1001','drivername'=>'Varun','latitude'=>'17.434044','longitude'=>'78.445608','rating'=>'5','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1.33');
$responses[]=array('autoid'=>'1002','drivername'=>'Nitin','latitude'=>'17.4276868','longitude'=>'78.45356','rating'=>'4','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'2.33');
$responses[]=array('autoid'=>'1003','drivername'=>'Sunil','latitude'=>'17.440254','longitude'=>'78.442734','rating'=>'3','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1.22');
$responses[]=array('autoid'=>'1004','drivername'=>'Sampoornesh','latitude'=>'17.361564','longitude'=>'78.474665','rating'=>'2','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'2.23');
$responses[]=array('autoid'=>'1005','drivername'=>'Nagarjuna','latitude'=>'17.392181','longitude'=>'78.440996','rating'=>'3','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1.11');
$responses[]=array('autoid'=>'1006','drivername'=>'Venkatesh','latitude'=>'17.236609','longitude'=>'78.429531','rating'=>'4','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1');
$responses[]=array('autoid'=>'1007','drivername'=>'Chiranjeevi','latitude'=>'17.45061','longitude'=>'78.470514','rating'=>'2','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'2');
$responses[]=array('autoid'=>'1008','drivername'=>'Balayya','latitude'=>'17.429238','longitude'=>'78.412278','rating'=>'1','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1.29');
$responses[]=array('autoid'=>'1009','drivername'=>'Naresh','latitude'=>'17.39924','longitude'=>'78.470322','rating'=>'4','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'1.99');
$responses[]=array('autoid'=>'1010','drivername'=>'Ramarao','latitude'=>'17.383366','longitude'=>'78.400677','rating'=>'5','url'=>'http://www.haranktechnologies.com/images/logo/1.png','dist'=>'3');


echo json_encode($responses);

?>

