import express from "express";
import produtos from "./productRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Site Harmony Haven")
    });

    app.use(
        express.json(),
        produtos
    );
};

export default routes;