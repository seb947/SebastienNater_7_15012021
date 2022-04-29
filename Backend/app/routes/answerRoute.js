module.exports = app => {
    const answer = require("../controllers/answerCtr");
    const auth = require('../middleware/auth.js');
    var router = require("express").Router();

    router.post("/:id/create", auth, answer.create);
    router.get("/:id/answers", auth, answer.answersList);


    app.use('/api/answer', router);
};