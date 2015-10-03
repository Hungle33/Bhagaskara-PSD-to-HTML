$(document).on("ready", function(){

	// Responsive Static Custom Slider for team section
	var csMarginSize;
	var csLastPos;
	var csCurrPos;
	var	prevResolutionWidth = $(window).innerWidth();
	
	if(prevResolutionWidth <= 767) {
		$(".cs-slider").css({'width':'300%'})
		csMarginSize = '50%';
		csLastPos = 4;
		csCurrPos = 0;
	} else {
		$(".cs-slider").css({'width':'200%'})
		csMarginSize = '33.33%';
		csLastPos = 3;
		csCurrPos = 0;
	}

	function csSliderRecalc(){
		var width = $(window).innerWidth();
		if(width <= 767 && prevResolutionWidth >= 768){
			$(".cs-slider").css({'width':'300%'})
			csMarginSize = '50%';
			csLastPos = 4;
			csCurrPos = 0;
			$(".cs-slider").animate({'margin-left':0}, 0);
			prevResolutionWidth = width;
		} else if (width >= 768 && prevResolutionWidth <= 767) {
			$(".cs-slider").css({'width':'200%'})
			csMarginSize = '33.33%';
			csLastPos = 3;
			csCurrPos = 0;
			$(".cs-slider").animate({'margin-left':0}, 0);
			prevResolutionWidth = width;
		}
	}

	var throttleUpdate = _.throttle(csSliderRecalc, 500);
	$(window).resize(throttleUpdate);

	$(".arrow").on("click", function(){
		if($(this).hasClass("next")) {
			if(csCurrPos < csLastPos) {
				$(".cs-slider").animate({'margin-left':'-=' + csMarginSize}, 200);
				csCurrPos++;
			}
		}

		if($(this).hasClass("prev")) {
			if(csCurrPos > 0) {
				$(".cs-slider").animate({'margin-left':'+=' + csMarginSize}, 200);
				csCurrPos--;
			}
		}
	});

	// Navbar fixed on scroll
	var navbarOffset = $('.navbar').offset().top;
	$(document).on('scroll', function(){
		if ($(window).scrollTop() > navbarOffset) {
			$('.navbar').addClass("navbar-fixed-top static");
		} else if ($('.navbar').hasClass("navbar-fixed-top")) {
			$('.navbar').removeClass("navbar-fixed-top static");
		}
	});

	// Placeholder Text for browsers without support
	$('input, textarea').placeholder();

	// Local Scrolling
	$.localScroll();

	// On viewport animations
	var animatedNodes = document.querySelectorAll(".os-animation");
	var animatedNodes = [].slice.call(animatedNodes);
	animatedNodes.forEach(function(ele){
		$(ele).css({'opacity':0});
	});

	function scrollInitSingle(animatedNodes){
		animatedNodes.forEach(function(ele){
			var $ele = $(ele);
			var delay = $ele.attr("data-os-delay");
			var trigger = $ele.attr("data-os-trigger") ? $($ele.attr("data-os-trigger")) : $ele;
			var animation = $ele.attr("data-os-animation") || "fadeIn";
			if(delay) {
				$ele.css({
					'-webkit-animation-delay':  delay,
					'-moz-animation-delay':     delay,
					'animation-delay':          delay
				});
			}
			trigger.waypoint(function() {
				$ele.addClass("animated").addClass(animation);
			},{
				triggerOnce: true,
				offset: '70%' // Appear once 90% from the top
			});
		});
	}
	scrollInitSingle(animatedNodes);
});


