'use strict';
/* global store, api, $ */

const bookmarkList = (function() {

  //function to add HTML elements to bookmark
  const generateBookmarkElement = function(bookmark) {
    return `
      <li class="js-bookmark-element row" data-bookmark-id=${bookmark.id}>
        <div class="title js-expand">
          <p>${bookmark.title}<p>
          <p>${bookmark.rating} star(s)!</p>
          <p class="js-bookmark-expand">${bookmark.expand ? 'Click to collapse' : 'Click for more details'}</p>
        </div>
        <div class="bookmark-info ${bookmark.expand ? '' : 'hidden'}">
          <a href="${bookmark.url}" target="_blank">Visit site!</a>
          <textarea name="bookmark-desc" class="js-bookmark-desc-edit" rows="5" cols="30" value="${bookmark.desc}">${bookmark.desc}</textarea>
          <select name="bookmark-rating" class="js-bookmark-rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="bookmark-edit js-bookmark-edit">
            <span class="button label">Submit Edit</span>
          </button>
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
    console.log('render ran');
    $('.bookmark-list').html(listBookmarkString);
  };

  //function to validate new bookmarks for the user
  const newBookmarkValidation = function(bookmark){
    $('.error').remove();
    if (bookmark.title === '') {
      $('.js-bookmark-title').after('<span class="error">This field is required</span>');
      throw new TypeError('Title is required');
    }
    if (bookmark.url === '') {
      $('.js-bookmark-url').after('<span class="error">This field is required</span>');
    } 
    return bookmark;
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
        //store.addBookmarkToStore(bookmark);
        render();
      }, (err) => {
        $('.js-bookmark-title').after(`<span class="error">${err.responseJSON.message}</span>`);
        console.log(err);
      });
    });

  };

  //function to get bookmark Id from HTML elements
  const getBookmarkIdFromElement = function(bookmark) {
    return $(bookmark).closest('.js-bookmark-element').data('bookmark-id');
  };

  //function to handle user clicks on an object
  const handleBookmarkClicked = function() {
    $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.bookmarks.forEach(function (bookmark){
        if (bookmark.id === id) {
          bookmark.expand = !bookmark.expand;
        }
        render();
      });

    });
  };

  //function for editing bookmark description and rating
  const handleEditBookmark = function() {
    $('.js-bookmark-list').on('click', '.js-bookmark-edit', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const newDesc = $(event.currentTarget).closest('li').find('.js-bookmark-desc-edit').val();
      const newRating = $(event.currentTarget).closest('li').find('.js-bookmark-rating').val();
      const updateData = {};
      updateData.desc = newDesc;
      updateData.rating = newRating;
      api.updateBookmark(id, updateData, ()=> {
        console.log('update callback');
        $(event.currentTarget).closest('li').find('p.js-bookmark-expand').click();
        store.bookmarks.find(val => val.id === id).desc = newDesc;
        store.bookmarks.find(val => val.id === id).rating = newRating;
        render();
      });
      console.log(id, newDesc, newRating);
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
    handleEditBookmark();
    handleDeleteBookmark();
    handleFilterByRating();
  };

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());