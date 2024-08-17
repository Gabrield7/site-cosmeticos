import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from './routes/index.js';
import cors from "cors";

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
});

const app = express();

app.use(cors());
routes(app);

export default app;