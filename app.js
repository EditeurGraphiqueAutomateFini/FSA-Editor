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
    [
    "../main"
    //lodash (mostly for object cloning)
    ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
    //sweetalert (for alerts and prompts)
    ,"res/js/sweetalert.min.js"
    //jQuery
    ,"http://code.jquery.com/jquery-2.1.4.min.js"
    //jQuery UI
    ,"https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"
    //QUnit
    ,"http://code.jquery.com/qunit/qunit-1.20.0.js"
    //d3
    ,"http://d3js.org/d3.v3.min.js"
]);
