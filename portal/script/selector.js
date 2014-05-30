/* selector v2.0 */

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
        select : 'plugin/jquery.select',
        tree : 'plugin/jquery.ztree'
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
        },
        tree:
        {
            deps: ['jquery']
        }

    }
});

require(['jquery'], function()
{
    //selector inner 
    if(location.search.search('selector=all') > 0)
    {
        $('.selector').addClass('selector-inner');
    }
});


require(['components', 'tree'], function()
{
    var _selector = {};
    var _actionType = actionType || '';
    var _isMultiple = isMultiple || false;
    var _isAll = ($('.selector.selector-all').size() === 1);
    var _isInner = ($('.selector.selector-inner').size() === 1);

    var $key = $('.text.key');
    var $letterList = $('.letter-list a');
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
    $(document).delegate('.button.search', 'click', function(e)
    {
        _search();   
    });

    $(document).delegate('.filter .select', 'change', function()
    {
        _search();
    });

    //reset
    $(document).delegate('.column .button.reset', 'click', function(e)
    {
        $letterList.removeClass('selected').first().addClass('selected');
        $key.val('');
        
        _search();
    });

    //close
    $(document).delegate('.button.close', 'click', function()
    {
        window.close();
    });

    //confirm or clear
    $(document).delegate('.button.confirm, .button.clear', 'click', function()
    {
        var $this = $(this);
        var _items = [];

        //is clear
        if($this.hasClass('clear'))
        {
            opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
            window.close();
            return;
        }

        if(_selector.confirm)
        {
            _selector.confirm(_items);
        }
        else
        {
            if(!_ztreeApi || (_ztreeApi && _isMultiple))
            {
                (_isMultiple ? $selectedList.find('option') : $sourceList.find('option:selected')).each(function()
                {
                    var $this = $(this);
                    var _item = {};
                    _item.value = $this.val();
                    _item.label = $this.text();

                    //ext attrs 
                    var _attrs = $this[0].attributes;
                    for(var i in _attrs)
                    {
                        var _attr = _attrs[i];
                        var _match = ( _attr.name && _attr.name.match(/^data-(.*)/));
                        if(!_match || _match.length !== 2)
                        {
                            continue;
                        }
                        _item[_match[1]] = _attr.value;
                    }
                    _items.push(_item);
                });
            }
            else
            {
                var _treenode = _ztreeApi.getSelectedNodes()[0]
                if(_treenode)
                {
                    var _item = {};
                    _item.value = _treenode.id;
                    _item.label = _treenode.name;

                    //ext attrs 
                    for(var attr in _treenode)
                    {
                        var _match = ( attr && attr.match(/^data-(.*)/));
                        if(!_match || _match.length !== 2)
                        {
                            continue;
                        }
                        _item[_match[1]] = _treenode[attr];
                    }

                    _items.push(_item);

                    debugger;
                }
            }
            
        }

        opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);

        window.close();
    });

    //move to right
    $(document).delegate('.operate-list .right', 'click', function()
    {
        if(_isAll)
        {
            var $iframe = $('.tab-cnt-list iframe:visible')[0].contentWindow;
            $sourceList = $('.source-list', $iframe.document);
            $selectedList = $('.selected-list');
            _ztreeApi = $iframe._ztreeApi;
        }

        if(_isInner)
        {
            $selectedList = $('.selected-list', parent.document);
        }

        var _items = $selectedList.find('option');
        $sourceList.find('option:selected').prop('selected', false).each(function()
        {
            var $this = $(this);
            if(_items.filter('[value="' + $this.val() + '"]').size() === 0)
            {
                $selectedList.append($this.clone());
            }
        });

        if(!_ztreeApi)
        {
            return;
        }
        $.each(_ztreeApi.getSelectedNodes(), function(i, node)
        {
            if(node['data-checked'] === false)
            {
                return;
            }
            var _item = {};
            if(_items.filter('[value="' + node.id + '"]').size() === 0)
            {
                _item.value = node.id;
                _item.label = node.name;

                //ext attrs 
                for(var attr in node)
                {
                    var _match = ( attr && attr.match(/^data-(.*)/));
                    if(!_match || _match.length !== 2)
                    {
                        continue;
                    }
                    _item[_match[1]] = node[attr];
                }

                $selectedList.renderOptions([_item], 'label', 'value');
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

    //letter selected
    $(document).delegate('.letter-list a[data-value]', 'click', function()
    {
        var $this = $(this);
        $this.closest('.letter-list').find('a').removeClass('selected');
        $this.addClass('selected');

        _search();
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

    //fill sub select 
    $(document).delegate('.select[data-sub-select]', 'change', function()
    {
        _selector.fillSubSelect && _selector.fillSubSelect(this);
    });

    //tree 

    _treeSetting = 
    {
        view: 
        {
            showIcon: false
        },
        data: 
        {
            simpleData: 
            {
                enable: true
            }
        },
        callback: 
        {
            onClick : function(event, treeId, treeNode, clickFlag)
            {
                
            },
            onDblClick : function(event, treeId, treeNode)
            {
                _isMultiple ? $('.operate-list .right').trigger('click') : $('.button.confirm').trigger('click');
            }
        }
    };
    
    (typeof requireReady === 'function') && requireReady(_selector);
}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

var _treeSetting = {};
var _ztreeApi = null;
