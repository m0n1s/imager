var drawer = require("./drawer.js");

var {ipcRenderer, remote} = require('electron');
var packagePack = require('./imager-electron').packagePack;

function drawNavigatorElements(data){
	for (var i = data.length - 1; i >= 0; i--) {
		var className = !!data[i].space ?"imager-navigator-element-spacer":"imager-navigator-element";
		var context = !!data[i].space ? "&nbsp;" : data[i].name;
		document.write(drawer.tag({name:"div", "class": className, content: context}));
	}
}

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




	this.run = () => {

		var things = document.getElementsByClassName("imager-navigator");
		for (var i = 0; i < things.length; i++) {
		    things[i].style['-webkit-app-region'] = (/^darwin/.test(process.platform))?'drag':'';
		}

		var navigatorElements = {}

		var ret = ier.apiSync("tescht", 1);
		console.log(ret)

		ier.api("teschtAsync", 12).then((res) => {
			console.log("async res");
			console.log(res);
		})
	}

}));
