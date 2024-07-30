import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/router.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/', router);


app.listen(port, () => {
    console.log(port ,"포트로 서버가 열렸습니다.");
});

