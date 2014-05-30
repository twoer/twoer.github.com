/* selector v3.2 */

(function()
{	
	var _ = {};
	var _selectorAction = {};
	var _selectorSplit = window['_selectorKeySplit'] || ',';
	_.main = function($sender)
	{
		_selectorSplit = $sender.attr('data-selector-split') || _selectorSplit;
		
		var _actionType = $sender.attr('data-action-type');
		
		// var _regex = /^(?:(\w+)-)?(\w+)\??([^@]*)?@?(\w*)?(?:\(['"](.*)['"]\))?$/i;
		var _regex = /^(?:(\w+)-)?(\w+)\??([^@]*)?@?(\w*)?(?:\((['"].*['"])\))?$/i;
		var _matches = _actionType.match(_regex);

		if(!_matches)
		{
			return;
		}

		//get el value
		var _params = $.unparam(_matches[3]);
		$.each(_params, function(key, value)
		{
			value = (value.match(/^\((.*)\)$/) || [])[1];
			value && (_params[key] = $(value).val()); 
		});

		_selectorAction = 
		{
			sender : $sender,
			type : _matches[1] || '',
			action : _matches[2] || '',
			params : _params,
			fun : _matches[4] || '',
			args : []
		};

		//get args
		var _argsstr = _matches[5] || '';
		var _argsregex = /['"]([^'"]+)['"]/g;
		var _argsmatches = null;
		while((_argsmatches = _argsregex.exec(_argsstr)) != null)
		{
			_selectorAction.args.push(_argsmatches[1]);
		}

		this.openSelectorWindow();
	};

	_.openSelectorWindow = function()
	{
		var _type = _selectorAction.type;

		//fix single selector emp
		_type = _type === '' ? 'S' : _type;

		var _selectorAttr = _selectorType[_type];
		var _params = 
		{
			actionType : _selectorAction.action,
			isMultiple : _selectorAttr.isMultiple || false
		};
		$.extend(_params, _selectorAction.params);
		_selectorAction.attr = _selectorAttr;

		var _url = (_selectorAttr.ctx || ctx ) + _selectorAttr.url ;
		_url.indexOf('?') === -1 ? _url += '?' : _url += '&';
		_url += $.param(_params);

		Utils.openWindow(_url, _selectorAttr.size);
	};

	_.callBackGetOldItems = function(actionType)
	{
		if(!actionType || _selectorAction.action !== actionType)
		{
			alert("callback 时 actionType 不能为空。");
			return;
		}
		var _items = [];
		var $sender = _selectorAction.sender;
		if(!$sender.is('input'))
		{
			var $select  = $sender.closest('.multiple-selector').find('select[multiple]');
			$select.find('option').each(function()
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
		else if($sender.val() === '')
		{
			return _items;
		}
		else
		{
			var _labels = $sender.val().split(_selectorSplit);
			var _values = $sender.nextAll(':input[type="hidden"]:first').val().split(_selectorSplit);
			for(var i = 0, l = _labels.length ; i < l; i++) 
			{
				_items.push(
				{
					value : _values[i],
					label : _labels[i]
				});
			};
		}
		return _items;
	};

	_.callBackSelectedOK = function(items, actionType)
	{
		items = items || [];
		if(!actionType || _selectorAction.action !== actionType)
		{
			alert("callback 时 actionType 不能为空。");
			return;
		}

		var $sender = _selectorAction.sender;

		//multiple 
		var $select  = $sender.closest('.multiple-selector').find('select[multiple]');
		if(_selectorAction.attr.isMultiple && $select.size() > 0)
		{
			$select.empty().renderOptions(items, 'label', 'value');
		}
		//multiple and input
		else if(_selectorAction.attr.isMultiple && $sender.is('input'))
		{
			var _label = [];
			var _value = [];
			$.each(items, function(i, item)
			{
				_label.push(item.label);
				_value.push(item.value);
			});

			$sender.val(_label.join(_selectorSplit)).next(':hidden').val(_value.join(_selectorSplit));
		}
		//single
		else
		{
			var _label = items[0] ? items[0][_selectorAction.params.text || 'label'] : '';
			var _value = items[0] ? items[0][_selectorAction.params.value || 'value'] : '';
			
			$sender.val(_label).next(':hidden').val(_value);
		}
		
		//callback
		if(!_selectorAction.fun)
		{
			return;
		}
		if(_selectorFun[_selectorAction.fun])
		{
			_selectorFun[_selectorAction.fun](_selectorAction.args, _selectorAction.action, items)
		}
		else
		{
			window[_selectorAction.fun] && window[_selectorAction.fun](_selectorAction.args, _selectorAction.action, items);;
		}
	};

	window['Selector'] = _;
	window['callBackSelectedOK']= _.callBackSelectedOK;
	window['callBackGetOldItems']= _.callBackGetOldItems;

	//icon selector change
	$(document).delegate('.text-icon-selector[data-action-type][data-edit!="true"],.text-icon-people[data-action-type][data-edit!="true"], .multiple-selector a[data-action-type], .text-icon-placeholder', 'click', function(e)
	{
		var $this = $(this);
		$this.is('.text-icon-placeholder') ? ($this = $this.prev(':text[data-action-type]')) : $this;
		
		Selector.main($this);
	});

	//multiple delete
	$(document).delegate('.multiple-selector .icon-delete-20', 'click', function(e)
	{
		var $options  = $(this).closest('.multiple-selector').find('select[multiple] option:selected');
		if($options.size() === 0 )
		{
			alert(_lang['delete-mustone']);
		}
		else
		{
			$options.remove();
		}
	});
	
})();

