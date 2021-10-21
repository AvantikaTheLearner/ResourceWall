$(document).ready(function() {

  let counter = 0;
  $("#like-button").click(function() {
    counter += 1;
    $(this).find(".counter-num").text(counter)
    $(this).prop('disabled', true).css("backgroundColor", "#f17da3")

  })

});
