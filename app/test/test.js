define(function(require){

    var menu = require("menu/menu");
    var utility = require("utility/utility");
    //var server_request = require("utility/server_request");
    //var create_circles = require("viewmode/create_circles");
    var create_force_layout = require("viewmode/create_force_layout");
    //var create_paths = require("viewmode/create_paths");
    var create_svg = require("viewmode/create_svg");
    var data_helper = require("viewmode/data_helper");
    var tick_helper = require("viewmode/tick_helper");
    var view_init = require("viewmode/view_init");

    //QUnit.config({hidepasse:true});
    QUnit.module("menu");
    QUnit.test("menu",function(assert){
        assert.ok(menu,"view");
        assert.ok(menu,"edit");
        assert.ok(menu,"create");
    });

    QUnit.module("utility");
    QUnit.test("utility",function(assert){
        //displayObject
        assert.ok(typeof(utility.displayObject),"string");

        //frontEndObject
        assert.equal(utility.frontEndObject({}),undefined);
        assert.equal(utility.frontEndObject(""),undefined);
    });

    QUnit.module("create_force_layout");
    QUnit.test("create_force_layout",function(assert){
        assert.equal(typeof(create_force_layout("",{},{},{})),"object");
    });

    QUnit.module("create_svg");
    QUnit.test("",function(assert){
    });

    QUnit.module("data_helper");
    QUnit.test("",function(assert){
    });

    QUnit.module("tick_helper");
    QUnit.test("",function(assert){
    });

    QUnit.module("view_init");
    QUnit.test("",function(assert){
    });

    console.log(create_svg());
});
