import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/router.js";
import swagger from "./utils/swagger.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
const options = {
    explorer: true
  };
// 스웨거 설정
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs, options));


app.listen(port, () => {
    console.log(port ,"포트로 서버가 열렸습니다.");
    console.log("Local Swagger 주소 : ", "http://localhost:3000/api-docs/");
    console.log("AWS EC2 주소 : ", "http://3.36.113.102:3000");
});

