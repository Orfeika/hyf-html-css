var setupSite = {
	init: function() {
		profileDevice.init();
		gridResizing.init();
		imageHover.init();
		revealContent.init();
		filterTags.init();
		preloadImages.init();
		pageArrows.init();
		siteHistory.init();
		checkLinks.init();
		tidyText.init();
		$('.column').fadeIn(function(){
			$('#site-overlay').delay(1000).fadeOut();
		});
	},
	setupPage:function(){
		profileDevice.init();
		gridResizing.init();
		imageHover.init();
		revealContent.init();
		filterTags.init();
		preloadImages.init();
		pageArrows.init();
		checkLinks.init();
		tidyText.init();
		$('#site-overlay').fadeOut();
	}
};
var tidyText = {
	init:function(){
		$('article p').each(function(){
			var _html = $(this).html();
			_html = _html.replace(/[&]nbsp[;]/gi," ");
			$(this).html(_html);
		});
	}
}
var checkLinks = {
	init: function(){
		$('a').each(function(){
			$(this).removeAttr('title');
			var _url = $(this).attr('href');
			if (_url.indexOf('incredibletypes.com') == -1) {
				$(this).attr('target','_blank');
			};
		});
	}
};
var siteHistory = {
	initialPage: false,
	xhr: null,
	init:function(){
		if (profileDevice.historySupport == true) {
			siteHistory.bindHistoryEvents();
			siteHistory.bindClickEvents();
		};
	},
	bindHistoryEvents:function(){
		$(window).bind("popstate", function(e){
			var popped = ('state' in window.history), initialURL = location.href;
			if (popped == true || siteHistory.initialPage == false) {
				siteHistory.initialPage = false;
				siteHistory.contentSwitch();
			};			
		});
	},
	bindClickEvents:function(){
		$('a').live('click',function(){
			
			var _url = $(this).attr('href');
			if (_url.indexOf('incredibletypes.com') != -1 && $(this).hasClass('no-ajax') == false) {
				siteHistory.pageChange(_url);
				return false;
			};
			
		});
	},
	pageChange:function(_url){
		
		_newUrl = _url;
		var analyticsUrl = _newUrl.replace("http://incredibletypes.com", "");
		_gaq.push(['_trackPageview', analyticsUrl]);
		// push a new history state
		history.pushState('Incredible Types', 'Incredible Types', _newUrl);
		siteHistory.contentSwitch();
	},
	contentSwitch:function(){
		_newUrl = window.location + '';
		$('#site-overlay').stop(true, true).fadeIn(function(){	
			$(window).scrollTop(0);		
			if (siteHistory.xhr != null) {
				siteHistory.xhr.abort();
			};
			siteHistory.xhr = $.ajax({
				url:_newUrl,
				data: {},
				dataType: 'html',
				success: function(data) {
					pageArrows.doPageButtons = false;
					$(window).unbind('resize');
					$(window).unbind('scroll');
					$('#ajax-wrapper').empty().html($(data).find('#site-outer-container'));
					document.title = $('#page-title').text();
					setupSite.setupPage();
				}
			});
		});
	},
};
var pageArrows = {
	width: 0,
	height: 0,
	startPos : 0,
	endPos : 0,
	hoverWidth: 0,
	doPageButtons: false,
	doRotation: false,
	init:function(){
		if ($('.page-button').size() != 0) {
			pageArrows.doPageButtons = true;
		} else {
			pageArrows.doPageButtons = false;
		};
		
		if (pageArrows.doPageButtons == true) {
			pageArrows.width = $('.page-button').first().width();
			pageArrows.hoverWidth = pageArrows.width + $('.page-button').first().find('.page-thumbs').outerWidth();
			pageArrows.height = $('.page-button').first().height();
			$('.page-button').each(function(){
				$(this).find('img').first().addClass('active-thumb-img');
			})
			pageArrows.getPos();
			pageArrows.bindEvents();
			if (profileDevice.touchDevice == true) {
				var _offset =  (0 - pageArrows.width);
				$('#prev-page').stop(true, false).css({
					'margin-left':(_offset - 1)
				});
				$('#next-page').stop(true, false).css({
					'margin-right':(_offset - 1)
				});
				$('#site-overlay').fadeOut();
			};
		}
	},
	getPos: function(){
		if (pageArrows.doPageButtons == true) {
			pageArrows.startPos = $('#masonry-wrap').offset().top;
			pageArrows.endPos = pageArrows.startPos + $('#masonry-wrap').height();
			pageArrows.setPos();
		};
	},
	setPos: function() {
		if (pageArrows.doPageButtons == true) {
			var _arrowStartPos = $('.page-button').offset().top;
			var _arrowEndPos = _arrowStartPos + pageArrows.height;
			var _offset = 0;
			if (_arrowStartPos < pageArrows.startPos) {
				_offset = (_arrowStartPos - pageArrows.startPos);
			} else if (_arrowEndPos > pageArrows.endPos) {
				_offset = (pageArrows.endPos - _arrowEndPos);
			};
			if (_offset <  (0 - pageArrows.width)) {
				_offset =  (0 - pageArrows.width);
			};
			if ($('#ajax-wrapper').width() < 1460) {
				if (profileDevice.touchDevice == false) {
					$('#prev-page').css({
						'margin-left':(_offset - 1)
					});
					$('#next-page').css({
						'margin-right':(_offset - 1)
					});
				} else {
					if (_offset > (0 - pageArrows.width) && _offset != 0) {
						_offset = (0 - pageArrows.width);
					};
					$('#prev-page').stop(false, false).animate({
						'margin-left':(_offset - 1)
					}, 500);
					$('#next-page').stop(false, false).animate({
						'margin-right':(_offset - 1)
					}, 500);
				};
			} else {
				$('#prev-page').stop(false, false).css({
					'margin-left':(0 - 1)
				});
				$('#next-page').stop(false, false).css({
					'margin-right':(0 - 1)
				});
			};
		};
	},
	imageRotate:function(_element){
		if (pageArrows.doRotation == true) {
			var _index = _element.find('img').index($('.active-thumb-img'));
			var _size = _element.find('img').size();
			_element.find('img:eq(' + _index + ')').removeClass('active-thumb-img');
			_index = _index + 1;
			if (_index == _size) {
				_index = 0;
			};
			_element.find('img:eq(' + _index + ')').addClass('active-thumb-img');
			setTimeout(function(){
				pageArrows.imageRotate(_element);
			}, 250);
		};
	},
	bindEvents:function(){
		$(window).bind('scroll', function(){
			pageArrows.setPos();
		}); 
		$('#hidden-nav').resize(function(){
			pageArrows.getPos();
		});
		if (profileDevice.touchDevice == false) {
			$(".page-button").hoverIntent(
				function(){
					$(this).animate({
						'width' : pageArrows.hoverWidth 
					});
					if ($(this).find('img').size() > 1) {
						pageArrows.doRotation = true;
						pageArrows.imageRotate($(this));
					};
				},
				function(){
					$(this).animate({
						'width' : pageArrows.width 
					}, function(){
						pageArrows.doRotation = false;
					});
				}
			);
		};
	}
}
var filterTags = {
	init:function(){
		$('#tag-toggle-menu a').bind('click', function(){
			$('#tag-toggle-menu a').removeClass('selected');
			$(this).addClass('selected');
			var _showName = $(this).attr('id');
			$('#tag-menu a').each(function(){
				if ($(this).hasClass(_showName) == true) {
					$(this).removeClass('tag-inactive');
				} else {
					$(this).addClass('tag-inactive');
				};
			});
			return false;
		});
		
	},
	reset:function(){
		$('#tag-toggle-menu a:eq(0)').trigger('click');
	}
}

