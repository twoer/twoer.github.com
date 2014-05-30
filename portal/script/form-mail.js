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
    $(document).delegate(':radio[data-name="req-project"],:radio[data-name="req-type"],:radio[data-name="is-hh-emp"]', 'click', function()
    {
        var _projectVal = $(':radio:checked[data-name="req-project"]').val();
        var _typeVal = $(':radio:checked[data-name="req-type"]').val();
        var _ishhempVal = $(':radio:checked[data-name="is-hh-emp"]').val();

        // notes outlook id, is conflict
        if(_projectVal === '1')
        {
            $('.row-notes-outlook,.row-is-conflict').show();
            $('.row-quota').hide();
        } 
        else
        {
            $('.row-notes-outlook,.row-is-conflict').hide();
            $('.row-quota').show();
        }

        // old notes id, keep mail
        if(_projectVal === '1' &&　_typeVal === 'Change')
        {
            $('.row-old-notes-id').show();
        } 
        else
        {
            $('.row-old-notes-id').hide();
        }

        //company
        if(_ishhempVal === 'Y')
        {
            $('.row-company').show();
        }
        else
        {
            $('.row-company').hide();
        }
    });

    //init
    if($(':radio:checked[data-name="req-project"]').size() === 0)
    {
       $(':radio[data-name="req-project"][value="1"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="req-project"]').trigger('click');    
    }

    if($(':radio:checked[data-name="req-type"]').size() === 0)
    {
       $(':radio[data-name="req-type"][value="new"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="req-type"]').trigger('click');    
    }

    if($(':radio:checked[data-name="is-hh-emp"]').size() === 0)
    {
       $(':radio[data-name="is-hh-emp"][value="Y"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="is-hh-emp"]').trigger('click');    
    }


    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

