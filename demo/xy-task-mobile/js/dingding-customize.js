dd.device.notification.alert(
{
    message: 'xxx',
    title: 'xxx',//可传空
    buttonName: 'xxx',
    onSuccess : function() {
        /*回调*/
    },
    onFail : function(err) {}
});



// dd.config(
// {
//     appId: '4173478',
//     corpId: 'ding59261c65d3556ac6', 
//     jsApiList: 
//     [
//         'device.notification.alert', 
//         'device.notification.confirm'
//     ]
// });


dd.ready(function()
{
    
});

dd.error(function(error)
{
    dd.device.notification.alert(
    {
        message: 'xxx',
        title: 'xxx',//可传空
        buttonName: 'xxx',
        onSuccess : function() {
            /*回调*/
        },
        onFail : function(err) {}
    });

    
    alert(JSON.stringify(error));
});




(function(dd)
{

    dd.ui.webViewBounce.disable();


    dd.device.notification.alert(
    {
        message: 'xxx',
        title: 'xxx',//可传空
        buttonName: 'xxx',
        onSuccess : function() {
            /*回调*/
        },
        onFail : function(err) {}
    });


})(dd);