var sqlite3 = require("sqlite3");

module.exports = (new ( function() {
	var db = new sqlite3.Database(':memory:');

	this.init = () => {

		this.init = () => {
			console.log("init already called");
		}
	}


	this.get = (data) => {
		var what = data.what ? " "+data.what+" " : " * ";
		var where = data.where ? " WHERE "+ data.where : "";

		var sql = "SELECT"+what+"FROM table"+where;

		
		return;
	}

	this.put = (data) => {

	}

	this.delete = (data) => {

	}


}));
