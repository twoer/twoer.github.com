//jquery unparam
;(function(a){a.unparam=function(b){var c,d,e=/\[(.*?)\]/g,f=/(.+?)\[/,g={};if((d=a.type(b))!="string"||d=="string"&&!d.length)return{};c=decodeURIComponent(b).split("&");if(!(d=c.length)||d==1&&d==="")return g;a.each(c,function(b,c){if(!c.length)return;d=c.split("=");var h=d.shift(),i=d.join("=").replace(/\+/g," "),j,k,l=[];if(!h.length)return;while(d=e.exec(h))l.push(d[1]);if(!(j=l.length)){g[h]=i;return}j--;d=f.exec(h);if(!d||!(h=d[1])||!h.length)return;if(a.type(g[h])!="object")g[h]={};k=g[h];a.each(l,function(b,c){if(!(d=c).length){d=0;a.each(k,function(a){if(!isNaN(a)&&a>=0&&a%1===0&&a>=d)d=Number(a)+1})}if(b==j){k[d]=i}else if(a.type(k[d])!="object"){k=k[d]={}}else{k=k[d]}})});return g}})(jQuery);

$.extend(
{
	getUrlParams : function()
	{
		var _str  = (window.location.hash.match(/^#.*\/\?(.*)$/i) || [])[1];
		return $.unparam(_str) || {};
	}
});

var _gw = $(window).width();
var _gdpr = window.devicePixelRatio;

var _token = 
{
	x : 'retail',
	y : 'admin',
	z : '270eb6d9f49c54e22f10ad8600146ca5'
};

var _apiUrl = 'http://42.96.130.116:30009/api/trip-claim-api/login';


$.ui.ready(function()
{
    //init tabs
    $('.tabs .tab-content .tab-pane').css('width', _gw);
});


//data mode transition
$(document).delegate('a[href][data-mode-transition]', 'tap', function(e)
{
    var $this = $(this);
    $.ui.showModal($this.attr('href'), $this.attr('data-mode-transition'));
    //e.stopPropagation();
    //return false;
});


//modal tap
$(document).delegate('#modalContainer', 'tap', function(e)
{
	if($(e.target).closest('.panel-request-approve').size() > 0)
	{
		return;
	}
    $.ui.hideModal();
});




//tabs
$(document).delegate('.tabs .tab-nav li', 'tap', function(e)
{
    var $this = $(e.target).closest('li');
    var $tab = $this.closest('.tabs');
    var $nav = $tab.find('.tab-nav');
    var $content = $tab.find('.tab-content');
    var _index = $this.index();
    var _count = $nav.find('li').size() - 1;

    $nav.find('li').removeClass('selected').eq(_index).addClass('selected');
    $content.cssTranslate(- + _gw * _index +'px, 0px');
});


//menu button
$(document).delegate('#header #menuButton', 'tap', function()
{
	$.ui.toggleSideMenu();
});

//差旅费报销
$(document).delegate('.header-travel-expenses-create #deleteButton', 'click', function(e)
{
	alert('xxx');
	e.preventDefault();
	return false;
});

//借款单
//one check
$(document).delegate('.panel-selector-borrowing-list .borrowing-list .checkbox', 'tap', function(e)
{
	$(e.target).closest('li').toggleClass('checked');

	var $checkbox = $('.panel-selector-borrowing-list .borrowing-list li');
	var $checkboxAll = $('.footer-selector-borrowing-list .action .checkbox-all');
	var _count = $checkbox.size();
	var _checkCount = $checkbox.filter('.checked').size();

	(_count === _checkCount) ? $checkboxAll.addClass('checked') : $checkboxAll.removeClass('checked');

});

//all check
$(document).delegate('.footer-selector-borrowing-list .action .checkbox-all', 'tap', function(e)
{
	var _checked = $(e.target).toggleClass('checked').hasClass('checked');
	var $checkbox = $('.panel-selector-borrowing-list .borrowing-list li');

	_checked ?  $checkbox.addClass('checked') : $checkbox.removeClass('checked');
});

//confirm
$(document).delegate('.footer-selector-borrowing-list .action .confirm', 'tap', function(e)
{
	alert('confirm');
});


//我的报销
//tab change
$(document).delegate('.panel-my-expense .tabs .tab-nav li', 'tap', function(e)
{
	var $this = $(e.target).closest('li');
	var $panes = $('.panel-my-expense .tabs .tab-pane');
	var _index = $this.index();
	var _total =  $panes.eq(_index).find('.bills-list').attr('data-total');
	$('.footer-my-expense .total b').html(_total);
});


//业务办理
//tab change
$(document).delegate('.panel-business-transaction .tabs .tab-nav li', 'tap', function(e)
{
	var $this = $(e.target).closest('li');
	var $panes = $('.panel-business-transaction .tabs .tab-pane');
	var $header = $('.header-business-transaction');
	var $footer = $('.footer-business-transaction');
	var $billsList = $('.panel-business-transaction .tabs .bills-list:eq(0)');
	var _index = $this.index();
	var _total =  $panes.eq(_index).find('.bills-list').attr('data-total');
	$footer.find('.total b').html(_total);

	if(_index === 1)
	{
		$header.find('#confirmButton').hide();
		$footer.find('.action').hide();

	}
	else
	{
		$header.find('#confirmButton').show();
		$billsList.hasClass('approve-status') && $footer.find('.action').show();
	}
});

//开启审批状态
$(document).delegate('.header-business-transaction #confirmButton', 'tap', function(e)
{
	var $footer = $('.footer-business-transaction');
	var $billsList = $('.panel-business-transaction .tabs .bills-list:eq(0)');
	$billsList.toggleClass('approve-status');

	if($billsList.hasClass('approve-status'))
	{
		//$billsList.find('a:not(".checkbox")').css('width', _gw - 40);
		$footer.find('.action').show();
	}
	else
	{
		//$billsList.find('a:not(".checkbox")').css('width', 'auto');
		$footer.find('.action').hide();
	}
});

//one check
$(document).delegate('.panel-business-transaction .bills-list .checkbox', 'tap', function(e)
{
	$(e.target).closest('li').toggleClass('checked');

	var $checkbox = $('.panel-business-transaction .bills-list:eq(0) li');
	var $checkboxAll = $('.footer-business-transaction .action .checkbox-all');
	var _count = $checkbox.size();
	var _checkCount = $checkbox.filter('.checked').size();

	(_count === _checkCount) ? $checkboxAll.addClass('checked') : $checkboxAll.removeClass('checked');

});

//all check
$(document).delegate('.footer-business-transaction .action .checkbox-all', 'tap', function(e)
{
	var _checked = $(e.target).toggleClass('checked').hasClass('checked');
	var $checkbox = $('.panel-business-transaction .bills-list li');

	_checked ?  $checkbox.addClass('checked') : $checkbox.removeClass('checked');
});
