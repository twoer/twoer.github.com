/* workspace v2.0 */

require.config( 
{
    paths: 
    {
        jquery: 'jquery',
        utils : 'utils'
    },
    shim:
    {
    	utils:
        {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'utils'], function()
{

	//open max window
	$(document).delegate('a[data-open="maxWindow"]', 'click', function()
	{
		Utils.openMaximizeWindow($(this).attr('href'));
		return false;
	});

	/*nav*/
	$(document).delegate('.nav-list .item > a', 'click', function(e)
	{
		var _fullScreen = $('.wrap').hasClass('full-screen');
		var $this = $(this);
		var $item = $this.closest('.item').addClass('selected');
		var $items = $this.closest('.nav-list').find('.item');
		var _index = $items.index($item);
		$items.not($item).removeClass('selected');

	 	$('.side-menu-list .menu-item').hide().eq(_index).show();

	 	e.stopPropagation();

		if(!_fullScreen)
		{
			return;
		}

		var $subMenus = $items.find('.menu-item');
		var $subMenu = $item.find('.menu-item');

		$subMenus.not($subMenu).slideUp(300);
		!$subMenu.is(':animated') && $subMenu.slideToggle(300);
	});

	/*side menu*/
	$(document).delegate('.side-menu-list .menu dt a', 'click', function()
	{
		var $menu = $(this).closest('.menu').toggleClass('fold');
		$menu.attr('data-height') ? null : $menu.attr('data-height',$menu.outerHeight(true));
		$menu.hasClass('fold')? 
		$menu.animate({ height: $menu.find('dt').outerHeight(true) }, 300 ) : 
		$menu.animate({ height: $menu.attr('data-height') }, 300 ) 
	});

	$(document).delegate('.side-menu-list .menu dd a, .nav-list .menu dd a', 'click', function()
	{
		var $this = $(this);
		var _href = $this.attr('href');
		$this.closest('.menu-item').find('a').removeClass('selected');

		var $alla  = null;
		//side menu list
		if($this.closest('.side-menu-list').size() === 0 )
		{
			$alla = $('.side-menu-list .menu-item:visible a');
		}	
		//nav menu list 
		else
		{
			$alla = $('.nav-list .item.selected a');
		}
		$('.side-menu-list .menu-item a,.nav-list .menu-item a').removeClass('selected');
		$alla.filter('[href="' + _href+ '"]').addClass('selected');
		$this.addClass('selected');
	});


	// document click
	$(document).on('click', function()
	{
		var _dom = window.document;
		if(window.top != window)
			_dom = window.top.document;
		$('.nav-list .menu-item', _dom).slideUp(300);
	});

	/*create nav*/
	$(document).delegate('.icon-list .icon-more', 'click', function()
	{
		var $moreIcon = $('.more-icon');
		$moreIcon.find('.icon-list').hide();
		$moreIcon.animate({left: '0%'}, 800);
		$('.' + $(this).attr('data-more')).show();
		$('.default-icon').animate({'margin-left': '-100%'},800);

	});

	$(document).delegate('.more-icon .icon-back', 'click', function()
	{
		$('.default-icon').animate({'margin-left': '0px'},800);
		$('.more-icon').animate({left: '100%'}, 800);
	});

	$(document).delegate('.nav .zoom', 'click', function()
	{
		fullScreen();
	});

	//copy nav
	$('.nav').append($('.user-info-list').clone()).append('<a href="javascript:;" class="zoom"></a>');
	var $sideMenuList = $('.side-menu-list');
	$('.nav-list .item').each(function(i)
	{
		$(this).append( $sideMenuList.find('.menu-item:eq(' + i + ')').clone());
	});

	//workspace
	var $container = $('.container');
    var _doSize = function()
    {
    	var _isFullScreen = $('.wrap').hasClass('full-screen');
    	var _isHideNav = $('.wrap').hasClass('hide-nav');
    	var _height = $(window).height();
    	if(_isFullScreen)
    	{
    		_height =  _height - 48;
    	}
    	else if(_isHideNav)
    	{
    		_height =  _height - 100;
    	}
    	else
    	{
    		_height =  _height - 138;	
    	}
    	
    	$container.height(_height);
    };

	if(window.top == window)
	{
		$(window).resize(function()
	    {
	    	_doSize();
	    }).trigger('resize');
	    
	    //nav
		$('.nav-list .item:eq(0) > a').trigger('click');	
	}

	//full screen 
	function _fullScreen()
	{
		if($('.hd:animated').size() > 0)
		{
			return;
		}
		var $wrap = $('.wrap');
		if($wrap.hasClass('full-screen'))
		{
			$wrap.toggleClass('full-screen');
			$('.hd').animate({height: 90}, 400);
			$('.container').animate({'padding-left': 225}, 200, function()
			{
				$(window).trigger('resize');
			});
		}
		else
		{
			$('.hd').animate({height: 0}, 400);
			$('.container').animate({'padding-left': 0}, 200, function()
			{
				$wrap.toggleClass('full-screen');
				$(window).trigger('resize');
			});
		}
	}

	window['fullScreen'] = _fullScreen;


}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});


