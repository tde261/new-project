$(window).ready(function () {

    var slideCount = $(".slide").size();
    var slideNum = 0;
    var slideIndex = 0;
    var slideBackground = $(".slide-background");
    var interval = setInterval(autoChange, 3500);
    var slide = $(".slide");
    var navInd = $(".navigation_indicator");
    var animating = false;

    function change() {
        $(".slide-background .slide_wrapper").eq(slideNum).css({"display":"none"});
        animating = true;
        slide.css("transform", "translate3d("+ -slideNum*100 +"%,0,0)");
        slideBackground.css("transform", "translate3d("+ slideNum*50 +"%,0,0)");
        navInd.removeClass('active').eq(slideIndex).addClass('active');
        setTimeout(function() {
            animating = false;
            $(".slide-background .slide_wrapper").eq(slideNum).fadeIn(200);
        }, 1000);
    }

    function autoChange() {
        slideNum++;
        if (slideNum > slideCount - 1) {
            slideNum = 0;
            $(".slide-background .slide_wrapper").eq(1).css({"display":"none"});
        }
        slideIndex++;
        if (slideIndex > slideCount - 1) slideIndex = 0;
        change();
    }

    $(".slide, .slide_navigation, .slide_navigation_indicator").mouseenter(function () {
        clearInterval(interval);
    });
    $(".slide, .slide_navigation, .slide_navigation_indicator").mouseleave(function () {
        interval = setInterval(autoChange, 3500);
    });

    $(".slide_navigation_right").click(function () {
        if(animating) return;
        slideNum++;

        if (slideNum > slideCount - 1) {
            slideNum = 0;
            $(".slide-background .slide_wrapper").eq(1).css({"display":"none"});
        }
        slideIndex++;
        if (slideIndex > slideCount - 1) slideIndex = 0;;
        change();
    });

    $(".slide_navigation_left").click(function () {
        if(animating) return;
        slideNum--;

        if (slideNum < 0 ) {
            slideNum = slideCount - 1;
            $(".slide-background .slide_wrapper").eq(1).css({"display":"none"});
        }
        slideIndex--;
        if (slideIndex < 0) slideIndex = slideCount - 1;
        change();
    });

    $(".navigation_indicator").click(function () {
        slideIndex = $(this).index();
        slideNum = slideIndex;
        change();
    });
});
// Скролл наверх

$(document).on("scroll", function() {
    $(".to_top").each(function() {
        if (1050 > $(document).scrollTop()) {
            $(".to_top").fadeOut(300)
        }
        else {
            $(".to_top").fadeIn(300)
        }
    });
});

$(".to_top").click(function() {
    $("html, body").animate({scrollTop:0 + "px"});
});


//Анимация

/*$(document).on("scroll", function () {
    $(".anim").each(function () {
        if ($(this).offset().top > $(document).scrollTop() + $(window).height() - 80) {
            $(this).addClass("invis");
            $(this).removeClass("vis");

        }
        else {
            $(this).addClass("vis");
            $(this).removeClass("invis");
        }
    });
});

$(document).ready(function () {
    $(".slide-in-left-top").addClass("anim1");
    $(".anim1").removeClass("slide-in-left-top");
});

$(document).ready(function () {
    $(".slide-in-top-top").addClass("anim1");
    $(".anim1").removeClass("slide-in-top-top");
});
*/




Share = {
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent('Изготовление печатей и штампов в Йошкар-Оле.');
        url += '&p[summary]='   + encodeURIComponent("Срочное изготовление за 1 час печатей штампов факсимиле. Печати от 300 руб. тел.+7 (8362) 39-30-09");
        url += '&p[url]='       + encodeURIComponent('http://stamp-magnat.ru');
        url += '&p[images][0]=' + encodeURIComponent('http://stamp-magnat.ru/images/main1.jpg');
        Share.popup(url);
    },

    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
};


$("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html,body").animate({scrollTop: $(_href).offset().top - 20 +"px"}, $(_href).offset().top);
    return false;
});

$(".order").mousedown(function(){
    $(this).addClass("click");
});
$(".order").mouseup(function(){
    $(this).removeClass("click");
});

$('.page-scroll').click(function(){
    $("html, body").animate({scrollTop:0 + "px"});
}); 

$(document).ready(function(){
            $('#btn_submit').click(function(){

                if($('#user_name').val() == '') {
                    $('#user_name').css({'border-color':'red'});
                }
                else {
                    $('#user_name').css({'border-color':'#cacaca'});
                }
                if($('#user_email').val() == '') {
                    $('#user_email').css({'border-color':'red'});
                }
                else {
                    $('#user_email').css({'border-color':'#cacaca'});
                }
                if($('#user_name').val() != '' && $('#user_email').val() != '') {

                $('.messages').fadeIn(200).delay(2000).fadeOut(200);
                $('.main-form').delay(2000).fadeOut();
                }
                // собираем данные с формы
                var user_name    = $('#user_name').val();
                var user_email   = $('#user_email').val();
                var text_comment = $('#text_comment').val();
                // отправляем данные
                $.ajax({
                    url: "action.php", // куда отправляем
                    type: "post", // метод передачи
                    dataType: "json", // тип передачи данных
                    data: { // что отправляем
                        "user_name":    user_name,
                        "user_email":   user_email,
                        "text_comment": text_comment
                    },
                    // после получения ответа сервера
                });
            });
        });  

$('.call-form').click(function(){
    $('.main-form').fadeIn();
}); 
//$('.footer-spacer').height() = 

$('.close-form').click(function(){
    $('.main-form').fadeOut();
});

