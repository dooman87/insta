function renderStatus(statusText) {
    $('.js-status').html(statusText);
}

function sendMessage(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", text: text})
    });
}

$(document).ready(function() {
    var buttons = $(".buttons");
    buttons.hide();
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        if (msg.type == "FROM_PAGE") {
            if (msg.data.login && msg.data.imagesCount) {
                buttons.show();
                renderStatus("Hi @" + msg.data.login + ", we found images. <br/>You can start like them!");
            } else {
                buttons.hide();
                renderStatus("Please login and jump to the page with images");
            }
        }
    });

    sendMessage("INFO");

    $('.js-start').on('click', function() { sendMessage("START"); });
    $('.js-stop').on('click' , function() { sendMessage("STOP");  });
});


