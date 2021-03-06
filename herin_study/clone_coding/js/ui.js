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

$(".roll_left").click(function(){
    $(".book_roll li").eq(0).insertAfter(".book_roll li:last-child");
});
$(".roll_right").click(function(){
    $(".book_roll li").eq(-1).insertBefore(".book_roll li:first-child");
});

$(".book_roll li").click(function(){
    var _this=$(this);
    var liurl=_this.data("url");
    $(".notebook").html();
    $.ajax({
        type: 'get', //http 요청방식
        url: liurl,  //해당 url
        dataType: 'html',  //data type
        success:function(data){ //http 요청 성공 후 데이터 전송
            $(".notebook").html(data);
        }
    });
});

$(".accordio_box ol li").click(function(){
    $(".accordio_box ol li").removeClass("on");
    $(this).addClass("on");
});

$(".close").click(function(){
    $(".thankyou_message").css("display","none");
});