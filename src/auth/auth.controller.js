/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth 회원가입, 로그인 API
 */

export class AuthController {
    constructor(authService){
        this.authService = authService;
    }

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     tags:
     *       - Auth
     *     summary: 회원가입
     *     description: '유저의 회원가입을 돕습니다.'
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: 유저 아이디 설정
     *                 example: 'username'
     *               password:
     *                 type: string
     *                 description: 비밀번호 설정
     *                 example: '123123'
     *               passwordConfirm:
     *                 type: string
     *                 description: 비밀번호 확인
     *                 example: '123123'
     *               nickname:
     *                 type: string
     *                 description: 닉네임 설정
     *                 example: '닉네임란'
     *             required:
     *               - username
     *               - password
     *               - passwordConfirm
     *               - nickname
     *     responses:
     *       201:
     *         description: 성공적인 회원가입 완료.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "성공적으로 회원가입이 완료되었습니다."
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "서버 에러가 발생했습니다."
     */

    // 회원가입 로직
    register = async (req, res, next) => {
        try {
            const { username, password, nickname, passwordConfirm } = req.body;

            if (!username) {
                return res.status(400).json({ message: "유저 아이디를 입력해주세요." });
            }

            if (!password) {
                return res.status(400).json({ message: "패스워드란을 입력해주세요." });
            }

            if (password !== passwordConfirm) {
                return res.status(400).json({ message: "패스워드 확인란과 일치하지 않습니다. 다시 입력해주세요." });
            }

            if (!nickname) {
                return res.status(400).json({ message: "닉네임을 입력해주세요." });
            }

            await this.authService.register(username, password, nickname);

            return res.status(201).json({ message: "성공적으로 회원가입이 완료되었습니다." });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: 로그인
     *     description: 유저가 로그인을 진행할 수 있습니다.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: 유저 아이디
     *                 example: 'username'
     *               password:
     *                 type: string
     *                 description: 패스워드
     *                 example: '123123'
     *             required:
     *               - username
     *               - password
     *     responses:
     *       200:
     *         description: 로그인 완료.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "로그인 완료., token"
     *                 userJwt:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     *                 refreshToken:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     *       500:
     *         description: 서버 에러가 발생했습니다.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "서버 에러가 발생했습니다."
     */

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