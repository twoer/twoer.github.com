(function(dd)
{

    dd.runtime.info(
    {
        onSuccess: function(result) 
        {
            alert(JSON.string(result));
        }
    });

})(dd);