

// lazyload for images
function img_loader() {
    setTimeout(function () {
        $('body').find('img[data-src]').each(function () {
            var src = $(this).attr('data-src');
            var srcset = $(this).attr('data-srcset');
            var classes = $(this).attr('class');
            var alt = $(this).attr('alt');
            var title = $(this).attr('title');
            if (src) {
                var img = new Image();
                $(img).hide();
                $(img).on('load', function () {
                    $(this).fadeIn(400);
                    setTimeout(function () {
                        $(img).addClass('transition');
                    }, 400);
                });
                $(img).attr('srcset', srcset);
                $(img).attr('src', src);
                $(img).attr('alt', alt);
                $(img).attr('title', title);
                $(img).addClass(classes);
                $(this).replaceWith(img);
            }
        });
    }, 150);
}


// calc block position in viewport
$.fn.percentOfViewport = function () {
    var viewportHeight = $(window).height();

    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).height();


    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + viewportHeight;
    var viewportCenter = viewportTop + (viewportHeight / 2);

    var top_to_top_percent = (elementTop - viewportTop) / viewportHeight * 100;
    var bottom_to_top_percent = (elementBottom - viewportTop) / viewportHeight * 100;

    var top_to_bottom_percent = (viewportBottom - elementTop) / viewportHeight * 100;
    var bottom_to_bottom_percent = (viewportBottom - elementBottom) / viewportHeight * 100;

    return {
        ELtop_to_VPtop: top_to_top_percent,
        ELbottom_to_VPtop: bottom_to_top_percent,
        ELtop_to_VPbottom: top_to_bottom_percent,
        ELbottom_to_VPbottom: bottom_to_bottom_percent,
        viewportHeight: viewportHeight
    };
};


// check is block is in viewport
$.fn.isInViewport = function () {
    var p = $(this).percentOfViewport();

    return p.ELtop_to_VPtop < 100 &&
        p.ELbottom_to_VPtop > 0;
};


