/* t v3.2 */

require.config( 
{
    paths: 
    {
        jquery : 'jquery',
        utils : 'utils',
        selector : 'selector-help',
        browser : 'plugin/jquery.browser',
        datepicker : 'plugin/My97DatePicker/WdatePicker',
        ectable : 'plugin/ectable',
        validate : 'plugin/jquery.validate.ext',
        ptip : 'plugin/jquery.ptip',
        template : 'plugin/template',
        datalistinput : 'plugin/jquery.datalistinput'
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
        browser:
        {
            deps: ['jquery']
        },
        ectable: 
        {
            deps: ['jquery']
        },
        validate:
        {
            deps: ['jquery']
        },
        ptip:
        {
            deps: ['jquery']
        },
        datalistinput:
        {
            deps: ['jquery']
        }
    }
});

require(['components', 'validate', 'utils', 'selector', 'ptip', 'template', 'datalistinput'], function()
{
    //menu click
    $(document).delegate('.menu dt a', 'click', function()
    {
        var $menu = $(this).closest('.menu');
        var $dt = $menu.find('dt');
        var $dd = $menu.find('dd');
        var _height = $dt.outerHeight(true);
        var _newHeight = _height + $dd.outerHeight(true) * $dd.size();
        if($menu.hasClass('on'))
        {
            _newHeight = _height;
            _height += $dd.outerHeight(true) * $dd.size();
        }
        $menu.css({height : _height}).addClass('active');

        !$menu.is(':animated') && $menu.toggleClass('on').animate({ height: _newHeight }, 300); 

    });

    //menu a click
    $(document).delegate('.menu dd a', 'click', function()
    {
        var $this = $(this);
        var _newWindow = $this.closest('.menu').find(':checkbox').prop('checked');
        _newWindow ? $this.attr('target','_blank') : $this.attr('target','frameContent');

        $('.menu dd a').removeClass('selected');
        $this.addClass('selected');
    });

    (typeof requireReady === 'function') && requireReady();

}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});

