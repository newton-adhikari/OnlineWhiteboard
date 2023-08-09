const express = require('express');
const whiteboardRouter = express.Router();

whiteboardRouter.get('/whiteboard', (req, res) => {

    res.status(200).json(boardContent);
});

module.exports = whiteboardRouter;
