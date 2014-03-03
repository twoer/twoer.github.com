//menu
$(document).delegate('.hd .left-link.menu', 'mousedown', function()
{
	var $this = $(this);
	var _height = [$(window).height(), $('.main .content').height() ].sort(function(i, j){return i > j ? -1 : 1}).shift();
	var _dataShowMenu = ($this.attr('data-show-menu') === 'true');
	var _showwidth = '200px';
	var _animateTime = 200;

	if(_dataShowMenu)
	{
		_showwidth = '0%';
		$this.attr('data-show-menu', false);
	}
	else
	{
		$this.attr('data-show-menu', true);
	}

	_dataShowMenu ? _showwidth = '0%' : _showwidth = '200px';

	$('.main .side-menu').stop().height(_height).animate(
	{
		'left' : _showwidth === '0%' ? '-200px' : '0%'
	}, _animateTime);

	$('.main .content').stop().width($(window).width()).animate(
	{
		'margin-left' : _showwidth
	}, _animateTime);

	$('.main .hd-fixed,.main .fix-fixed').stop().width($(window).width()).animate(
	{
		'left' : _showwidth
	}, _animateTime);
});

//refresh
$(document).delegate('.hd .right-link.refresh', 'mousedown', function()
{
	window.location.reload();
});

//back
$(document).delegate('.hd .left-link.back', 'mousedown', function()
{
	window.history.go(-1);
});

//tabs
$(document).delegate('.tabs .tab-nav li', 'mousedown', function()
{
    var $this = $(this);
    var $nav = $this.closest('.tab-nav');
    var index = $this.index();

    $nav.find('li').removeClass('selected').eq(index).addClass('selected');
    $nav.next('.tab-content').find('.tab-pane').hide().end().find(' > div:eq(' + index + ')').show();
});

$('.tabs .tab-nav').each(function()
{
    var $this = $(this);
    var index = $this.find('li.selected').index();
    $this.next('.tab-content').find('.tab-pane').not(':eq(' + index + ')').hide();
});


//show approve content
$(document).delegate('.approve-bar .button-approve', 'mousedown', function()
{
	_showApproveContent();
});

$(document).delegate('.approve-content .button-pass', 'mousedown', function()
{
	alert('pass');
});
$(document).delegate('.approve-content .button-return', 'mousedown', function()
{
	alert('return');
});
$(document).delegate('.approve-content .button-deny', 'mousedown', function()
{
	alert('deny');
});
$(document).delegate('.approve-content .button-back', 'mousedown', function()
{
	alert('back');
});

//business transaction
$(document).delegate('.business-transaction .right-link.confirm', 'mousedown', function()
{
	$(this).closest('.content').toggleClass('show-approve');

	//one checked (delegate 方式在 iphone，ipad 下面有 bug)
	$('.bill-list .check').unbind('mousedown').bind('mousedown', function()
	{
		$(this).closest('li').toggleClass('checked');
	});
});

// tab 切换时处理 check all 按钮
$(document).delegate('.business-transaction .tabs .tab-nav li', 'mousedown', function()
{
	var $checkall = $('.business-transaction .approve-bar .check-all');
	var $items = $('.business-transaction .content .bill-list:visible li');
	($items.size() === $items.filter('.checked').size()) ? $checkall.addClass('checked') : $checkall.removeClass('checked');
});



//all checked
$(document).delegate('.business-transaction .approve-bar .check-all', 'mousedown', function(e)
{
	var $this = $(this);
	var $items = $('.business-transaction .content .bill-list:visible li');
	if($this.hasClass('checked'))
	{
		$items.removeClass('checked');
		$this.removeClass('checked');
	}
	else
	{
		$items.addClass('checked');
		$this.addClass('checked');
	}
});

//bill details approve
$(document).delegate('.bill-details-approve .right-link.confirm', 'mousedown', function()
{
	_showApproveContent();
});

//selector dialog
$(document).delegate('*[data-selector]', 'mousedown', function()
{
	var $this = $(this);
	var _cate = $this.attr('data-selector');

	_showOverlay();

	$('.selector-dialog-' + _cate).show();
});
$(document).delegate('*[data-selector-url]', 'mousedown', function()
{
	var $this = $(this);
	var _url = $this.attr('data-selector-url');
	window.location.replace(_url);
});




function _showOverlay()
{
	var $overlay =	$('div.overlay');
	$overlay = ($overlay.size() === 0) ? $('<div class="overlay"></div>').appendTo($('body')) : $overlay;
	$overlay.show();
	$('html').addClass('overlay');
}

function _hideOverlay()
{
	$('div.overlay').hide();
	$('html').removeClass('overlay');
}

//show approve content
function _showApproveContent()
{
	$('.approve-content').show();
	_showOverlay();

	$('div.overlay').unbind('mousedown').bind('mousedown', function()
	{
		$('.approve-content').hide();
		_hideOverlay();
	});
}