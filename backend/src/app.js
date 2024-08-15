import express from "express";
import connectDatabase from "./config/dbConnect.js";

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
});

const app = express();

export default app;