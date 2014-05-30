//jquery tab pages

;(function()
{
	var _ = {};

	var $tabpages = $(window.top.document).find('.tab-pages');
	var $tabheader = $tabpages.find('.tab-header');
	var $tabnavswitch = $tabpages.find('.tab-nav-switch');
	var $tabnav = $tabpages.find('.tab-nav');
	var $tabcontent = $tabpages.find('.tab-content');
	var _navTmpl = '<li class="selected"><a href="{url}" data-tab-role="nav">{title}<i data-tab-role="close"/></a></li>';
	var _contentTmpl = '<div><iframe scrolling="auto" frameborder="0" src="{url}"></iframe></div>';

    //get new nav
    _.getNav = function(url)
    {
        return $tabnav.find('a[href="' + url + '"]').closest('li');
    };
	
	_.add = function(title, url, config)
	{
		var $nav = _.getNav(url);
		var _refresh = true;
		
		if($nav.size() === 0 )
		{
			var _nav = _navTmpl.replace(/{url}/, url).replace(/{title}/, title);
			var _content = _contentTmpl.replace(/{url}/, url);

			$tabnav.append(_nav);
			$tabcontent.append(_content);

			$nav = _.getNav(url);

			_refresh = false;
		}

		_.change(url, _refresh);	
	};

    //close tab
    _.close = function(url)
    {
        var $nav = _.getNav(url);
        var $next = (($nav.next('li').size() === 0) ? $nav.prev('li') : $nav.next('li')).find('a[data-tab-role="nav"]');

        var _index = $nav.index();

        $tabnav.find('> li').eq(_index).remove();
        $tabcontent.find('> div').eq(_index).remove();

        _.change($next.attr('href'));
    };

	//change tab
	_.change = function(url, refresh)
	{	
    	var $nav = _.getNav(url);
    	var _index = $nav.index();
		var $content = $tabcontent.find('> div').eq(_index);

		$tabnav.find('> li').not($nav.addClass('selected')).removeClass('selected');
		$tabcontent.find('> div').not($content.show()).hide();

		if(refresh)
		{
			var $iframe = $content.find('iframe');
			$iframe.attr('src', url);
		}

        _._reposition($nav);
	};

    //reposition tab nav
	_._reposition = function($nav)
	{
		$tabnav.css('width' , 9000);
		var _width = 0;
		$tabnav.find('> li').each(function()
		{
			_width += $(this).outerWidth(true);
		});

		$tabnav.css('width', _width);

		var _marginleft = Math.abs(parseInt($tabnav.css('margin-left')));
        var _siwtchwidth = $tabnavswitch.outerWidth(true);
        var _headerwidth = $tabheader.outerWidth(true) - _siwtchwidth;
        var _navwidth = $tabnav.outerWidth();

        var _newmarginleft = 0;


        (_headerwidth > _navwidth) ? $tabnavswitch.hide() : $tabnavswitch.show();

        if(_headerwidth <= _navwidth && _marginleft !== 0)
        {
            _newmarginleft =  -(_navwidth - _headerwidth );
        }
        _._tabnavScroll(_newmarginleft); 


        if(!$nav)
        {
            return;
        }  

        _newmarginleft = 0;
        _marginleft = Math.abs(parseInt($tabnav.css('margin-left')));
        $nav = $nav.closest('li');
        var _navpositionleft = $nav.position().left;

        if(_navpositionleft < 0 )
        {
            _newmarginleft = _headerwidth - (_navpositionleft + _marginleft + $nav.outerWidth(true));
        }
        else if(_navpositionleft >= 0 && _marginleft === 0)
        {
            _newmarginleft = -(_navpositionleft  + $nav.outerWidth(true) - _headerwidth);
        }
        else if(_navpositionleft >= 0 && _headerwidth > (_navpositionleft + $nav.outerWidth(true)))
        {
            _navpositionleft = 0;
        }
        else if(_navpositionleft >= 0 && _headerwidth < (_navpositionleft + $nav.outerWidth(true)))
        {
            _newmarginleft = -(_navpositionleft  + _marginleft + $nav.outerWidth(true) - _headerwidth);
        }

        if(_newmarginleft === 0)
        {
            return;
        }
        else if(_newmarginleft > 0)
        {
            _newmarginleft = 0;
        }

        _._tabnavScroll(_newmarginleft); 
	};

    _._tabnavScroll = function(_left)
    {
        $tabnav.stop().animate(
        {
            'margin-left' : _left
        }, 400);
    };

    //sitch prev next tab
	_._tabSwitch = function(args)
	{
    	var _marginleft = Math.abs(parseInt($tabnav.css('margin-left')));
    	var _siwtchwidth = $tabnavswitch.outerWidth(true);
    	var _headerwidth = $tabheader.outerWidth(true) - _siwtchwidth;
    	var _navwidth = $tabnav.outerWidth();
    	var _movewidth = _headerwidth / 2;

    	var _newmarginleft = 0;

    	if(args === 'prev')
    	{
    		if(_marginleft > _movewidth)
    		{
    			_newmarginleft = -(_marginleft - _movewidth)
    		}
    	}
    	else
    	{
    		_newmarginleft = -(_marginleft + _movewidth);

    		if(_marginleft + _headerwidth + _movewidth > _navwidth)
    		{
    			_newmarginleft = -(_navwidth - _headerwidth);
    		}
    	}

    	if(_headerwidth > _navwidth)
    	{
    		_newmarginleft = 0;
    	}

        _._tabnavScroll(_newmarginleft);
	};

	_.tabPrev = function()
	{
		_tabSwitch('prev');
	};

	_.tabNext = function()
	{
		_tabSwitch('next');
	}

    //add tab
    $(document).delegate('a[data-open="tab"]', 'click', function()
    {
    	var $this = $(this);
    	_.add($this.attr('data-tab-title') || $this.text(), $this.attr('href'));
        return false;
    });

    //change tab
    $(document).delegate('.tab-pages .tab-nav a[data-tab-role="nav"]', 'click', function()
    {
    	_.change($(this).attr('href'));
    	return false;
    });

    //close tab
    $(document).delegate('.tab-pages .tab-nav i[data-tab-role="close"]', 'click', function(e)
    {
        _.close($(this).closest('a').attr('href'));

        e.preventDefault();
        return false;	
    });

    //switch tab
    $(document).delegate('.tab-pages .tab-nav-switch a', 'click', function(e)
    {
    	_._tabSwitch($(this).is('.prev') ? 'prev' : 'next');
    });

    //contentmenu tab
    $(document).delegate('.tab-pages .tab-nav a[data-tab-role="nav"]', 'mousedown', function(e)
    {
        if(e.which !== 3)
        {
            return true;
        }

        alert('xx');
    });

    //window resize do reposition
    $(window).resize(function()
    {
    	_._reposition();
    });;


    _._reposition();

    window['tabpages'] = _;

})();