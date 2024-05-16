

 import express, {Request , Response} from 'express';
 import {splitString} from './Logic.js';
 import {concatString} from './Logic.js';
 import { isLeapYear } from './Logic.js';
 import { secretHandshake } from './Logic.js';
  const app = express();
 const port = 8000; //


 app.get('/split/:datatype',(req: Request,res: Response)=>{ 
        var variable: any = req.params.datatype;
        res.json({reverString: splitString(variable)})
 })

 app.get('/concat',(req: Request,res: Response)=>{ 
     var str1 : any = req.query.inputstring1;
     var str2 : any = req.query.inputstring2;
     res.json({reverString: concatString(str1,str2)})
 })


 app.get('/leapyear/:data',(req: Request,res: Response)=>{ 
    const lyear: any = req.params.data;
    const leapyear = isLeapYear(parseInt(lyear));
    if(leapyear==true)
    {
        res.send(lyear+ '  is a Leap Year')
    }
    else
    {
        res.send(lyear+ '  not a Leap Year')
    }
})


app.get('/secret/:data',(req: Request,res: Response)=>{ 
    const lyear: any = req.params.data;
    const output = secretHandshake(parseInt(lyear));
    let outputHTML = '<h1>Secret Handshake</h1><ul>';
    for (const action of output ) {
        outputHTML += `<li>${action}</li>`;
    }
    outputHTML += '</ul>';

    res.send(outputHTML);
})


 app.listen(port, ()=> {
 console.log(`Server is running on port  ${port}`);
 })