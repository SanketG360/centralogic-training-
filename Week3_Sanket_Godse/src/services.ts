import { Weather } from './userModel';
import axios from 'axios';


async function storedWeatherInfo(data:any[]){
    const cities : any[] = data;
    for(const city of cities)
        {
              const geoCodingResponse =  await axios.get('https://api.api-ninjas.com/v1/geocoding',
                  { params:{city:city.city ,country:city.country},
                  headers: {'X-Api-Key': 'w8Hjo03YcJqxTvg9vqlnnw==oLJqV4pg26HA5kzs'}
                });
              console.log("============================  Response =======================")
              console.log(geoCodingResponse)
              const latitude = geoCodingResponse.data[0].latitude;
              const longitude = geoCodingResponse.data[0].longitude;
              
              const weatherresponse  = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json',
                  {params :{q:`${latitude},${longitude}`},
                  headers: {
                      'x-rapidapi-key': '46dec751camsh8b4296fba10e871p12133ajsnb8de4ba4910e',
                      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                    }
                  });
              const weather  = weatherresponse.data.current.condition.text;
              const time= new Date();
              
              await Weather.create({
                  city: city.city,
                  country: city.country,
                  weather,
                  time,
                  longitude,
                  latitude
                });
  
       }
}

async function getWeatherData(city:string ) {
    try
    {
       if(city)
       {
            return ( await Weather.findAll({
              where: { city: city },
              attributes:['id','city','country',['time','date'],'weather']
            }));
    
       }
       else
       {
          return  (await Weather.findAll({
            attributes:['id','city','country',['time','date'],'weather']
            }))
       }

    }catch(error)
    {
      console.error(error)
    }
}

export {storedWeatherInfo , getWeatherData}