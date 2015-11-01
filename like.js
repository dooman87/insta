
var Insta = function() {
    var IMG_SEL = ".-cx-PRIVATE-PostsGrid__item .-cx-PRIVATE-Photo__clickShield";
    var MORE_LINK_SEL = ".-cx-PRIVATE-AutoloadingPostsGrid__moreLink";
    var IMG_CLOSE_SEL = ".-cx-PRIVATE-Modal__closeButton";
    var LIKE_SEL = ".-cx-PRIVATE-PostInfo__likeButton.coreSpriteHeartOpen";

    var imagesQueue = [];
    var stop = false;

    /**
     * Observing document to find new images that is loading
     * when "Load more" button pressed or the page was scrolled 
     * down
     */
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.addedNodes) {
                for (var i = 0; i < m.addedNodes.length; i++) {
                    var el = $(m.addedNodes.item(i));
                    el.find(IMG_SEL).each(addImages);
                }
            }
        });
    });

    function addImages(idx, img) {
        imagesQueue.push(img);
    }

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Pull an image from a queue and like it.
     * Schedule the next call in period from
     * 2 - 5 seconds. Also, stops execution if
     * "stop" flag is set.
     */
    function likeImg() {
        if (stop) {
            return;
        }

        var img = $(imagesQueue.shift());

        if (img) {
            $(window).scrollTop(img.offset().top);
            img.click();

            window.setTimeout(function() {
                var likeButton = $(LIKE_SEL);
                if (likeButton.length) {
                    likeButton[0].click();
                }
                $(IMG_CLOSE_SEL).click();
                likeImg();
            }, getRandomIntInclusive(3000, 6000));
        }
    }

    var doStart = function() {
        var config = {childList: true, subtree: true};
        observer.observe(document, config);

        imagesQueue = [];
        $(IMG_SEL).each(addImages);

        var moreImagesEl = $(MORE_LINK_SEL);
        if (moreImagesEl) {
            moreImagesEl[0].click();
        }
        likeImg();
    }

    var doStop = function() {
        stop = true;
        observer.disconnect();
    }

    var info = function info() {
        return {
            imagesCount: $(IMG_SEL).length,
            login: $("[data-reactid*='$profileLink']").text()
        }
    }

    return {
        doStart: doStart,
        doStop:  doStop,
        info:    info
    }

}();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

      if (request.type == "FROM_EXTENSION") {
          if (request.text == "START") {
              Insta.doStart();
          }
          if (request.text == "STOP") {
              Insta.doStop();
          }
          if (request.text == "INFO") {
              chrome.runtime.sendMessage({type: "FROM_PAGE", data: Insta.info()});
          }
      }
});
