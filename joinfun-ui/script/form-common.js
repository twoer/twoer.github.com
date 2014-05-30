/* form common v3.2 */

define(['jquery', 'validate', 'utils'], function($)
{
    var _form = 
    {
        setValidate : function(form, rules, messages)
        {
            this.validate = new validateExt(form, rules, messages);
            this.validateForm = form; 
        }
    };

    $(document).delegate('a[data-open="maxWindow"]', 'click', function()
    {
        Utils.openMaximizeWindow($(this).attr('href'));
        return false;
    });

    //req oper
    $('.req-oper .item').hover(function()
    {
        $('.req-oper .item').removeClass('active');
        $(this).addClass('active');
    },function()
    {
        $(this).removeClass('active');
    });

    //submit or save
    $(document).delegate('.req-oper .item-submit, .req-oper .item-save', 'click', function(e)
    {
        var _action = $(this).hasClass('item-submit')  ? 'submit' : 'save';

        var _data = 
        {
            e : e,
            action : _action,
            validate : _form.validate,
            validateResult : null

        };


        //设置提交类型
        $("#submitType").val(_action);

        //设置 select option 选中
        $('.select[multiple="multiple"]:not(".select-multiple")').find('option').prop('selected', true);

        //如果有 save 和 submit 方法时，完全执行自定义
        var _function = _form[_action];
        if(_function && _function(_data) !== true)
        {
            return false;
        }

        //save 和 submit 验证之前
        _function = _form[_action + 'ValidateBefore'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        //如果有自己的 validate groups 就执行自己的，否则执行默认动作
        _data.validateResult = (_form.validate && _form.validate.exec( _data.validateGroups || _action));

        //save 和 submit 验证之后
        _function = _form[_action + 'ValidateAfter'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        if(!_data.validateResult)
        {
            return false;
        }

        //取消 radio disabled
        $('.radio-groups label :radio').prop('disabled', false);

        //save 和 submit 提交之前
        _function = _form[_action + 'Before'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        if(_action === 'submit' && !confirm(_lang['confirm-submit']))
        {
            return false;
        }

        $.loading(_lang['submiting']);

        //验证成功后提交
        $(_form.validateForm).submit();

        //save 和 submit 提交之后
        _function = _form[_action + 'After'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        return false;
    });


    //close or print
    $(document).delegate('.req-oper .item-close, .req-oper .item-print', 'click', function(e)
    {
        var _action = $(this).hasClass('item-close')  ? 'close' : 'print';

        var _data = 
        {
            e : e,
            action : _action
        };

        //如果有 close 和 print 方法时，完全执行自定义
        var _function = _form[_action];
        if(_function && _function(_data) !== true)
        {
            return false;
        }

        //close 和 print 操作之前
        _function = _form[_action + 'Before'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        if(_action === 'close' && confirm(_lang['confirm-close']))
        {
            window.close()
        }
        else if(_action === 'print')
        {
            window.print();
        }

        //close 和 print 操作之后
        _function = _form[_action + 'After'];
        if(_function && _function(_data) === false)
        {
            return false;
        }

        return false;
    });

    //delete
    $(document).delegate('.req-oper .item-delete', 'click', function(e)
    {
        var _data = 
        {
            e : e,
            action : 'delete'
        };

        //delete
        if(_form['delete'] && _form['delete'](_data) !== true)
        {
            return false;
        }

        if(!confirm(_lang['confirm-delete']))
        {
            return;
        }

        //delete before 
        if(_form['deleteBefore'] && _form['deleteBefore']() === false)
        {
            return false;
        }

        var _url = $(this).attr('href');

        //$(_form.validateForm).attr('action', _url).submit();

        $.loading(_lang['submiting']);

    });

    //go top
    $(document).delegate('.req-oper .item-top', 'click', function()
    {
        $('html,body').animate({scrollTop: 0 }, 300);
    });

    //audit history view
    $(document).delegate('.audit-history-list-switch a', 'click', function()
    {
        $(this).closest('.audit-history-list').toggleClass('list-sort');
    });

    //audit more approval
    $(document).delegate('.decision-list :radio', 'click', function()
    {
        var $label = $(this).closest('label');
        $('.decision-list .item label').each(function()
        {
            var $next = $(this).next('label,div');
            if($label.is(this))
            {
                $next.show();
            }
            else
            {
                $next.hide();
            }
        });
    });
    
    //job edit
    $(document).delegate('input[name="job-edit"]', 'click', function()
    {
        var _map = 
        {
            'modify'    : 'Update',
            'grab'      : 'Grab',
            'activate'  : 'Activate',
            'Reassign'  : 'Reassign'
        };
        //set type
        $("input[name='jobEditInfo.jobEditType']").val(_map[this.value]);
        
        // activity name
        $("input[name='jobEditInfo.targetActivityName']").val($('select[name=activityId] :selected').html());   
    });

    $(document).delegate('select[name=activityId]', 'change', function()
    {
        $("input[name='jobEditInfo.targetActivityName']").val($('select[name=activityId] :selected').html());
    });

    $.validator.addMethod("checkTargetActivityRequired", function() 
    {
        return ($("input[name='job-edit']:checked").val() === 'grab' && $("select[name='activityId']").val() === '') ? false : true;
    }, ''); 
    $.validator.addMethod("checkRessignEmpRequired", function() 
    {
        return ($("input[name='job-edit']:checked").val() === 'Reassign' && $("select[name='reassignToEmpuids'] option").size() === 0) ? false : true;
    }, ''); 


    return _form;

});