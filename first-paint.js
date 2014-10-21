// taken from https://www.youtube.com/watch?v=S9sktFzL3tQ
(function timeFirstPaint() {
  var fp = chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime;
  console.log('first paint: ' + fp);
}());
