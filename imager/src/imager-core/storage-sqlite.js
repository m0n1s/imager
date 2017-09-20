var sqlite3 = require("sqlite3");

module.exports = function() {
	var db;

	this.init = () => {

		this.init = () => {
			console.log("init already called");
		}
	}

	this.load = (dbFilePath) => {
		db = new sqlite3.Database(!!dbFilePath?dbFilePath:':memory:');
	}

	this.sync =  async (data) => {
		return new Promise((resolve) => {
			var allAlbum = {};
			var allImages = {};

			db.serialize(function() {
				db.all("SELECT * FROM Album", function(err, rows) { 
					rows.forEach(function (row) {  
						row.Data = JSON.parse(row.Data);
						row.Images = row.Images.split(",");
						allAlbum[row.ID] = row;
					})		
					resolve(allAlbum);				
				});
			});
			db.close();			
		});
	}

	this.get = (data) => {
		var what = data.what ? data.what : " * ";
		var table = data.from ? data.from : " Album ";
		var where = data.where ? " WHERE "+ data.where : "";
		var sql = "SELECT "+what+" FROM "+table+where;

		return sql;
	}

	this.put = (data) => {

	}

	this.delete = (data) => {

	}


};
