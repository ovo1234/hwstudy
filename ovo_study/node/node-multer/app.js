const express = require("express");
const multer = require("multer");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

const connection = mysql.createConnection({
    host: "funtestdb.c48enj5ykq9v.ap-northeast-2.rds.amazonaws.com",
    user: "root",
    password: "rlawodbs223",
    database: "funTestDb",
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + ' ')));
app.use(express.static("public"));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
});

var upload = multer({ storage: storage });

// 파일 업로드 라우터

app.get("/", (req,res) => {
    console.log("메인페이지");
    res.sendFile(path.join(__dirname + "/views/write.html"));
})

app.post("/wirte", upload.single("image"), (req, res, next) => {
    const id = req.body.id;
    const image = `/images/${req.file.filename}`;
    const datas = [id, image];

    const sql = "INSERT INTO product_test (id, image) values(?, ?)";
    connection.query(sql, datas, (err, rows) => {
        if (err) {
            console.error("err : " + err);
        } else {
            console.log("rows : " + JSON.stringify(rows) + req.file.filename);
            
            res.redirect("/read");
        }
    })
})

app.get("/read", (req,res) => {
    res.sendFile(path.join(__dirname + "/views/read.html"));
})

app.post("/read", (req, res, next) => {
    const id = req.body.id;
    const sql = "SELECT * FROM product_test WHERE id = ? ";

    connection.query(sql, [id], (err, row) => {
        if(id == row[0].id){
            res.render("read_result", { 
                image : row[0].image,
            });
        }else if (err) {
            console.error(err);
        } else {
            res.redirect("/read");
        }
    });
});

app.listen(3002, () => {
    console.log("3002 port running...");
    console.log(path.join(__dirname));
});
