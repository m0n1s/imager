var fs = require('fs');


module.exports = (new (function(){

	this.getFile = async (filePath, base64Return) => {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (error, data) => {
				if (error) throw error;
				if(base64Return !== undefined && base64Return !== false){
					resolve(new Buffer(data).toString('base64'));
				}
				resolve(data);
			});
		});		
	}

	this.import = async (importFiles) => {
		var res = {};
		var fileCopyWorker = [];
		var keys = Object.getOwnPropertyNames(importFiles);
		for(var i = 0; i < keys.length; i++) {
			fileCopyWorker.push(new Promise((res)=>{
				var curFile = importFiles[keys[i]];
				fs.copyFile(curFile["src"], curFile["dest"], fs.constants.COPYFILE_EXCL, (err) => {
					res({"hash": curFile["hash"], "err": err});
				});
			}));
		}
		return Promise.all(fileCopyWorker);
	}
}));