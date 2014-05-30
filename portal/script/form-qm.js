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
    $(document).delegate('select[data-name="report-type"]', 'change', function()
    {
        var $reportType = $('select[data-name="report-type"]');
        var $qualReportType = $('label[data-name="qual-report-type"],select[data-name="qual-report-type"]');
        var $monitorReportType = $('label[data-name="monitor-report-type"],select[data-name="monitor-report-type"]');
        var _val = $reportType.val();

        $qualReportType.hide();
        $monitorReportType.hide();

        if( _val === '1')
        {
            $qualReportType.css('display', 'inline-block');
        }
        else if(_val === '2')
        {
            $monitorReportType.css('display', 'inline-block');
        }
    });

    $(document).delegate('select[data-name="report-type"],select[data-name="qual-report-type"],select[data-name="monitor-report-type"]', 'change', function()
    {
        var $reportType = $('select[data-name="report-type"]');
        var $qualReportType = $('select[data-name="qual-report-type"]');
        var $monitorReportType = $('select[data-name="monitor-report-type"]');
        var _reportVal = $reportType.val();
        var _qualVal = $qualReportType.val();
        var _monitortVal = $monitorReportType.val();

        //Test Item
        var $testItem = $('tr[data-name="test-item"]').hide();
        if((_reportVal === '1' && _qualVal === '3') || _reportVal === '2')
        {
            $testItem.show();
        }

        //Quarter
        var $quarter = $('tr[data-name="quarter"]').hide();
        if(_reportVal === '2' && _monitortVal === 'P3')
        {
            $quarter.show();
        }

        //Equipment Year Month
        var $equipmentYearMonth = $('tr[data-name="equipment-year-month"]').hide();
        if(_reportVal === '2' && _monitortVal === 'SL')
        {
            $equipmentYearMonth.show();
        }

    });

    //init 
    $('select[data-name="report-type"]').trigger('change');



    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

