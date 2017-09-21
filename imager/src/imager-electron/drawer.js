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

}));