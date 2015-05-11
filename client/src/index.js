var l = false;
function toggleSidebarVisablity() {
    if (!l) {
        $(".rs-content-container").css({overflow: "hidden"});
        $(".rs-map-wrapper").animate({left: "300px"});
    }else{
        $(".rs-map-wrapper").animate({left: "0px"},function(){
            $(".rs-content-container").css({overflow: ""});
        });
    }
    l = !l;
}

function setSidebarVisablity(visable){
    if (visable !== l){
        toggleSidebarVisablity();
    }
}


$(document).ready(function() {
    $('#collapse').click(function (event) {
        toggleSidebarVisablity();
        event.stopPropagation();
    });
    $('.rs-content-container').click(function(){
        setSidebarVisablity(false);
    });
});
