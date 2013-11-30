<?php
require('config.php');
require($wordpress_path.'/wp-load.php');
define('UPLOAD_DIR', 'images/');
if (isset($_POST['image'])) {
    if ($_POST['secret_token'] !== $secret_token) {
        echo '{"error": "unauthorized"}';
        return;
    }
    $img = $_POST['image'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . uniqid() . '.png';
    $success = file_put_contents($file, $data);
    $title = date('l F jS Y h:i:s A');

    $content = '<img src="toadbooth/'.$file.'">';
    $post = array(
        'post_title' => $title,
        'post_content' => $content,
        'post_author' => 1,
        'post_status' => 'publish'

    );
    $post_id = wp_insert_post($post);
    echo '{"file": "'.$file.'", "url": "/?p='.$post_id.'"}';
}
?>
