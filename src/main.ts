import app from "./infra/api/express/app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.LOCAL_PORT;

app.listen(port || 3000, ()=>{
    console.log(`Start server in url: http://localhost:${port || 3000}`)
})