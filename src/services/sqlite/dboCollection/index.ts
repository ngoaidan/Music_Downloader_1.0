import SQLite from "react-native-sqlite-storage";
import dboMusic from "../dboMusic";
const DATABASE_NAME = 'data.db';


interface CollectionTable {
    name: String,
    thumbnail: String
}

const CreateTable = () => {
    let query = 'CREATE TABLE Collection (id INTEGER PRIMARY KEY AUTOINCREMENT, name NVARCHAR(255),thumbnail VARCHAR(255))';

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

const InsertItem = (props: CollectionTable) => {
    let query = 'INSERT INTO Collection (name,thumbnail) VALUES (?,?)';

    return new Promise((resolve, reject) => {
        SQLite.openDatabase({ name: DATABASE_NAME })
            .then((res) => {
                res.executeSql(query, [props.name, props.thumbnail])
                    .then((res) => {
                        resolve({ status: 200, data: res })
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

const SelectAll = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({ name: DATABASE_NAME })
            .then((res) => {
                res.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Collection', [])
                        .then(([tx, result]) => {
                            let data: any[] = []
                            for (let i = 0; i < result.rows.length; i++) {
                                let row = result.rows.item(i);
                                data.push(row)
                            }
                            resolve(data)
                        }).catch(err => {
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
    let query = 'UPDATE Collection SET name = ? WHERE ID = ?;';
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

const DeleteItem = (id: number) => {
    if (id != 1) {
        let query = 'DELETE FROM Collection WHERE ID = ?;';
        return new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: DATABASE_NAME })
                .then((res) => {
                    res.executeSql(query, [id])
                        .then(() => {
                            resolve({ status: 200 })
                            dboMusic.DeleteItemByCollectionID(id)
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
    return new Promise((resolve, reject) => {
        resolve(500)
    })
}

const dboCollection = {
    InsertItem,
    SelectAll,
    CreateTable,
    Rename,
    DeleteItem
}

export default dboCollection;