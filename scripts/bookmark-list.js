'use strict';
/* global store, api, $ */

const bookmarkList = (function() {

  //function to add HTML elements to bookmark
  const generateBookmarkElement = function(bookmark) {
    return `
      <li class="js-bookmark-element" data-bookmark-id=${bookmark.id}>
        <div class="title js-expand">
          <p>${bookmark.title} -- ${bookmark.rating} star(s)!</p><br>
        </div>
        <div class="bookmark-details js-bookmark-details" id="bookmark-details">
          <a href="${bookmark.url}" target="_blank">LINK</a>
          <p>${bookmark.desc}</p>
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

  //function to filter bookmarks by minimum rating
  const filterBookmarks = function(bookmarks) {
    if (store.filter === '') {
      return generateListBookmarkString(bookmarks);
    } else {
      const filteredBookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
      return generateListBookmarkString(filteredBookmarks);
    }
  };


  //function to render the bookmark list
  const render = function() {
    const listBookmarkString = filterBookmarks(store.bookmarks);

    $('.bookmark-list').html(listBookmarkString);
  };

  //function to validat new bookmarks for the user
  const newBookmarkValidation = function(bookmark){
    $('.error').remove();

    if (bookmark.title === '') {
      $('.js-bookmark-title').after('<span class="error">This field is required</span>');
      throw new TypeError('Title is required');
    }
    // else if (bookmark.url === '') {
    //   $('.js-bookmark-url').after('<span class="error>This field is required</span>');
    // }
    else {
      return bookmark;
    }
  };

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
      $('.js-bookmark-title').val('');
      $('.js-bookmark-url').val('');
      $('.js-bookmark-desc').val('');
      $('.js-bookmark-rating').val('');
      const validBookmark = newBookmarkValidation(newBookmark);
      api.createBookmark(validBookmark, (bookmark) => {
        store.addBookmarkToStore(bookmark);
        render();
      }, (err) => {
        console.log(err);
        //alert(err.responseJSON.message);
      });
    });

  };

  //function to get bookmark Id from HTML elements
  const getBookmarkIdFromElement = function(bookmark) {
    return $(bookmark).closest('.js-bookmark-element').data('bookmark-id');
  };

  const handleBookmarkClicked = function() {
    $('.js-bookmark-list').on('click', '.js-bookmark-element', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const element = document.getElementById('bookmark-details');
      console.log(id, element);
    });
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

  //function for filtering list by rating
  const handleFilterByRating = function() {
    $('#rating-form').on('click', '#rating-filter-button', function() {
      event.preventDefault();
      store.filter = $('#rating-filter-select').val();
      render();   
    });
  };

  //event listeners go here
  const bindEventListeners = function() {
    handleNewBookmarkSubmit();
    handleBookmarkClicked();
    handleDeleteBookmark();
    handleFilterByRating();
  };

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());