var revealContent = {
	speed:1000,
	html: '',
	init:function(){
		revealContent.bindEvents();
	},
	bindEvents: function(){
		$('.reveal-content').bind('click', function(){ 
			if ($(this).hasClass('open') == true) {
				revealContent.contentHide();
			} else {
				revealContent.contentShow();
			};
			return false;
		});
		
	},
	contentShow:function(){
		filterTags.reset();
		$('.reveal-content').addClass('open');
		$('#menu-button-desktop').text('Hide menu');		
		var _element = $('#hidden-nav');
		var _innerElement = _element.find('.inner-slide-wrapper');
		
		_innerElement.show();
		
		var _height = _innerElement.height();
		
		_innerElement.hide();
		_element.stop(true, true).animate({
			'height' : _height
		}, revealContent.speed, function(){
			_element.css({
				'height':'auto'
			});
			_innerElement.fadeIn(revealContent.speed);
		});
	},
	contentHide: function(){
		$('.reveal-content').removeClass('open');	
		$('#menu-button-desktop').text('Show menu');		
		var _element = $('#hidden-nav');
		var _innerElement = _element.find('.inner-slide-wrapper');
		var _height = _innerElement.height();
		_innerElement.fadeOut(revealContent.speed, function(){
			_element.stop(true, true).height(_height).animate({
				'height' : 0
			}, revealContent.speed);
			
		});
	}
}
var preloadImages = {
	speed:500,
	numberImages:0,
	numberLoaded:0,
	init:function(){
		preloadImages.numberLoaded = 0;
		preloadImages.numberImages = $('.preload').size();
		preloadImages.loadImages();
	},
	loadImages:function(){

		var _element = $('.preload:eq(' + preloadImages.numberLoaded + ')');
		var _child = _element.find($('.img-wrapper'));
		var _src = _element.attr('data-imgsrc');
		var _featureImg = new Image();
		var _greyscale = _element.hasClass('greyscale');
		// on load
		$(_featureImg).load(function (response, status, xhr) {
			if (status == "error") {
				setTimeout(function(){
					preloadImages.loadImages();
				}, 500);
			} else {
				_child.append($(this));
				var _img = _element.find('img').first();
				if (profileDevice.canvasSupport == false || _greyscale == false) {
					_img.fadeIn(preloadImages.speed);
				} else {
					var _greyImg = new Image();
					if (profileDevice.cssFilters == false) {
						$(_greyImg).attr('src', Helpers.greyscale(_img.attr('src'))).addClass('grey-image').prependTo(_child);
					} else {
						$(_greyImg).attr('src', _img.attr('src')).addClass('grey-image').addClass('grayscale-filter').prependTo(_child);
					};
					_child.find('.grey-image').fadeIn(preloadImages.speed, function(){
						$(this).closest('.article-link').addClass('image-loaded');
					});
				};			
				preloadImages.checkIfDone();
			};
			
		})
		.attr('src', _src);
	},
	checkIfDone:function(){
		preloadImages.numberLoaded = preloadImages.numberLoaded + 1;
		if (preloadImages.numberLoaded != preloadImages.numberImage) {
			preloadImages.loadImages();
		};
	}
}
var imageHover = {
	speed:250,
	init:function(){
		if (profileDevice.touchDevice == false) {
			imageHover.bindEvents();
		};
	},
	bindEvents:function(){
		$(".article-link").hoverIntent(
			function(){
				$(this).find('.hover-text').fadeIn(imageHover.speed);
				if ($(this).hasClass('image-loaded') == true) {
					var _img = $(this).find('img').last();
					_img.fadeIn(imageHover.speed);
				};
			}, 
			function(){
				$(this).find('.hover-text').fadeOut(imageHover.speed);
				if ($(this).hasClass('image-loaded') == true) {
					var _img = $(this).find('img').last();
					_img.fadeOut(imageHover.speed);
				};
			}
		);
	}
}
var gridResizing = {
	numberColumns: 3,
	cellDivisions: 5,
	columnGap:0,
	numberCells: 0,
	cellSize: 0,
	width:0,
	columnWidth:0,
	singlePost: false,
	init:function(){
		gridResizing.singlePost = $('#site-inner-container').hasClass('single-page');
		gridResizing.resizeGrid();
		gridResizing.bindResizeEvents()
	},
	bindResizeEvents:function(){
		$(window).bind('resize', function(){
			gridResizing.resizeGrid();
		});
	},
	resizeGrid:function(){
		var _columns = 3;
		var _masonaryOffset = 0;
		if ( profileDevice.isMobile() == true ) {
			_columns = 2;
			_masonaryOffset = $('#masonry-wrap').outerWidth(true) - $('#masonry-wrap').width();
		};
		gridResizing.columnWidth = Math.round( ( $('#site-outer-container').width() - _masonaryOffset ) / _columns );
		$('#site-inner-container').width( ( gridResizing.columnWidth * _columns ) + _masonaryOffset);
		gridResizing.columnGap = ( $('.grid-cell').first().outerHeight(true) - $('.grid-cell').first().height() ) / 2;
		gridResizing.resizeImages();
		$('#masonry-wrap').masonry({
    		itemSelector : '.article-link',
    		columnWidth : gridResizing.columnWidth
  		});
  		pageArrows.getPos();
	},
	resizeImages:function(){
		$('.grid-cell-figure').each(function(){
			var _parent = $(this).parent();
			var _width = $(this).attr('data-width');
			var _height = $(this).attr('data-height');
			
			
			var _child = $(this).find($('.img-wrapper'));
			var _ratio = _height/_width;
			if (_parent.hasClass('grid-cell-double-span') == true) {
				
				var _imgHeight = Math.floor(((gridResizing.columnWidth * 2) - gridResizing.columnGap) * _ratio);
			} else {
				var _imgHeight = Math.floor(((gridResizing.columnWidth) - gridResizing.columnGap) * _ratio);
			};
			if (gridResizing.singlePost == false) {
				var _figureCells = Math.floor(_imgHeight / gridResizing.columnGap);
				var _figureHeight = _figureCells * gridResizing.columnGap;
			} else {
				var _figureHeight = _imgHeight;
			};
			var _offset = (_figureHeight - _imgHeight) / 2;
			$(this).height(_figureHeight);
			_child.css({
				'height' : _imgHeight,
				'top' : _offset
			});
		});
	}
};
var profileDevice = {
	canvasSupport:false,
	historySupport:false,
	mobileLayout:false,
	touchDevice:false,
	cssFilters:false,
	init:function(){
		profileDevice.canvasSupport = $('#js').hasClass('canvas');
		profileDevice.historySupport = $('#js').hasClass('history');
		profileDevice.touchDevice = $('#js').hasClass('touch');
		profileDevice.cssFilters = $('#js').hasClass('cssfilters');
	},
	isMobile:function(){
		return $('#detect-mobile').is(':visible');
	}
};

Helpers = {
	// converts images to greyscale via canvas - requires canvas support
	greyscale:function(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height;
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			};
		};
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }
};


$(window).load(function(){
	setupSite.init();
});