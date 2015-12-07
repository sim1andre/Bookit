'use strict';

const $ = require('jquery');

$(document).ready(function() {
  console.log('jQuery is working with ExpressJS! Fantastic');
  areYouSureYouWantToDelete();
});

function areYouSureYouWantToDelete() {
  const $form = $('.delete_form');

  $form.on('submit', (e) => {
    let x;
    if (confirm("Are you sure you want to delete this booking?") == true) {
        x = "You pressed OK!";
    } else {
        x = "You pressed Cancel!";
        return false;
        e.preventDefault();
    }
  })
}
