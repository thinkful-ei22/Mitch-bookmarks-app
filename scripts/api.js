'use strict';
/* global $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mitchg';

  //get all the bookmarks
  const getBookmarks = function(callback) {
    return $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  //turn bookmark objects into json strings
  const bookmarkJSONify = function(bookmark) {
    const title = bookmark.title;
    const url = bookmark.url;
    let desc = bookmark.desc;
    let rating = bookmark.rating;
    if (desc === undefined){ desc = 'No description given'; }
    return JSON.stringify({ title, url, desc, rating });
  };

  //create new bookmarks
  const createBookmark = function(bookmark, success, failure) {
    const newBookmark = bookmarkJSONify(bookmark);
    $.ajax({
      'url': `${BASE_URL}/bookmarks`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newBookmark,
      'success': success,
      'error': failure
    });
  };

  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      'url': `${BASE_URL}/bookmarks/${id}`,
      'method': 'PATCH',
      'contentType': 'application/json',
      'data': JSON.stringify(updateData),
      'success': callback
    });
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      'url': `${BASE_URL}/bookmarks/${id}`,
      'method': 'DELETE',
      'success': callback
    });
  };

  return {
    getBookmarks, createBookmark, updateBookmark, deleteBookmark
  };

}());