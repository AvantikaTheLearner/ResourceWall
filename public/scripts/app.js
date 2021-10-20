// Client facing scripts here
$(document).ready(function () {
  console.log("loaded");

  //this function submits an ajax request to load all the tweets from Json data
  const loadResources = () => {
    $.ajax({
      url: "/resources/resources",
      method: "GET",
      dataType: "json",
      success: (data) => {
        console.log("Data", data);
        renderResources(data.resources);
      },
      error: (err, status, e) => {
        console.log(`there was an error: ${err} ${status} ${e}`);
      },
    });
  };

  loadResources();

  //this function helps in rendering the tweets while submitting ajax request
  const renderResources = function(resources) {

    const $resourcesContainer = $('#resources-container');
    //$resourcesContainer.empty();
    for (const resource of resources) {
      const $resource = createResourceElement(resource);
      $resourcesContainer.append($resource); // this is used to show the most recent tweet on top
    }
  };

  //this function creates a new tweet
  const createResourceElement = function(resourceObj) {
    const $resourceObj = $(`<div class="imageClass" style= "border: 1px solid black ; padding: 20px">
          <a href="${resourceObj.url}"><img src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-developer-picture-id1224500457?s=612x612" width="100" height="100">${resourceObj.url}</a>
          <button class="likeButton" type="submit">Like</button>
          <button class="rateButton" type="submit">Rate</button>
          <button class="commentButton" type="submit">Comment</button>
        </div>`);

        $(".likeButton").on("submit", function(event) {

          const $editProductForm = $(`
            <form>
              <label>Title:</label>
              <input name="title" value="${resourceObj.title}" />
              <br/>
              <label>Description:</label>
              <input name="description" value="${resourceObj.description}"/>
              <br/>
              <input type="checkbox" name="my-checkbox" />
              <button type="submit">Submit!!</button>
            </form>
          `);

      $resourceObj.append($editProductForm);
    });

    return $resourceObj;
  };

  /*$("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $form = $(this);
    const $tweetText = $form.find("textarea");
    const $tweetLength = $tweetText.val().trim().length;
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, (response) => {
        $("#tweet-text").val('');
        $('.counter').text(140);
      });
  });*/
});
