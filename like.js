window.setTimeout(function() {
  var pics = document.getElementsByClassName("-cx-PRIVATE-Photo__clickShield");
  chrome.runtime.sendMessage({type: "FROM_PAGE", text: "Found " + pics.length + " images"});
}, 1000);
