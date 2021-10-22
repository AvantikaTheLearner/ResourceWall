// Client facing scripts here
$(document).ready(function() {
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
      error: (err) => {
        console.log(`there was an error: ${err}`);
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
    const $resourceObj = $(`


    <a href="/resources/${resourceObj.id}">
    <div>
      <div class="imageClass" style= "border: 1px solid black ; padding: 20px">
            <img src="${resourceObj.image_url}" width="100" height="100">
            <p><br/></p>
            <p><b>TITLE:</b> ${resourceObj.title}</p>
            <p><b>CATEGORY:</b> ${resourceObj.category_name}</p>
            <a href="${resourceObj.url}">${resourceObj.url}</a>
            <button class="likeButton" type="submit">Like</button>
            <button class="rateButton" type="submit">Rate</button>
            <button class="commentButton" type="submit">Comment</button>
          </div>
      </div>
    </a>



        `);

    return $resourceObj;
  };

});
