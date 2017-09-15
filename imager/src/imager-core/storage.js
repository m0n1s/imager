module.exports = (new ( function() {

	var albums = {
		map: {},
		id: {}
	};
	
	this.getAlbumNameById = (name) => {

	}

	this.getAlbumIdByName = (id) => {

	}

	this.getAlbumById = (id) => {

	}

	this.getAlbumByName = (name) => {
		var id = this.getAlbumIdByName(name);
		return this.getAlbumById(id);
	}


}));
