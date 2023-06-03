const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.cjs");

const app = express();

const items = ["buy food", "cook food", "eat food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
   const day = date.getDate();

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    if(req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "work list", newListItems: workItems });
})


app.listen(process.env.PORT || 3000, function () {
    console.log("serve started on port 3000");
})