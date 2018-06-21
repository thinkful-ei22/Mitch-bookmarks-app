'use strict';

const store = (function () {
  const bookmarks = [];
  const errorMessage = '';
  //if error message, rerender and display block of text

  const addBookmarkToStore = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findAndDeleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  return {
    bookmarks: bookmarks, addBookmarkToStore, findAndDeleteBookmark
  };
}());