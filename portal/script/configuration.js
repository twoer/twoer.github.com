/* configuration v2.0 */

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        utils : 'utils',
        jqueryui : 'plugin/jquery.ui',
        upload : 'upload-help',
        selector : 'selector-help',
        browser : 'plugin/jquery.browser',
        datepicker : 'plugin/My97DatePicker/WdatePicker',
        ectable : 'plugin/ectable',
        validate : 'plugin/jquery.validate.ext',
        select : 'plugin/jquery.select',
        qtip : 'plugin/jquery.ptip',
        tree : 'plugin/jquery.ztree'
    },
    shim:
    {
    	utils:
        {
            deps: ['jquery']
        },
        jqueryui:
        {
            deps: ['jquery']
        },
        upload:
        {
            deps: ['jquery']
        },
        selector:
        {
            deps: ['jquery', 'components', 'utils', 'selector-help-config']
        },
        browser:
        {
            deps: ['jquery']
        },
    	ectable: 
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
        qtip:
        {
            deps: ['jquery']
        },
        tree:
        {
            deps: ['jquery']
        }
    }
});


require(['jquery'], function()
{	


	//action message
	var _actionMessage = $('.action-message').text();
	_actionMessage = (_actionMessage.length > 0 ) && _actionMessage.replace(/^\s+/,'').replace(/\s+$/,'');
	if(_actionMessage.length > 0)
	{
		alert(_actionMessage);
	}

	//list content inner
	if($('.list-content-inner').size() > 0)
	{
		window.parent && $('iframe', window.parent.document).height($('body').outerHeight(true));
	}

	//list content function list
	if($('.list-content.function-member').size() > 0)
	{
		window.parent && $('iframe', window.parent.document).height($('body').outerHeight(true));	
	}


	//party
    //organization

	var $party = $('.list-content-party .ztree');
	var $organization = $('.list-content-organization .ztree');
	
    var _doresize = function()
    {
    	$party.height($(window).height() - 60);
    	$organization.height($(window).height() - 137);
    };

    if($party.size() > 0)
    {
    	$(window).resize(function()
	    {
	    	_doresize();
	    }).trigger('resize');

	    $party.closest('.side').show();
    }

    if($organization.size() > 0)
    {
    	$(window).resize(function()
	    {
	    	_doresize();
	    }).trigger('resize');

	    $organization.closest('.side').show();
    }

    //side vpps tree
	var _treeTimer = null;
	var _treeDuration = 300;
	$(document).delegate('.list-content-organization .side', 'mouseenter mouseleave', function(e)
	{
		clearTimeout(_treeTimer);

		var $this = $(this);
		if($this.is(':animated'))
		{
			return;
		}
		if(e.type === 'mouseenter' && $this.width() !== 400)
		{
			_treeTimer = setTimeout(function()
			{
				$this.animate(
				{
					width : 400
				}, _treeDuration);

			}, _treeDuration);
		}
		else if(e.type === 'mouseleave' && $this.width() === 400)
		{
			_treeTimer = setTimeout(function()
			{
				$this.animate(
				{
					width : 220
				}, _treeDuration);

			}, _treeDuration);
		}

	});

});


