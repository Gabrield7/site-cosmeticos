import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    descricao: {type: String, required: true},
    marca: {type: String, required: true},
    categoria: {type: String, required: true},
    preco: {type: Number, required: true},
    desconto: {type: Number, required: true},
    parcelamento: {type: Number, required: true},
    nota: {type: Number, required: true},
    avaliacoes: {type: Number, required: true},
    etaridade: {type: String, required: true},
    publico: {type: String, required: true},
    caminho: {type: String, required: true},
}, {versionKey: false});

const produto = mongoose.model("produtos", productSchema);

export default produto;