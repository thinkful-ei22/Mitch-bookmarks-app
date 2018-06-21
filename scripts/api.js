'use strict';
/* global $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mitchg';

  const getBookmarks = function(callback) {
    return $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const bookmarkJSONify = function(bookmark) {
    const title = bookmark.title;
    const url = bookmark.url;
    let desc = bookmark.desc;
    let rating = bookmark.rating;
    if (desc === undefined){ desc = 'No description given'; }
    return JSON.stringify({ title, url, desc, rating });
  };

  const createBookmark = function(bookmark, callback) {
    const newBookmark = bookmarkJSONify(bookmark);
    $.ajax({
      'url': `${BASE_URL}/bookmarks`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newBookmark,
      'success': callback
    });

  };

  return {
    getBookmarks, createBookmark
  };

}());