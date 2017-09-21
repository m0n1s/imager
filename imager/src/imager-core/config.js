var fs = require('fs');

module.exports = new (function(){
    var data = {};
    this.defaultConfigPath = "./data/config.default.json";

    this.isValidConfig = (config) => {
        return true;
    }
    
    this.load = (configFilePath) => {
        var filePath = !!configFilePath ? configFilePath : this.defaultConfigPath;
        var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if(this.isValidConfig(obj)){
            data = obj;
            return true;
        }
        return false;
    }

    this.get = (what) => {
        var parts = what.split(".");
    }

    this.set = (what, value) => {
        var parts = what.split(".");
    }
});
