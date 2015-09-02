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