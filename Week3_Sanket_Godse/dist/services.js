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
exports.getWeatherData = exports.storedWeatherInfo = void 0;
const userModel_1 = require("./userModel");
const axios_1 = __importDefault(require("axios"));
function storedWeatherInfo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const cities = data;
        for (const city of cities) {
            const geoCodingResponse = yield axios_1.default.get('https://api.api-ninjas.com/v1/geocoding', { params: { city: city.city, country: city.country },
                headers: { 'X-Api-Key': 'w8Hjo03YcJqxTvg9vqlnnw==oLJqV4pg26HA5kzs' }
            });
            console.log("============================  Response =======================");
            console.log(geoCodingResponse);
            const latitude = geoCodingResponse.data[0].latitude;
            const longitude = geoCodingResponse.data[0].longitude;
            const weatherresponse = yield axios_1.default.get('https://weatherapi-com.p.rapidapi.com/current.json', { params: { q: `${latitude},${longitude}` },
                headers: {
                    'x-rapidapi-key': '46dec751camsh8b4296fba10e871p12133ajsnb8de4ba4910e',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            });
            const weather = weatherresponse.data.current.condition.text;
            const time = new Date();
            yield userModel_1.Weather.create({
                city: city.city,
                country: city.country,
                weather,
                time,
                longitude,
                latitude
            });
        }
    });
}
exports.storedWeatherInfo = storedWeatherInfo;
function getWeatherData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (city) {
                return (yield userModel_1.Weather.findAll({
                    where: { city: city },
                    attributes: ['id', 'city', 'country', ['time', 'date'], 'weather']
                }));
            }
            else {
                return (yield userModel_1.Weather.findAll({
                    attributes: ['id', 'city', 'country', ['time', 'date'], 'weather']
                }));
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.getWeatherData = getWeatherData;
//# sourceMappingURL=services.js.map