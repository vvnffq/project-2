let express = require("express");
let app = express();
app.use(express.json());

app.use('/', express.static('generator'));

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://vivianffq:mongodbpassword@cluster0.pkugayl.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

let port = process.env.PORT || 3000;
server.listen(port, ()=> {
console.log('listening at ', port);
});
