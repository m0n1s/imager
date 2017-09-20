
var {ipcRenderer, remote} = require('electron');  
var packagePack = require('./imager-electron').packagePack;

module.exports = (new (function(){
	var asyncApiHandler = new Object();

	this.registerAsyncApiActionHandler = (action, handler) => {
		action = ""+action;
		if(!asyncApiHandler.hasOwnProperty(action)){
			asyncApiHandler[action] = [];
		}
		asyncApiHandler[action].push(handler);
	}

	this.apiSync = (what, data) => {
		return ipcRenderer.sendSync("imager-api-sync", packagePack(what, data));
	}

	this.api = async (what, data) => {
		return new Promise((resolve) => {
			ipcRenderer.send("imager-api-async", packagePack(what, data));
			ipcRenderer.on("imager-api-response", (event, arg) => {      
			    resolve({"event":event, "arg":arg})
			});
		})
	}

	ipcRenderer.on("imager-api-async", (event, arg) => {
		if(!asyncApiHandler.hasOwnProperty(arg.evt)){
			console.warn("Expected unknown async-api handler : " + arg.evt);
			return; 
		}
		for (var i = asyncApiHandler[arg.evt].length - 1; i >= 0; i--) {
			asyncApiHandler[arg.evt][i](arg.data);
		}
	});
}));