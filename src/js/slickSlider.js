$(document).ready(function(){
    $('.slider').slick({
        speed: 1200,
        arrows:true,
        dots:true,
        autoplay:true,
        fade:true,
        autoplaySpeed:5500,
        infinite:true,
        centerPadding:'50px',
        prevArrow: '<button id="prev" type="button" class="btn prev-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btn next-arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
    });
});