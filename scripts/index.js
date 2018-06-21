'use strict';
/* global bookmarkList, api, $ */

$(function () {
  bookmarkList.bindEventListeners();
});

// $.getJSON('https://thinkful-list-api.herokuapp.com/mitchg/bookmarks'), (response) => {
//   console.log('api response:', response);
// };

api.getBookmarks(function(data){
  console.log(data);
});

console.log(api.BASE_URL);