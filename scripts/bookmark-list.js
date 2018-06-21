'use strict';
/* global store, api, $ */

const bookmarkList = (function() {

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
      $('.js-bookmarl-url').val(''),
      $('.js-bookmark-desc').val(''),
      $('.js-bookmark-rating').val(''),
      api.createBookmark(newBookmark, (bookmark) => {
        console.log(bookmark);
      });
    });

  }

  function bindEventListeners(){
    handleNewBookmarkSubmit();
  }

  return {
    bindEventListeners: bindEventListeners,
  };

}());