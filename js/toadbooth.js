var countDownSeconds = 3;
$(function () {

    var streaming = false,
        video = document.querySelector('#video'),
        cover = document.querySelector('#cover'),
        canvas = document.querySelector('#canvas'),
        photo = document.querySelector('#photo'),
        width = 1440,
        height = 0;

    navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
            }
            video.play();
        },
        function (err) {
            console.log("An error occured! " + err);
        }
    );

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    function countDown() {
        countDownSecondsRemaining--;
        $('#error-message').text(countDownSecondsRemaining);
        if (countDownSecondsRemaining <= 0) {
            takePicture();
        } else {
            setTimeout(countDown, 1000);
        }
    }
    function takePicture() {
        var $canvasElement = $('#canvas');
        //create a small canvas element and append it to #canvases
        $canvasElement.attr('height', height);
        $canvasElement.attr('width', width);
        $canvasElement.hide();
        $canvasElement[0].getContext('2d').drawImage(video, 0, 0, width, height);
        var data = $canvasElement[0].toDataURL('image/png');
        var $photo = $('#image');
        $photo.attr('src', data);

        $('body').append($photo);
        $photo.css('display', 'block');

        $('#shutter-button').attr('disabled', true);
        $('#video').hide();
        $('#canvas').hide();
        $('#save-button').show().attr('disabled', false);
        $('#retry-button').show().attr('disabled', false);
        $('#error-message').text('Capture complete.');
    }

    $('#shutter-button').on('click', function (e) {
        $(this).attr('disabled', true);
        countDownSecondsRemaining = countDownSeconds;
        countDown();
    });

    $('#save-button').on('click', uploadImages);

    $('#retry-button').on('click', function(e) {
        $('#error-message').empty();
        initializeBooth();
    });

    initializeBooth();

});


function initializeBooth() {
    $('#retry-button').hide();
    $('#save-button').hide();
    $('#shutter-button').attr('disabled', false);
    $('#image').hide();
    $('#video').show();
}

function uploadImages() {
    $('#save-button').attr('disabled', true);
    $('#retry-button').attr('disabled', true);
    var image = $('#image');
    var data = {
        image: $(image).attr('src')
    };
    var settings = {
        url: "upload.php",
        type: "post",
        data: data,
        success: uploadComplete,
        error: uploadError
    };
    $.ajax(settings);

    function uploadComplete(res) {
        var response = JSON.parse(res);
        $('#error-message').text('Upload complete. ' + response.url);
        if (response['url']) {
            initializeBooth();
        }
    }

    function uploadError(e) {
        // show error message and reinitialize
        $('#error-message').text(e.responseText || "Error uploading image.");
        initializeBooth();
    }

}