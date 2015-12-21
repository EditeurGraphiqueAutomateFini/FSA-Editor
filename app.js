//require configuration
requirejs.config({
    baseUrl: "app/src/",
    paths: {
        data: "../../data",
        test: "../test/"
    }
});
// calling main function
requirejs(["../main"]);
