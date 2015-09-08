// Mobilebone.captureLink = false;

// mui('.mui-bar').on('tap', 'a', function()
// {
//     var href = $(this).attr('href');
//     if($(this).hasClass('mui-icon-left-nav'))
//     {
//         history.back();
//         return;
//     }
//     if(!href || href === 'javascript:;' || href.match(/^#.*/))
//     {
//         return;
//     }
//     location.href = href;
//     return false;
// });


function placeholderPreventDefault()
{
    return true;
}



var $taskDashboardStage = $('html.task-dashboard-stage');
if($taskDashboardStage.size() > 0 )
{
    var _wh = $(window).height();
    // var _hd = $taskDashboardStage.find('.mui-bar-nav').height();
    // var _ft = $taskDashboardStage.find('.mui-bar-tab').height();
    $taskDashboardStage.find('.mui-content').height(_wh);
}


Mobilebone.animationstart = function()
{
    $('.mui-bar-tab').addClass('fix-transition-bug');
}

Mobilebone.animationend = function()
{
    $('.mui-bar-tab').removeClass('fix-transition-bug');   
}


mui('body').on('tap', '.reply-message-container .mui-btn-reply', function()
{
    var _val = $('.reply-message-container textarea').val();

    if(_val.length === 0)
    {
        return;
    }
    $('.reply-message-container textarea').val('');
    var $message = $('.message-items li').last().clone();
    $message.find('.message-text').html(_val);

    $('.message-items').append($message);

    $('.task-index .mui-content').scrollTop(10000);
});


mui('.task-details-popover').on('tap', 'a', function()
{
    mui('.task-details-popover').popover('toggle');
});


// mobilebone callback

(function()
{
    var selector = {};

    selector.projectCallback = function()
    {
        var $nav = $('.page.selector-project .mui-bar-nav');
        var $list = $('.page.selector-project .mui-indexed-list');
        $list.height( $(window).height() - $nav.height() );

        window.indexedList = new mui.IndexedList($list[0]);

        if(!dd)
        {
            return;
        }

        dd.biz.navigation.setTitle(
        {
            title: '选择项目'
        });

    };

    selector.userCallback = function()
    {
        var $nav = $('.page.selector-user .mui-bar-nav');
        var $list = $('.page.selector-user .mui-indexed-list');
        $list.height( $(window).height() - $nav.height() );

        window.indexedList = new mui.IndexedList($list[0]);

        if(!dd)
        {
            return;
        }

        alert(dd.biz.navigation.setTitle)
        dd.biz.navigation.setTitle(
        {
    title: '邮箱正文',//控制标题文本，空字符串表示显示默认文本
    onSuccess : function(result) {
        /*结构
        {
        }*/

        alert('onSuccess');
    },
    onFail : function(err) {
        alert(err);
    }
});

    };


    window.selector = selector;

})();



