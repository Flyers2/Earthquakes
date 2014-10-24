<?php
$file = fopen("all_week.csv", 'r');
while(! feof($file)){
    //var_dump(fgetcsv($file));
    $data_quakes[]=  fgetcsv($file);
}
fclose($file);

//format the array into  a key value array
array_pop($data_quakes);//get rid of last null value in array
$headings = array_shift($data_quakes);
forEach($data_quakes as $quake_row){
    $quake_keyval[]= array_combine($headings, $quake_row);
}
//get rid of blank values in the array
forEach($quake_keyval as $row){
   $quakes_filted[] = array_filter($row);   
}
//insert array into mongo
$m = new MongoClient; 
$db_quakes = $m->quakesdb;
$quake_collection = $db_quakes->quake_data;
forEach($quakes_filted as $row){
   $quake_collection->insert($row);
    //var_dump($row);
    //echo"<br><br>";
}
?>