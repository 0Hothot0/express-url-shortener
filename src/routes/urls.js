import express from "express";
import UrlsModel from "../models/urls.js";
import db from "../database/connection.js";
import { urls } from "../database/schema.js";
import Response from "../response.js";

const router = express.Router();
const urlsModel = new UrlsModel(db, urls); // 初始化 model

router.post("/urls/", async (req, res) => {
    const { origin } = req.body;
    const url = await urlsModel.create(origin);
    res.status(201).json(
        new Response({ //回傳給使用者
            msg: "create url success",
            data: url,
        }),
    );
});

router.get("/:short", async (req, res) => {
    const short = req.params.short; //逗號後面接什麼，params後面就接什麼
    const url = await urlsModel.getOriginFromShort(short);
    res.redirect(url.origin); //會從short跳轉到origin網址
});

export default router;
