const { Client } = require("pg");

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    //host: process.env.DB_HOST || '192.168.7.187',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'onboarding',
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || '5432',
})

//executeQuery("XXXX");

//  async function executeQuery(query) {
//     await client.end().then(()=>console.log("Disconnected"));
//        await client.connect().then(()=>console.log("Connected"));
//         var result='';
//         try{
//         var x = await client.query( "select * from test;", (err,res)=>{
//         if(!err){
//             console.log("from postgres");
//             console.log(res.rows);
//              result=res.rows;
//         }
//         else {
//             console.log(err)
//             result=err;
//         }
        
//         })
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
//     await client.end().then(()=>console.log("Disconnected"));
//         return result;
// };

//  async function executeQuery(query) {
//         //await client.end().then(()=>console.log("Disconnected"));
//         await client.connect().then(()=>console.log("Connected"));
        
//         try {
//             await client.query('BEGIN;');
//             const result = await client.query("select * from test;");
//             // if (!result.isValid) {
//             //   // jump to catch
//             //   throw new Error('invalid result');
//             // }
//             await client.query('COMMIT;');
//             await client.end().then(()=>console.log("Disconnected"));
//             return result;
//           } catch (err) {
//                 try {
//                 // error here
//                 await client.query('ROLLBACK;');
//                 } catch (e) {
//                 console.log('could not rollback: ', e);
//                 }
        
//             throw err;
//           } finally {
//             client.release();
//             await client.end().then(()=>console.log("Disconnected"));
//           }
//         }

async function executeQuery(query) {
    //await client.end().then(()=>console.log("Disconnected"));
        // await client.connect().then(()=>console.log("Connected"));
        // const result = await client.query("select * from test;");
        // await client.end().then(()=>console.log("Disconnected"));
        // return result;
        return "KK";
      
    }
  
module.exports = executeQuery;