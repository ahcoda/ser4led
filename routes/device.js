const Router = require("koa-router");
const router = new Router();
const Device = require("../controller/device");

router.prefix("/led");
router.post("/create", Device.create);
router.get("/all", Device.listAll);
router.get("/list", Device.list);

module.exports = router;
