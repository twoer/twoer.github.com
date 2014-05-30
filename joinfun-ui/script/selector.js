/* selector v3.2 */

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        jqueryui : 'plugin/jquery.ui',
        browser : 'plugin/jquery.browser',
        underscore : 'plugin/underscore',
        datepicker : 'plugin/My97DatePicker/WdatePicker',
        validate : 'plugin/jquery.validate.ext',
        repeat : 'plugin/jquery.repeat',
        select : 'plugin/jquery.select'
    },
    shim:
    {
        jqueryui:
        {
            deps: ['jquery']
        },
        browser:
        {
            deps: ['jquery']
        },
        repeat: 
        {
            deps: ['jquery']
        },
        validate:
        {
            deps: ['jquery']
        },
        select:
        {
            deps: ['jquery', 'jqueryui']
        }

    }
});


require(['components'], function()
{
    var _selector = {};
    var _actionType = actionType || '';
    var _isMultiple = isMultiple || false;

    var $key = $('.text.key');
    var $cateList = $('.cate-list a');
    var $selectedList = $('.selected-list');
    var $sourceList = $('.source-list');

    //set old item
    if(_isMultiple)
    {
        var _oldItems = opener && opener.callBackGetOldItems && opener.callBackGetOldItems(_actionType);
        $selectedList.renderOptions(_oldItems, 'label', 'value');
    }

    var _search = function()
    {
        _selector.search && _selector.search();
    };
    //active search
    $(document).delegate('.button.search, .cate-list a', 'click', function(e)
    {
        var $this = $(this);
        if($this.is('a'))
        {
            $cateList.removeClass('selected');
            $this.addClass('selected');
        }

        _search();
        
    });

    $(document).delegate('.filter .select', 'change', function()
    {
        _search();
    });

    //reset
    $(document).delegate('.button.reset', 'click', function(e)
    {
        $cateList.removeClass('selected').first().addClass('selected');
        $key.val('');
        
        _search();
    });

    //close
    $(document).delegate('.button.close', 'click', function()
    {
        window.close();
    });

    //confirm or clear
    $(document).delegate('.button.confirm,.button.clear', 'click', function()
    {
        var $this = $(this);
        var _items = [];

        //is clear
        if($this.hasClass('clear'))
        {
            opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
            return;
        }

        if(_selector.confirm)
        {
            _selector.confirm(_items);
        }
        else
        {
            (_isMultiple ? $selectedList.find('option') : $sourceList.find('option:selected')).each(function()
            {
                var $this = $(this);
                _items.push(
                {
                    value : $this.val(),
                    label : $this.text()
                });
            });
        }

        opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);

        window.close();
    });

    //move to right
    $(document).delegate('.operate-list .right', 'click', function()
    {
        var _items = $selectedList.find('option');
        $sourceList.find('option:selected').prop('selected', false).each(function()
        {
            var $this = $(this);
            if(_items.filter('[value="' + $this.val() + '"]').size() === 0)
            {
                $selectedList.append($this.clone());
            }
        });
    });

    //move  left
    $(document).delegate('.operate-list .left', 'click', function()
    {
        $selectedList.find('option:selected').remove();
    });

    //remove all left
    $(document).delegate('.operate-list .all-left', 'click', function()
    {
        $selectedList.empty();
    });

    //source list dblclick
    $(document).delegate('.source-list', 'dblclick', function()
    {
        _isMultiple ? $('.operate-list .right').trigger('click') : $('.button.confirm').trigger('click');
    });

    //enter active search
    $(document).delegate('.text.key', 'keypress', function(e)
    {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if(keyCode != 13)
            return;
        
        _selector.search && _selector.search();
        e.preventDefault();
    });

    //get sub select 
    $(document).delegate('.select[data-sub-select]', 'change', function()
    {
        _selector.fillSubSelect && _selector.fillSubSelect(this);
    });

    (typeof requireReady === 'function') && requireReady(_selector);
}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});
