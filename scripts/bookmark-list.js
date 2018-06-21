'use strict';
/* global store, api, $ */

const bookmarkList = (function() {

  function generateBookmarkElement(bookmark) {
    return `
      <li class="js-bookmark-element" data-item-id=${bookmark.id}">
        <a href ="${bookmark.url}">${bookmark.title}</a><br>
        ${bookmark.desc} -- ${bookmark.rating} star(s)!
        <div class="bookmark-controls">
          <button class="bookmark-delete js-bookmark-delete">
            <span class="button label">Delete</span>
          </button>
        </div>
      </li>`;
  }

  function generateListBookmarkString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => 
      generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render() {
    let bookmarks = store.bookmarks;
    const listBookmarkString = generateListBookmarkString(bookmarks);
    $('.bookmark-list').html(listBookmarkString);
  }

  // add new bookmarks to the list and api
  function handleNewBookmarkSubmit() {
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
        console.log(bookmark);
      }, (err) => {
        console.log(err);
        alert(err.responseJSON.message);
      });
    });

  }

  //event listeners go here
  function bindEventListeners(){
    handleNewBookmarkSubmit();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());