$(document).ready(function(){
    $(document).on("click", ".predict", post);
});

function post(){
    event.preventDefault();

    $.ajax({
        url: "https://randomuser.me/api/",
        method: "GET",
        dataType: "json",
        
        success: function(response){
            predict(response); // Pass the response data to predict function
        },
        error: function (error) {
            console.error("Error sending", error);
        },
    });
}

function predict(response){
    var gender = $("#gender");
    gender.html(response.results[0]); // Use the response data to display gender
}
