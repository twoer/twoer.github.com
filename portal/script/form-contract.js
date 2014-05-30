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
    $(document).delegate(':radio[data-name="standard-contract"]', 'click', function()
    {
        var _val = $(this).val();
        var $requires = $('label[data-require="standard-contract"]');
        _val  === 'Y' ? $requires.addClass('require') : $requires.removeClass('require');
    });

    //init
    if($(':radio:checked[data-name="standard-contract"]').size() === 0)
    {
       $(':radio[data-name="standard-contract"][value="N"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="standard-contract"]').trigger('click');    
    }


    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

