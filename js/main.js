(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",	
		scrollDuration : 800,
		mailChimpURL   : ''
	},	

	$WIN = $(window);
	

	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	var ssPreloader = function() {

		$WIN.on('load', function() {	
			$('html, body').animate({ scrollTop: 0 }, 'normal');

	    	$("#loader").fadeOut("slow", function(){

	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	}; 


	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 


	var ssMasonryFolio = function() {

		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {
			containerBricks.masonry( {	
			  	itemSelector: '.brick',
			  	resize: true
			});
		});
	};


	var ssLightGallery = function() {

		$('#folio-wrap').lightGallery({  
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"		
		});
	};


  	var ssFlexSlider = function() {

  		$WIN.on('load', function() {

		   $('#testimonial-slider').flexslider({
		   	namespace: "flex-",
		      controlsContainer: "",
		      animation: 'slide',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: true,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		   });

	   });

  	};


	var ssOwlCarousel = function() {

		$(".owl-carousel").owlCarousel({		
	      nav: false,
			loop: true,
	    	margin: 50,
	    	responsiveClass:true,
	    	responsive: {
	         0:{
	            items:2,
	            margin: 20
	         },
	         400:{
	            items:3,
	            margin: 30
	         },
	         600:{
	            items:4,
	            margin: 40
	         },
	         1000:{
	            items:6            
	         }
	    	}
		});

	};
  	


	var ssMenuOnScrolldown = function() {

		var menuTrigger = $('#header-menu-trigger');

		$WIN.on('scroll', function() {

			if ($WIN.scrollTop() > 150) {				
				menuTrigger.addClass('opaque');
			}
			else {				
				menuTrigger.removeClass('opaque');
			}

		}); 
	};

	
   var ssOffCanvas = function() {

	       var menuTrigger = $('#header-menu-trigger'),
	       nav             = $('#menu-nav-wrap'),
	       closeButton     = nav.find('.close-button'),
	       siteBody        = $('body'),
	       mainContents    = $('section, footer');

		menuTrigger.on('click', function(e){
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		closeButton.on('click', function(e){
			e.preventDefault();
			menuTrigger.trigger('click');	
		});

		siteBody.on('click', function(e){		
			if( !$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span') ) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

   };


	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};



	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};


  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	
	var ssAnimations = function() {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function(direction) {

					var defAnimationEfx = cfg.defAnimation;

					if ( direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function() {
							$('body .animate-this.item-animate').each(function(ctr) {
								var el       = $(this),
								animationEfx = el.data('animate') || null;	

	                  	if (!animationEfx) {
			                 	animationEfx = defAnimationEfx;	                 	
			               }

			              	setTimeout( function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 30);

							});								
						}, 100);
					}

					// trigger once only
	       		this.destroy(); 
				}, 
				offset: '95%'
			}); 
		}

	};
	

	var ssIntroAnimation = function() {

		$WIN.on('load', function() {
		
	     	if (!$("html").hasClass('no-cssanimations')) {
	     		setTimeout(function(){
	    			$('.animate-intro').each(function(ctr) {
						var el = $(this),
	                   animationEfx = el.data('animate') || null;		                                      

	               if (!animationEfx) {
	                 	animationEfx = cfg.defAnimation;	                 	
	               }

	              	setTimeout( function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});						
				}, 100);
	     	} 
		}); 

	};


   var ssContactForm = function() {   	
 	
		$('#contactForm').validate({

			submitHandler: function(form) {				
				var sLoader = $('#submit-loader');			

				$.ajax({   	
			      type: "POST",
			      url: "inc/sendEmail.php",
			      data: $(form).serialize(),

			      beforeSend: function() { 
			      	sLoader.fadeIn(); 
			      },
			      success: function(msg) {
		            // Message was sent
		            if (msg == 'OK') {
		            	sLoader.fadeOut(); 
		               $('#message-warning').hide();
		               $('#contactForm').fadeOut();
		               $('#message-success').fadeIn();   
		            }
		            // There was an error
		            else {
		            	sLoader.fadeOut(); 
		               $('#message-warning').html(msg);
			            $('#message-warning').fadeIn();
		            }
			      },
			      error: function() {
			      	sLoader.fadeOut(); 
			      	$('#message-warning').html("Something went wrong. Please try again.");
			         $('#message-warning').fadeIn();
			      }
		      });    		
	  		}

		});
   };	


	var ssAjaxChimp = function() {

		$('#mc-form').ajaxChimp({
			language: 'es',
		   url: cfg.mailChimpURL
		});


		$.ajaxChimp.translations.es = {
		  'submit': 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
		} 

	};

 
	var ssBackToTop = function() {

		var pxShow  = 500,       
		fadeInTime  = 400,     
		fadeOutTime = 400,     
		scrollSpeed = 300,
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


  

	(function ssInit() {

		ssPreloader();
		ssFitVids();
		ssMasonryFolio();
		ssLightGallery();
		ssFlexSlider();
		ssOwlCarousel();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAnimations();
		ssIntroAnimation();		
		ssContactForm();
		ssAjaxChimp();
		ssBackToTop();

	})();
 

})(jQuery);