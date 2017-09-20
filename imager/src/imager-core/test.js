var stor = require("./storage");
var config = require("./config");




async function main(){
	config.load();
	var test = await stor.getAlbumById(12);

}



main();




var test = async () => {

	return new Promise((resolve) => {
		var ret = await (
			function(){
				return new Promise((res) => {
					res({"asdf":"asdf"})
				});
			}
		)();

		resolve(ret);
	});
}
