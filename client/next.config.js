module.exports = {
    // sometimes next does not detects file changes when working with docker
    // to watch them properly, this fix is used but still not 100% guaranteed
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
}