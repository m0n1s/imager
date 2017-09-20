module.exports = (new ( function() {


	this.tag = (data) => {
		var tagname = data.name || "div"; 
		var short = data.short || false;
		var attributes = data.attributes || "";
		var css = data.css || "";
		var classes = data.class || "";
		var content = data.content || "";
		var html = "<" + tagname+" "+attributes + " "+(!!classes?"class='"+classes+"'":"")+ (short ? "/>":">" + content + "</"+tagname +">")  ;

		return html;
	}

}));