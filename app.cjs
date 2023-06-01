const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var items = ["buy food" , "cook food", "eat food"];
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


    res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", function (req, res) {
   var item = req.body.newItem;
    items.push(item);
    res.redirect("/");

})

app.listen(process.env.PORT || 3000, function () {
    console.log("serve started on port 3000");
})
