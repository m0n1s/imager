const storage = require("./storage");
const config = require("./config");
const fileHandler = require("./fileHandler");

function fullMerge(obj1,obj2){
    var obj3 = {};
    for (var att in obj1) { obj3[att] = obj1[att]; }
    for (var att in obj2) { obj3[att] = obj2[att]; }
    return obj3;
}

module.exports = (new ( function() {
	this.fileHandler = fileHandler;

	this.get = (what, data) => {

	}

	this.import = async (importFiles) => {
		/*
		return new Promise((res) => {
			fileHandler.import(importFiles).then( ret => res(ret) );
		})
		*/

		return = await fileHandler.import(importFiles);
	} 
}));
