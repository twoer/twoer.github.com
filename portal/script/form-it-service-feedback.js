define(['jquery', 'browser'], function($)
{
    $(document).delegate('.select[data-name="satisfaction"]', 'change', function()
    {
        var _val = $(this).val();
        var $requires = $('label[data-require="satisfaction"]');
        if(_val === '4' || _val === '5')
        {            
            $requires.addClass('require');
        }
        else
        {
            $requires.removeClass('require');
        }
    });

    $('.select[data-name="satisfaction"]').trigger('change');
});
