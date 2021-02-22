interface Collection {
    name: String,
    thumbnail: String
}

interface Music {
	name: String,
	thumbnail: String,
	duration: number,
	quality: String,
	size: String,
	status: boolean,
    id_collection: number,
    path:String
}