//require configuration
requirejs.config({
    baseUrl: "app/src/",
    paths: {
        data: "../../data",
        test: "../test/"
    }
});
// calling main function
requirejs(
    ["../main"
    // ,"test/test"
    ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
]);
