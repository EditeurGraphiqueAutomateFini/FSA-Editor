//require configuration
requirejs.config({
    baseUrl: "app/src/",    //all scripts will be called from this path
    paths: {
        data: "../../data", //except for local datas (for local testing)
        test: "../test/"    //and tests
    }
});
// calling main function
requirejs(
    ["../main"
    //lodash (mostly for object cloning)
    ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
    //sweetalert (for alerts and prompts)
    ,"res/js/sweetalert.min.js"
]);
