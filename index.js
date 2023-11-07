let express = require("express");
let app = express();
app.use(express.json());

app.use('/', express.static('generator'));
// app.use('/gallery', express.static('gallery'));

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://vivianffq:mongodbpassword@cluster0.pkugayl.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

let artwork = [];

app.post('/api/gallery', (req,res)=> {
    console.log(req.body);
    let obj = {
        // title : req.body.title,
        description : req.body.description,
        // artwork: req.body.artwork
    }

    db.push("artworkData", obj);
    res.json({task:"success"});
});

app.get('/api/gallery', (req, res) => {
  db.get('artworkData').then((data) => {
    console.log(data);
    res.json(data);
  })
})

// app.get('/gallery', (req,res)=> {
//     db.get("artworkData").then(galleryData => {
//         let obj = {
//             data
//         }
//     })
// })

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});
