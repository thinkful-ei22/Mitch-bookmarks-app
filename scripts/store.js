'use strict';

const store = (function () {
  const bookmarks = [];
  const filter = '';
  const errorMessage = '';
  //if error message, rerender and display block of text

  const addBookmarkToStore = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findAndDeleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const expandElement = function(id){
    this.bookmarks.expand = !this.bookmarks.expand
  };

  return {

    bookmarks: bookmarks, addBookmarkToStore, findAndDeleteBookmark, expandElement,
    filter
  };
}());