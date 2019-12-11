const path = __dirname.replace('server','')
module.exports = {
    "postgres": {
        "database": "sakhaenergo",
        "user": "postgres",
        "password": "password"
    },
    "storage": {
        "root": path + "/storage"
    },
}
