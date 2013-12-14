<?php
require('config.php');
require($wordpress_path.'/wp-load.php');
define('UPLOAD_DIR', 'images/');
$handle = opendir('gifs/');
while (false !== ($file = readdir($handle))) {
    echo "creating post for $file\n";
    continue;
    date_default_timezone_set('America/Chicago');
    $title = date('l F jS Y h:i:s A');

    $content = '<img src="toadbooth/'.$file.'">';
    $post = array(
        'post_title' => $title,
        'post_content' => $content,
        'post_author' => 1,
        'post_status' => 'publish'

    );
    $post_id = wp_insert_post($post);

}
?>
