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


//data mode transition
$(document).delegate('a[href][data-mode-transition]', 'click', function(e)
{
    var $this = $(this);
    $.ui.showModal($this.attr('href'), $this.attr('data-mode-transition'));
    e.stopPropagation();
    return false;
})