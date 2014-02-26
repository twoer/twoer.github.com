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

//selector dialog
$(document).delegate('a[data-selector]', 'mousedown', function()
{
	var $this = $(this);
	var _cate = $this.attr('data-selector');

	_showOverlay();

	$('.selector-dialog-' + _cate).show();
});


function _showOverlay()
{
	var $overlay =	$('.overlay');
	$overlay = ($overlay.size() === 0) ? $('<div class="overlay"></div>').appendTo($('body')) : $overlay;
	$overlay.show();
	$('html').addClass('overlay');
}