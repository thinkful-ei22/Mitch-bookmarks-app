'use strict';

const store = (function () {
  const bookmarks = [];
  const errorMessage = '';
  //if error message, rerender and display block of text

  const addBookmarkToStore = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  return {
    bookmarks: bookmarks, addBookmarkToStore
  };
}());