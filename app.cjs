const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let items = ["buy food", "cook food", "eat food"];
let workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);


    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
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