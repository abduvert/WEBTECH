$(document).ready(function(){
    store();
});

function store(){
    var navigation = $(".btn-search");
    navigation.on("click",()=>{
        console.log("HELLOO")
        window.location.href = "/store"
    })
}