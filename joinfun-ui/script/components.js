/* components v3.2 */

define(['jquery', 'browser'], function($)
{
    var ns = 'jfc';
    window[ns] = {};

    //datepicker
    var datepickerOptions =
    {
        lang : 'en',
        skin : 'joinfun',
        errDealMode : 1,
        isShowClear : true,
        qsEnabled : false,
        position : 
        {
            left : 0,
           top : -3
        },
        onpicked : function(dp)
        {
            var max = dp.el.getAttribute('data-date-max');
            max && showDatepicker($(max)[0]);
        },
        onpicking : function(dp)
        {
            window[ns].textDatePicking && window[ns].textDatePicking(dp.el);
        }
    };

    $.browser.msie && (datepickerOptions.position ={left:2,top:-3});

    function showDatepicker(el)
    {
        if(!el || !window['WdatePicker'])
        {
            return;
        }

        var min = null;
        var max = null;
        var format = null;

        $(el).attr('data-date-min', function(index, attr)
            {
                min = $(attr).val();
            }).attr('data-date-max', function(index, attr)
            {
                max = $(attr).val();
            }).attr('data-date-format',function(index, attr)
            {
                format = attr;
            });

        min ? (datepickerOptions.minDate = min) : (delete datepickerOptions.minDate);
        max ? (datepickerOptions.maxDate = max) : (delete datepickerOptions.maxDate);

        format ? (datepickerOptions.dateFmt = format ) : (datepickerOptions.dateFmt = 'yyyy-MM-dd');

        datepickerOptions.el = el;
        WdatePicker(datepickerOptions);
    }

    $(document).delegate('.text-icon-datepicker', 'focus click', function()
    {
        showDatepicker(this);
    });


    //text text-icon-people , text-icon-selector
    $('.text-icon-people[data-edit!="true"],.text-icon-selector[data-edit!="true"],.text-icon-datepicker').attr('readonly','readonly');

    $('.text-icon-people[data-edit="true"],.text-icon-selector[data-edit="true"]').after('<a href="javascript:;" class="text-icon-placeholder"></a>');


    //text delete
    $('.text-icon-delete').after('<a href="javascript:;" class="text-icon-delete-inner"></a>')
    .bind('input propertychange',function()
    {
        var $this = $(this);
        var $delete = $this.next('.text-icon-delete-inner');
        if($this.val().length > 0)
        {
            $delete.css({'display' : 'inline-block'});
        }
        else
        {
            $delete.hide();
        }
    }).trigger('propertychange');

    $(document).delegate('.text-icon-delete-inner', 'click', function()
    {
        var $this = $(this);
        var $text = $this.prev('.text-icon-delete');
        var selector = null;
        if($text.size() == 0)
        {
            return;
        }
        selector = $text.attr('data-delete-selector');
        selector && $(selector).val('');
        $text.val('').select();
        $this.hide();
        window[ns].textDeleted && window[ns].textDeleted($text[0]);
    });

    //fold
    $(document).delegate('.fold-hd .hd-icon-text', 'click', function(e, data)
    {
        var $hd = $(this).closest('.fold-hd');
        var $cnt = $hd.toggleClass('unfold').next('.fold-cnt');

        data ? $cnt.hide() : ( !$cnt.is(':animated') &&  $cnt.slideToggle(300));
    });

    $('.fold-hd[data-fold="true"] .hd-icon-text').trigger('click','init');

    //tab
    $(document).delegate('.tab-nav-list .item', 'click', function()
    {
        var $this = $(this);
        var $nav = $this.closest('.tab-nav-list');
        var index = $this.index();

        $nav.find('.item').removeClass('selected').eq(index).addClass('selected');
        $nav.next('.tab-cnt-list').find(' > div').hide().end().find(' > div:eq(' + index + ')').show();

        window[ns].tabChange && window[ns].tabChange(index);
    });

    $('.tab-nav-list').each(function()
    {
        var $this = $(this);
        var index = $this.find('.item.selected').index();
        $this.next('.tab-cnt-list').find(' > div').not(':eq(' + index + ')').hide();
    });

    //loading
    $.extend(
    {
        loading : function(text)
        {
            $('.loadding-mask,.loadding-text').remove();
            if(!text || text === '')
            {
                return;
            }
            $('body').append('<div class="loadding-mask"></div><div class="loadding-text" ><em>' + text + '</em></div>');
            var $loaddingText = $('.loadding-text');

            $loaddingText.css(
            {
                'margin-left' : -$loaddingText.outerWidth(true)/2
            }).show();
        },
        loadding : function()
        {
            alert('loadding 方法已弃用，请使用 loading 。');
        }
    });

    //ptip
    ;$.fn.tip = function(options)
    {
        var defaults = 
        {
            className : 'tip-yellowsimple',
            alignTo: 'target',
            alignX: 'center',
            offsetY: 8
        };
        if(typeof options === 'string')
        {
            defaults.content = options;
            $.extend(defaults, arguments[1]);
        }
        else
        {
            $.extend(defaults, options);
        }
        this.poshytip && this.poshytip(defaults);
    };

    //highlight
    var _highlightInterval = null;
    var _highlightTimeout = null;
    $.fn.highlight = function(color, time)
    {
        clearInterval(_highlightInterval);

        var _time = 1;
        var $el = $(this);
        _highlightInterval = setInterval(function()
        {
            if(_time >= time)
            {
                clearInterval(_highlightInterval);
                clearTimeout(_highlightTimeout);
            }

            $el.css({'background-color': color});
            _highlightTimeout = setTimeout(function()
                {
                    $el.css({'background-color':'#fff'});
                },350);
            _time ++;
        },700);
    };

    //list grid high light
    $.fn.listgridHighlight = function()
    {
        $('> tbody', this).find('tr').removeClass('even odd').filter('tr:even').addClass('odd').end().filter('tr:odd').addClass('even').end().filter(' tr').hover(
        function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});
    };

    $('.list-grid-highlight').listgridHighlight();

    //check all
    $(document).delegate('.list-grid thead :checkbox[data-role="check-all"]', 'click', function()
    {
        $(this).closest('.list-grid').find(':checkbox[data-role="check-one"]').prop('checked', $(this).prop('checked'));
    });

    //text zoom
    var _textZoomTidy = 
    {
        'number' : function(value)
        {
            return /^-?\d+(\.\d{2})?$/.test(value) ? value.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,') : '';
        },
        'code' : function(value)
        {
            return  value;
        }
    };
    $(document).delegate('.text-zoom', 'focus', function()
    {
        var $this = $(this);
        var $tip = $('.text-zoom-tip');
        if($this.attr('data-zoom-bind') === 'true')
        {
            return;
        }
        var _zoomTmpl = '<div class="text-zoom-tip"><div class="inner"></div></div>';

        if($tip.length === 0)
        {
            $('body').append(_zoomTmpl);
            $tip = $('.text-zoom-tip');
        }

        $this.attr('data-zoom-bind','true');
        $this.bind('input propertychange keyup blur focus', function(e)
        {
            var $this = $(this);
            var _value = $.trim($(this).val());
            var _type = $this.attr('data-zoom-type') || '';

            if(e.type === 'blur')
            {
                $tip.removeClass(_type).hide();
                return;
            }
            
            _textZoomTidy && (_textZoomTidy[_type] && (_value = _textZoomTidy[_type](_value)));

            if(_value === '')
            {
                $tip.hide().find('.inner').html('');
                return;
            }

            $tip.find('.inner').html(_value);

            var _css = 
            {
                'left' : $this.offset().left,
                'min-width' :$this.outerWidth(true) - ($tip.outerWidth(true) - $tip.width())
            };
            
            if($tip.outerHeight(true) + 10 > $this.offset().top)
            {
                $tip.addClass('b');
                _css.top = $this.offset().top + $this.outerHeight(true) + 9;
            }
            else
            {
                $tip.removeClass('b');
                _css.top = $this.offset().top - $tip.outerHeight(true) - 9;
            }

            $tip.addClass(_type).css(_css).fadeIn();

        });
    });

    //micro tip
    var _microTipTimer = null;
    $.extend(
    {
        microTip : function(options, target)
        {
            $.microAlert(options, target, 'tip')
        }
    });

    //micro confirm
    $.extend(
    {
        microConfirm : function(options, target)
        {
            $.microAlert(options, target, 'confirm')
        }
    });

    //micro alert
    $.extend(
    {
        microAlert : function(options, target, type)
        {
            if(!target)
            {
                return;
            }

            type = type || 'alert';
            var _microTipTmpl = '<div class="micro-tip"><div class="confirm-text">{0}</div></div>';
            var _microAlertTmpl = '<div class="micro-alert"><div class="confirm-text">{0}</div><div class="confirm-buttons"><a href="javascript:;" class="confirm">{1}</a></div></div>';
            var _microConfirmTmpl = '<div class="micro-confirm"><div class="confirm-text">{0}</div><div class="confirm-buttons"><a href="javascript:;" class="confirm">{1}</a><a href="javascript:;" class="cancel">{2}</a></div></div>';
            var _tmpl = null;

            var _remove = function(){$('.micro-tip,.micro-alert,.micro-confirm').remove();};
            _remove();
            clearTimeout(_microTipTimer);

            var defaults = 
            {
                message : '?',
                confirm  : '确定',
                cancel : '取消',
                delay : 1200,
                onConfirm : $.noop,
                onCancel : $.noop
            };

            options = $.extend(defaults, options);
            switch(type)
            {
                case 'confirm' :
                {
                    _tmpl = _microConfirmTmpl.replace('{0}', options.message).replace('{1}', options.confirm).replace('{2}', options.cancel);
                    break;
                }
                case 'alert' :
                {
                    _tmpl = _microAlertTmpl.replace('{0}', options.message).replace('{1}', options.confirm);
                    break;
                }
                case 'tip' :
                {
                    _tmpl = _microTipTmpl.replace('{0}', options.message);

                    _microTipTimer = setTimeout(function()
                    {
                        _remove();
                    }, options.delay)
                    break;
                }
            }
            
            var $microAlert = $(_tmpl).appendTo($('body'));
            var $target = $(target);

            var _css = 
            {
                'top' : $target.offset().top - $microAlert.outerHeight(true) - 8 ,
                'left' : $target.offset().left - $microAlert.outerWidth(true)/2 + $target.outerWidth(true)/2
            };

            $microAlert.css(_css).fadeIn(300);

            $microAlert.find('.confirm').click(function()
            { 
                options.onConfirm(); 
                _remove();
            });
            $microAlert.find('.cancel').click(function()
            { 
                options.onCancel();
                _remove();
            });
        }
    });

    //select bind title
    $(document).delegate('select', 'mouseover', function()
    {
        var $this = $(this);
        if($this.data('data-bind-title'))
        {
            return;
        }

        $this.data('data-bind-title', true).find('option').each(function()
        {
            var $option = $(this);
            var _text = $.trim($option.text());
            if(_text.length > 0 && !$option.attr('title'))
            {
                $option.attr('title', _text);
            }
        });
    });

    //upload file
    $(document).delegate('.upload-file :file', 'change', function()
    {
        $(this).closest('.upload-file').find(':input[type="text"]').val(this.value);
    });

    //fill data
    ;$.fn.fillData = function(data)
    {
        if(!data)
        {
            alert('data is null .');
            return;
        }
        $(':input[name]', this).each(function()
        {
            var $this = $(this);
            var _value = null;
            try
            {
                 _value = eval('data.' + this.name);
            }
            catch(ex){}

            if(_value === null || _value === undefined)
            {
                return;
            }

            var _type = $this.prop('type').toLowerCase();
            switch(_type)
            {
                case 'radio':
                {
                    if($this.val() == _value)
                    {
                        $this.prop('checked', true);
                    }
                    break;
                }
                case 'checkbox':
                {
                    if(!$.isArray(_value))
                    {
                        break;
                    }
                    for(var i in _value)
                    {
                        if($this.val() == _value[i])
                        {
                            $this.prop('checked', true);
                        }
                    }
                    break;
                }
                default :
                {
                    $this.val(_value);
                }
            }
        });
    };

    //render select options
    ;$.fn.renderOptions = function(data)
    {
        var _setting = 
        {
            prefix : 'data-',
            exclude : []
        }
        var textField, valueField;
        if(!data || !data.length)
        {
            return;
        }
        if(typeof arguments[1] === 'object')
        {
            _setting = $.extend(_setting, arguments[1]);
        }
        else if(typeof arguments[1] === 'string' && typeof arguments[2] === 'string')
        {
            _setting.textField = arguments[1];
            _setting.valueField = arguments[2];
        }

        $(this).each(function()
        {
            var _options = '';
            for (var i = 0 ; i < data.length; i++) 
            {
                var _item = data[i];
                var $option = $('<option></option>');
                $option.html(_item[_setting.textField]);
                $option.val(_item[_setting.valueField]);
                for(var p in _item)
                {
                    if(p !== _setting.textField && p !== _setting.valueField && ($.inArray(p,_setting.exclude) === -1))
                    {
                        p === 'selected' ? $option.attr(p, _item[p]) : $option.attr(_setting.prefix + p, _item[p]);
                    }
                }
                _options += $option[0].outerHTML;
            };
            $(this).append(_options);
        });
    };

    //unparam
    $.unparam = function(args)
    {
        var _= {};

        if(!args)
        {
            return _;
        }
        args = args.split('&');
        for(var i=0, l = args.length; i < l; i++ )
        {
            var _s = args[i].split('=');
            _[_s[0]]= _s[1] || '';
        }
        return _;
    };

    //select custom reload
    ;$.fn.reload = function()
    {
        $(this).each(function()
        {
            var $this = $(this);
            $this.customSelect('reload');
        });
    };

    //data change
    var _dataChangeFun = 
    {
        clear: function(selector)
        {
            if(!selector)
            {
                return;
            }
            $(selector).each(function()
            {
                var $this = $(this);
                $this.is(':input') ? $this.val('') : $this.html('');
            });
        }
    };

    var _getDataChangeFun = function(attr)
    {
        var _fun = [];
        var _regex = new RegExp('(\\w+)\\([\'\"]([^;]+)[\'\"]\\)', 'g');
        var _result = null;
        while((_result = _regex.exec(attr)) !== null)
        {
            _fun.push(
            {
                name : _result[1],
                args : _result[2]
            })
        }
        return _fun;
    };

    var _doDataChangeFun = function(attr)
    {
        if(attr === undefined || attr === '')
        {
            return;
        }
        var _fun = _getDataChangeFun(attr);

        for (var i = 0, l = _fun.length; i < l; i++) 
        {
            var _f = _fun[i];
            (typeof _dataChangeFun[_f.name] === 'function') &&  _dataChangeFun[_f.name](_f.args);
        };

    };
    
    $(document).delegate('select[data-change]', 'change', function()
    {
        var $this = $(this);
        _doDataChangeFun($this.attr('data-change'));
    });

    return null;

});