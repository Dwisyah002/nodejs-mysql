// dependencies
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

// calling express function
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Client settings
app.set('view engine', 'ejs');

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "day3"
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
})

// Route
// Form
app.get("/form", (req, res) => {
    app.use("/public", express.static("public"));
    res.render('form');
})

// Data
app.get("/data", (req, res) => {
    const query = "SELECT * FROM visitorslist";
    db.query(query, (err, response) => {
        if (err) throw err;
        res.render('data', { visitorslist: response });
    })
})

// Landing
app.get("/", (req, res) => {
    app.use("/public", express.static("public"));
    res.render('landing');
})

// API End Point
// 1. Post data
app.post("/postdata", (req, res) => {
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const angkatan = req.body.angkatan;
    const rating = req.body.rating;

    const query = "INSERT INTO visitorslist (nama, jurusan, angkatan, rating) VALUES (?, ?, ?, ?)";
    const values = [nama, jurusan, angkatan, rating];
    db.query(query, values, (err, response) => {
        if (err) throw err;
        res.send({
            message: "Data submitted"
        });
    });
})

// 2. Baca data
app.get("/readdata", (req, res) => {
    const query = "SELECT * FROM visitorslist";
    db.query(query, (err, response) => {
        if (err) throw err;
        res.send(response);
    })
})

// 3. Update data
app.put("/updatedata/:id", (req, res) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const angkatan = req.body.angkatan;
    const rating = req.body.rating;

    const query = "UPDATE visitorslist SET nama = ?, jurusan = ?, angkatan = ?, rating = ? WHERE idvisitorslist = ?";
    const values = [nama, jurusan, angkatan, rating, id];
    db.query(query, values, (err, response) => {
        if (err) throw err;
        res.send(response);
    })
})

// 4. Delete data
app.delete("/deletedata/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM visitorsList WHERE idvisitorslist = ?";
    db.query(query, id, (err, response) => {
        if (err) throw err;
        res.send({
            message: "Deleted"
        })
    })
})

// Start server
app.listen(4444, () => console.log("Server started..."));