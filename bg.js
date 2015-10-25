chrome.runtime.onMessage.addListener(function(req) {
    if (req.type && req.type === 'FROM_PAGE') {
        alert('RECIEVE ' + req.text);
        window.imagesCount = req.text;
    }   
});

