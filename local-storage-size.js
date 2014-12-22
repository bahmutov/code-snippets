// based on answer to question
// http://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
(function showLocalStorageSize() {
  function stringSizeBytes(str) {
    return str.length * 2;
  }

  function toMB(bytes) {
    return bytes / 1024 / 1024;
  }

  function toSize(key) {
    return {
      name: key,
      size: stringSizeBytes(localStorage[key])
    };
  }

  function toSizeMB(info) {
    info.size = toMB(info.size).toFixed(2) + ' MB';
    return info;
  }

  var sizes = Object.keys(localStorage).map(toSize).map(toSizeMB);

  console.table(sizes);

}());
