function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

$(document).ready(function() {
    renderStatus(chrome.extension.getBackgroundPage().imagesCount);

    $('.js-start').on('click', function() {
      window.alert("Start");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "FROM_EXTENSION", text: "START"})
      });
    });
});


