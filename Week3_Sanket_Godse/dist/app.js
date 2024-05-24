"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('This Is Week3 Assignment ');
});
app.post("/api/SaveWeatherMapping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = req.body;
        yield (0, services_1.storedWeatherInfo)(cities);
        res.send('data stored successfully....');
    }
    catch (error) {
        console.error('Error: ' + error);
    }
}));
app.get('/api/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        const weatherinfo = yield (0, services_1.getWeatherData)(city);
        res.json(weatherinfo);
    }
    catch (error) {
        console.error(error);
    }
}));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sanketsharma2062001@gmail.com',
        pass: 'xqrn bppi zpbo writ'
    }
});
app.post('/api/Mail', (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ message: 'Invalid request body. Expecting an array with at least one item.' });
        }
        const tableRows = data.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.city}</td>
          <td>${item.country}</td>
          <td>${new Date(item.date).toLocaleDateString()}</td>
          <td>${item.weather}</td>
        </tr>
      `).join('');
        const tableHtml = `
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <thead>
            <tr>
              <th>Id</th>
              <th>City</th>
              <th>Country</th>
              <th>Date</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
        const mail = {
            from: 'sanketsharma2062001@gmail.com',
            to: 'sanketgodse360@gmail.com',
            subject: 'Weather Data',
            html: tableHtml
        };
        transporter.sendMail(mail);
        res.json({ message: 'Email sent successfully' });
    }
    catch (error) {
        console.error(error);
    }
});
app.listen(port, () => {
    console.log('server is running of port ' + port);
});
//# sourceMappingURL=app.js.map