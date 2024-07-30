import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    constructor(authRepository){
        this.authRepository = authRepository;
    }

    // 패스워드 암호화
    hashpassword = async (password) => {
        const salt = Number(process.env.HASH_ROUND);
        const hashpassword = await bcrypt.hash(password , salt);

        return hashpassword;
    }

    // 회원가입 서비스 로직
    register = async (username, password, nickname) => {
        const findUsername = await this.authRepository.findUsername(username);
        const findNickname = await this.authRepository.findNickname(nickname);
        const hashpassword = await this.hashpassword(password);

        if(findUsername !== null && findUsername.username === username){
            throw new Error("이미 존재하는 유저입니다.");
        }

        if(findNickname !== null && findNickname.nickname === nickname){
            throw new Error("이미 존재하는 닉네임 입니다.");
        }

        const userCreate = await this.authRepository.register(username, hashpassword, nickname);

        return userCreate;
    }


    // 회원가입 서비스 로직
    login = async (username, password) => {
        const findUsername = await this.authRepository.findUsername(username);

        if(!findUsername){
            throw new Error("유저가 존재하지 않습니다.");
        }

        if(!await bcrypt.compare(password, findUsername.password)){
            throw new Error("패스워드가 일치하지 않습니다.");
        }

        const userJwt = jwt.sign({ userId : findUsername.userId }, process.env.JWT_SECRET, { expiresIn : '12h' });
        const refreshToken = jwt.sign({ userId : findUsername.userId }, process.env.JWT_SECRET_REFRESH, { expiresIn : '5d' });

        return { userJwt, refreshToken };
    }
}