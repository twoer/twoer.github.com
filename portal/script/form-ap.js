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
    $(document).delegate(':radio[data-name="apply-type"]', 'click', function()
    {
        var $systemName = $('.text[data-name="system-name"]');
        var _val = $(this).val();

        if( _val === 'New')
        {
            $systemName.removeClass('text-icon-selector').prop('readonly', false)
        }
        else
        {
            $systemName.addClass('text-icon-selector').prop('readonly', true)
        }
    });

    //init 
    if($(':radio:checked[data-name="apply-type"]').size() === 0)
    {
       $(':radio[data-name="apply-type"][value="New"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="apply-type"]').trigger('click');    
    }

    $(document).delegate(':radio[data-name="need-budget"]', 'click', function()
    {
        var $shows = $('label[data-show="need-budget"],.text[data-show="need-budget"]');
        var _val = $(this).val();

        if( _val === 'Y')
        {
            $shows.css('display', 'inline-block');
        }
        else
        {
            $shows.hide();
        }
    });

    //init 
    if($(':radio:checked[data-name="need-budget"]').size() === 0)
    {
       $(':radio[data-name="need-budget"][value="N"]').trigger('click'); 
    }
    else
    {
        $(':radio:checked[data-name="need-budget"]').trigger('click');    
    }


    



    //project benefits
    $(document).delegate('.project-benefits li :checkbox', 'click', function()
    {
        var $this = $(this);
        $this.prop('checked') ? $this.closest('li').find('.more-input').show() : $this.closest('li').find('.more-input').hide();
    });

    (typeof requireReady === 'function') && requireReady(form);

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

