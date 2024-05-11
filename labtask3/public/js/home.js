$(document).ready(function(){
    animateText();
    animateCards();
    scrolldown();
    contact();
    storeNavigate();
});

function animateText() {
    console.log("text animation");
    var texts = document.getElementsByClassName("centerText");
    let currentIndex = 0;

    function nextText() {
        texts[currentIndex].classList.remove("activeT");
        currentIndex = (currentIndex + 1) % texts.length;
        texts[currentIndex].classList.add("activeT");
    }

    setInterval(nextText, 6000); // Change text every 6 seconds
}

function animateCards() {
    const cardList = $('#cardList');
    const clonedList = cardList.clone(true);
    cardList.after(clonedList);
    cardList.parent().addClass('storeslist'); // Add the class to the container holding both lists
    cardList.parent().css('animation', 'moveRight 30s linear infinite');
}



function scrolldown(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}

function contact(){
    const button = $("#cont");
    button.on("click",function(e){
        window.location.href = "/contact";
    });
}

function storeNavigate(){
    var goToStores = $("#goToStores");

    goToStores.on("click",()=>{
        window.location.href = "/stores";
    });
}


// function special(){
//     var isCollapsed = $('.navbar-collapse').hasClass('show');
            
//     // Get the logcont div
//     var logcontDiv = $('#logcont');

//     if (isCollapsed) {
//         // Add a class to logcont div when navbar collapses
//         logcontDiv.addClass('logcont-collapsed');
//     } else {
//         // Remove the added class when navbar expands
//         logcontDiv.removeClass('logcont-collapsed');
//     }
// }
