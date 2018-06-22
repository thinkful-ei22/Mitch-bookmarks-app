'use strict';

const store = (function () {
  const bookmarks = [];
  const filter = '';
  const errorMessage = '';
  const expandedView = false;
  //if error message, rerender and display block of text

  const addBookmarkToStore = function(bookmark) {
    Object.assign(bookmark, { expand : false} );
    this.bookmarks.push(bookmark);
  };

  const findAndDeleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const findAndUpdateBookmark = function(id, desc, rating) {
    this.bookmarks.desc = desc;
    this.bookmarks.rating = rating;
  };

  const expandElement = function(id){
    this.bookmarks.expand = !this.bookmarks.expand;
  };

  return {

    bookmarks: bookmarks, addBookmarkToStore, findAndUpdateBookmark, findAndDeleteBookmark, expandElement,
    filter, expandedView
  };
}());