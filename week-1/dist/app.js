"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logic_js_1 = require("./Logic.js");
const Logic_js_2 = require("./Logic.js");
const Logic_js_3 = require("./Logic.js");
const Logic_js_4 = require("./Logic.js");
const app = (0, express_1.default)();
const port = 8000; //
app.get('/split/:datatype', (req, res) => {
    var variable = req.params.datatype;
    res.json({ reverString: (0, Logic_js_1.splitString)(variable) });
});
app.get('/concat', (req, res) => {
    var str1 = req.query.inputstring1;
    var str2 = req.query.inputstring2;
    res.json({ reverString: (0, Logic_js_2.concatString)(str1, str2) });
});
app.get('/leapyear/:data', (req, res) => {
    const lyear = req.params.data;
    const leapyear = (0, Logic_js_3.isLeapYear)(parseInt(lyear));
    if (leapyear == true) {
        res.send(lyear + '  is a Leap Year');
    }
    else {
        res.send(lyear + '  not a Leap Year');
    }
});
app.get('/secret/:data', (req, res) => {
    const lyear = req.params.data;
    const output = (0, Logic_js_4.secretHandshake)(parseInt(lyear));
    let outputHTML = '<h1>Secret Handshake</h1><ul>';
    for (const action of output) {
        outputHTML += `<li>${action}</li>`;
    }
    outputHTML += '</ul>';
    res.send(outputHTML);
});
app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
});
//# sourceMappingURL=app.js.map