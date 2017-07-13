/**
 * Created by dev6 on 16.06.16.
 */
const express = require('express');


module.exports = function (app, Model) {
    const router = express.Router();

    router.get('/asdf', function (req, res) {
        res.status(200).json({asdf:'ok'});
    });

    return router;
};