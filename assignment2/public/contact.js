$(document).ready(function(){
    var form = $('.form');

   
    form.on('submit', function(e){
        e.preventDefault();

        var nameVal = $('#name').val().trim();
        var emailVal = $('#email').val().trim();
        var messageVal = $('#message').val().trim();
        var form = $(".formlist");

        
        if(nameVal && emailVal && messageVal) {
            
            form.empty();
            form.append(
                `<h2 class="thanks">Thanks for contacting us!</h2>`
            );
            $('.name').val('');
            $('.email').val('');
            $('.message').val('');


        } else {
            
            if (!nameVal) $('#name').addClass('error');
            if (!emailVal) $('#email').addClass('error');
            if (!messageVal) $('#message').addClass('error');
        }
    });

    $('.form-control').on('focus', function() {
        $(this).removeClass('error');
    });
});
