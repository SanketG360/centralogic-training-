import { Sequelize } from 'sequelize';


const sequelize = new Sequelize({
    database:"WeatherDb",
    username:"postgres",
    password:"123",
    host:"localhost",
    port:5432,
    dialect:"postgres"
})

sequelize.authenticate().then(()=>{
    console.log("Database Connection Established Successfully.");
}).catch((err)=>{
    console.error('Database connection failed..');
})

sequelize.sync().then(()=>{
    console.log('Models synchronized with the database.');
}).catch((err)=>{
    console.error('Unable to synchronize models with the database:', err);
})

export default sequelize;
