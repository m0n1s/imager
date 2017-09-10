var drawer = require("./drawer.js");


function drawNavigatorElements(data){
	for (var i = data.length - 1; i >= 0; i--) {
		var className = !!data[i].space ?"imager-navigator-element-spacer":"imager-navigator-element";
		var context = !!data[i].space ? "&nbsp;" : data[i].name;

		document.write(drawer.tag({"name":"div", "class": className, "content": context}));
	}
}

function drawGalleriesOverview(data){
	

	for (var i = data.length - 1; i >= 0; i--) {
		data[i];
		var className = "imager-galleries-miniatur"
		var context = "test";
		var html = '<div class="' + className+'">'+ context + '</div>';
		
		document.write(html);
	}

	
}

module.exports = (new ( function() {
	this.drawer = drawer;

	this.draw = (what, data) => {
		if(what === "navigator-elements"){
			drawNavigatorElements(data);
		}
		if(what === "galleries-overview"){
			drawGalleriesOverview(data);
		}
	}


}));

