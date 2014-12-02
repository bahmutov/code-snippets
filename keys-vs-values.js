// measures how much memory object keys take vs values in collection of objects
(function keysVsValuesInit(root) {
  function stringSize(str) {
    // JavaScript strings are unicode UTF-16 up to 2 bytes per character
    return str.length * 2;
  }

  function objectSize(obj) {
    if (typeof obj === 'string') {
      return stringSize(obj);
    }
    return stringSize(JSON.stringify(obj));
  }

  function values(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }

  function listSize(values) {
    return values.reduce(function (total, value) {
      return objectSize(value) + total;
    }, 0);
  }

  function keysValues(obj) {
    if (typeof obj === 'object') {
      return {
        keys: stringSize( Object.keys(obj).join('') ),
        values: listSize( values(obj) )
      };
    } else {
      return {
        keys: 0,
        values: objectSize(obj)
      };
    }
  }

  function keysVsValues(items) {
    if (!Array.isArray(items) && typeof items === 'object') {
      return keysVsValues([items]);
    }

    console.assert(Array.isArray(items));
    return items.reduce(function (sizes, item) {
      var size = keysValues(item);
      sizes.keys += size.keys;
      sizes.values += size.values;
      return sizes;
    }, {
      keys: 0,
      values: 0
    });
  }

  root.keysVsValues = keysVsValues;
  console.log('try keysVsValues(<array of objects>);');
}(this));
