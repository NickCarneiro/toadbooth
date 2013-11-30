<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />
    <title>upload a photo</title>
    <link rel="stylesheet" href="css/toadbooth.css" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" />

</head>
<body>

<div id="controls">
    <div id="error-message">Take a photo</div>
    <button class="btn btn-primary" id="shutter-button">Take Photo
        <span class="glyphicon glyphicon-camera"></span>
    </button>
    <button class="btn btn-default" id="save-button">Upload Photo</button>
    <button class="btn btn-default" id="retry-button">Take Again</button>
</div>
<video id="video"></video>
<canvas id="canvas"></canvas>
<img id="image">
<script src="http://codeorigin.jquery.com/jquery-2.0.3.min.js"></script>
<script src="js/toadbooth.js"></script>

</body>
</html>