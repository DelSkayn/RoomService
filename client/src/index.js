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
function singleClick(e) {
    setSidebarVisablity(true);
    e.stopPropagation();
    $('#rs-comments').attr('src','/comment?room=' + $(this).attr('alt'));
    console.log($('#rs-comments').attr('src'));
}

function doubleClick(e) {
    $(location).attr('href','/room?roomname=' + $(this).attr('alt')); 
}


$(document).ready(function() {
    $('#collapse').click(function (event) {
        toggleSidebarVisablity();
        event.stopPropagation();
    });
    $('.rs-map-wrapper').click(function(){
        setSidebarVisablity(false);
    });
    $('area').each(function() {
        $(this).click(function(e) {
            var that = this;
            setTimeout(function() {
                var dblclick = parseInt($(that).data('double'), 10);
                if (dblclick > 0) {
                    $(that).data('double', dblclick-1);
                } else {
                    singleClick.call(that, e);
                }
            }, 300);
        }).dblclick(function(e) {
            $(this).data('double', 2);
            doubleClick.call(this, e);
        });

    });
});

