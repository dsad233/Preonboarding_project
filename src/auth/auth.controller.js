export class AuthController {
    constructor(authService){
        this.authService = authService;
    }
    
    /**
 * @swagger
 *  /news/{category}/{year}:
 *    get:
 *      tags:
 *      - 뉴스 빅데이터 조회
 *      description: 2020~2021 코로나 및 메타버스 뉴스 빅데이터 조회하기 
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: category
 *          description : 1. corona 2. metabus
 *          required: false
 *          schema:
 *            type: string
 *          examples : 
 *            Samples : 2007
 *            summary : A sample for MetaBus
 *        - in: path
 *          name: year
 *          description : 연도
 *          required: false
 *          schema:
 *            type: string
 *      responses:
 *       200:
 *        description: 공공데이터 조회 성공
 *       400:
 *        description: 데이터가 존재하지 않음
 */

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