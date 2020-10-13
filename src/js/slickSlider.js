$(document).ready(function(){
    $('.slider').slick({
        arrows:true,
        dots:true,
        fade:true,
        autoplaySpeed:3500,
        centerPadding:'50px',
        prevArrow: '<button id="prev" type="button" class="btn prev-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow: '<button id="next" type="button" class="btn next-arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
    });
});