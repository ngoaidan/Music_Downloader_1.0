import SQLite from "react-native-sqlite-storage";
const DATABASE_NAME = 'data.db';
var RNFS = require('react-native-fs');


interface MusicTable {
	name: String,
	thumbnail: String,
	duration: number,
	quality: String,
	size: String,
	status: boolean,
	id_collection: number,
	path: String
}

const CreateTable = () => {
	let query =
		`CREATE TABLE Music (
        	id INTEGER PRIMARY KEY AUTOINCREMENT,
          	name NVARCHAR(255),
          	thumbnail VARCHAR(255),
          	duration INTEGER,
          	quality VARCHAR(10),
          	size VARCHAR(255),
          	status BOOL,
			id_collection INTEGER,
			path VARCHAR(255),
         	FOREIGN KEY (id_collection) REFERENCES Collection(id)
    )`;

	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [])
					.then(() => {
						resolve({ status: 200 })
					}).catch(err => {
						reject({ status: 500, error: err })
					})
			})
			.catch(err => {
				reject(err)
			})
	})
}

const InsertItem = (props: MusicTable) => {
	let query = `INSERT INTO Music (name,thumbnail,duration,quality,size,status,id_collection,path) VALUES (?,?,?,?,?,?,?,?);`;

	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [props.name, props.thumbnail, props.duration, props.quality, props.size, props.status, props.id_collection, props.path])
					.then(() => {
						resolve({ status: 200 })
					})
					.catch(() => {
						CreateTable().then(() => {
							InsertItem(props)
						})
						reject({ status: 500, error: "Error insert database" })
					})
			})
			.catch(() => {
				reject({ status: 500, error: "Error insert database" })
			})
	})
}

const SelectAll = () => {
	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.transaction((tx) => {
					tx.executeSql('SELECT * FROM Music', [])
						.then(([tx, result]) => {
							let data: any[] = []
							for (let i = 0; i < result.rows.length; i++) {
								let row = result.rows.item(i);
								data.push(row)
							}
							resolve(data)
						}).catch(err => {
							console.log("🚀 ~ file: index.ts ~ line 85 ~ returnnewPromise ~ err", err)
							reject({ status: 500, error: "Error select database" })
						})
				}).catch(err => {
					reject({ status: 500, error: "Error select database" })
				})
			}).catch(err => {
				reject({ status: 500, error: "Error select database" })
			})
	})
}

const Rename = (name: String, id: number) => {
	let query = 'UPDATE Music SET name = ? WHERE ID = ?;';
	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [name, id])
					.then(() => {
						resolve({ status: 200 })
					})
					.catch(() => {
						reject({ status: 500, error: "Error insert database" })
					})
			})
			.catch(() => {
				reject({ status: 500, error: "Error insert database" })
			})
	})
}

const MoveCollection = (id: number, id_collection: number) => {
	let query = 'UPDATE Music SET id_collection = ? WHERE ID = ?;';
	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [id_collection, id])
					.then(() => {
						resolve({ status: 200 })
					})
					.catch(() => {
						reject({ status: 500, error: "Error insert database" })
					})
			})
			.catch(() => {
				reject({ status: 500, error: "Error insert database" })
			})
	})
}

const DeleteItem = (id: number, path: String) => {
	let query = 'DELETE FROM Music WHERE ID = ?;';
	return new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [id])
					.then(() => {
						resolve({ status: 200 })
						RNFS.unlink(path)
							.then(() => {
								console.log('delete success')
							})
							.catch((err) => { console.log('delete error' + err) })
					})
					.catch(() => {
						reject({ status: 500, error: "Error insert database" })
					})
			})
			.catch(() => {
				reject({ status: 500, error: "Error insert database" })
			})
	})
}

const DeleteItemByCollectionID = (id_collection: number) => {
	let query = 'DELETE FROM Music WHERE id_collection = ?;';

	let task1 = new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.transaction((tx) => {
					tx.executeSql('SELECT * FROM Music WHERE id_collection = ?;', [id_collection])
						.then(([tx, result]) => {
							let data: any[] = []
							for (let i = 0; i < result.rows.length; i++) {
								let row = result.rows.item(i);
								RNFS.unlink(row.path)
									.then(() => {
										console.log('delete success')
									})
									.catch((err) => { console.log('delete error' + err) })
							}

						}).catch(err => {
							console.log("🚀 ~ file: index.ts ~ line 85 ~ returnnewPromise ~ err", err)
							reject({ status: 500, error: "Error select database" })
						})
				}).catch(err => {
					reject({ status: 500, error: "Error select database" })
				})
			}).catch(err => {
				reject({ status: 500, error: "Error select database" })
			})
	})

	let task2 = new Promise((resolve, reject) => {
		SQLite.openDatabase({ name: DATABASE_NAME })
			.then((res) => {
				res.executeSql(query, [id_collection])
					.then(() => {
						resolve({ status: 200 })
						// RNFS.unlink(path)
						// 	.then(() => {
						// 		console.log('delete success')
						// 	})
						// 	.catch((err) => { console.log('delete error' + err) })
					})
					.catch(() => {
						reject({ status: 500, error: "Error insert database" })
					})
			})
			.catch(() => {
				reject({ status: 500, error: "Error insert database" })
			})
	})

	return Promise.all([task1,task2])
}


const dboMusic = {
	InsertItem,
	SelectAll,
	CreateTable,
	Rename,
	DeleteItem,
	MoveCollection,
	DeleteItemByCollectionID
}

export default dboMusic;