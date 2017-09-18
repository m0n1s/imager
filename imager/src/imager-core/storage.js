function StorageCache (){
	this.data = {
		map: {"test":12},
		id: {12:{"name":"test","images":{"asdfasdf":"bla"}}}
	};


	this.sync = () => {
		
	}




}

module.exports = new ( function() {
	var cache = new StorageCache();
	var albumCache = cache.data;

	this.getAlbumNameById = (id) => {
		var name = false;
		if (albumCache.id.hasOwnProperty(id)){
			name = albumCache.id[id].name;
		}
		return name;
	}

	this.getAlbumIdByName = (name) => {
		var id = false;
		if (albumCache.map.hasOwnProperty(name)){
			id = albumCache.map[name];
		}
		return id;
	}

	this.getAlbumById = (id) => {
		var album = false;
		if (albumCache.id.hasOwnProperty(id)){
			album = albumCache.id[id];
		}
		return album;
	}

	this.getAlbumByName = (name) => {
		var id = this.getAlbumIdByName(name);
		if(!id){
			return false;
		}
		return this.getAlbumById(id);
	}
});
