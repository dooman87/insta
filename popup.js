function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

//alert(chrome.extension.getBackgroundPage().imagesCount);
renderStatus(chrome.extension.getBackgroundPage().imagesCount);

window.addEventListener("message", function(evt) {
    if (evt.source != window) {
        return
    }

    if (evt.data.type && evt.data.type === "FROM_PAGE") {
        renderStatus(evt.data.text);
    }
});
