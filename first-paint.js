// taken from https://www.youtube.com/watch?v=S9sktFzL3tQ
(function timeFirstPaint() {
  /* global chrome */
  var fp = chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime;
  console.log('first paint: ' + fp);
}());
