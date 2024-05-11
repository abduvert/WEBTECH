
function display() {
  $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "GET",
      dataType: "json",


      success: function (data) {
          var storiesList = $(".stories");
          storiesList.empty();

          $.each(data, function (index, story) {
              storiesList.append(
                  `<div class="stories">
                      <h2 class="title">${story.title}</h2>
                      <p class="descrip">${story.content}</p>
                      <button class="btn btn-primary edit" type="button" data-id="${story.id}">Update</button>
                      <button class="btn btn-primary delete" type="button" data-id="${story.id}">Delete</button>
                  </div>
                  <hr/>
                  `
              );
          });
      },
      error: function (error) {
          console.error("Error fetching stories:", error);
      },
  });
}



function deleteStory() {
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "DELETE",
      success: function () {
        display(); 
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }


  function handleFormSubmission(event) {
    event.preventDefault();

    let storyId = $(".create").attr("data-id");
    var title = $(".title").val();
    var description = $(".description").val();

    if (storyId) {
      $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
        method: "PUT",
  
        data: { title, description },


        success: function () {
          display(); 
        },
        error: function (error) {
          console.error("Error creating story:", error);
        
        },

      });

    } 
    else {
      $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories",
        method: "POST",
        data: { title, description},
        
        success: function () {
          display(); 
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    }
  }


  function editBtnClicked(event) {
    event.preventDefault();

    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "GET",
      success: function (data) {
        console.log(data);

        $(".clear").show();
        $(".title").val(data.title);
        $(".description").val(data.content);
        $(".edit").html("Update");
        $(".edit").attr("data-id", data.id);
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }

  
  $(document).ready(function () {

    display();
    $(document).on("click", ".delete", deleteStory);
    $(document).on("click", ".edit", editBtnClicked); 
 
    
    $(".form").submit(handleFormSubmission);
    $(".clear").on("click", function (e) {
        e.preventDefault();
        $(".clear").hide();
        $(".create").removeAttr("data-id");
        $(".create").html("Create");
        $(".title").val("");
        $(".description").val("");
    });
});
