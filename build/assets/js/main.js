/**
 * isMobile
 * heroSection
 * scrollTexts
 * fixTexts
 * bgSlideshow
 * scrollTarget
 * mobileNav
 * counter
 * projectFilter
 * singleSlider
 * testimonials
 * clients
 * toggles
 * ajaxContactForm
 * backTop
 * spacer
 * googleMap
 * headerFixed
 * retinaLogo
 * parallax
 * animation
 * preLoader 
 * inViewport
 */

;(function($) {
    'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var heroSection = function() {
        $(window).on('load resize', function(){
            var
            hero = $('#hero-section'),
            heroContent = hero.find('.hero-content'),
            headerHeight = $('#site-header').height(),
            contentHeight = heroContent.height(),
            sliderHeight = hero.data('height');

            if ( sliderHeight == "0") {
                sliderHeight = $(window).height();
            } else if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                sliderHeight = 500;
            } else if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                sliderHeight = 600;
            }
                
            var contentMargin = (sliderHeight - contentHeight - headerHeight) / 2;

            hero.css({ height: sliderHeight + "px" });
            
            heroContent.css({ 
               "margin-bottom" : contentMargin + "px",
               "margin-top": contentMargin + "px"
            });
        })
    };

    var scrollTexts = function() {
       var
       current = 1,
       height = $('.text-scroll').height(),
       numberDivs = $('.text-scroll').children().length,
       first = $('.text-scroll h1:nth-child(1)');

       setInterval(function() {
          var number = current * -height;
          first.css('margin-top', number + 'px');
          if ( current === numberDivs ) {
            first.css('margin-top', '0px');
            current = 1;
          } else current++;
       }, 2500);
    };

    var fixTexts = function() {
        $("#hero-section h1").fitText(1.8, {
            minFontSize: '20px',
            maxFontSize: '52px'
        });
    };

    var bgSlideshow = function() {
        if ( $().vegas ) {
            $("#hero-section").each(function() {
                var
                $this = $(this),
                number = $this.data('number'),
                number = parseInt(number),
                effect = $this.data('effect'),
                i = 1,
                slides = [];

                while ( i <= number ) {
                    slides.push( {src:$this.data('image-'+i)} );
                    i++;
                }

                $this.vegas({
                    slides: slides,
                    overlay: true,
                    transition: effect
                });
            });
        }
    };

    var scrollTarget = function() {
        $('.scroll-target, .one-page #main-nav > ul > li > a').on('click',function() {
            var anchor = $(this).attr('href').split('#')[1];

            $(this).parent()
                .addClass('current-menu-item')
                .siblings()
                    .removeClass('current-menu-item');

            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var headerHeight = 0;

                    if ( $('body').hasClass('header-sticky') )
                        headerHeight = $('#site-header').height();

                    var target = $('#' + anchor).offset().top - headerHeight;

                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
               }
            }
            return false;
        })
    };

    var mobileNav = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( mode != menuType ) {
                menuType = mode;

                if ( mode == 'mobile' ) {
                    $('#main-nav').attr('id', 'main-nav-mobi')
                        .appendTo('#site-header')
                        .hide()
                            .find('li:has(ul)')
                            .children('ul')
                                .hide()
                                .before('<span class="arrow"></span>');
                } else {
                    $('#main-nav-mobi').attr('id', 'main-nav')
                        .removeAttr('style')
                        .appendTo('#site-header-inner')
                        .find('.sub-menu')
                            .removeAttr('style')
                            .prev().remove();
                    $('.mobile-button').removeClass('active');
                }
            }
        });

        $('.mobile-button').on('click', function() {
            $(this).toggleClass('active');
            $('#main-nav-mobi').slideToggle();
        })

        $(document).on('click', '#main-nav-mobi .arrow', function() {
            $(this).toggleClass('active').next().slideToggle();
        })
    };

    var counter = function() {
        if ( $().countTo ) {
            $('.bwp-counter').on('on-appear', function() {
                $(this).find('.numb').each(function() {
                    var to = parseInt( $(this).data('to'), 10 ),
                        speed = parseInt( $(this).data('speed'), 10 );
                        
                    $(this).countTo({
                        to: to,
                        speen: speed
                    });
                });
            }); //counter
        }
    };

    var projectFilter = function() {
        $('.bwp-project').each(function() {
            var
            $this = $(this),
            item = $this.data("item"),
            layout = $this.data("layout"),
            gapH = Number($this.data("gaph")),
            gapV = Number($this.data("gapv"));

            $(this).find('#projects').cubeportfolio({
                filters: '#project-filter',
                layoutMode: layout,
                defaultFilter: '*',
                animationType: 'quicksand',
                gapHorizontal: gapH,
                gapVertical: gapV,
                showPagination: true,
                gridAdjustment: 'responsive',
                rewindNav: false,
                mediaQueries: [{
                    width: 1500,
                    cols: item
                }, {
                    width: 1100,
                    cols: item
                }, {
                    width: 800,
                    cols: 3
                }, {
                    width: 550,
                    cols: 2
                }, {
                    width: 320,
                    cols: 1
                }],
                caption: ' ',
                displayType: 'bottomToTop',
                displayTypeSpeed: 100
            });
        });
    };

    var singleSlider = function() {
        if ( $().cubeportfolio ) {
            $('.single-slider').each(function () {
                var $this = $(this);
                var item = $this.data("item1500");
                var item2 = $this.data("item1100");
                var item3 = $this.data("item800");
                var item4 = $this.data("item550");
                var item5 = $this.data("item320");
                var layout = $this.data("layout");
                var arrows = $this.data("arrows");
                var bullets = $this.data("bullets");
                var gapH = Number($this.data("gaph"));
                var gapV = Number($this.data("gapv"));

                $this.find('.item-wrap').cubeportfolio({
                    layoutMode: layout,
                    gapHorizontal: gapH,
                    gapVertical: gapV,
                    showNavigation: arrows,
                    showPagination: bullets,
                    gridAdjustment: 'responsive',
                    rewindNav: false,
                    mediaQueries: [{
                        width: 1500,
                        cols: item
                    }, {
                        width: 1100,
                        cols: item2
                    }, {
                        width: 800,
                        cols: item3
                    }, {
                        width: 550,
                        cols: item4
                    }, {
                        width: 320,
                        cols: item5
                    }],
                    caption: ' ',
                    displayType: 'bottomToTop',
                    displayTypeSpeed: 100
                });
            });
        }
    };

    var testimonials = function() {
        if ( $().owlCarousel ) {
            $('.bwp-testimonials').each(function(){
                var $this = $(this);
                $this.find('.owl-carousel').owlCarousel({
                    navigation : false,
                    pagination: true,
                    responsive: true,
                    items: 1,
                    navigationText: false,
                    itemsDesktop: [3000,3],
                    itemsDesktopSmall: [1400,3],
                    itemsTablet:[970,2],
                    itemsTabletSmall: [600,1],
                    itemsMobile: [360,1],
                    touchDrag: true,
                    mouseDrag: true,
                    autoHeight: false,
                    autoPlay: true
                });
            });
        } // end if
    };

    var clients = function() {
        if ( $().owlCarousel ) {
            $('.bwp-clients').each(function(){
                var $this = $(this);
                $this.find('.owl-carousel').owlCarousel({
                    navigation : true,
                    pagination: false,
                    responsive: true,
                    items: 1,
                    navigationText: false,
                    itemsDesktop: [3000,5],
                    itemsDesktopSmall: [1400,4],
                    itemsTablet:[970,3],
                    itemsTabletSmall: [600,2],
                    itemsMobile: [360,1],
                    touchDrag: true,
                    mouseDrag: true,
                    autoHeight: false,
                    autoPlay: false
                });
            });
        } // end if
    };

    var toggles = function() {
        var args = {easing:'easeOutExpo', duration:300};

        $('.bwp-toggle.active').find('.toggle-content').show();
        $('.toggle-title').on('click', function () {
            if ( !$(this).parent().is('.active') ) {
                $(this).parent().toggleClass('active')
                    .children('.toggle-content').slideToggle(args)
                .parent().siblings('.active').removeClass('active')
                    .children('.toggle-content').slideToggle(args);
            } else {
                $(this).parent().toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });
    };

    var ajaxContactForm = function() {
        if ( $().validate ) {        
            $('.bwp-contact-form').each(function() {
                $(this).validate({
                    submitHandler: function( form ) {
                        var
                        $form = $(form),
                        str = $form.serialize();

                        $.ajax({
                            type: "POST",
                            url:  $form.attr('action'),
                            data: str,
                            beforeSend: function () {
                                $form.find('.bwp-alert').remove();
                            },
                            success: function( msg ) {
                                var result, cls;

                                if ( msg == 'Success' ) {
                                    result = 'Your message has been sent. Thank you!';
                                    cls = 'success';
                                } else {
                                    result = 'Error sending email.';
                                    cls = 'error';
                                }

                                $form.prepend(
                                    $('<div />', {
                                        'class': 'bwp-alert ' + cls,
                                        'text' : result
                                    }).append(
                                        $('<a class="remove" href="#"><i class="fa fa-close"></i></a>')
                                    )
                                );

                                $form.find(':input').not('.submit').val('');
                            }
                        });
                    }
                });
            });
        }
        $(document).on('click', '.bwp-alert .remove', function(e) {
            $(this).parent().slideUp();

            e.preventDefault();
        })
    };

    var backTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.back-to-top').addClass('show');
            } else {
                $('.back-to-top').removeClass('show');
            }
        }); 

        $('.back-to-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
        return false;
        });
    };

    var spacer = function() {
        $(window).on('load resize', function() {
            $('.bwp-spacer').each(function(){
                if ( matchMedia( 'only screen and (min-width: 992px)' ).matches ) {
                    $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                } else if ( matchMedia( 'only screen and (min-width: 768px)' ).matches ) {
                    $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } else {
                    $(this).attr('style', 'height:' + $(this).data('smobi') + 'px') 
                }
            })
        });
    };

    var googleMap = function() {
        if ( $().gmap3 ) {
            $("#google-map").gmap3({
                map:{
                    options:{
                        zoom: 16,
                        mapTypeId: 'bwp_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['bwp_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng:{
                    address:  "300 London Rd London SE1 6JZ United Kingdom",
                    callback: function(results) {
                        if ( !results ) return;
                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                        $(this).gmap3({
                            marker:{
                                latLng:results[0].geometry.location,
                                options:{
                                    icon: 'http://rollthemes.com/pointer.png'
                                }
                            }
                        });
                    }
                },
                styledmaptype:{
                    id: "bwp_style",
                    options:{
                        name: "bwp_style"
                    },
                    styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
                },
            });
        }
    };

    var headerFixed = function() {
        if ( $('body').hasClass('header-sticky') ) {
            var nav = $('#site-header');

            if ( nav.size() != 0 ) {
                var offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $('<div />', {
                        height: headerHeight
                    }).insertAfter(nav);

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop ) {
                        $('#site-header').addClass('is-sticky');
                        injectSpace.show();
                    } else {
                        $('#site-header').removeClass('is-sticky');
                        injectSpace.hide();
                    }
                })
            }
        }     
    }

    var retinaLogo = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
        var $logo = $('#site-logo img');
        var $logo_retina = $logo.data('retina');

        if ( retina && $logo_retina ) {
            $logo.attr({
                src: $logo.data('retina'),
                width: $logo.data('width'),
                height: $logo.data('height')
            });
        }
    };

    var parallax = function() {

        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        /*
         * Please note that background attachment fixed doesn't work on iOS
         */ 
        if (!iOS) {
            $('.parallax').css({backgroundAttachment:'fixed'});
        } else {
            $('.parallax').css({backgroundAttachment:'scroll'});
        }

        if ( $().parallax && matchMedia( 'only screen and (min-width: 867px)' ).matches ) {
            $('.parallax-bg1').parallax("50%", 0.5);
            $('.parallax-bg2').parallax("50%", 0.5);
        }
    };

    var animation = function() {
        $('.bwp-animation').each( function() {
            var
            t = $(this),
            animate = t.data('animation'),
            delay = t.data('animation-delay'),
            offset = t.data('animation-offset');

            t.css({
                '-webkit-animation-delay':  delay,
                '-moz-animation-delay':     delay,
                'animation-delay':          delay
            });

            t.waypoint(function() {
                t.addClass('animated').addClass(animate);
            },{
            triggerOnce: true,
            offset: offset
            });
        });
    };

    var preLoader = function() {
        if ( $().animsition ) {
            $(".animsition").animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    'animation-duration'
                    ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body',
                transition: function(url){ window.location.href = url; }
            });
        }
    };

    var inViewport = function() {
        $('[data-in-viewport="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '75%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };

    // Dom Ready
    $(function() {
        heroSection();
        bgSlideshow();
        fixTexts();
        headerFixed();
        scrollTexts();
        retinaLogo();
        scrollTarget();
        backTop();
        spacer();
        mobileNav();
        counter();
        projectFilter();
        singleSlider();
        testimonials();
        clients();
        toggles();
        ajaxContactForm();
        googleMap();
        animation();
        parallax();
        inViewport();
        preLoader();
    });

})(jQuery);