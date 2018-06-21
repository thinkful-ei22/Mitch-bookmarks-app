'use strict';

const store = (function () {
  const bookmarks = [];

  function setBookmarks(bookmarks) {
    this.bookmarks = bookmarks;
  }

  return {
    bookmarks: bookmarks, setBookmarks,
  };
}());