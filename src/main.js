import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/router.js";
import swagger from "./utils/swagger.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/', router);
// 스웨거 설정
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));


app.listen(port, () => {
    console.log(port ,"포트로 서버가 열렸습니다.");
});

