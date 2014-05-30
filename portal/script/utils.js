/* utils v2.0 */

(function()
{	
	var _ = {};

	//打开最大窗口
	_.openMaximizeWindow = function(url)
	{
		if(url === undefined)
		{
			alert('url is null....');
			return;
		}
		var option = "height=3600,width=3600,left=0,top=0,resizable=yes,scrollbars=yes";
		var newWindow = window.open(url, "", option);
		try
		{
			newWindow.moveTo(0,0);
			newWindow.resizeTo(screen.availWidth, screen.availHeight);
		}
		catch(ex){}
	};

	_.openWindow = function(url, options)
	{
		if(url === undefined)
		{
			alert('url is null....');
			return;
		}
		var _availSize =	
		{
			width : screen.availWidth,
			height : screen.availHeight	
		};

		if(_.windowHandle && !_.windowHandle.closed)
		{
			_.windowHandle.close();
		}
		
		var _height = options.height || 0;
		var _width = options.width || 0;
		var _left = options.left || (parseInt(_availSize.width) - _width)/2;
		var _top = options.top || (parseInt(_availSize.height) - _height)/2;
		var _resizable = options.resizable || "no";
		var _scrollbars = options.scrollbars || "no";
		
		var _options = "height=" + _height + ",width=" + _width + ",left=" + _left 
			+ ",top=" + _top + ",resizable=" + _resizable + ",scrollbars=" + _scrollbars;
		
		_.windowHandle = window.open(url, "", _options);
	};

	_.appendFromURL = function(url)
	{
		var _newUrl = "";
		if (url.indexOf("?") > -1) 
		{
			_newUrl = url + "&fromURL=" + encodeURIComponent(window.location.href);
		}
		else 
		{
			_newUrl = url + "?fromURL="+ encodeURIComponent(window.location.href);
		}
		return _newUrl;
	};


	_.isDec2 = function(value)
	{
		return /^\d+(\.\d{1,2})?$/.test(value);
	}

	window['Utils'] = _;

})();