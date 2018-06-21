'use strict';
/* global store, api, $ */

const bookmarkList = (function() {

  //function to add HTML elements to bookmark
  const generateBookmarkElement = function(bookmark) {
    return `
      <li class="js-bookmark-element" data-bookmark-id=${bookmark.id}>
        <a href ="${bookmark.url}">${bookmark.title}</a><br>
        ${bookmark.desc} -- ${bookmark.rating} star(s)!
        <div class="bookmark-controls">
          <button class="bookmark-delete js-bookmark-delete">
            <span class="button label">Delete</span>
          </button>
        </div>
      </li>`;
  };

  //function to convert all passed bookmarks to one HTML string
  const  generateListBookmarkString = function(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => 
      generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  //function to render the bookmark list
  function render() {
    let bookmarks = store.bookmarks;
    const listBookmarkString = generateListBookmarkString(bookmarks);
    $('.bookmark-list').html(listBookmarkString);
  }

  //function to add new bookmarks to the list and api
  const handleNewBookmarkSubmit = function() {
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      const newBookmark = {
        title: $('.js-bookmark-title').val(),
        url: $('.js-bookmark-url').val(),
        desc: $('.js-bookmark-desc').val(),
        rating: $('.js-bookmark-rating').val(),
      };
      $('.js-bookmark-title').val(''),
      $('.js-bookmark-url').val(''),
      $('.js-bookmark-desc').val(''),
      $('.js-bookmark-rating').val(''),
      api.createBookmark(newBookmark, (bookmark) => {
        store.addBookmarkToStore(bookmark);
        render();
      }, (err) => {
        console.log(err);
        alert(err.responseJSON.message);
      });
    });

  };

  //function to get bookmark Id from HTML elements
  const getBookmarkIdFromElement= function(bookmark) {
    return $(bookmark).closest('.js-bookmark-element').data('bookmark-id');
  };

  //function for deleting bookmarks from store and api
  const handleDeleteBookmark = function() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id, ()=>{
        store.findAndDeleteBookmark(id);
        render();
      });
    });
  };

  //event listeners go here
  const bindEventListeners = function(){
    handleNewBookmarkSubmit();
    handleDeleteBookmark();
  };

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());