require(['components', 'upload', 'select', 'validate', 'ectable', 'tree', 'selector', 'utils', 'datepicker', 'qtip', 'lang-cn'], function(page)
{
	var _configuration = 
	{
		setValidate : function(form, rules, messages)
		{
			this.validate = new validateExt(form, rules, messages);
			this.validateForm = form; 
		}
	};

	//select custom
    $('.select.custom[multiple]').each(function()
    {
        $(this).customSelect({'placeholder' : $(this).attr('data-custom-placeholder') });
    });

	//EC table click
	$(document).delegate('.list-grid-ectable tbody tr', 'click', function(e)
	{
		if($(e.target).is(':checkbox'))
		{
			return;
		}

		var $checkbox = $(this).find(':checkbox[batchdelete]');
		$checkbox.prop('checked') ? $checkbox.prop('checked',false) : $checkbox.prop('checked', true);
	});

	$(document).delegate('.list-grid-ectable tbody a', 'click', function(e)
	{
		e.stopPropagation();
	});

	//testing....
	// (function()
	// {
	// 	if($('body').outerHeight() > $(window).outerHeight() && $('.eXtremeTable').size() > 0)
	// 	{
	// 		$('.eXtremeTable').height($(window).height() - $('.search-fields').outerHeight() - $('.tool-bar').outerHeight() - 10 );
	// 		$('html').css('overflow', 'hidden');
	// 	}
	// })();


	//open / close search fields
	$(document).delegate('.tool-bar-oper .switch-close, .tool-bar-oper .switch-open', 'click', function()
	{
	    $(this).closest('.list-content').toggleClass('fold-search-fields');
	});

	//refresh
	$(document).delegate('.tool-bar-oper .refresh', 'click', function()
	{
	   	location.reload();
	});

	//reset
	$(document).delegate('form :reset', 'click', function()
	{
		var $form = $(this).closest('form');
		$form[0] && $form[0].reset();
	   	$form.find('.text,.select,:hidden').val('');
	   	$form.find(':checkbox').prop('checked', false);
	   	$form.find('.select.custom').reload();
	   	return false;
	});

	//add
	$(document).delegate('.tool-bar-oper .add', 'click', function()
	{
	   	_configuration.add && _configuration.add();
	});

	//batch delete
	$(document).delegate('.tool-bar-oper .batch-delete', 'click', function()
	{
		if(!confirm(_lang['confirm-delete']))
		{
			return false;
		}

		if(_configuration.batchDelete)
		{
			_configuration.batchDelete();
			return false;
		}

		var _deleteItems = $('.list-grid-ectable :checkbox[batchDelete="true"]:checked');
		var _action = $(this).attr('href');
		if(_deleteItems.size() === 0)
		{
			alert(_lang['delete-mustone']);
			return false;
		}
		$("#ec").attr("action", Utils.appendFromURL(_action)).attr('method', 'POST').submit();
		return false;
	});

	//close
	$(document).delegate('.tool-bar-oper .close', 'click', function()
	{
	   	confirm(_lang['confirm-close']) && window.close();
	});

	//save
	$(document).delegate('.tool-bar-oper .save', 'click', function()
	{
		//set form selected option 
		$('.input-content select[multiple] option').prop('selected',true);

	   	if(_configuration.save)
	   	{
	   		_configuration.save();
	   		return false;
	   	}

	   	//save before 
	   	if(_configuration.saveBefore)
	   	{
	   		_configuration.saveBefore();
	   	}

	   	if(!_configuration.validate || (_configuration.validate && _configuration.validate.exec()))
        {
       		$(_configuration.validateForm).submit();
        }
        return false;
	});

	//enter submit
	$(document).delegate('input,select', 'keypress', function(e)
	{
		
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		if(keyCode != 13)
			return;
		
		_configuration.save && _configuration.save();
		e.preventDefault();
	});

	//open max window
	$(document).delegate('a[data-open="maxWindow"]', 'click', function()
	{
		Utils.openMaximizeWindow($(this).attr('href'));
		return false;
	});

	//confirm delete open max window
	$(document).delegate('.list-grid-ectable .icon-delete-20[data-open="appendUrl"]', 'click', function()
	{
		if(!confirm(_lang['confirm-delete']))
		{
			return false;
		}

		var url = Utils.appendFromURL($(this).attr('href'));
		window.location.replace(url);
		return false;
	});

	//on top document click
	$(document).click(function()
	{
		if(window.top != window)
		{
			$('body', window.top.document).trigger('click');
		}	
	});

	//details function member
	$(document).delegate('.function-auth .eXtremeTable .icon-details-20', 'click', function(e)
	{
		e.preventDefault();
		var $this = $(this);
		var $eXtremeTable = $('.eXtremeTable');
		var $iframe = $eXtremeTable.find('iframe');
		if($iframe.size() === 0 )
		{
			$iframe = $('<iframe src="" frameborder="0" scrolling="no"></iframe>').appendTo($eXtremeTable);
		}
		$iframe.attr('src', $this.attr('href')).show();
		
	});

	//get activity info
	var _activityTmpl = '<div class="activity-info-tip"><div><b>{0}：</b>{1}</div><div><b>{2}：</b>{3}</div></div>';
	$('.activity-info').click(function(){return false;}).tip(
    {
        alignTo: 'target',
        alignX: 'right',
        alignY: 'center',
        offsetX: 5,
        content : function(updateCallback)
        {
            $.ajax(
            {
                type: "get",
                url: $(this).attr('href'),
                dataType: "json",
                success: function(data)
                {
                	var _info = _activityTmpl.replace('{0}', _lang['current-activity']).replace('{1}', data.activity).replace('{2}', _lang['current-person']).replace('{3}', data.person);

                    updateCallback(_info);
                },
                error: function(){}
            });
            return 'loadding...';
        }
    });
	
	(typeof requireReady === 'function') && requireReady(_configuration);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});
