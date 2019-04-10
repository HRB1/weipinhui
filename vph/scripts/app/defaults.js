require.config({
    baseUrl: "./scripts",
    paths: {
        "createData": "app/createData",
        "defaults": "app/defaults",
        "index": "app/index",
        "swipers": "app/swipers",
        "serchs": "app/serchs",
        "Tabs": "app/Tabs",
        "ajax": "common/ajax",
        "loazload": "common/loazload",
        "mock": "libes/mock",
        "require": "libes/require",
        "swiper": "libes/swiper.min",

    }
})
require(["index"]);