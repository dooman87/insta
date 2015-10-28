window.setTimeout(function() {
  var pics = document.getElementsByClassName("-cx-PRIVATE-Photo__clickShield");
  chrome.runtime.sendMessage({type: "FROM_PAGE", text: "Found " + pics.length + " images"});
}, 1000);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "FROM_EXTENSION" && request.text == "START") {
        alert("START LIKE");
        $('.-cx-PRIVATE-AutoloadingPostsGrid__moreLink')[0].click();
    }
});
