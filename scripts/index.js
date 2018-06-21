'use strict';
/* global bookmarkList, api, store, $ */

//DOM
$(document).ready(function () {
  bookmarkList.bindEventListeners();
  api.getBookmarks(data => {
    data.forEach(bookmark => store.addBookmarkToStore(bookmark));
    bookmarkList.render();
  });
});

// $.getJSON('https://thinkful-list-api.herokuapp.com/mitchg/bookmarks'), (response) => {
//   console.log('api response:', response);
// };

// api.getBookmarks(function(data){
//   console.log(data);
// });
// console.log(api.BASE_URL);

// api.createBookmark('Wendys', 'https://www-pqa1.wendys.com/home', 'wendells', 3, (newBookmark) => {
//   api.getBookmarks((bookmarks) => {
//     console.log(bookmarks);
//   });
// });