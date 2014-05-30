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
        tinyswitch : 'plugin/jquery.tinyswitch'
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
    $(document).delegate('select[data-name="rules-type"]', 'change', function()
    {
        var $rulesType = $('select[data-name="rules-type"]');
        var $rulesSubType = $('label[data-name="rules-sub-type"],select[data-name="rules-sub-type"]');
        var _val = $rulesType.val();

        $rulesSubType.hide();
        if( _val === '2')
        {
            $rulesSubType.css('display', 'inline-block');
        }
    });


    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

