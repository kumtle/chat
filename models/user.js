const Datastore = require('nedb');

const db = new Datastore({
    filename: './database/user.db', 
    autoload: true
});

module.exports = {
    db,
}