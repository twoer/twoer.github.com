mui('.mui-bar-tab').on('tap', '.mui-tab-item', function()
{
    location.href = $(this).attr('href');
    return false;
});


var $taskDashboardStage = $('html.task-dashboard-stage');
if($taskDashboardStage.size() > 0 )
{
    var _wh = $(window).height();
    // var _hd = $taskDashboardStage.find('.mui-bar-nav').height();
    // var _ft = $taskDashboardStage.find('.mui-bar-tab').height();
    $taskDashboardStage.find('.mui-content').height(_wh);
}