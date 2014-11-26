// measures how much memory a key and its value takes up in a collection of objects
(function expensiveKeysInit(root) {
  function stringSize(str) {
    // JavaScript strings are unicode UTF-16 up to 2 bytes per character
    return str.length * 2;
  }

  function objectSize(obj) {
    return stringSize(JSON.stringify(obj));
  }

  var pickJustKey = function pickJustKey(key) {
    return function (object) {
      return {
        key: object[key]
      };
    };
  }

  var pickValue = function (key, items) {
    return items.map(pickJustKey(key));
  }

  function keySize(items, key) {
    return objectSize(pickValue(key, items));
  }

  function zip(keys, values) {
    var result = {};
    keys.forEach(function (key, index) {
      result[key] = values[index];
    });
    return result;
  }

  function propertySizes(keys, items) {
    if (arguments.length === 1) {
      items = keys;
      if (!items.length) {
        return {};
      }
      keys = Object.keys(items[0]);
    }

    var keyInItemsSize = keySize.bind(null, items);
    var sizes = keys.map(keyInItemsSize);
    var result = zip(keys, sizes);
    return result;
  }

  root.expensiveKeys = propertySizes;
  console.log('try expensiveKeys(<array of objects>);');
}(this));
