function setSidebarVisablity(visable){
    if(visable){
       $("rs-sidebar-collapse").hide();
    }else {
        $("rs-sidebar-collapse").show();
    }
}

var l = true;
function toggleSidebarVisablity() {
    if (l) {
        $(".rs-content-container").css({overflow: "hidden"});
        $(".rs-map-wrapper").animate({left: "300px"});
    }else{
        $(".rs-map-wrapper").animate({left: "0px"},function(){
            $(".rs-content-container").css({overflow: ""});
        });
    }
    l = !l;
}


$(document).ready(function() {

    $('#collapse').click(function () {
        toggleSidebarVisablity();
    });
});
