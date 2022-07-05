$(document).ready(function(){
    $("#container").addClass("start");
    $("nav li").click(function(){
        $("#container").css("max-width","100%");
        var id=$(this).attr("data-rol"); //data 값을 선택자로 사용할 수 있게 변수로 만듦
        $("nav li").removeClass("on");
        $(this).addClass("on");
        $(".content").removeClass("prev this next");
        //클릭 메뉴와 매칭되는 id에 this 지정하고 그 앞에(prevAll) 모든 태그에는 prev 클래스 지정
        $("#"+id).addClass("this").prevAll().addClass("prev");
        $("#"+id).nextAll().addClass("next");
    });
    $(".logo_box").click(function(){
        $("nav li").removeClass("on");
        $(".content").removeClass("prev this next");
        $("#container").css("max-width", "1200px");
    });
});