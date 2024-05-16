import express, {Request , Response} from 'express';
import { storedOrders } from './services';
import {filterPassedStudents,getStudentNames,sortStudentsByGrade,getAverageAge} from './studentData';
const app = express();
const port = 8000; 

app.use(express.json())

app.post('/filterorders', async(req, res) => {
    try {
        const items= req.body.items;
        const filteredOrders = await items.filter((order: any) =>
            order.OrderBlocks.some((block: any) =>
                Array.isArray(block.lineNo) ?
                    block.lineNo.some((lineNo: number) => lineNo % 3 === 0) :
                    block.lineNo % 3 === 0
            )
        );
        res.json({ filteredOrders });
    } catch (error) {
        res.json({ error: 'Internal server error' });
    }

});

app.post('/storedOrderId', async (req, res) => {
    try {
        const items = req.body.items;
        if (!Array.isArray(items)) {
            throw new Error('Items should be an array');
        }

        for (let item of items) {
            const orderId = item.orderID;
            await storedOrders(orderId);
        }

        res.json('Data stored successfully in database');
    } catch (err) {
        console.error('Error while storing data:', err);
        res.json({ error: 'An error occurred while storing data' });
    }
});

app.post("/Arrayoprs", async (req, res) => {
    try {
        const array: number[] = req.body.array;

        const concatenatedArray = array.concat([10, 20, 30]);
        const length = array.length;
        const lastIndexOf = array.lastIndexOf(32);
        array.push(100);
        const splicedArray = array.slice(0, 10).concat([0, 0, 0]);
        const poppedElement = array.pop();
        const slicedArray = array.slice(1, 5);
        const mappedArray = array.map(num => num * 2);
        const shiftedElement = array.shift();
        const filteredArray = array.filter(num => num > 30);
        array.unshift(100);
        const flattenedArray = array.flat();
        const foundElement = array.find(num => num === 45);
        const joinedString = array.join(',');
        const foundIndex = array.findIndex(num => num === 3);
        const arrayAsString = array.toString();
        const someResult = array.some(num => num > 50);
        const includesResult = array.includes(22);
        const indexOfResult = array.indexOf(3);
        const everyResult = array.every(num => num < 100);
        
        res.json({
            messages: {
                concatenatedArray: "Concatenated array is: " + concatenatedArray,
                length: "Length of array is: " + length,
                lastIndexOf: "Last index of 32 is: " + lastIndexOf,
                splicedArray: "Spliced array is: " + splicedArray,
                poppedElement: "Popped element is: " + poppedElement,
                slicedArray: "Sliced array is: " + slicedArray,
                mappedArray: "Mapped array is: " + mappedArray,
                shiftedElement: "Shifted element is: " + shiftedElement,
                filteredArray: "Filtered array is: " + filteredArray,
                unshiftedArray: "Unshifted array is: " + array,
                flattenedArray: "Flattened array is: " + flattenedArray,
                foundElement: "Found element is: " + foundElement,
                joinedString: "Joined string is: " + joinedString,
                foundIndex: "Index of 3 is: " + foundIndex,
                arrayAsString: "Array as string is: " + arrayAsString,
                someResult: "Some result is: " + someResult,
                includesResult: "Includes result is: " + includesResult,
                indexOfResult: "Index of 3 is: " + indexOfResult,
                everyResult: "Every result is: " + everyResult
            }
        });
    } catch (error) {
        res.json({ error: 'Internal server error' });
    }
});

var students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];

app.post('/studentoperations', (req, res) => {
    try {
        const passedStudents = filterPassedStudents(students);
        const nameofstudent = getStudentNames(students);
        const sortedbygrades = sortStudentsByGrade(students);
        const averageAgeofstudent = getAverageAge(students);

        res.send({
                'Passed student who has grades greater than 50 : ':passedStudents,
                'Name of the students :':nameofstudent,
                'students grades in ascending order':sortedbygrades,
                'average age of all the students :':averageAgeofstudent
            
        });
    } catch (error) {
        console.error("Error:", error);
        res.json({ error: 'Internal server error' });
    }
});


app.listen(port, ()=> {
console.log(`server is running on port ${port} `);
})