<?php

if ($_SERVER['REQUEST_METHOD']=="GET"){
        $m = new Mongo;
        $db_quakes = $m->selectDB("quakesdb");   
        $cursor=$m->$db_quakes->quake_data->find();
        $quake_array=iterator_to_array($cursor);
        //$quake_array=$quake_array["5447fd02c2f416a7168b4567"];
        $quake_array=json_encode($quake_array);
        echo $quake_array;
}
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        $id = $_POST['circleId'];
        $m = new Mongo;
        $db_quakes = $m->selectDB("quakesdb");        
        $cursor=$m->$db_quakes->quake_data->findOne(array('id'=>$id));   
        echo(json_encode($cursor));
    }
?>