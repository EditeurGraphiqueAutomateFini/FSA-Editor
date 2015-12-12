//require configuration
requirejs.config({
    baseUrl: "app",
    paths: {
        data: '../data'
    }
});
// calling main function
requirejs(["main"]);
