$.ui.setGlobalTitle = function(title)
{
    $('#afui #header header #pageTitle').html(title || '');
}

var gWidth = $(window).width();

$.ui.ready(function()
{
    //init tabs
    $('.tabs .tab-nav').append('<li class="magic"></li>');
    $('.tabs .tab-content .tab-pane').css('width', gWidth);
});


//tabs
$(document).delegate('.tabs .tab-nav li', 'tap', function()
{
    var $this = $(this);
    var $tab = $this.closest('.tabs');
    var $nav = $tab.find('.tab-nav');
    var $content = $tab.find('.tab-content');
    var $magic = $nav.find('.magic');
    var _index = $this.index();
    var _count = $nav.find('li').size() - 1;

    $nav.find('li').removeClass('selected').eq(_index).addClass('selected');
    $content.cssTranslate(- + gWidth * _index +'px, 0px');
    $magic.cssTranslate(gWidth/_count * _index +'px, 0px');
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

//side menu selected
$(document).delegate('#menu .menu-list .item a', 'tap', function()
{   
    var $this = $(this);
    $this.closest('.menu-list').find('.item a').removeClass('selected');
    $this.addClass('selected');
});

//modal tap
$(document).delegate('#modalContainer', 'click', function(e)
{
    $.ui.hideModal();
});
$(document).delegate('#modalContainer .selector-panel', 'tap   click', function(e)
{
    e.stopPropagation();
    $.ui.hideModal();
});

//data mode transition
$(document).delegate('a[href][data-mode-transition]', 'click', function(e)
{
    var $this = $(this);
    $.ui.showModal($this.attr('href'), $this.attr('data-mode-transition'));
    e.stopPropagation();
    return false;
});

//selector panel full screen check
$(document).delegate('.selector-panel-full-screen .data-list li a', 'tap click', function()
{
    var $this = $(this);
    $this.closest('.data-list').find('li a').removeClass('checked');
    $this.addClass('checked');
});


//my treasure level switch
$(document).delegate('.panel.my-treasure .treasure-overall .level a, .panel.my-treasure .treasure-overall .level b', 'tap', function(e)
{
    var $sender = $(e.target);
    if($sender.is('a'))
    {
        $sender.hide().next('b').show();
    }
    else
    {
        $sender.hide().prev('a').show();
    }
});

//daily confirm
//show comment
$(document).delegate('.panel.daily-confirm .tab-pane.pending li', 'tap', function(e)
{
    var $this = $(e.target);
    var $li = $this.closest('li');

    if($this.closest('.comment').size() === 1 || $li.hasClass('show-checkbox'))
    {
        return false;
    }
    $(this).toggleClass('show-comment');
});

//one check
$(document).delegate('.panel.daily-confirm .tab-pane.pending li .checkbox', 'tap', function(e)
{
    $(this).toggleClass('checked');
    e.stopPropagation();
});

//rating
$(document).delegate('.rating a', 'tap', function(e)
{
    var $this = $(this);
    $this.closest('.rating').attr('class', 'rating rating-' + ($this.index() +1));
});

//show confirm action
$(document).delegate('.panel.daily-confirm .tabs .tab-nav li', 'tap', function()
{
    if($(this).index() === 1)
    {
        $.ui.toggleNavMenu(false);
    }
    else
    {
        $.ui.toggleNavMenu(true);   
    }
});

//all check
$(document).delegate('#afui #navbar.navbar-daily-confirm .check-all', 'tap', function()
{
    var $this = $(this);
    var $action = $this.next('.action');
    var $item = $('.panel.daily-confirm .tab-pane.pending li');
    var $attr = $item.find('.attr');

    if($this.hasClass('checked'))
    {
        $this.removeClass('checked');
        $item.removeClass('show-checkbox').width(gWidth);
        $attr.width(gWidth - 20);
        $action.hide();
    }
    else
    {
        $this.addClass('checked');
        $item.addClass('show-checkbox').removeClass('show-comment').width(gWidth - 40);
        $attr.width(gWidth - 60);
        $action.show();
    }
});

$(document).delegate('.panel.daily-confirm .tab-pane.pending li .confirm', 'tap', function()
{
    alert('confirm');
});

$(document).delegate('.panel.daily-confirm .tab-pane.pending li .return', 'tap', function()
{
    alert('return');
});

$(document).delegate('#afui #navbar.navbar-daily-confirm .button-batch-confirm', 'tap', function()
{
    alert('confirm');
});

$(document).delegate('#afui #navbar.navbar-daily-confirm .button-batch-return', 'tap', function()
{
    alert('return');
});


//show task action
$(document).delegate('.panel .task-list-groups .task-list li', 'tap', function(e)
{
    var $this = $(e.target);
    var $li = $this.closest('li');

    if($this.closest('.action, .action-to-complete, .action-to-uncomplete, .status').size() === 1)
    {
        return false;
    }
    $(this).toggleClass('show-action');
});


//week task/project task/task overall show list
$(document).delegate('.panel.week-task .task-list-groups h2, .panel.project-task .task-list-groups h2, .panel.task-overall .task-list-groups h2', 'tap', function(e)
{
    var $this = $(e.target);
    var $list = $this.next('.task-list');
    $this.toggleClass('show-list');
});


//complete or uncomplete siwtch
$(document).delegate('.task-list-groups .action-to-complete .complete, .task-list-groups .action-to-uncomplete .uncomplete', 'tap', function(e)
{
    var $this = $(e.target);
    $this.closest('li').toggleClass('complete').removeClass('show-action');
});


//task discuss
$(document).delegate('#afui #header .task-discuss-header #createButton', 'tap', function(e)
{
    $.ui.toggleNavMenu(true);
    $('#navbar.navbar-task-discuss .reply-input .textarea').attr('placeholder', '回复本任务...').focus();
});

$(document).delegate('.panel.task-discuss .discuss-list .task-action.reply', 'tap', function(e)
{
    $.ui.toggleNavMenu(true);
    var _target = $(this).prev('.discuss-content').find('cite:eq(0)').html();
    $('#navbar.navbar-task-discuss .reply-input .textarea').attr('placeholder', '回复本' + _target + '...').focus();

});

//more
$(document).delegate('#navbar.navbar-task-discuss .reply-input .more', 'tap', function(e)
{
    $('#menu').addClass('dn');

    var $this = $(this);
    var _height = '118px';
    if($this.attr('data-show'))
    {
        _height = '48px';
        $this.removeAttr('data-show');
    }
    else
    {
        _height = '130px';
        $this.attr('data-show',true);
    }
    $('#navbar.navbar-task-discuss').css('height', _height);
    $.ui.toggleNavMenu(true);

    $('#menu').removeClass('dn');
});

//send
$(document).delegate('#navbar.navbar-task-discuss .reply-input .button-send', 'tap', function(e)
{
    alert('send.....');
});

//touch do tab 
;(function($)
{
    var startX, startY, dx, dy, direction ;
    var slideOver =  gWidth/4.5;
    $(".panel").bind("touchstart", function(e) 
    {
        e.touches = e.touches || e.originalEvent.touches;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    $(".panel").bind("touchmove", function(e) 
    {
        e.touches = e.touches || e.originalEvent.touches;
        dx = e.touches[0].pageX;
        dy = e.touches[0].pageY;
    });
    $(".panel").bind("touchend", function(e) 
    {
        if(dx === 0 || dy === 0 || startX === 0 || startY === 0)
        {
            return true;
        }

        if(dx - startX >= slideOver)
        {
            direction = 'right';
        }
        if(startX - dx >= slideOver)
        {
            direction = 'left';
        }
        startX = 0;
        startY = 0;
        dx = 0;
        dy = 0;

        if(direction === undefined)
        {
            return true;
        }

        var $tabs = $(this).find('.tabs');
        var $navs = $tabs.find('.tab-nav li');
        var $nav = $navs.filter('.selected');
        var _index = $nav.index();
        var _count = $navs.size() -1 ;

        direction === 'left' ? _index++ : _index--;

        if(_index !== -1 && _index !== _count)
        {
           $navs.eq(_index).trigger('tap');
        }
        
    });
})(af);

