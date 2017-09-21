var drawer = require("./drawer.js");

function drawNavigatorElements(data){
	for (var i = data.length - 1; i >= 0; i--) {
		var className = !!data[i].space ?"imager-navigator-element-spacer":"imager-navigator-element";
		var context = !!data[i].space ? "&nbsp;" : data[i].name;
		document.write(drawer.tag({name:"div", "class": className, content: context}));
	}
}
var {ipcRenderer, remote} = require('electron');
var packagePack = require('./imager-electron').packagePack;

module.exports = (new (function(){
	this.drawer = drawer;
	var asyncApiHandler = new Object();

	this.registerAsyncApiActionHandler = (action, handler) => {
		action = ""+action;
		if(!asyncApiHandler.hasOwnProperty(action)){
			asyncApiHandler[action] = [];
		}
		asyncApiHandler[action].push(handler);
	}

	this.linkCss = (data) => {
		var head = document.getElementsByTagName( "head" )[0];
		for (var i = data.length - 1; i >= 0; i--) {
			var link = document.createElement( "link" );
			link.href = data[i];
			link.type = "text/css";
			link.rel = "stylesheet";
			link.media = "screen,print";
			head.appendChild( link );
		}
	}

	this.draw = (what, data) => {
		if(what === "navigator-elements"){
			drawNavigatorElements(data);
		}
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
