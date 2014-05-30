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
    $(document).delegate('select[data-name="report-type"], select[data-name="cpr-type"]', 'change', function()
    {
        var $reportType = $('select[data-name="report-type"]');
        var $cprType = $('select[data-name="cpr-type"]');
        var $needCqeExtraCosign = $(':radio[data-name="need-cqe-extra-cosign"]');

        if($reportType.val() === 'CPK Report' && $cprType.val() === 'External')
        {
            $needCqeExtraCosign.prop('disabled', false).prop('checked', false);
        }
        else
        {
            $needCqeExtraCosign.prop('disabled', true).prop('checked', false);
        }
    });

    //init
    $('select[data-name="report-type"]').trigger('change');



    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

