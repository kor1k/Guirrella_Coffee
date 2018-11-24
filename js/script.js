;(function($){
	'use strict';
	$.fn.dh_mediaelementplayer = function(options){
		var defaults = {};
		var options = $.extend(defaults, options);
		
		return this.each(function() {
			var el				= $(this);
			el.attr('width','100%').attr('height','100%'); 
			$(el).closest('.video-embed-wrap').each(function(){
				var aspectRatio = $(this).height() / $(this).width();
				$(this).attr('data-aspectRatio',aspectRatio).css({'height': $(this).width() *  aspectRatio + 'px', 'width': '100%'});
			});
			el.mediaelementplayer({
				// none: forces fallback view
				mode: 'auto',
				// if the <video width> is not specified, this is the default
				defaultVideoWidth: '100%',
				// if the <video height> is not specified, this is the default
				defaultVideoHeight: '100%',
				// if set, overrides <video width>
				videoWidth: '100%',
				// if set, overrides <video height>
				videoHeight: '100%',
				// width of audio player
				audioWidth: "100%",
				// height of audio player
				audioHeight: 30,
				// initial volume when the player starts
				startVolume: 0.8,
				// useful for <audio> player loops
				loop: false,
				// enables Flash and Silverlight to resize to content size
				enableAutosize: true,
				// the order of controls you want on the control bar (and other plugins below)
				features: ['playpause','progress','duration','volume','fullscreen'],
				// Hide controls when playing and mouse is not over the video
				alwaysShowControls: false,
				// force iPad's native controls
				iPadUseNativeControls: false,
				// force iPhone's native controls
				iPhoneUseNativeControls: false,
				// force Android's native controls
				AndroidUseNativeControls: false,
				// forces the hour marker (##:00:00)
				alwaysShowHours: false,
				// show framecount in timecode (##:00:00:00)
				showTimecodeFrameCount: false,
				// used when showTimecodeFrameCount is set to true
				framesPerSecond: 25,
				// turns keyboard support on and off for this instance
				enableKeyboard: true,
				// when this player starts, it will pause other players
				pauseOtherPlayers: true,
				// array of keyboard commands
				keyActions: [],
				/*mode: 'shim'*/
			});
			window.setTimeout(function(){
				$(el).closest('.video-embed-wrap').css({'height': '100%', 'width': '100%'});
			},1000);
			$(el).closest('.mejs-container').css({'height': '100%', 'width': '100%'});
		});
		
	};
	var DH = {
		init: function(){
			var self = this;
			var stickySize = 70;
			
			if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
				$(document.documentElement).addClass('dh-ie');
			}else{
				$(document.documentElement).addClass('dh-no-ie');
			}
			$(document.documentElement).addClass(self.enableAnimation() ? 'dh-enable-animation':'dh-disable-animation');
			
			//Navbar collapse
			$('.primary-navbar-collapse').on('hide.bs.collapse', function () {
				  $(this).closest('.header-container').find('.navbar-toggle').removeClass('x');
			});
			$('.primary-navbar-collapse').on('show.bs.collapse', function () {
				$(this).closest('.header-container').find('.navbar-toggle').addClass('x');
				 
			});
			
			 
			//Footer Social Tooltip
			$('.share-links a').tooltip({html: true,container:$('.share-links')});
			
			//Timeline shorcode hover
			$(document).on("mouseenter", ".timeline-align-left .hentry-wrap,.timeline-align-right .hentry-wrap", function() {
				$(this).parent().addClass('timeline-hover');
			});
			$(document).on("mouseleave",".timeline-align-left .hentry-wrap,.timeline-align-right .hentry-wrap", function() {
				$(this).parent().removeClass('timeline-hover');
			});
			//Row Parallax Background
			if(this.enableAnimation()){
				if ( $( '[data-stellar="1"]' ).length ) {
					$(window).stellar({
			            positionProperty: 'transform',
			            parallaxBackgrounds: false,
			            responsive: true,
			            horizontalScrolling: false
			        });
				}
				var $this = $(this);
				var speed = $this.data('parallax-speed');
				//el-appear
				var elAppear = function(){
					if(self.getViewport().width > 992){
						$('.el-appear').each(function(){
							$(this).appear(function(){
								$(this).addClass('animate-appear');
							});
						});
					}
				}
				elAppear();
				$(window).resize(function(){
					elAppear();
				});
				//svg-appear
				var svgAppear = function(){
					if(self.getViewport().width > 992){
						$('.svg-appear').each(function(){
							$(this).appear(function(){
								$(this).addClass('svg-animate-appear');
							});
						});
					}
				}
				svgAppear();
				$(window).resize(function(){
					svgAppear();
				});
			}
			
			//Go to top
			$(window).scroll(function () {
				if ($(this).scrollTop() > 500) {
					$('.go-to-top').addClass('on');
				}
				else {
					$('.go-to-top').removeClass('on');
				}
			});
			$('body').on( 'click', '.go-to-top', function () {
				$("html, body").animate({
					scrollTop: 0
				}, 800);
				return false;
			});
			
			
			//Fixed Main Nav
			if(this.enableAnimation()){
				var $window = $( window );
				var $body   = $( 'body' ) ;
				
				var navTop = $('.header-container').hasClass('header-fixed') ? ( $('.topbar').length ? $('.topbar').height() : 0 ) :  $( '.navbar' ).offset().top;
				
				var navScrollListener = function($this,isResize){
					
					var $navbar = $( '.navbar' );
					if($('.header-container').hasClass('header-absolute') && self.getViewport().width > 992){
						$('.header-container').css({'top': 0 + 'px'});
					}else{
						$('.header-container').css({'top': ''});
					}
					
					if(($('.header-container').hasClass('header-fixed') || $navbar.hasClass('navbar-scroll-fixed')) && self.getViewport().width > 992){
						
						var scrollTop = parseInt($this.scrollTop(), 10),
							navHeight = 0,
							topbarOffset = 0;
						
						if($('.header-container').hasClass('header-fixed')){
							$('.header-container').css({'top': 0 + 'px'});
							if($('.topbar').length ){
								
								if(scrollTop > 0){
									if(scrollTop < $('.topbar').height()){
										topbarOffset = - scrollTop;
										$('.header-container').css({'top': topbarOffset + 'px'});
									}else{
										$('.header-container').css({'top': - $('.topbar').height() + 'px'});
									}
								}else{
									$('.header-container').css({'top': 0 + 'px'});
								}
							}
						}
						var navTopScroll = navTop;
						if($('.header-container').hasClass('header-fixed') || $('.header-container').hasClass('header-absolute'))
							navTopScroll += 0;
						
						if(($this.scrollTop() + 0 ) > navTopScroll){
							
							if(!$('.navbar-default').hasClass('navbar-fixed-top')){
								$('.navbar-default').addClass('navbar-fixed-top');
								//
								$('.header-container').addClass('header-navbar-fixed');
								$navbar.css({'top': 0 + 'px'});
							}
							if($('.header-container').hasClass('header-navbar-classic')){
								if($('.header-container').hasClass('header-navbar-below')){
									navHeight = stickySize;
								}else{
									navHeight = Math.max(Math.round(99 - ($this.scrollTop() + 0) + navTop),stickySize);
								}
								$('.navbar-container').css({'height': navHeight + 'px'});
								$navbar.css({'min-height': navHeight+'px'});
								$navbar.find('.primary-nav > li > a').css({'line-height': navHeight+'px'});
								$navbar.find('.navbar-brand img.logo-fixed').css({'max-height': navHeight+'px'});
							}
							if($('.header-container').hasClass('header-type-default')){
								if(!$('.header-container').hasClass('header-transparent')){
									$('.heading-container').addClass('has-top-margin');	
								}
								setTimeout(function() {
									$('.navbar-default').addClass('animate-children');
						        }, 50);
							}
						}else{
							if($('.navbar-default').hasClass('navbar-fixed-top')){
								$('.navbar-default').removeClass('navbar-fixed-top');
								$('.header-container').removeClass('header-navbar-fixed');
							}
							$navbar.css({'top': ''});
							if($('.header-container').hasClass('header-type-default')){
								$('.heading-container').removeClass('has-top-margin');	
								setTimeout(function() {
									$('.navbar-default').removeClass('animate-children');
						        }, 50);
							}
							if($('.header-container').hasClass('header-navbar-classic')){
								$('.navbar-container').css({'height':''});
								$navbar.css({'min-height': ''});
								$navbar.find('.primary-nav > li > a').css({'line-height': ''});
								$navbar.find('.navbar-brand img.logo-fixed').css({'max-height': ''});
							}
						}
					}else{
						if($('.navbar-default').hasClass('navbar-fixed-top')){
							$('.navbar-default').removeClass('navbar-fixed-top');
							$('.header-container').removeClass('header-navbar-fixed');
						}
						$navbar.css({'top': ''});
						if($('.header-container').hasClass('header-type-default')){
							$('.heading-container').removeClass('has-top-margin');	
							setTimeout(function() {
								$('.navbar-default').removeClass('animate-children');
					        }, 50);
						}
						if($('.header-container').hasClass('header-navbar-classic')){
							$('.navbar-container').css({'height':''});
							$navbar.css({'min-height': ''});
							$navbar.find('.primary-nav > li > a').css({'line-height': ''});
							$navbar.find('.navbar-brand img.logo-fixed').css({'max-height': ''});
						}
					}
				}
				
				navScrollListener( $window );
				$window.resize(function(){
					navScrollListener( $(this),true );
				});
				$window.scroll( function () {
					var $this = $(this);
					navScrollListener($this,false);
				});
			}
			//Scrollspy
			$('body').scrollspy({
			 	target: '.primary-navbar-collapse',
			 	offset: 170
			});
			$('body').on('activate.bs.scrollspy', function () {
				var scrollspy = $(this).data('bs.scrollspy');
				if(scrollspy){
					$(scrollspy.selector)
					  .parents('.current-menu-item')
					  .removeClass('current-menu-item');
					var selector = scrollspy.selector +
				        '[data-target="' + scrollspy.activeTarget + '"],' +
				        scrollspy.selector + '[href="' + scrollspy.activeTarget + '"]'
				        
					var active = $(selector)
					  .parents('li')
					  .addClass('current-menu-item');
					
					if (active.parent('.dropdown-menu').length) {
					  active = active
						.closest('li.dh-megamenu-menu')
						.addClass('current-menu-item');
					}
				}
			});
			$(window).on('resize',function(){
				$('[data-spy="scroll"]').each(function () {
					var $spy = $(this).scrollspy('refresh');
				});
			});
			$('.primary-nav a:not([href=#], .megamenu-sidebar a, .navbar-search-button, .search-form-wrap a, .minicart a, .minicart-link), .top-menu .topbar-nav a:not([href=#])').on("click", function(){
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
					if(this.hash) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length && this.hash.slice(1) != '' ) {
							$( '.primary-nav li' ).removeClass( 'current-menu-item' );
							$('html, body').animate({
								 scrollTop: (target.offset().top - 150)
							}, 850, 'easeInOutExpo');
							return false;
						}
					}
				}
			});
			//if(this.enableAnimation()){
				if($('.header-type-toggle').length){
					var navbarToggleFixed = function(){
						$('.navbar-nav > li > a').each(function(i){
							$(this).css('-webkit-transition-delay', (i * 0.1 ) + 's' )
								.css('-moz-transition-delay', (i * 0.1 )  + 's')
							    .css('-ms-transition-delay', (i * 0.1 )  + 's')
							    .css('-o-transition-delay', (i * 0.1 )  + 's')
							    .css('transition-delay', (i * 0.1 ) + 's');
						});
						$('.navbar-toggle-fixed-btn').on('click',function(e){
							e.stopPropagation();
							e.preventDefault();
							if($('#header').hasClass('in-active')){
								$('#header').removeClass('in-active').addClass('active');
							}else{
								$('#header').removeClass('active').addClass('in-active');
							}
							
						});
					}
					navbarToggleFixed();
				}
				//header off canvas
				if($('.header-type-toggle-offcanvas').length){
					$('.navbar-toggle-fixed-btn,.navbar-toggle').on('click',function(e){
						e.stopPropagation();
						e.preventDefault();
						if($('body').hasClass('open-offcanvas')){
							$('body').removeClass('open-offcanvas').addClass('close-offcanvas');
						}else{
							$('body').removeClass('close-offcanvas').addClass('open-offcanvas');
						}
						
					});
					$(document).on('click','.offcanvas-close-btn',function(){
						$('body').removeClass('open-offcanvas').addClass('close-offcanvas');
					});
					$('body').on('mousedown', $.proxy( function(e){
						var element = $(e.target);
						if($('.offcanvas').length && $('body').hasClass('open-offcanvas')){
							if(!element.is('.offcanvas') && element.parents('.offcanvas').length === 0 )
							{
								$('body').removeClass('open-offcanvas');
							}
						}
					}, this) );
					
					$('.offcanvas-nav .dropdown-hover .caret,.offcanvas-nav .dropdown-submenu > a > .caret,.offcanvas-nav .megamenu-title .caret').off('click').on('click',function(e){
						e.stopPropagation();
						e.preventDefault();
						var dropdown = $(this).closest(".dropdown, .dropdown-submenu");
						if (dropdown.hasClass("open")) {
							dropdown.removeClass("open");
						} else {
							dropdown.addClass("open");
						}
					});
				}
				//end header off canvas
			//Media element player
			this.mediaelementplayerInit();
			//DH Slider
			this.dhSliderInit();
			
			//Animate Box
			this.animateBoxInit();
			$(window).resize(function(){
				self.animateBoxInit();
			});
			
			//Nav Dropdown
			this.navDropdown();
			$(window).resize(function(){
				self.navDropdown();
			})
			//Heading Parallax
			this.headingInit();
			
			//PopUp
			this.magnificpopupInit();
			
			//Carousel
			this.carouselInit();
			
			//Responsive embed iframe
			this.responsiveEmbedIframe();
			$(window).resize(function(){
				self.responsiveEmbedIframe();
			});
			//Woocommerce
			this.commerceInit();
				
			//isotope
			this.isotopeInit();
			$(window).resize(function(){
				self.isotopeInit();
			});
			
			//portfolio 
			this.portfolioInit();
			
			//Ajax Search
			this.ajaxSearchInit();
			
			//Shortcodes
			this.shortcode.init(self);
			
			//Typed
			if($.fn.typed){
				$(".heading-typed .nth-typed").each(function(){
					var _this = $(this),
						string = _this.closest('.heading-typed').data('typed-string');
					_this.appear(function(){
						_this.typed({
							strings: [string],
							typeSpeed: 111
						});
					});
				});
			}
			
		},
		shortcode:{
			init: function(dh){
				var self = this;
				this.DH = dh;
				this.listsInit();
				this.progressInit();
				this.accordionInit();
				this.tabInit();
				this.btnInit();
				this.counterInit();
				this.gmapInit();
				this.iconboxInit();
				this.modalInit();
				this.piechartInit();
				this.countDownInit();
				// Tooltip
				$('[data-toggle="popover"]').popover();
				$('[data-toggle="tooltip"]').tooltip();
				//testimonial
				$('.testimonial').each(function(){
					var _this = $(this);
					_this.find('.caroufredsel-item .caroufredsel-prev').on('click',function(e){
						e.stopPropagation();
						e.preventDefault();
						_this.find('.caroufredsel').find('ul').trigger('prev');
					});
					_this.find('.caroufredsel-item .caroufredsel-next').on('click',function(e){
						e.stopPropagation();
						e.preventDefault();
						_this.find('.caroufredsel').find('ul').trigger('next');
					});
				});
			},
			countDownInit: function(){
				$('[data-toggle="countdown"]').each(function(){
					var _this = $(this);
					_this.find('.countdown-content').countdown(_this.data('end'), function(event) {
						$(this).html(event.strftime(_this.data('html')));
					});
				});
			},
			listsInit: function(){
				if(!this.DH.enableAnimation()){
					return;
				}
				if(this.DH.getViewport().width > 992){
					$('.dh-lists').each(function(){
						if($(this).data('animation')) {
							$(this).appear(function() {
								$(this).find('li').each(function(i){
									$(this).delay(i*250).animate({
										'opacity': '1',
										'left' : '0'
									},250,'easeOutCubic');
								});
							});
						}
					});
				}else{
					$('.dh-lists').each(function(){
						$(this).find('li').css({'opacity':'1','left':0});
					});
				}
			},
			progressInit: function(){
				var self = this;
				$('.progress-bars .progress').each(function(){
					var $this = $(this),
						progress = $this.find('.progress-bar');
					
					if(!self.DH.enableAnimation()){
						var valuenow = parseInt(progress.data('valuenow'), 10);
						progress.closest('.progress').addClass('run').find('.progress-label').css({'left':valuenow+'%'});
						progress.css({'width':valuenow+'%'});
						progress.closest('.progress').find('.progress-label > span').html(valuenow);
					}else{
						progress.appear(function(){
							var valuenow = parseInt($(this).data('valuenow'), 10);
							$(this).closest('.progress').addClass('run').find('.progress-label').css({'left':0+'%'}).animate({
								'left' : valuenow + '%'
							},1600);
							$(this).css({'width':0+'%'}).animate({
								'width' : valuenow + '%'
							},1600);
							
							$(this).closest('.progress').find('.progress-label > span').countTo({
								from: 0,
								to: valuenow,
								speed: 1100,
								refreshInterval: 30
							});	
						});
					}
						
				});
			},
			tabInit: function(){
				var self = this;
				$('[data-toggle="tab"], [data-toggle="pill"]').each(function(e){
					var $this = $(this);
					$this.on('shown.bs.tab', function (e) {
						var selector = $(this).attr('href') && $(this).attr('href').replace(/.*(?=#[^\s]*$)/, '');
						self.DH.isotopeInit();
						$(selector).find('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');
						$('[data-spy="scroll"]').each(function () {
							var $spy = $(this).scrollspy('refresh');
						});
					})
				});
			},
			accordionInit: function(){
				var self = this;
				$('.accordion').each(function(){
					var $this = $(this),
						active_tab = $this.data('active-tab');
						
					$this.find('.panel-collapse.in').prev('.panel-heading').addClass('active');
					$this.find('.panel-group').on('show.bs.collapse', function (e) {
						$(e.target).prev('.panel-heading').addClass('active');
						self.DH.isotopeInit();
						$('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');;
						$('[data-spy="scroll"]').each(function () {
							var $spy = $(this).scrollspy('refresh');
						});
					}); 
					$this.find('.panel-group').on('hide.bs.collapse', function (e) {
						$(e.target).prev('.panel-heading').removeClass('active');
						self.DH.isotopeInit();
						$('.caroufredsel').find('ul').trigger('updateSizes').trigger('resize');;
						$('[data-spy="scroll"]').each(function () {
							var $spy = $(this).scrollspy('refresh');
						});
					}); 
				});
			},
			btnInit: function(){
				$('.btn.btn-custom-color').each(function(){
					var $this = $(this);
					//hover background color
					if(typeof $this.data('hover-background-color') !== 'undefined' && $this.data('hover-background-color') !== false && $this.data('hover-background-color') != '') {
		                var hover_background_color = $this.data('hover-background-color');
		                var initial_background_color = $this.css('background-color');
		                $this.on("hover", function(e) {
							if (e.type == "mouseenter") {
								$this.css('background-color', hover_background_color);
							}
							else {
								$this.css('background-color', initial_background_color);
							}
						});
		            }
					//hover border color
					if(typeof $this.data('hover-border-color') !== 'undefined' && $this.data('hover-border-color') !== false && $this.data('hover-border-color') != '') {
		                var hover_border_color = $this.data('hover-border-color');
		                var initial_border_color = $this.css('border-top-color');
		                $this.on("hover", function(e) {
							if (e.type == "mouseenter") {
								$this.css('border-color', hover_border_color);
							}
							else {
								$this.css('border-color', initial_border_color);
							}
						});
		            }
					//hover color
					if(typeof $this.data('hover-color') !== 'undefined' && $this.data('hover-color') !== false && $this.data('hover-color') != '') {
		                var hover_color = $this.data('hover-color');
		                var initial_color = $this.css('color');
		                $this.on("hover", function(e) {
							if (e.type == "mouseenter") {
								 $this.css('color', hover_color);
							}
							else {
								$this.css('color', initial_color);
							}
						});
		            }
				});
			},
			counterInit: function(){
				if(!this.DH.enableAnimation()){
					return;
				}
				$('.counter').each(function(){
					var $this = $(this);
					$this.appear(function(){
						var counter_number = $this.find('.counter-number');
						counter_number.countTo({
							from: 0,
							to: counter_number.data('to'),
							speed: counter_number.data('speed'),
							decimals:counter_number.data('num-decimals'),
							decimal: counter_number.data('decimal-sep'),
							thousand: counter_number.data('thousand-sep'),
							refreshInterval: 30,
							formatter: function (value, options) {
								value = value.toFixed(options.decimals);
								value += '';
						        var x, x1, x2, rgx;
						        x = value.split('.');
						        x1 = x[0];
						        x2 = x.length > 1 ? options.decimal + x[1] : '';
						        rgx = /(\d+)(\d{3})/;
						        if(typeof(options.thousand) === 'string' && options.thousand !=''){
						        	while (rgx.test(x1)) {
					                	x1 = x1.replace(rgx, '$1' + options.thousand + '$2');
					            	}
						        }
						        return x1 + x2;
					        }
						});	
					});
				});
			},
			iconboxInit: function(){
				var posRightAbsolute = function(){
					$('.iconbox-pos-right').each(function(){
						if($(this).find('.iconbox-icon').css('position') =='absolute'){
							$(this).find('.iconbox-content').css('padding-top',$(this).find('.iconbox-icon').outerHeight());
						}else{
							$(this).find('.iconbox-content').css({'padding-top':''});
						}
					});
				};
				posRightAbsolute();
				$(window).resize(function(){
					posRightAbsolute();
				});
				$('[data-toggle="iconbox"]').each(function(){
					var $this = $(this);
					//hover background color
					if(typeof $this.data('hover-background-color') !== 'undefined' && $this.data('hover-background-color') !== false && $this.data('hover-background-color') != '') {
		                var hover_background_color = $this.data('hover-background-color');
		                var initial_background_color = $this.css('background-color');
		                $this.closest('.iconbox').on("hover", function(e) {
							if (e.type == "mouseenter") {
								 $this.css('background-color', hover_background_color);
							}
							else {
								$this.css('background-color', initial_background_color);
							}
						});
		            }
					//hover border color
					if(typeof $this.data('hover-border-color') !== 'undefined' && $this.data('hover-border-color') !== false && $this.data('hover-border-color') != '') {
		                var hover_border_color = $this.data('hover-border-color');
		                var initial_border_color = $this.css('border-top-color');
		                $this.closest('.iconbox').on("hover", function(e) {
							if (e.type == "mouseenter") {
								 $this.css('border-color', hover_border_color);
							}
							else {
								$this.css('border-color', initial_border_color);
							}
						});
		            }
					//hover color
					if(typeof $this.data('hover-color') !== 'undefined' && $this.data('hover-color') !== false && $this.data('hover-color') != '') {
		                var hover_color = $this.data('hover-color');
		                var initial_color = $this.css('color');
		                $this.closest('.iconbox').on("hover", function(e) {
							if (e.type == "mouseenter") {
								 $this.css('color', hover_color);
							}
							else {
								$this.css('color', initial_color);
							}
						});
		            }
				});
			},
			modalInit: function(){
				var self = this;
				function adjustModalMaxHeightAndPosition(){
					$('.modal').each(function(){
						if($(this).find('.modal-dialog').hasClass('modal-dialog-center')){
					        if($(this).hasClass('in') === false){
					            $(this).show(); /* Need this to get modal dimensions */
					        };
					        var contentHeight = self.DH.getViewport().height - 60;
					        var headerHeight = $(this).find('.modal-dialog-center .modal-header').outerHeight() || 2;
					        var footerHeight = $(this).find('.modal-dialog-center .modal-footer').outerHeight() || 2;
		
					        $(this).find('.modal-dialog-center .modal-content').css({
					            'max-height': function () {
					                return contentHeight;
					            }
					        });
		
					        $(this).find('.modal-dialog-center .modal-body').css({
					            'max-height': function () {
					                return (contentHeight - (headerHeight + footerHeight));
					            }
					        });
		
					        $(this).find('.modal-dialog-center').css({
					            'margin-top': function () {
					                return -($(this).outerHeight() / 2);
					            },
					            'margin-left': function () {
					                return -($(this).outerWidth() / 2);
					            }
					        });
					        if($(this).hasClass('in') === false){
					            $(this).hide(); /* Hide modal */
					        };
						}
				    });
				}
				if (this.DH.getViewport().height >= 320){
				    $(window).resize(adjustModalMaxHeightAndPosition).trigger("resize");
				}
			},
			piechartInit: function(){
				var self = this;
//				if(!this.DH.enableAnimation()){
//					return;
//				}
				$('.piechart').each(function(){
					$(this).appear(function(){
						var $this = $(this),
							redraw = false,
							animated = false,
							size = $this.data('size'),
							canvas_wrap = $this.find('.pichart-canvas'),
							canvas = $this.find('canvas'),
							label = $this.find('.pichart-canvas-value'),
							back = $this.find('.pichart-canvas-back'),
							value = $this.data('value')  / 100,
							label_value = $this.data('value'),
							units = $this.data('units'),
							_progress_v = 0,
							circle,
							outlined = $this.hasClass('piechart-style-outlined'),
							color = '#f7f7f7',
							fillColor,
							border_color,
							text_color,
							background_color,
							custom = false;
						 
						 color = canvas_wrap.css('backgroundColor');
						 if(canvas_wrap.hasClass('pichart-custom')){
							 custom = true;
							 if(custom && typeof canvas_wrap.data('border-color') !== 'undefined' && canvas_wrap.data('border-color') !== false && canvas_wrap.data('border-color') != ''){
								 color = canvas_wrap.data('border-color');
							 }
						 }
						 fillColor = color;
						 var setProgress = function(){
							if(!self.DH.enableAnimation()){
								circle.stop();
			                    label.text(label_value + units);
			                    return value;
							}
			            	if (_progress_v >= value) {
			                    circle.stop();
			                    label.text(label_value + units);
			                    return _progress_v;
			                }
			                _progress_v += 0.008;
			                var _label_value = _progress_v/value*label_value;
			                var val = Math.round(_label_value) + units;
			                label.text(val);
			                return _progress_v;
			            }
						var draw = function(redraw){
							 var w = size,
				                border_w = $this.data('border-size'),
				                radius = w/2 - border_w - 1,
				                w2 = w+8,
				                h2 = w+8;
							 canvas_wrap.css({"width" : w2 + "px", "height" : h2 + "px"});
							 
							label.css({"width" : w2, "height" : h2, "line-height" : h2+"px"});
				            back.css({"width" : w, "height" : w,'border-width':(border_w + 2)+'px','border-color':color});
				            canvas.attr({"width" : w + "px", "height" : w + "px"});
				            if(radius < 0) return false;
				            circle = new ProgressCircle({
				                canvas: canvas.get(0),
				                minRadius: radius,
				                arcWidth: border_w
				            });
				            label.css({'color':color});
				            canvas_wrap.css({"background-color" : 'rgba(0, 0, 0, 0)'});
				            if(!outlined){
				            	canvas_wrap.css({"background-color" : color});
				            	back.css({'border-color':'rgba(0, 0, 0, 0)'});
				            	label.css({'color':'#fff'});
				            	fillColor = '#fff';
				            	
				            }
				            if(custom && typeof canvas_wrap.data('background-color') !== 'undefined' && canvas_wrap.data('background-color') !== false && canvas_wrap.data('background-color') != ''){
				            	canvas_wrap.css({"background-color" : canvas_wrap.data('background-color')});
				            }
				            if(custom && typeof canvas_wrap.data('text-color') !== 'undefined' && canvas_wrap.data('text-color') !== false && canvas_wrap.data('text-color') != ''){
				            	label.css({"color" : canvas_wrap.data('text-color')});
				            }
				            if(redraw === true && animated === true) {
				                _progress_v = value;
				                circle.addEntry({
				                    fillColor: fillColor,
				                    progressListener: $.proxy(setProgress, this)
				                }).start();
				            }
						}
						
			           
			            draw();
			            
			            if(!outlined){
			            	fillColor = '#fff';
			            }
			            
			            if(animated !== true) {
			            	animated = true;
				            circle.addEntry({
			                    fillColor: fillColor,
			                    progressListener: $.proxy(setProgress, this)
			                }).start(5);
			            }
	//		            $(window).resize(function(){
	//		                if(animated === true) circle.stop();
	//		                	draw(true);
	//		            });
					});
				});
				
			},
			gmapInit: function(){
				var self = this;
				if($('[data-toggle="gmap"]').length){
					window.gmapCallback = function(){
						$('[data-toggle="gmap"]').each(function(i){
						var mapBox = $(this).find('.gmap'),
							latitude = mapBox.data('center-latitude'),
							longitude = mapBox.data('center-longitude'),
							icon = mapBox.data('marker-icon'),
							markers = mapBox.data('markers'),
							zoom = mapBox.data('zoom'),
							enable_zoom = mapBox.data('enable-zoom'),
							greyscale = mapBox.data('greyscale'),
							greyscale_style;
							if(greyscale){
								greyscale_style = [{stylers:[{hue:'#000000'},{saturation:'-100'},{lightness:'-10'}]}];
							}else{
								greyscale_style = [];
							}
							var LatLng    = new google.maps.LatLng(latitude,longitude); 
							var map = new google.maps.Map(mapBox.get(0), {
								    flat:false,
								    noClear:false,
								    zoom: zoom,			
								    zoomControl: enable_zoom,	  
								    scrollwheel: false,
								    draggable:  (self.DH.isTouch() ? false : true),
								    center: LatLng,
								    streetViewControl:false,
								    mapTypeControl: false,
									scaleControl: false,
								    disableDefaultUI: true,
								    mapTypeId: google.maps.MapTypeId.ROADMAP,
								    styles:greyscale_style
							});
							
							google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
								$.each(markers,function(index,marker){
									var gmarker = new google.maps.Marker({
										icon: icon,
									    position: new google.maps.LatLng(marker.latitude,marker.longitude),
									    map: map,
									    animation: google.maps.Animation.DROP
								    });
									if(marker.info != ''){
										var infowindow = new google.maps.InfoWindow({
									      content: marker.info,
									      maxWidth: 300
										});
										google.maps.event.addListener(gmarker, 'click', function() {
										  	  infowindow.open(map,this);
										});
									}
								});
							});
						});
					};
					if(typeof google == 'undefined') {
						$.getScript('http://maps.google.com/maps/api/js?v=3&sensor=false&callback=gmapCallback');
				 	}
				}
			}
		},
		ajaxSearchInit: function(){
			$(document).on('click','.morphsearch-close',function(e){
				e.stopPropagation();
				e.preventDefault();
				var morphSearch = $('#morphsearch');
				if(morphSearch.hasClass('open')){
					morphSearch.removeClass('open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
						$('body').stop(true,true).css('overflow','');
					});
				}
			});
			$(document).on('click','.navbar-search-button',function(e){
				e.stopPropagation();
				e.preventDefault();
				if($('#morphsearch').length){
					var morphSearch = $('#morphsearch');
					if(!morphSearch.hasClass('open')){
						morphSearch.addClass('open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
							$('body').stop(true,true).css('overflow','hidden');
							$('.morphsearch-input').focus();
						});
					}
				}else if($('.header-search-overlay').length){
					$('.header-search-overlay').stop(true,true).removeClass('hide').css('opacity',0).animate({'opacity' :1},600,'easeOutExpo',function(){
						$(this).find('.searchinput').focus();
					});
				}else if($('.search-form-wrap').length){
					if ($('.search-form-wrap').hasClass('hide'))
					{
						$('.search-form-wrap').removeClass('hide').addClass('show');
						$('.search-form-wrap .searchinput').focus();
					}
				}
				
			});
			$('body').on('mousedown', $.proxy( function(e){
				var element = $(e.target);
				if($('.header-search-overlay').length){
					if(!element.is('.header-search-overlay') && element.parents('.header-search-overlay').length === 0 )
					{
						$('.header-search-overlay').removeClass('show').addClass('hide');
					}
				}else{
					if(!element.is('.search-form-wrap') && element.parents('.search-form-wrap').length === 0 )
					{
						$('.search-form-wrap').removeClass('show').addClass('hide');
					}
				}
			}, this) );
			
			$('.searchform.search-ajax').on('keyup', '.searchinput' , $.proxy( function(e){
				window.clearTimeout(this.searchTimeout);
				if(e.currentTarget.value.length >= 3 && this.lastSearchQuery != $.trim(e.currentTarget.value))
				{
					this.searchTimeout = window.setTimeout($.proxy( this.doSearch, this, e),350);
				}

			}, this));
			$(document).on('click','.header-search-overlay .close',function(){
				$('.header-search-overlay').stop(true,true).animate({'opacity' :0},600,'easeOutExpo',function(){
					$(this).addClass('hide');
				});
			});
		},
		portfolio: {
			initVideoPopup: function(){
				if($().magnificPopup){
					$("a[data-rel='magnific-portfolio-video']").magnificPopup({
						type: 'inline',
						mainClass: 'dh-mfp-popup',
						callbacks : {
						    open : function(){
						    	//$(this.st.el).data('content-inline',$(this.content))
						    	$(this.content).find(".video-embed.video-embed-popup,.audio-embed.audio-embed-popup").dh_mediaelementplayer();
						    	$(this.content).find('iframe:visible').each(function(){
									if(typeof $(this).attr('src') != 'undefined'){
										if( $(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || $(this).attr('src').toLowerCase().indexOf("vimeo") >= 0  || $(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0 || $(this).attr('src').toLowerCase().indexOf("kickstarter") >= 0 || $(this).attr('src').toLowerCase().indexOf("dailymotion") >= 0) {
											$(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
											if($(this).attr('src').indexOf('wmode=transparent') == -1) {
												if($(this).attr('src').indexOf('?') == -1){
													$(this).attr('src',$(this).attr('src') + '?wmode=transparent');
												} else {
													$(this).attr('src',$(this).attr('src') + '&wmode=transparent');
												}
											}
										}
									} 
								});
						    	$(this.content).find('iframe[data-aspectRatio]').each(function() {
								 	var newWidth = $(this).parent().width();
									var $this = $(this);
									$this.width(newWidth).height(newWidth * $this.attr('data-aspectRatio'));
									
							   });
						    },
						    close: function() {
						    	$(this.st.el).closest('.portfolio-item').find('.video-embed-wrap').html($(this.st.el).data('video-inline'));
						    }
						}
					});
				}
				$('.portfolio').find('.portfolio-item').each(function(){
					$(this).find('.gallery-featured').closest('.portfolio-featured-wrap').find('.zoom-action').on('click',function(e){
						 e.stopPropagation();
						 e.preventDefault();
						 $(this).closest('.portfolio-featured-wrap').find('.gallery-featured').find('.caroufredsel-items li').first().find('a').trigger('click');
					});
				});
			},
			styleOneInit: function(){
				$('.portfolio.portfolio-style-one').find('.portfolio-item').each(function(){
					var $this = $(this);
					var captionHeight = $this.find('.portfolio-caption').outerHeight();
						captionHeight = captionHeight - 1;
					
					if($(this).get(0).hasAttribute('data-accent-color')){
						$(this).find('.portfolio-caption').css('background-color',$(this).data('accent-color'));
					}
					
						
					$this.find('.portfolio-action').css({'margin-top': (captionHeight / 2) + 'px'});
					$this.find('.portfolio-item-wrap').hover(function(){
						$(this).find('.portfolio-featured-wrap').css({
							"bottom":captionHeight+"px"
						});
					},function(){
						var b=0;
						$(this).find('.portfolio-featured-wrap').css({
							"bottom": b +"px"
						});
					});
				});
			},
			styleTwoInit: function(self){
				$('.portfolio.portfolio-style-two').find('.portfolio-item').each(function(){
					if($(this).get(0).hasAttribute('data-accent-color')){
						$(this).find('.portfolio-overlay').css('background-color',self.hex2rgba($(this).data('accent-color'),0.5));
					}
				});
			},
			styleThreeInit: function(self){
				$('.portfolio.portfolio-style-three').find('.portfolio-item').each(function(){
					$(this).find('.portfolio-caption').css({'margin-top':- ($(this).find('.portfolio-caption').outerHeight() / 2) + 'px'});
					if($(this).get(0).hasAttribute('data-accent-color')){
						$(this).find('.portfolio-overlay').css('background-color',self.hex2rgba($(this).data('accent-color'),0.9));
					}
				});
			}
		},
		portfolioInit: function(){
			var self = this;
			self.portfolio.initVideoPopup();
			self.portfolio.styleOneInit();
			self.portfolio.styleTwoInit(self);
			self.portfolio.styleThreeInit(self);
			$(window).resize(function(){
				self.portfolio.styleOneInit();
				self.portfolio.styleThreeInit(self);
			});
		},
		mediaelementplayerInit: function(){
			if($().mediaelementplayer) {
				$(".video-embed:not(.video-embed-popup),.audio-embed:not(.audio-embed-popup)").dh_mediaelementplayer();
			}
		},
		carouselInit: function(){
			var self = this;
			//related post carousel
			$('.caroufredsel').each(function(){
				var $this = $(this),
					$visible = 3,
					$height = 'auto',
					$circular = false,
					$auto_play = false,
					$scroll_fx = 'scroll',
					$duration = 2000,
					$items_height = 'variable',
					$auto_pauseOnHover = 'resume',
					$items_width = '100%',
					$infinite = false,
					$responsive = false,
					$scroll_item = 1,
					$easing = 'swing',
					$direction = 'left';
				
				if($this.hasClass('product-slider')){
					$visible = {
						min: $(this).data('visible-min'),
						max: $(this).find('ul.products').data('columns')
					};
				}else{
					if($(this).data('visible-min') && $(this).data('visible-max')){
						$visible = {
							min: $(this).data('visible-min'),
							max: $(this).data('visible-max')
						};
					}
				}
				if($(this).data('visible')){
					$visible = $(this).data('visible');
				}
				if($(this).data('height')){
					$height = $(this).data('height');
				}
				if($(this).data('direction')){
					$direction = $(this).data('direction');
				}
				if ($(this).data("speed") ) {
					$duration = parseInt($(this).data("speed"), 10);
				}
				if ($(this).data("scroll-fx") ) {
					$scroll_fx = $(this).data("scroll-fx");
				}
				if ($(this).data("circular")) {
					$circular = true;
				}
				if ($(this).data("infinite")) {
					$infinite = true;
				}
				if ($(this).data("responsive")) {
					$responsive = true;
				}
				if ($(this).data("autoplay")) {
					$auto_play = true;
				}
				if($(this).data('scroll-item')){
					$scroll_item = parseInt($(this).data('scroll-item'), 10);
				}
				if($(this).data('easing')){
					$easing = $(this).data('easing');
				}
				var carousel = $(this).children('.caroufredsel-wrap').children('ul.caroufredsel-items').length ? $(this).children('.caroufredsel-wrap').children('ul.caroufredsel-items') :  $(this).children('.caroufredsel-wrap').find('ul');
				var carouselOptions = {
					responsive: $responsive,
					circular: $circular,
					infinite:$infinite,
					width: '100%',
					height: $height,
					direction:$direction,
					auto: {
						play : $auto_play,
						pauseOnHover: $auto_pauseOnHover
					},
					swipe: {
						 onMouse: true,
			             onTouch: true
					},
					scroll: {
						duration: 600,
						fx: $scroll_fx,
						timeoutDuration: $duration,
						easing: $easing,
						wipe: true
					},
					items: {
						height: $items_height,
						visible: $visible
					}
				};
				
				if($this.children('.caroufredsel-pagination').length){
					carouselOptions.pagination = {container:$this.children('.caroufredsel-pagination')};
				}
				if($(this).children('.caroufredsel-wrap').children('.caroufredsel-prev').length && $(this).children('.caroufredsel-wrap').children('.caroufredsel-next').length){
					carouselOptions.prev = $(this).children('.caroufredsel-wrap').children('.caroufredsel-prev');
					carouselOptions.next = $(this).children('.caroufredsel-wrap').children('.caroufredsel-next');
				}
				carousel.carouFredSel(carouselOptions);
				var $element = $this;
				if($this.find('img').length == 0) $element = $('body');
				
				imagesLoaded($element,function(){
					carousel.trigger("destroy").carouFredSel(carouselOptions);
					$('[data-spy="scroll"]').each(function () {
						var $spy = $(this).scrollspy('refresh');
					});
				});
				
				$(window).resize(function(){
					carousel.trigger("destroy").carouFredSel(carouselOptions);
				});
			});
		},
		responsiveEmbedIframe: function(){
			$('iframe:visible').each(function(){
				if(typeof $(this).attr('src') != 'undefined'){
					
					if( $(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || $(this).attr('src').toLowerCase().indexOf("vimeo") >= 0  || $(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0 || $(this).attr('src').toLowerCase().indexOf("kickstarter") >= 0 || $(this).attr('src').toLowerCase().indexOf("dailymotion") >= 0) {
						$(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
						if($(this).attr('src').indexOf('wmode=transparent') == -1) {
							if($(this).attr('src').indexOf('?') == -1){
								$(this).attr('src',$(this).attr('src') + '?wmode=transparent');
							} else {
								$(this).attr('src',$(this).attr('src') + '&wmode=transparent');
							}
						}
					}
				} 
			});
			$('iframe[data-aspectRatio]').each(function() {
			 	var newWidth = $(this).parent().width();
				var $this = $(this);
				$this.width(newWidth).height(newWidth * $this.attr('data-aspectRatio'));
				
		   });
		},
		isotopeInit: function(){
			var self = this;
			$('[data-layout="masonry"]').each(function(){
				var $this = $(this),
					container = $this.find('.masonry-wrap'),
					itemColumn = $this.data('masonry-column'),
					itemWidth,
					container_width = container.width();
					if(self.getViewport().width > 992){
						itemWidth = container_width / itemColumn;
					}else if(self.getViewport().width <= 992 && self.getViewport().width >= 768){
						itemWidth = container_width / 2;
					}else {
						itemWidth = container_width / 1;
					}
					container.isotope({
						layoutMode: 'masonry',
						itemSelector: '.masonry-item',
						transitionDuration : '0.8s',
						getSortData : { 
							title : function (el) { 
								return $(el).data('title');
							}, 
							date : function (el) { 
								return parseInt($(el).data('date'), 10);
							} 
						},
						masonry : {
							gutter : 0,
							columnWidth: itemWidth
						}
					}).isotope( 'layout' );
					
					imagesLoaded($this,function(){
						container.isotope( 'layout' );
					});
				
				var filter = $this.find('.masonry-filter ul a');
				filter.on("click", function(e){
					e.stopPropagation();
					e.preventDefault();
					
					var $this = jQuery(this);
					// don't proceed if already selected
					if ($this.hasClass('selected')) {
						return false;
					}
					
					var filters = $this.closest('ul');
					filters.find('.selected').removeClass('selected');
					$this.addClass('selected');
					$this.closest('.masonry-filter').find('.filter-heaeding h3').text($this.text());
					var options = {
						layoutMode : 'masonry',
						transitionDuration : '0.8s',
						getSortData : { 
							title : function (el) { 
								return $(el).data('title');
							}, 
							date : function (el) { 
								return parseInt($(el).data('date'), 10);
							} 
						}
					}, 
					key = filters.attr('data-filter-key'), 
					value = $this.attr('data-filter-value');
		
					value = value === 'false' ? false : value;
					options[key] = value;
					container.isotope(options);
					var wrap = $this.closest('[data-layout="masonry"]');
					if(wrap.hasClass('portfolio-style-three')){
						self.portfolio.styleThreeInit(self);
					}
					if(wrap.hasClass('portfolio-style-two')){
						self.portfolio.styleTwoInit(self);
					}
					$('[data-spy="scroll"]').each(function () {
						var $spy = $(this).scrollspy('refresh');
					});
				});
				$this.find('.filter-btn').on("click", function(e){
					e.stopPropagation();
					e.preventDefault();
					if ($(this).hasClass('current')) {
						$(this).removeClass('current');
						$(this).closest('.filter-action').find('ul li').hide('slow');
					} else {
						$(this).addClass('current');
						$(this).closest('.filter-action').find('ul li').show('slow');
					}
				});
				$this.find('.sort-btn').on("click", function(e){
					e.stopPropagation();
					e.preventDefault();
					var $this = $(this),
						sortBy = $this.data('sort'),
						sortAscending = (sortBy === 'title') ? true : false,
						current = ($this.hasClass('current')) ? true : false, 
						reversed = ($this.hasClass('reversed')) ? true : false;
					
					if ($(this).closest('.filter-action').find('.filter-btn').hasClass('current')) {
						$(this).closest('.filter-action').find('.filter-btn').removeClass('current');
						$(this).closest('.filter-action').find('ul li').hide('slow');
					}
					
					
					if (current) { 
						if (reversed) { 
							$this.removeClass('reversed');
							$this.find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
							sortAscending = true;
						} else { 
							$this.addClass('reversed');
							$this.find('i').removeClass('fa-sort').removeClass('sort-angle-down').addClass('sort-angle-up');
							sortAscending = false;
						}
					} else { 
						$this.parent().find('.sort-btn.current').removeClass('current');
						$this.parent().find('.sort-btn.reversed').removeClass('reversed');
						$this.parent().find('.sort-btn').find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
						if (sortBy === 'title') { 
							$this.addClass('current');
							$this.find('i').removeClass('fa-sort').removeClass('sort-angle-up').addClass('sort-angle-down');
						} else { 
							$this.addClass('current reversed');
							$this.find('i').removeClass('fa-sort').removeClass('sort-angle-down').addClass('sort-angle-up');
						}
					}
					
					container.isotope( { 
						sortBy : sortBy, 
						sortAscending : sortAscending 
					} );
					var wrap = $this.closest('[data-layout="masonry"]');
					if(wrap.hasClass('portfolio-style-three')){
						self.portfolio.styleThreeInit(self);
					}
					if(wrap.hasClass('portfolio-style-two')){
						self.portfolio.styleTwoInit(self);
					}
				});
			});
			
		},
		commerceInit: function(){
			var self = this;
			//Shop mini cart
			$(document).on("mouseenter", ".navbar-minicart", function() {
				window.clearTimeout($(this).data('timeout'));
				$('.navbar-minicart .minicart').fadeIn(50);
			});
			$(document).on("mouseleave", ".navbar-minicart", function() {
					var t = setTimeout(function() {
						$('.navbar-minicart .minicart').fadeOut(50);
					}, 400);
					$(this).data('timeout', t);
			});
			
			//Single product image
			$(document).on('click','.product-thumbnails-slider .thumb > a',function(e){
				e.stopPropagation();
				e.preventDefault();
				$(this).closest('.product-thumbnails-slider').find('.selected').removeClass('selected');
				$(this).closest('.thumb').addClass('selected');
				var rel = $(this).data('rel');
				$('.product-images-slider').find('ul').trigger('slideTo',rel);
			});
		},
		animateBoxInit: function(){
			var self = this;
			$('.column[data-fade="1"]').each(function(){
				if(self.enableAnimation() && self.getViewport().width > 992){
					$(this).appear(function(){
						$(this).data("fade-animation")==="in-from-top" ? $(this).animate({opacity:"1",top:"0"},1000,"swing"):
							$(this).data("fade-animation")==="in-from-left" ? $(this).animate({opacity:"1",left:"0"},1000,"swing"):
								$(this).data("fade-animation")==="in-from-right" ? $(this).animate({opacity:"1",right:"0"},1000,"swing"):
									$(this).data("fade-animation")==="in-from-bottom" ? $(this).animate({opacity:"1",bottom:"0"},1000,"swing"):
										$(this).animate({opacity:"1"},1000,"swing");
					});
				}else{
					$(this).css({'left':'','right':'','bottom':'','top':''});
				}
			});
			$('.animate-box[data-animate="1"]').each(function(){
				var $this = $(this);
				if(self.enableAnimation() && self.getViewport().width > 992){
					$this.appear(function(){
						$this.addClass('go');
					});
				}else{
					$this.css('visibility', 'visible');
				}
			});
		
		},
		magnificpopupInit: function(){
			if($().magnificPopup){
				$("a[data-rel='magnific-popup']").magnificPopup({
					type: 'image',
					mainClass: 'dh-mfp-popup',
					gallery:{
						enabled: true
					}
				});
				$("a[data-rel='magnific-single-popup']").magnificPopup({
					type: 'image',
					mainClass: 'dh-mfp-popup',
					gallery:{
						enabled: false
					}
				});
			}
		},
		navDropdown: function(){
			if(this.getViewport().width > 992){
				$('.topbar-nav').superfish({
					anchorClass: '.dropdown',      // selector within menu context to define the submenu element to be revealed
				    hoverClass:    'open',          // the class applied to hovered list items
				    pathClass:     'overideThisToUse', // the class you have applied to list items that lead to the current page
				    pathLevels:    1,                  // the number of levels of submenus that remain open or are restored using pathClass
				    delay:         650,                // the delay in milliseconds that the mouse can remain outside a submenu without it closing
				    animation:     {opacity:'show'},   // an object equivalent to first parameter of jQuery’s .animate() method. Used to animate the submenu open
				    animationOut:  {opacity:'hide'},   // an object equivalent to first parameter of jQuery’s .animate() method Used to animate the submenu closed
				    speed:         'fast',           // speed of the opening animation. Equivalent to second parameter of jQuery’s .animate() method
				    speedOut:      'fast',             // speed of the closing animation. Equivalent to second parameter of jQuery’s .animate() method
				    cssArrows:     true,               // set to false if you want to remove the CSS-based arrow triangles
				    disableHI:     false,              // set to true to disable hoverIntent detection
				});
				$('.primary-nav').superfish({
					anchorClass: '.dropdown',      // selector within menu context to define the submenu element to be revealed
				    hoverClass:    'open',          // the class applied to hovered list items
				    pathClass:     'overideThisToUse', // the class you have applied to list items that lead to the current page
				    pathLevels:    1,                  // the number of levels of submenus that remain open or are restored using pathClass
				    delay:         650,                // the delay in milliseconds that the mouse can remain outside a submenu without it closing
				    animation:     {opacity:'show'},   // an object equivalent to first parameter of jQuery’s .animate() method. Used to animate the submenu open
				    animationOut:  {opacity:'hide'},   // an object equivalent to first parameter of jQuery’s .animate() method Used to animate the submenu closed
				    speed:         'fast',           // speed of the opening animation. Equivalent to second parameter of jQuery’s .animate() method
				    speedOut:      'fast',             // speed of the closing animation. Equivalent to second parameter of jQuery’s .animate() method
				    cssArrows:     true,               // set to false if you want to remove the CSS-based arrow triangles
				    disableHI:     false,              // set to true to disable hoverIntent detection
				 });
			}
			$('.primary-nav .dropdown-hover .caret,.primary-nav .dropdown-submenu > a > .caret,.primary-nav .megamenu-title .caret').off('click').on('click',function(e){
				e.stopPropagation();
				e.preventDefault();
				var dropdown = $(this).closest(".dropdown, .dropdown-submenu");
				if (dropdown.hasClass("open")) {
					dropdown.removeClass("open");
				} else {
					dropdown.addClass("open");
				}
			});
		},
		headingInit: function(){
			var self = this;
			var headingPadding = function(){
				if($('.header-container').length && $('.header-container').hasClass('header-fixed')){
					$('.heading-container > div').css({'padding-top':$('.header-container').height() + 'px'});
				}
			}
			if($('.heading-hero').length){
				var headingHero = $('.heading-hero');
				var fitHeight = function(a) {
					var b = a,
						c = function () {
							return self.getViewport().height >= 1200 ? 1200 : self.getViewport().height
						};
					return $(b).height(c)
				}
				fitHeight(headingHero);
				$(window).resize(function(){
					fitHeight(headingHero);
				});
			}
			headingPadding();
			$(window).resize(function(){
				headingPadding();
			});
			var headingHeight = $('.heading-container').height();
			var headingBgPadding = function(){
				if(self.getViewport().width > 992){
					if($('.heading-background').closest('body').find('.header-container').hasClass('header-transparent')){
						$('.heading-background').css({'padding-top':$('.heading-background').closest('body').find('.header-container').height()+'px'})
					}
				}else{
					$('.heading-background').css({'padding-top':''});
				}
			}
			headingBgPadding();
			if($('.heading-background').closest('body').find('.header-container').hasClass('header-transparent')){
				imagesLoaded($('.heading-container'),function(){
					headingBgPadding();
				});
			}
			$(window).resize(function(){
				headingBgPadding();
			});
			if(this.enableAnimation()){
				if($('.heading-parallax').length){
					$('.heading-parallax').parallax('50%', .5, true,'translate');
				}
			}
		},
		dhSliderInit: function(){
			var self = this;
			$('.dhslider').each(function(){
				var $this = $(this),
					isIOS = /iPhone|iPad|iPod/.test( navigator.userAgent ),
					or_height = $this.height(),
					min_height = 250,
					startwidth = $this.width(),
					startheight = $this.data('height');
				
				
				var dynamicHeight = function(){
					var slider_height = startheight,
						slider_width = startwidth;
					
					if(!$this.hasClass('dhslider-fullscreen')){
						if($this.width() > self.getViewport().width){
							$this.css('width','100%');
						}
					}
					
					if($this.hasClass('dhslider-fullscreen') && self.getViewport().width > 992){
						slider_width = self.getViewport().width;
						slider_height = self.getViewport().height;
					}else{
						var scale_slider = $(window).width() / 1600;
						//min height
						if( self.getViewport().width <= 992 ){
							if( startheight*scale_slider <= min_height ){
								slider_height = min_height;
							} else {
								slider_height = Math.round(startheight*scale_slider);
							}
						}
					}
					
					var heading_height = 0;
					
					if($('body').find('.header-container').hasClass('header-transparent') && self.getViewport().width > 992){
						heading_height = $('body').find('.header-container').height();
					}
					$this.css({'height': slider_height + 'px'});
					//$this.find('.dhslider-wrap').css({'height': slider_height + 'px'});
					$this.find('.item').css({'height': slider_height + 'px'});
					
					var slider_width = $this.width(),
						slider_height = $this.height(),
						scale_h = slider_width / 1280,
						scale_v = (slider_height - $('.header-container').height()) / 720,
						scale = scale_h > scale_v ? scale_h : scale_v,
						min_w = 1280/720 * (slider_height+20);
				
					if (scale * 1280 < min_w) {
						scale = min_w / 1280;
					}
					$this.find('.video-embed-wrap').css('width',($this.width()+2)).css('height',($this.height()+2));
					$this.find('.slider-video').width(Math.ceil(scale * 1280 +2));
					$this.find('.slider-video').height(Math.ceil(scale * 720 +2));
					
					var active_cation = $this.find('.active .slider-caption');
					
					$this.find('.slider-caption').each(function(){
						$(this).css('top', (((slider_height + heading_height)/2) - ($(this).height()/2)) + 'px');
					});
				}
				
				dynamicHeight();
				$(window).resize(function(){
					dynamicHeight();
				});
				if($this.data('autorun') == 'yes'){
					$this.carousel({
						interval: parseInt($this.data('duration'), 10),
						pause: false
					});
				}else{
					$this.carousel({
						interval: 0,
						pause: false
					});
				}
				
				$this.on('slide.bs.carousel', function () {
					$this.find('.active .slider-caption').fadeTo(800,0);
				});
				$this.on('slid.bs.carousel', function () {
					$this.find('.active .slider-caption').fadeTo(0,1);
				});
				
				imagesLoaded($this,function(){
					$this.find('.dhslider-loader').fadeOut(500);
				});
				if(self.enableAnimation()){
					$this.find('.slider-caption').parallax('50%', .3, true,'translate',$this);
				}
				
			});
		},
		getURLParameters: function(url) {
		    var result = {};
		    var searchIndex = url.indexOf("?");
		    if (searchIndex == -1 ) return result;
		    var sPageURL = url.substring(searchIndex +1);
		    var sURLVariables = sPageURL.split('&');
		    for (var i = 0; i < sURLVariables.length; i++)
		    {       
		        var sParameterName = sURLVariables[i].split('=');      
		        result[sParameterName[0]] = sParameterName[1];
		    }
		    return result;
		},
		getViewport: function() {
		    var e = window, a = 'inner';
		    if (!('innerWidth' in window )) {
		        a = 'client';
		        e = document.documentElement || document.body;
		    }
		    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
		},
		hex2rgba: function(hex,opacity){
			hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
			var rgb = {
				r: hex >> 16,
				g: (hex & 0x00FF00) >> 8,
				b: (hex & 0x0000FF)
			};
			if( !rgb ) return null;
			if( opacity === undefined ) opacity = 1;
			return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
		},
		enableAnimation: function(){
			return this.getViewport().width > 992 && !this.isTouch();
		},
		isTouch: function(){
			return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
		}
	};
	$(document).ready(function(){
		DH.init();
	});
	$(document).on('dh-change-layout',function(){
		navTimeout = setTimeout(function(){
		DH.init();
		},500);
	});
})(jQuery);
