/*!
 * jQuery UI Dialog 1.10.3
 * http://jqueryui.com
 */
if($.widget)
{
	(function(c,d){var a={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},b={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};c.widget("ui.dialog",{version:"1.10.3",options:{appendTo:"body",autoOpen:true,buttons:[],closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(f){var e=c(this).css(f).offset().top;if(e<0){c(this).css("top",f.top-e)}}},resizable:true,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height};this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)};this.originalTitle=this.element.attr("title");this.options.title=this.options.title||this.originalTitle;this._createWrapper();this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);this._createTitlebar();this._createButtonPane();if(this.options.draggable&&c.fn.draggable){this._makeDraggable()}if(this.options.resizable&&c.fn.resizable){this._makeResizable()}this._isOpen=false},_init:function(){if(this.options.autoOpen){this.open()}},_appendTo:function(){var e=this.options.appendTo;if(e&&(e.jquery||e.nodeType)){return c(e)}return this.document.find(e||"body").eq(0)},_destroy:function(){var f,e=this.originalPosition;this._destroyOverlay();this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();this.uiDialog.stop(true,true).remove();if(this.originalTitle){this.element.attr("title",this.originalTitle)}f=e.parent.children().eq(e.index);if(f.length&&f[0]!==this.element[0]){f.before(this.element)}else{e.parent.append(this.element)}},widget:function(){return this.uiDialog},disable:c.noop,enable:c.noop,close:function(f){var e=this;if(!this._isOpen||this._trigger("beforeClose",f)===false){return}this._isOpen=false;this._destroyOverlay();if(!this.opener.filter(":focusable").focus().length){c(this.document[0].activeElement).blur()}this._hide(this.uiDialog,this.options.hide,function(){e._trigger("close",f)})},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(g,e){var f=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;if(f&&!e){this._trigger("focus",g)}return f},open:function(){var e=this;if(this._isOpen){if(this._moveToTop()){this._focusTabbable()}return}this._isOpen=true;this.opener=c(this.document[0].activeElement);this._size();this._position();this._createOverlay();this._moveToTop(null,true);this._show(this.uiDialog,this.options.show,function(){e._focusTabbable();e._trigger("focus")});this._trigger("open")},_focusTabbable:function(){var e=this.element.find("[autofocus]");if(!e.length){e=this.element.find(":tabbable")}if(!e.length){e=this.uiDialogButtonPane.find(":tabbable")}if(!e.length){e=this.uiDialogTitlebarClose.filter(":tabbable")}if(!e.length){e=this.uiDialog}e.eq(0).focus()},_keepFocus:function(e){function f(){var h=this.document[0].activeElement,g=this.uiDialog[0]===h||c.contains(this.uiDialog[0],h);if(!g){this._focusTabbable()}}e.preventDefault();f.call(this);this._delay(f)},_createWrapper:function(){this.uiDialog=c("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo());this._on(this.uiDialog,{keydown:function(g){if(this.options.closeOnEscape&&!g.isDefaultPrevented()&&g.keyCode&&g.keyCode===c.ui.keyCode.ESCAPE){g.preventDefault();this.close(g);return}if(g.keyCode!==c.ui.keyCode.TAB){return}var f=this.uiDialog.find(":tabbable"),h=f.filter(":first"),e=f.filter(":last");if((g.target===e[0]||g.target===this.uiDialog[0])&&!g.shiftKey){h.focus(1);g.preventDefault()}else{if((g.target===h[0]||g.target===this.uiDialog[0])&&g.shiftKey){e.focus(1);g.preventDefault()}}},mousedown:function(e){if(this._moveToTop(e)){this._focusTabbable()}}});if(!this.element.find("[aria-describedby]").length){this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})}},_createTitlebar:function(){var e;this.uiDialogTitlebar=c("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);this._on(this.uiDialogTitlebar,{mousedown:function(f){if(!c(f.target).closest(".ui-dialog-titlebar-close")){this.uiDialog.focus()}}});this.uiDialogTitlebarClose=c("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:false}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);this._on(this.uiDialogTitlebarClose,{click:function(f){f.preventDefault();this.close(f)}});e=c("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);this._title(e);this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(e){if(!this.options.title){e.html("&#160;")}e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=c("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiButtonSet=c("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);this._createButtons()},_createButtons:function(){var f=this,e=this.options.buttons;this.uiDialogButtonPane.remove();this.uiButtonSet.empty();if(c.isEmptyObject(e)||(c.isArray(e)&&!e.length)){this.uiDialog.removeClass("ui-dialog-buttons");return}c.each(e,function(g,h){var i,j;h=c.isFunction(h)?{click:h,text:g}:h;h=c.extend({type:"button"},h);i=h.click;h.click=function(){i.apply(f.element[0],arguments)};j={icons:h.icons,text:h.showText};delete h.icons;delete h.showText;c("<button></button>",h).button(j).appendTo(f.uiButtonSet)});this.uiDialog.addClass("ui-dialog-buttons");this.uiDialogButtonPane.appendTo(this.uiDialog)},_makeDraggable:function(){var g=this,f=this.options;function e(h){return{position:h.position,offset:h.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(h,i){c(this).addClass("ui-dialog-dragging");g._blockFrames();g._trigger("dragStart",h,e(i))},drag:function(h,i){g._trigger("drag",h,e(i))},stop:function(h,i){f.position=[i.position.left-g.document.scrollLeft(),i.position.top-g.document.scrollTop()];c(this).removeClass("ui-dialog-dragging");g._unblockFrames();g._trigger("dragStop",h,e(i))}})},_makeResizable:function(){var j=this,h=this.options,i=h.resizable,e=this.uiDialog.css("position"),g=typeof i==="string"?i:"n,e,s,w,se,sw,ne,nw";function f(k){return{originalPosition:k.originalPosition,originalSize:k.originalSize,position:k.position,size:k.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:h.maxWidth,maxHeight:h.maxHeight,minWidth:h.minWidth,minHeight:this._minHeight(),handles:g,start:function(k,l){c(this).addClass("ui-dialog-resizing");j._blockFrames();j._trigger("resizeStart",k,f(l))},resize:function(k,l){j._trigger("resize",k,f(l))},stop:function(k,l){h.height=c(this).height();h.width=c(this).width();c(this).removeClass("ui-dialog-resizing");j._unblockFrames();j._trigger("resizeStop",k,f(l))}}).css("position",e)},_minHeight:function(){var e=this.options;return e.height==="auto"?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");if(!e){this.uiDialog.show()}this.uiDialog.position(this.options.position);if(!e){this.uiDialog.hide()}},_setOptions:function(g){var h=this,f=false,e={};c.each(g,function(i,j){h._setOption(i,j);if(i in a){f=true}if(i in b){e[i]=j}});if(f){this._size();this._position()}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option",e)}},_setOption:function(g,h){var f,i,e=this.uiDialog;if(g==="dialogClass"){e.removeClass(this.options.dialogClass).addClass(h)}if(g==="disabled"){return}this._super(g,h);if(g==="appendTo"){this.uiDialog.appendTo(this._appendTo())}if(g==="buttons"){this._createButtons()}if(g==="closeText"){this.uiDialogTitlebarClose.button({label:""+h})}if(g==="draggable"){f=e.is(":data(ui-draggable)");if(f&&!h){e.draggable("destroy")}if(!f&&h){this._makeDraggable()}}if(g==="position"){this._position()}if(g==="resizable"){i=e.is(":data(ui-resizable)");if(i&&!h){e.resizable("destroy")}if(i&&typeof h==="string"){e.resizable("option","handles",h)}if(!i&&h!==false){this._makeResizable()}}if(g==="title"){this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))}},_size:function(){var e,g,h,f=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0});if(f.minWidth>f.width){f.width=f.minWidth}e=this.uiDialog.css({height:"auto",width:f.width}).outerHeight();g=Math.max(0,f.minHeight-e);h=typeof f.maxHeight==="number"?Math.max(0,f.maxHeight-e):"none";if(f.height==="auto"){this.element.css({minHeight:g,maxHeight:h,height:"auto"})}else{this.element.height(Math.max(0,f.height-e))}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())}},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=c(this);return c("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){if(this.iframeBlocks){this.iframeBlocks.remove();delete this.iframeBlocks}},_allowInteraction:function(e){if(c(e.target).closest(".ui-dialog").length){return true}return !!c(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(!this.options.modal){return}var f=this,e=this.widgetFullName;if(!c.ui.dialog.overlayInstances){this._delay(function(){if(c.ui.dialog.overlayInstances){this.document.bind("focusin.dialog",function(g){if(!f._allowInteraction(g)){g.preventDefault();c(".ui-dialog:visible:last .ui-dialog-content").data(e)._focusTabbable()}})}})}this.overlay=c("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());this._on(this.overlay,{mousedown:"_keepFocus"});c.ui.dialog.overlayInstances++},_destroyOverlay:function(){if(!this.options.modal){return}if(this.overlay){c.ui.dialog.overlayInstances--;if(!c.ui.dialog.overlayInstances){this.document.unbind("focusin.dialog")}this.overlay.remove();this.overlay=null}}});c.ui.dialog.overlayInstances=0;if(c.uiBackCompat!==false){c.widget("ui.dialog",c.ui.dialog,{_position:function(){var f=this.options.position,g=[],h=[0,0],e;if(f){if(typeof f==="string"||(typeof f==="object"&&"0" in f)){g=f.split?f.split(" "):[f[0],f[1]];if(g.length===1){g[1]=g[0]}c.each(["left","top"],function(k,j){if(+g[k]===g[k]){h[k]=g[k];g[k]=j}});f={my:g[0]+(h[0]<0?h[0]:"+"+h[0])+" "+g[1]+(h[1]<0?h[1]:"+"+h[1]),at:g.join(" ")}}f=c.extend({},c.ui.dialog.prototype.options.position,f)}else{f=c.ui.dialog.prototype.options.position}e=this.uiDialog.is(":visible");if(!e){this.uiDialog.show()}this.uiDialog.position(f);if(!e){this.uiDialog.hide()}}})}}(jQuery));
}

