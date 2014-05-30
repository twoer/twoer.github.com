/* upload-help v2.0 */

var _uploadFileDialog = null;
var _uploadFileSender = null;
var _uploadFileCallback = null;
var _uploadFileKey = '';

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        utils : 'utils',
        selector : 'selector-help',
        upload : 'upload-help',
        jqueryui : 'plugin/jquery.ui',
        browser : 'plugin/jquery.browser',
        underscore : 'plugin/underscore',
        datepicker : 'plugin/My97DatePicker/WdatePicker',
        validate : 'plugin/jquery.validate.ext',
        repeat : 'plugin/jquery.repeat',
        select : 'plugin/jquery.select',
        dialog : 'plugin/jquery.dialog.ext'
    },
    shim:
    {
        utils:
        {
            deps: ['jquery']
        },
        selector:
        {
            deps: ['jquery', 'components', 'utils', 'selector-help-config']
        },
        upload:
        {
            deps: ['jquery']
        },
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
        dialog : 
        {
        	deps: ['jquery', 'jqueryui']
        }
    }
});

require(['components', 'dialog'], function()
{   
	//add file
	$(document).delegate('.upload-multiple-file .add-file', 'click', function()
	{
		var _url= _getUrl('data-add-url', this);
		var _key = _uploadFileSender.attr('data-upload-file-key');
		if(_key === undefined || _key.length === 0)
		{
			_key = 'upload-file-' + +new Date();
			_uploadFileSender.attr('data-upload-file-key', _key);
		}

	   	_uploadFileDialog = $.dialog('open',
		{
		    name :_key,
		    title : _lang['upload-file-dialog-title'],
		    src : _url,
		    modal :true,
		    width :990,
		    height:450,
		    frameScrolling : 'no',
		    close : function(event, ui)
	        {
	            $.dialog('frameRefresh', _key);
	        }
		});
	});

	//delete file
	$(document).delegate('.upload-multiple-file .delete-file', 'click', function()
	{
		var _this = this;
		var _url = _getUrl('data-delete-url', _this);
		$.microConfirm(
	    {
	        message : _lang['confirm-delete-file'],
	        confrim : _lang['confirm'],
	        cancel : _lang['cancel'],
	        onConfirm : function()
	        {
	    		$(_this).closest('li').remove();

				_updateFileValue();		
	        }
	    }, this);
	   	
	});

	//download file
	$(document).delegate('.upload-multiple-file .download-file', 'click', function()
	{
		var _url= _getUrl('data-download-url', this);

	   	$(this).attr('target', '_blank').attr('href', _url);
	});

	function _deleteFile(sender)
	{
		var _url = _getUrl('data-delete-url', sender);

		$.post(_url,function(data)
		{	
			if(data === true)
			{
				$(sender).closest('li').remove();

				_updateFileValue();				
			}
			else
			{
				$.microTip({message : _lang['delete-file-error']}, sender);
			}
		},'json');
	}

	function _getUrl(attr, sender)
	{
		var $sender = $(sender);
		_uploadFileSender =  $sender.closest('.upload-multiple-file');
		var _url = _uploadFileSender.attr(attr);
		var _id = $sender.closest('li').attr('data-file-id');
		_url = _url.replace(/{id}/g, _id);
		return _url;
	}

	_uploadFileCallback = function(data)
	{
		if(!_uploadFileSender || !data)
		{
			return;
		}

		var _tmpl = '<li data-file-id="{0}">' +
						'<a href="javascript:;" class="delete-file" ></a>' +
                    	'<a href="javascript:;" class="download-file">{1}</a>' +
                    '</li>';

        var _str = _tmpl.replace('{0}', data.id).replace('{1}', data.fileName);
        _uploadFileSender.find('.file-list').append(_str);

        _updateFileValue();
	}

	_updateFileValue = function()
	{
		var _value  = [];
		_uploadFileSender.find('li[data-file-id]').each(function()
		{
			_value.push($(this).attr('data-file-id'));
		});

		_uploadFileSender.find(':hidden').val(_value.join(','));
	}
	
}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

