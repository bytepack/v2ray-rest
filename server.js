import {config} from "dotenv";
import express from "express"
import configsRouter from "./routes/configs.js";
import {connectToMongo} from "./configsCrud.js";

const port = process.env.PORT || 3000
config()
const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next()
}) 

app.use("/configs", configsRouter)

await connectToMongo(process.env.DB_URI)
app.listen(port)