/*
 	@name: jquery ui dialog ext
 	@overview: library
 	@require script: jquery(> 1.7)、jquery ui (1.10.3)
 	@require style: 
 	@author: twoer(zhangkun_net@hotmail.com)
 	@date: 2013-05-14
 */

;(function($)
{
    if(!$.fn.dialog)
    {
        return;
    }

    var $body =  $('body');
    var _dialogMap= {};
    var _alertTmpl = '<div class="dialog-alert"></div>';
    var _confirmTmpl = '<div class="dialog-confirm"></div>';
    var _iframeTmpl = '<div class="dialog-iframe"><iframe src="{#src#}" frameborder="0" scrolling="{#scrolling#}"></iframe></div>';
    var _htmlTmpl = '<div class="dialog-html"></div>';
    var _methods = {};
    _methods.alert = function(options)
    {
        var defaults = 
        {
            dialogClass :'ui-dialog-alert',
            title : '提示：',
            message : '...',
            confirm  : '确定',
            onConfirm : null,

            modal : true,
            resizable :false,
            width :350,
            buttons : {},
            closeText :'',
            beforeClose : function()
            {
                return (options.onConfirm && options.onConfirm());
            }
        };
        options = $.extend(defaults, options);
        
        options.buttons = 
        {
        	"confrim":
            {
                'text':options.confirm,
                'class':'button',
                'click' :function()
                {
                   $(this).dialog('close');
                }
            }
        };

        if($body.find('.dialog-alert').size() == 0)
        {
            $('body').append(_alertTmpl);
        }

        return $(".dialog-alert").html(options.message).dialog(options);
    };

    _methods.confirm = function(options)
    {
        var defaults = 
        {
            dialogClass :'ui-dialog-confirm',
            title : '提示：',
            message : '?',
            confirm  : '确定',
            cancel : '取消',
            onConfirm : null,
            onCancel : null,
            modal : true,
            resizable :false,
            width :350,
            buttons : {},
            closeText :'',
            beforeClose : function()
            {
                var trigger = '';
                $(this).attr('data-trigger',function(index, attr)
                {
                    trigger = attr;
                    return '';
                });
                if(trigger == 'confirm')
                {
                    return (options.onConfirm && options.onConfirm());
                }
                else
                {
                    return (options.onCancel && options.onCancel());
                }
            }
        };

        options = $.extend(defaults, options);

        options.buttons[options.confirm] = function()
        {
            $(this).attr('data-trigger','confirm').dialog('close');
        }
        options.buttons[options.cancel] = function()
        {
            $(this).attr('data-trigger','cancel').dialog('close');
        }

        if($body.find('.dialog-confirm').size() == 0)
        {
            $('body').append(_confirmTmpl);
        }

        return $(".dialog-confirm").html(options.message).dialog(options);
    };

    _methods.open = function(options)
    {
        var defaults = 
        {
            modal : true,
            title : '新窗口：',
            src : '',
            html : '',
            width : 800,
            height : 500,
            resizable :false,
            showClose : true,
            buttons : {},
            modal : true,
            closeText :'',
            frameScrolling : 'yes'
        };

        var _dialog = _dialogMap[options.name];

        if(_dialog)
        {
            _dialog.dialog('open');
            return _dialog;
        }

        options = $.extend(defaults, options);

        if(!options.showClose)
        {
            options.dialogClass = 'no-close';
            options.closeOnEscape = false;
        }


        if(options.src && $.trim(options.src.length) > 0 )
        {
            _dialog = $(_iframeTmpl.replace(/{#src#}/,options.src).replace(/{#scrolling#}/,options.frameScrolling)).dialog(options);
        }
        else
        {
            _dialog = $(_htmlTmpl).html(options.html).dialog(options);
        }

        if(!options.name || $.trim(options.name.length) == 0)
        {
            options.name = _dialog.attr('id');
        }
        _dialogMap[options.name] = _dialog;

        return _dialog;
    };

    // _methods.close = function(options)
    // {
    //     _dialogMap[options] && _dialogMap[options].dialog('close');
    // };

    // _methods.show = function(options)
    // {
    //     _dialogMap[options] && _dialogMap[options].dialog('open');
    // };
    

    _methods.frameExec = function(dialog, args)
    {
    	var _function = args[2];
    	var _args = args[3];
    	var _window = null;
        try
        {
            _window = _methods.byName(dialog).find('iframe')[0].contentWindow
        }
        catch(ex){}

        if(!_window)
        {
        	_log('iframe is null.');
        	return false;
        }
        if(!_window[_function])
        {
        	_log('function is null.');
        	return false;
        }

        try
        {
        	_window[_function](_args);
        	return true;
        }
        catch(ex)
        {
        	_log('exec error.');
        }
    };
    _methods.frameRefresh = function(dialog, args)
    {
    	var $iframe = null;
        try
        {
            $iframe = $(_methods.byName(dialog).find('iframe')[0]);
        }
        catch(ex){}

        if(!$iframe)
        {
        	_log('iframe is null.');
        	return false;
        }
        try
        {
        	$iframe.attr('src', function(index, attr)
        		{
        			return attr;
        		});
        	return true;
        }
        catch(ex)
        {
        	_log('refresh error.');
        }
    };
   
    _methods.byName = function(name)
    {
        if(!name)
        {
            return _dialogMap;
        }
        return (_dialogMap[name] === undefined) ? null : _dialogMap[name];
    };

    $.extend(
    {
        dialog : function(method, options)
        {
            return (typeof _methods[method] === 'function') && _methods[method](options, arguments);
        }
    });


    var _log = function(text)
    {
    	window.log && window.log(text);
    }

})(jQuery);