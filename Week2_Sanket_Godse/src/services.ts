import pool from "./pgConfig";

async function storedOrders(orderNo: string) {
    try {
        const query = "INSERT INTO orders (orderID) VALUES ($1)";
        const result = await pool.query(query, [orderNo]);
        console.log('Inserted order:', orderNo);
        return result;
    } catch (err) {
        console.error('Error while inserting order:', err);
        throw err; 
    }
}

export {storedOrders};