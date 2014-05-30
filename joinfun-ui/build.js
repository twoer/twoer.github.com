({
    appDir: "./",
    baseUrl: "script/",
    dir: "../build",
    optimizeCss: 'standard',
    paths: 
    {
        jquery : 'jquery',
        utils : 'utils',
        selector : 'selector',
        browser : 'plugin/jquery.browser',
        // datepicker : 'plugin/My97DatePicker/WdatePicker',
        datepicker : 'empty:',
        ectable : 'plugin/ectable',
        validate : 'plugin/jquery.validate.ext'
    },
    modules: 
    [
        {
            name: "configuration"
        }
    ],
    shim:
    {
        utils:
        {
            deps: ['jquery']
        },
        components:
        {
            deps: ['jquery', 'browser', 'datepicker']
        },
        selector:
        {
            deps: ['jquery', 'utils']
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
        }
    }
})