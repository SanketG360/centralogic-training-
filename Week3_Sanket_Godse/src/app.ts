import express , {Request,Response} from 'express';
import { CityData } from './logic';
import axios from 'axios';
import { Weather } from './userModel';
import {storedWeatherInfo , getWeatherData} from './services'
import  nodemailer from "nodemailer"
const app = express();
const port = 8000;


app.use(express.json())


app.get('/',(req,res)=>{
    res.send('This Is Week3 Assignment ')
})




app.post("/api/SaveWeatherMapping",async (req: Request, res: Response) => {
      try{
            const cities : CityData[] = req.body;
            await storedWeatherInfo(cities)  
            res.send('data stored successfully....')
      }catch(error){
         console.error('Error: '+error);
      }   
});


app.get('/api/weatherDashboard', async (req,res)=>{
    try
    {
        const city = req.query.city as string;
        const weatherinfo =  await getWeatherData(city);
        res.json(weatherinfo)
    }catch(error){
        console.error(error)
    }
})


const transporter = nodemailer.createTransport({
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
      console.log(data)
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
  
      transporter.sendMail(mail)
  
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
    }
  });
  


app.listen(port,()=>{
    console.log('server is running of port '+port)
})