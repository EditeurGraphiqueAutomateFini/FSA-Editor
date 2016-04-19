// require configuration
require.config({
    baseUrl: "app/src/",    // all scripts will be called from this path
    paths: {
        "data": "../../data" // except for local datas (for local testing)
        ,"test": "../test/"    // and tests
        ,"jquery": "http://code.jquery.com/jquery-2.1.4.min"  // defining jquery as a module
        ,"lodash": "https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js" // lodash (mostly for object cloning)
        //,"jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" // jQuery UI
        ,"qunit": "http://code.jquery.com/qunit/qunit-1.20.0.js" // QUnit
        ,"d3": "http://d3js.org/d3.v3.min.js" // d3
        ,"swal": "../../res/js/sweetalert.min" // sweetalert (for alerts and prompts)
    }
});
// calling main function
require(
    [
        // libs first
        "jquery"
        ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
        ,"http://code.jquery.com/qunit/qunit-1.20.0.js"
        ,"http://d3js.org/d3.v3.min.js"
        ,"swal"
        // main
        ,"../main"
    ],function(jquery,_,qunit,d3,swal,fsa_editor){
        fsa_editor();
    }
);
