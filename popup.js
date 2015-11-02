function renderStatus(statusText) {
    $('.js-status').html(statusText);
}

function sendMessage(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", data: data})
    });
}

$(document).ready(function() {
    var buttons = $(".js-buttons");
    var setupForm = $(".js-setup");

    function enable() {
        buttons.show();
        setupForm.show();
    }

    function disable() {
        buttons.hide();
        setupForm.hide();
    }

    function getSetup() {
        var map = {};
        setupForm.find("input").each(function(idx, input) {
            map[$(input).attr("name")] = $(input).val();
        });
        return map;
    }

    disable();
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        if (msg.type == "FROM_PAGE") {
            if (msg.data.login && msg.data.imagesCount) {
                enable();
                renderStatus("Hi @" + msg.data.login + ", we found images. <br/>You can start like them!");
            } else {
                disable();
                renderStatus("Please login and jump to the page with images");
            }
        }
    });

    sendMessage({action: "INFO"});

    $('.js-start').on('click', function() { sendMessage({ action: "START",  config: getSetup() }); });
    $('.js-stop').on( 'click', function() { sendMessage({ action: "STOP"                       }); });
});


