module.exports = app => {
    const message = require("../controllers/messageCtr");
    const auth = require('../middleware/auth.js');
    const admin = require('../middleware/admin.js');
    var router = require("express").Router();

    router.get("/find-all", auth, message.findAll);
    router.get("/:id/find", auth, message.findOne);
    router.post("/create", auth, message.create);
    router.put("/:id/update", auth, message.update);
    router.post("/:id/like", auth, message.isLiked);
    router.put("/:id/signal", auth, message.isSignaled);
    router.delete("/:id/delete", auth, message.delete);

    router.get("admin/find-all-signaled", admin, message.findAllSignaled);
    router.delete("/admin/:id/delete", admin, message.delete);

    app.use('/api/message', router);
  };