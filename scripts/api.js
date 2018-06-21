'use strict';
/* global $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mitchg';

  const getBookmarks = function(callback) {
    return $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  return {
    getBookmarks,
  };

}());