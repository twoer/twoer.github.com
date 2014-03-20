var gWidth = $(window).width();

//tabs
$(document).delegate('.tabs .tab-nav li', 'tap', function()
{
    var $this = $(this);
    var $tab = $this.closest('.tabs');
    var $nav = $tab.find('.tab-nav');
    var $content = $tab.find('.tab-content');
    var _index = $this.index();

    $nav.find('li').removeClass('selected').eq(_index).addClass('selected');
    $content.find('.tab-pane').hide().eq(_index).show();
});

$('.tabs .tab-nav').each(function()
{
    var $this = $(this);
    var index = $this.find('li.selected').index();
    $this.next('.tab-content').find('.tab-pane').not(':eq(' + index + ')').hide();
});

//toggle side menu
$(document).delegate('#header #menubadge', 'tap', function()
{
	$.ui.toggleSideMenu();
});

//go back
$(document).delegate('#header #backButton', 'tap', function()
{
	//$.ui.goBack();
});

//my expense tabs change
$(document).delegate('.panel.my-expense .tabs .tab-nav li', 'tap', function()
{
    var $content = $('.panel.my-expense .tabs .tab-content .tab-pane:visible');
   	var _total = $content.find('.bill-total').text();
   	$('#navbar.navbar-my-expense div b').html(_total);
});


//modal tap
$(document).delegate('#modalContainer', 'tap', function(e)
{
    $.ui.hideModal();
});
$(document).delegate('#modalContainer .selector-panel', 'tap', function(e)
{
    e.stopPropagation();
    $.ui.hideModal();
});
$(document).delegate('#modalContainer .approve-content', 'tap', function(e)
{
	e.stopPropagation();
});


//selector panel full screen check
$(document).delegate('.selector-panel-full-screen .data-list li a', 'tap', function()
{
    var $this = $(this);
    $this.closest('.data-list').find('li a').removeClass('checked');
    $this.addClass('checked');
});

//bill create add borrowing
//one check
$(document).delegate('.panel.bill-create-add-borrowing .borrowing-list li .check', 'tap', function()
{
    $(this).closest('li').toggleClass('checked');
});
//all check
$(document).delegate('#navbar.navbar-bill-create-add-borrowing .operation .check-all', 'tap', function(e)
{
    var $this = $(this);
    var $items = $('.panel.bill-create-add-borrowing .borrowing-list li');
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

//business transaction
//tab change
$(document).delegate('.panel.business-transaction .tabs .tab-nav li', 'tap', function()
{
    var $content = $('.panel.business-transaction .tabs .tab-content .tab-pane:visible');
    var _total = $content.find('.bill-total').text();
    $('#navbar.navbar-business-transaction div b').html(_total);

    var $checkall = $('#navbar.navbar-business-transaction .operation .check-all');
    var $items = $('.panel.business-transaction .tab-pane:visible .bill-list li');
    ($items.size() === $items.filter('.checked').size()) ? $checkall.addClass('checked') : $checkall.removeClass('checked');
});

$(document).delegate('#header .business-transaction-header #confirmButton', 'tap', function()
{
    $('#afui #navbar.navbar-business-transaction').toggleClass('show-approve');

    var $content = $('#afui #content #business-transaction').toggleClass('show-approve');

    $.ui.toggleNavMenu(true);

    //start 修复低端安卓
    if($content.hasClass('show-approve'))
    {
        $('.bill-list li a', $content).width(gWidth - 70 );
    }
    else
    {
        $('.bill-list li a', $content).width(gWidth - 30 );   
    }
    //end
});

//one check
$(document).delegate('.panel.business-transaction .bill-list li .check', 'tap', function()
{
    $(this).closest('li').toggleClass('checked');
});
//all check
$(document).delegate('#navbar.navbar-business-transaction .operation .check-all', 'tap', function(e)
{
    var $this = $(this);
    var $items = $('.panel.business-transaction .tab-pane:visible .bill-list li');
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

//business transaction approve
$(document).delegate('#afui #afui_modal .business-transaction-approve-panel .button-pass', 'tap', function()
{
    alert('pass');
})
$(document).delegate('#afui #afui_modal .business-transaction-approve-panel .button-return', 'tap', function()
{
    alert('return');
})
$(document).delegate('#afui #afui_modal .business-transaction-approve-panel .button-deny', 'tap', function()
{
    alert('deny');
})
$(document).delegate('#afui #afui_modal .business-transaction-approve-panel .button-back', 'tap', function()
{
    alert('back');
})

//data mode transition
$(document).delegate('a[href][data-mode-transition]', 'click', function(e)
{
    var $this = $(this);
    $.ui.showModal($this.attr('href'), $this.attr('data-mode-transition'));
    e.stopPropagation();
    return false;
})