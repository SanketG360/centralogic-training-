"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Logic_js_1 = require("./Logic.js");
var app = (0, express_1.default)();
var port = 8000; //
app.get('/:datatype', function (req, res) {
    var variable = req.params.datatype;
    res.json({
        message: variable,
        source: typeof (variable)
    });
    res.end((0, Logic_js_1.default)());
});
app.listen(port, function () {
    console.log(" Hii we are comfortable in NodeJS ".concat(port));
});
