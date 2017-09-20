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

	this.draw = (what, data) => {
		if(what === "navigator-elements"){
			drawNavigatorElements(data);
		}
		if(what === "css"){
			drawCss(data);
		}
	}
}));

