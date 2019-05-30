$(function() {

  // Pinned menu
  $(window).scroll(function() { 

    var scroll = $(document).scrollTop();
  
    if (scroll > 240) {
      $('.navbar').addClass('navbar_hidden');
    } else {
      $('.navbar').removeClass('navbar_hidden');
    }
  
    if (scroll > 480) {
        $('.navbar').addClass('navbar_additional');
    } else {
      $('.navbar').removeClass('navbar_additional');
    }

  });

  // Toggle mobile menu
  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".mobile_menu").slideToggle();
    return false;
  });

  //Scroll to next section
  $(".nextblock").click(function() {
    $("html, body").animate({
      scrollTop : $(".advantages").offset().top
    }, 800);
  });

  //Scroll to #
  $(".navigation_menu a").click(function() {
    $("html, body").animate({
       scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
       duration: 500,
       easing: "swing"
    });
    return false;
 });

  	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
  };

  //Owl carousel #1
  $('.partners_carousel.owl-carousel').owlCarousel({
    loop: true,
    autoplaySpeed: 750,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dragEndSpeed: 200,
    stagePadding: 60,
    margin: 60,
    nav: true,
    dots: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    navContainer: '.partners .partners-nav',
    responsive:{
      0:{
        items: 1,
        stagePadding: 20,
        autoplay: false
      },
      1000:{
        autoplay: false,
        items: 2,
        autoplay: true
      },
      1400:{
        items: 3,
        autoplay: true
      }
    }
  });

  //Owl Carousel #2
  $('.teasers_carousel').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    dots: false,
    navSpeed: 750,
    dragEndSpeed: 100,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    navContainer: '.projects .projects-nav',

  });


  // Waypoint increasing numbers
  $(".statistics").waypoint(function() {

    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
    $(".statistics_item .title .number").each(function() {
      var tcount = $(this).data("count");
      $(this).animateNumber({ number: tcount,
        easing: 'easeInQuad',
        "font-size": "64px",
        numberStep: comma_separator_number_step},
        3500);
    });

  }, {
    offset: '90%'
  });

});