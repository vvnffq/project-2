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

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})
