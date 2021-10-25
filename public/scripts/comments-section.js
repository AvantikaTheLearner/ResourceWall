$(document).ready(function() {


  const $commentSubmit = $(".comment-submit");

  $commentSubmit.on("click", function (event) {
    event.preventDefault();
    const content = $("#comment-text").val()
    const rate = $("input[name='rate']:checked").val()
    const resourceId = $("main").data().id;
    $.post(`/resources/${resourceId}/reviews`, {content, rate}, function(res){
      window.location.reload();
    })
  });

  const serial = $commentSubmit.serialize();
  $("#comment-text").val("");
  $('#comment-container').prepend(serial);

});
