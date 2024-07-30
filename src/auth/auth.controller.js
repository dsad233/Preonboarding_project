export class AuthController {
    constructor(authService){
        this.authService = authService;
    }

    // 회원가입 로직
    register = async (req, res, next) => {
        try {
            const { username, password, nickname, passwordConfirm } = req.body;

            if(!username){
                return res.status(400).json({ message : "유저 아이디를 입력해주세요." });
            }

            if(!password){
               return res.status(400).json({ message : "패스워드란을 입력해주세요." });
            }

            if(password !== passwordConfirm){
                return res.status(400).json({ message : "패스워드 확인란과 일치하지 않습니다. 다시 입력해주세요." });
            }

            if(!nickname){
                return res.status(400).json({ message : "닉네임을 입력해주세요." });
            }

            await this.authService.register(username, password, nickname);

            return res.status(201).json({ message : "성공적으로 회원가입이 완료되었습니다." });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
    }

    // 로그인 로직
    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;

            if(!username){
                return res.status(400).json({ message : "유저 아이디를 입력해주세요." });
            }

            if(!password){
                return res.status(400).json({ message : "패스워드란을 입력해주세요." });
            }

            const token = await this.authService.login(username, password);
            
            res.cookie("authorization", `Bearer ${token.userJwt}`);
            res.cookie("refreshToken", token.refreshToken);

            return res.status(200).json({ message : "로그인 완료.", token });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
    }
}