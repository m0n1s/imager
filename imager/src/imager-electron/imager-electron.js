var drawer = require("./drawer.js");


function drawNavigatorElements(data){
	for (var i = data.length - 1; i >= 0; i--) {
		var className = !!data[i].space ?"imager-navigator-element-spacer":"imager-navigator-element";
		var context = !!data[i].space ? "&nbsp;" : data[i].name;

		document.write(drawer.tag({name:"div", "class": className, content: context}));
	}
}

function drawCss(data){
	for (var i = data.length - 1; i >= 0; i--) {
		document.write(drawer.tag({
				name: "link",
				attributes: 'rel="stylesheet" type="text/css" href="'+data[i]+'"',
				short: true
			}));
	}
}

module.exports = (new ( function() {
	this.drawer = drawer;

	this.packagePack = (what, data) => {
		return {
			"data": data,
			"evt" : what
		}
	}
	
	this.draw = (what, data) => {
		if(what === "navigator-elements"){
			drawNavigatorElements(data);
		}
		if(what === "css"){
			drawCss(data);
		}
	}

	this.test = (data) => {
		console.log(this.mainWindow);
		console.log(this.ipc);
	}

	var sendRendererAsync = (action, data) => {
		this.mainWindow.webContents.send("imager-api-async", this.packagePack(action, data));
	}
	var replyRendererAsync = (event, action, data) => {
		event.sender.send("imager-api-response", this.packagePack(action, data));
	}
	var sendRendererSync = (event, data) => {
		event.returnValue = data;
	}

	this.apiSync = (event, arg) => {
		
		// Print 3
	    console.log(arg);
	    // Send value synchronously back to renderer process
	    sendRendererSync(event, 4)
	    // Send async message to renderer process
	    sendRendererAsync('ping', 5)
		return;
	}
	this.apiAsync = (event, arg) => {
		// Print 1
	    console.log(arg);
	    // Reply on async message from renderer process
	    replyRendererAsync(event, "imager-api-response", 2);

		return;
	}


}));

