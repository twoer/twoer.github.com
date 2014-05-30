/* jquery data list input */
;(function($)
{
    var KEY_CODE_ESCAPE = 27,
        KEY_CODE_UP = 38,
        KEY_CODE_DOWN = 40,
        KEY_CODE_LEFT = 39,
        KEY_CODE_RIGHT = 37,
        KEY_CODE_ENTER = 13;

    var $datalistinput = null,
    	$datalist = null,
    	$dataitem = null,
    	$value = null,
    	$key = null;

    $(document).delegate('.data-list-input .data-list li[data-value]', 'click', function()
    {
    	$dataitem = $(this);

        _setGlobalVars();

        _setValue();

        _hide();
    });

    $(document).delegate('.data-list-input .data-list li[data-value]', 'mouseover mouseout', function(e)
    {
    	var $this = $(this);
    	$datalist.find('li[data-value]').removeClass('selected');
    	if(e.type === 'mouseout')
    	{
    		$this.removeClass('selected');
    	}
    	else
    	{
    		$this.addClass('selected');
    	}

    	$dataitem = $(this);

    	_setGlobalVars();

    });

    $(document).delegate('.data-list-input *[data-role="value"]', 'click', function(e)
    {
    	_setGlobalVars();

        var $this = $(this);
        var $newdatalist = $this.closest('.data-list-input').find('.data-list');

        if($datalist.size() > 0 && !$datalist.is($newdatalist[0]))
        {
            $datalist.hide();
        }
        else
        {
            $newdatalist.show();
        }
        $datalist = $newdatalist;

        e.stopPropagation();
    });

    $(document).delegate('.data-list-input *[data-role="value"]', 'keydown', function(e)
    {
    	$datalist = $(this).closest('.data-list-input').find('.data-list');
    	if($datalist.is(':hidden'))
    	{
        	$datalist.show();
        	return true;
    	}

    	_setGlobalVars();

        var _keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;

        if(_keyCode !== KEY_CODE_UP && _keyCode !== KEY_CODE_DOWN && _keyCode !== KEY_CODE_ENTER)
        {
        	return true;
        }

    	var $selected = $datalist.find('li.selected[data-value]');

        var _selected = $selected.index();
        var _total = $datalist.find('li[data-value]').size();

        if(_keyCode === KEY_CODE_DOWN)
        {
        	_selected ++;
        }
        if(_keyCode === KEY_CODE_UP)
        {
        	_selected --;
        }

        if(_selected === -2)
        {
        	_selected = _total - 1;
        }
        if(_selected === _total)
        {
        	_selected = 0;
        }
        
       	$selected = $datalist.find('li[data-value]:eq(' + _selected + ')');

       	$datalist.find('li[data-value]').removeClass('selected');
        $selected.addClass('selected');

        $dataitem = $selected;

        if(_keyCode !== KEY_CODE_ENTER)
        {
        	_setValue();
        }
        if(_keyCode === KEY_CODE_ENTER && $datalist.size() > 0)
        {
        	_setValue();
        	_hide();
        }

        return true;
    });

    $(document).click(function(e)
    {
        $('.data-list-input .data-list:visible').hide();
    });

   	var _setValue = function()
    {
    	$value.is(':input') ? $value.val($dataitem.attr('data-value')) : $value.html($dataitem.attr('data-value'));
        $key.val($dataitem.attr('data-key'));
    };

    var _hide = function()
    {
    	$datalist.hide();
    };

    var _setGlobalVars = function()
    {
    	$datalist = $('.data-list-input .data-list:visible');
        $datalistinput = $datalist.closest('.data-list-input');
        $value = $datalistinput.find('*[data-role="value"]');
        $key = $datalistinput.find('*[data-role="key"]');
    };

})(jQuery);
