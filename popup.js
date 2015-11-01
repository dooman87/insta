function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function sendMessage(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", text: text})
    });
}

$(document).ready(function() {
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        if (msg.type == "FROM_PAGE") {
            if (msg.data.login && msg.data.imagesCount) {
                $(".buttons").show();
                renderStatus("@" + msg.data.login + ", found " + msg.data.imagesCount + " images");
            } else {
                $(".buttons").hide();
                renderStatus("Please login and jump to the page with images");
            }
        }
    });


    sendMessage("INFO");

    $('.js-start').on('click', function() {
        sendMessage("START");
    });

    $('.js-stop').on('click', function() {
        sendMessage("STOP");
    });
});


