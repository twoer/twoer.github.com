/* form template v2.0 */

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        form : 'form-common',
        utils : 'utils',
        selector : 'selector-help',
        upload : 'upload-help',
        jqueryui : 'plugin/jquery.ui',
        browser : 'plugin/jquery.browser',
        underscore : 'plugin/underscore',
        datepicker : 'plugin/My97DatePicker/WdatePicker',
        validate : 'plugin/jquery.validate.ext',
        repeat : 'plugin/jquery.repeat',
        select : 'plugin/jquery.select',
        dialog : 'plugin/jquery.dialog.ext',
        tinyswitch : 'plugin/jquery.tinyswitch',
        feedback : 'form-it-service-feedback'
    },
    shim:
    {
        utils:
        {
            deps: ['jquery']
        },
        selector:
        {
            deps: ['jquery', 'components', 'utils', 'selector-help-config']
        },
        upload:
        {
            deps: ['jquery']
        },
        jqueryui:
        {
            deps: ['jquery']
        },
        browser:
        {
            deps: ['jquery']
        },
        repeat: 
        {
            deps: ['jquery']
        },
        validate:
        {
            deps: ['jquery']
        },
        select:
        {
            deps: ['jquery', 'jqueryui']
        },
        dialog : 
        {
            deps: ['jquery', 'jqueryui']
        },
        tinyswitch:
        {
            deps: ['jquery']
        }
    }
});


require(
[   
    'components', 
    'form', 
    'utils', 
    'validate', 
    'selector', 
    'upload', 
    'jqueryui', 
    'select', 
    'repeat', 
    'datepicker', 
    'tinyswitch',
    'feedback',
    'lang-cn'
], 
function(components, form)
{

    //select -multiple
    $('.select.select-multiple').each(function()
    {
        $(this).customSelect({'placeholder' : $(this).attr('data-placeholder') });
    });

    //do switch
    $(document).delegate('select[data-name="system-category"]', 'change', function()
    {
        var _val = $(this).val();
        //system name
        if($.inArray(_val, ['2', '3', '4', '5']) > -1)
        {            
            $('.row-system-name').show();
        }
        else
        {
            $('.row-system-name').hide();   
        }

        //host name/ip address
        if($.inArray(_val, ['12', '13']) > -1)
        {            
            $('.row-host-name,.row-ip-address').show();
        }
        else
        {
            $('.row-host-name,.row-ip-address').hide();   
        }

        //backup objects/keep time
        if($.inArray(_val, ['12']) > -1)
        {            
            $('.row-backup-objects,.row-keep-time').show();
        }
        else
        {
            $('.row-backup-objects,.row-keep-time').hide();   
        }

        //restore objects/restore time
        if($.inArray(_val, ['13']) > -1)
        {            
            $('.row-restore-objects,.row-restore-time').show();
        }
        else
        {
            $('.row-restore-objects,.row-restore-time').hide();   
        }
    });

    //init
    $('select[data-name="system-category"]').trigger('change');


    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

