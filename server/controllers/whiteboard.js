const express = require('express');
const whiteboardRouter = express.Router();

whiteboardRouter.get("/", (req, res) => {

    res.status(200).json({sucess: true});
})

module.exports = whiteboardRouter;
