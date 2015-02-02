var router = require("express").Router();
var homeController = require("../controllers/HomeController").controller;
var rumblingController = require("../controllers/RumblingController").controller;
var jsonParser = require('body-parser').json();

router.all("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get("", homeController.index);
router.get("/", homeController.index);
router.get("/progressive", homeController.progressive);
router.get("/progressive/html", homeController.progressiveHTML);
router.get("/progressive/json", homeController.progressiveArray);

router.get("/rumblings", rumblingController.index);
router.get("/rumblings/show/:id", rumblingController.show);
router.get("/rumblings/:app/", rumblingController.getAllByApp);
// router.get("/rumblings/:app/:id", rumblingController.getAllByApp);
// router.get("/rumblings/all", rumblingController.index);
router.post("/rumblings", rumblingController.addNew);

module.exports = {
    start: function(appServer) {

        appServer.use("/", router);
        appServer.use("/api", router);
    }
};