var stor = require("./storage");
var config = require("./config");
const core = require("./imager-core");


async function main(){
    config.load();
    var test = await stor.getAlbumById(12);
    core.import({
        "0123":{"src": "./storage.js", "dest":"./test/storage.js", "hash": "0123"},
        "4321":{"src": "./config.js", "dest":"./test/config.js", "hash": "4321"},
        "0121":{"src": "./storage.js", "dest":"./test/storage.js", "hash": "0121"},
    });
    var ret = await core.fileHandler.getFile("./config.js");
    console.log(ret);
}

main();
