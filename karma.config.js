module.exports = function (config) {
    config.set({
        reporters: ["mocha"],
        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        },
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: false,
    });
};    