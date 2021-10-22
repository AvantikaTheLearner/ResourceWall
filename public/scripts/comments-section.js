$(document).ready(function() {


  const $commentSubmit = $(".comment-submit");

  $commentSubmit.on("submit", function (event) {
    event.preventDefault();
    const $formVal = $("#comment-text").val();

    const serial = $commentSubmit.serialize();
    $("#comment-text").val("");

    $('#tweets-container').prepend(serial);

  });






});
