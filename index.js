let express = require("express");
let app = express();
app.use(express.json());

app.use('/', express.static('generator'));

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})