$(document).ready(function () {
    $('.js-select').select2();

    $('.js-select2').select2({
        dropdownParent: $('[data-remodal-id="popup_model"]')
    });

    var e = 0;
    $(window).scroll((function () {
        var t = window.pageYOffset || document.documentElement.scrollTop;
        t > e && $(this).scrollTop() > $(".header, .header-mob").height() ? $(".header, .header-mob").addClass("hiden") : $(".header, .header-mob").removeClass("hiden"), e = t <= 0 ? 0 : t
    }))

    $('.js-all input').click(function () {
        if ($(this).is(':checked')) {
            $('.accor .accor__check input:checkbox').prop('checked', true);
            $('.js-all-dl input').prop('checked', false);
        }
    });

    $('.js-all-dl input').click(function () {
        if ($(this).is(':checked')) {
            $('.accor .accor__check input:checkbox').prop('checked', false);
            $('.js-all input').prop('checked', false);
        }
    });


    $('.map__filter-select-param-check input').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().next().find('.map__filter-select-param-check  input:checkbox').prop('checked', true);
        } else {
            $(this).parent().parent().next().find('.map__filter-select-param-check  input:checkbox').prop('checked', false);
        }
    });

    $('.accor__title_tp .accor__check input').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().next().find('.accor__check  input:checkbox').prop('checked', true);
        } else {
            $(this).parent().parent().next().find('.accor__check  input:checkbox').prop('checked', false);
        }
    });

    $('.accor__title_tw .accor__check input').click(function () {
        if ($(this).is(':checked')) {
            $(this).parent().parent().next().find('.accor__check  input:checkbox').prop('checked', true);
        } else {
            $(this).parent().parent().next().find('.accor__check  input:checkbox').prop('checked', false);
        }
    });



    /*$('.accor--nested .accor__check_l input').click(function(){
        if ($(this).is(':checked')){
            $(this).parent().parent().parent().prev().find('.accor__check  input:checkbox').prop('checked', true);
        } else {
            $(this).parent().parent().parent().prev().find('.accor__check  input:checkbox').prop('checked', false);
        }
    });*/


    $(".all").on("change", function () {
        var groupId = $(this).data('id');
        $('.one[data-id="' + groupId + '"]').prop("checked", this.checked);
    });

    $(".one").on("change", function () {
        var groupId = $(this).data('id');
        var allChecked = $('.one[data-id="' + groupId + '"]:not(:checked)').length == 0;
        $('.all[data-id="' + groupId + '"]').prop("checked", allChecked);
    });


    $('.js-rz').on('click', function () {
        $('.data__acc').find('.accor').addClass('accor--open');
    });
    $('.js-sv').on('click', function () {
        $('.data__acc').find('.accor').removeClass('accor--open');
    });

    $('.accor__title').on('click', function () {
        $(this).parent().toggleClass('accor--open');
    });

    $('.js-search-tt').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.header__toggle').on('click', function () {
        $('.header').addClass('open');
        $('body').addClass('overfl');
    });
    $('.header__close').on('click', function () {
        $('.header').removeClass('open');
        $('body').removeClass('overfl');
    });

    $('.header__menu ul li .ar').on('click', function () {
        $(this).parent().addClass('on');
        $('.header').addClass('gr');
    });
    $('.header__arr').on('click', function () {
        $('.header__menu ul li').removeClass('on');
        $('.header').removeClass('gr');
    });

    $('.footer-menu__title').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.product__menu-title').on('click', function () {
        $(this).next().slideToggle().parent().toggleClass('open');
    });

    $(".map__filter-select-title").on("click", function (e) {

        e.preventDefault();
        var $this = $(this);

        if (!$this.hasClass("open")) {
            $(".map__filter-select-title").removeClass("open");
        }

        $this.toggleClass("open");
    });



    $(document).on('click', function (e) {
        if (!$(e.target).closest(".map__filter-select-item").length) {
            $(this).removeClass('open');
            $('.map__filter-select-title').removeClass('open');
        }
        e.stopPropagation();
    });


    $('.map__list-title').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.map__filter-select-drop-in, .map__list-in').mCustomScrollbar();


    $(".accordion__title").click(function () {
        const $accordion_wrapper = $(this).parent();
        const $accordion_content = $(this).parent().find(".accordion__content").first();
        const $accordion_open = "accordion--open";

        if ($accordion_wrapper.hasClass($accordion_open)) {
            $accordion_content.slideUp();
            $accordion_wrapper.removeClass($accordion_open);
        }
        else {
            $accordion_content.slideDown();
            $accordion_wrapper.addClass($accordion_open);
        }
    });


    $('ul.tabs li').click(function () {
        var $this = $(this);
        var $theTab = $(this).attr('id');
        console.log($theTab);
        if ($this.hasClass('active')) {
            // do nothing
        } else {
            $this.closest('.tabs_wrapper').find('ul.tabs li, .tabs_container .tab_content').removeClass('active');
            $('.tabs_container .tab_content[data-tab="' + $theTab + '"], ul.tabs li[id="' + $theTab + '"]').addClass('active');
        }

    });


    var swiper = new Swiper(".js-banner-slider", {
        effect: "fade",
        pagination: {
            el: ".js-banner-slider-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".js-banner-slider-next",
            prevEl: ".js-banner-slider-prev",
        },
    });

    var swiper2 = new Swiper(".js-ctlg-slider", {
        spaceBetween: 0,
        slidesPerView: 2,
        pagination: {
            el: ".js-ctlg-slider-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".js-ctlg-slider-next",
            prevEl: ".js-ctlg-slider-prev",
        },
        breakpoints: {
            991: {
                slidesPerView: 3,
                spaceBetween: 40,
                slidesPerGroup: 3,
            }
        }
    });


    var swiper3 = new Swiper(".js-news-slider", {
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
            el: ".js-news-slider-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".js-news-slider-next",
            prevEl: ".js-news-slider-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 80,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    var swiper4 = new Swiper(".js-ctlg-slider2", {
        spaceBetween: 20,
        slidesPerView: 2,
        pagination: {
            el: ".js-ctlg-slider-pagination2",
            type: "fraction",
        },
        navigation: {
            nextEl: ".js-ctlg-slider-next2",
            prevEl: ".js-ctlg-slider-prev2",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    var swiper5 = new Swiper(".js-card-product__slider-nav", {
        spaceBetween: 15,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    });
    var swiper6 = new Swiper(".js-card-product__slider-for", {
        spaceBetween: 8,
        slidesPerView: 1,
        thumbs: {
            swiper: swiper5,
        },
        navigation: {
            nextEl: '.js-card-product-slider-next',
            prevEl: '.js-card-product-slider-prev',
        },
    });


    var swiper7 = new Swiper(".js-about-history-slider-nav", {
        spaceBetween: 0,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            991: {
                slidesPerView: 'auto',
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 16,
                spaceBetween: 0,
            },
            580: {
                slidesPerView: 13,
                spaceBetween: 0,
            },
            450: {
                slidesPerView: 10,
                spaceBetween: 0,
            },
            380: {
                slidesPerView: 8,
                spaceBetween: 0,
            }
        }
    });
    var swiper8 = new Swiper(".js-about-history-slider-for", {
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: {
            swiper: swiper7,
        },
        pagination: {
            el: ".js-about-history-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".js-about-history-next",
            prevEl: ".js-about-history-prev",
        },
    });






    // opening popups
    $('body').on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal, .open-dialog a, .open-popup a, .open-form a, .open-modal a', function () {
        var category = $(this).attr('href');
        var categoryForm = $('.dialogs ' + category);
        $('.dialogs .popup').removeClass('active').hide();
        categoryForm.show();
        $('.dialogs').show();
        $('.dialogs').animate({ 'opacity': 1 }, 200, function () {
            categoryForm.addClass('active');
        });
        $('body').css({ 'overflow-y': 'hidden' });
        return false;
    });

    // closing popups
    $('.dialogs').on('click touch', '.close, .close-bg', function () {
        $('.dialogs .popup').removeClass('active');
        $('.dialogs').animate({ 'opacity': 0 }, 200, function () {
            $('.dialogs').hide();
            $('.dialogs .popup').hide();
            $('.dialogs .thanks-popup').hide();
        });
        $('body').css({ 'overflow-y': 'auto' });
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 27) $('.dialogs .popup.active .close').click(); // esc
    });

    // all sliders
    // const swiper = new Swiper('.swiper', {
    //     slidesPerView: 'auto',
    //     speed: 400,
    //     spaceBetween: 20,
    //     navigation: {
    //         nextEl: '.slider-next',
    //         prevEl: '.slider-prev',
    //     },
    //     pagination: {
    //         el: '.slider-pagination',
    //         type: 'bullets',
    //     },
    // });
});


$(window).on('load scroll', function () {
    var scrollTop = $(window).scrollTop();


    // start animations when it is in viewport but pause when out of it
    // .out-of-viewport doing nothing if animation item can be runned only once
    $('.js-wait-animation').each(function () {
        if ($(this).isInViewport()) {
            $(this).addClass('animate')
                .removeClass('out-of-viewport');
        } else {
            $(this).addClass('out-of-viewport');
        }
    });
});





$(window).on('load', function () {

    img_loader();

});


