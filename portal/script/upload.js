/* uploadify v2.0 */

var _ie = /*@cc_on (function() { debugger;   switch(@_jscript_version) {case 1.0: return 3; case 3.0: return 4; case 5.0: return 5; case 5.1: return 5; case 5.5: return 5.5; case 5.6: return 6; case 5.7: return 7; case 5.8: return 8; case 9: return 9; case 10: return 10;}})() || @*/ 0; 

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        uploadify : 'plugin/uploadify/jquery.uploadify'
    },
    shim:
    {
        uploadify:
        {
            deps: ['jquery']
        }
    }
});

require(['uploadify', 'lang-cn'], function()
{   

    var _upload = 
    {
        onComplete :  function(data)
        {
            parent._uploadFileCallback && parent._uploadFileCallback(data);
        },
        onAllComplete : function()
        {
            _close();
        },
        onError : function(event, queueID, fileObj)
        {
            alert(_lang.format('upload-error', fileObj.name));
        },
        onSelect : function(event, queueld, fileObj, response)
        {
            if(fileObj.size > 50 * 1000 * 1024) 
            {
                alert(_lang.format('upload-size-limit', '50M'));
                return false;
            }
        }
    };

    //upload
    $(".button.upload").click(function() 
    {
        $("#uploadify").uploadifyUpload();
    });
    
    //cancel    
    $(".button.cancel").click(function() 
    {
        $("#uploadify").uploadifyClearQueue();
    });
    
    //close
    $(".button.close").click(function() 
    {
        $("#uploadify").uploadifyClearQueue();

        parent._uploadFileCallback({id:1,name:'xxx'});
        _close();
    });


    (typeof requireReady === 'function') && requireReady(_upload);


    //upload attch fix for ie
    if(_ie)
    {
        $(document).delegate('.uploadify object', 'mousedown mouseup', function(e)
        {
            var $button  = $('.uploadify .button-file');
            e.type === 'mousedown' ? $button.addClass('acitve') : $button.removeClass('acitve')
        })
    }

    var _close = function()
    {
        parent._uploadFileDialog && parent._uploadFileDialog.dialog('close'); 
    }

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

