"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: "WeatherDb",
    username: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});
sequelize.authenticate().then(() => {
    console.log("Database Connection Established Successfully.");
}).catch((err) => {
    console.error('Database connection failed..');
});
sequelize.sync().then(() => {
    console.log('Models synchronized with the database.');
}).catch((err) => {
    console.error('Unable to synchronize models with the database:', err);
});
exports.default = sequelize;
//# sourceMappingURL=pgConfig.js.map