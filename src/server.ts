//para funcionar precisa adicionar a dependencia @types/express
//npm add @types/express -d
import express from "express"
import "reflect-metadata";

import "./database"
import { router } from "./routes";

const app = express()

app.use(express.json())

app.use(router)

app.listen(3000, () => console.log("Server is runing"))