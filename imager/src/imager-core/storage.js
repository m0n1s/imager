function StorageCache (storageDriver){
	var storageDriver = storageDriver;

	storageDriver.load("./test.db");

	this.data = {
		map: {"test":12},
		id: {12:{"name":"test","images":{"asdfasdf":"bla"}}}
	};

	this.sync = async () => {
		this.data = {"map":{}, "id":{}};
		var res = await storageDriver.sync({"what":"all"});
		console.log(res);
	}

	this.deleteAlbum = async () => {

	}

	this.deleteImage = async () => {

	}

	this.addAlbum = async () => {

	}

	this.addImage = async () => {

	}

	this.updateAlbum = async () => {

	}

}

module.exports = new ( function(storageDriverName) {
	var storageDriverModulName = !!storageDriverName?storageDriverName:"./storage-sqlite";
	var storageDriver = new (require(storageDriverModulName));

	var cache = new StorageCache(storageDriver);
	var albumCache = cache.data;

	cache.sync();
	
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
