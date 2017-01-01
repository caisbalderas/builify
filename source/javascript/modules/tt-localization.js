import _isString from 'lodash/isstring';
import _isUndefined from 'lodash/isundefined';
import localization from './localization';

function getProperty (obj, prop) {
  var parts = prop.split('.');
  var last = parts.pop();
  var l = parts.length;
  var i = 1;
  var current = parts[0];

  while ((obj = obj[current]) && i < l) {
    current = parts[i];
    i++;
  }

  if (obj) {
    return obj[last];
  }
}

export default function (languagePreference) {
  return function (query) {
    const language = languagePreference || 'en';
    const orgQuery = query;

    query = `${language}.${query}`;
    
    const result = getProperty(localization, query);

    if (!_isUndefined(result) && _isString(result)) {
      return result;
    }

    return orgQuery;
  };
}
