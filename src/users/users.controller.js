/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users 유저 전체 조회(어드민만 접근 가능), 유저 상세 조회(유저, 어드민 접근 가능) API
 */

export class UsersController {

    constructor(usersService){
        this.usersService = usersService;
    }

    /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     summary: 유저 전체 목록 조회
   *     description: 이 기능은 어드민 권한자만 접근이 가능합니다.
   *     responses:
   *       200:
   *         description: 성공적인 유저 전체 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "성공적으로 유저 전체 조회를 완료하였습니다."
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       userId:
   *                         type: number
   *                         description: 유저 넘버링
   *                         example: '1'
   *                       username:
   *                         type: string
   *                         description: 유저 아이디
   *                         example: 'username'
   *                         required: true
   *                       nickname:
   *                         type: string
   *                         description: 유저 닉네임
   *                         example: '닉네임란'
   *                         required: true
   *                       createdAt:
   *                         type: timestamp
   *                         description: 유저가 회원가입한 일시
   *                         example: '2024-04-12T04:51:37.510Z'
   *                         required: false
   *                       authorities : 
   *                         properties:
   *                            authorityName : 
   *                                type: string
   *                                enum:
   *                                    - USER
   *                                    - ADMIN
   *                                description: 유저 권한여부
   *                                example: 'USER'
   *                                required: true
   *               example:
   *                 message: "성공적으로 유저 전체 조회를 완료하였습니다."
   *                 data:
   *                   - userId: 1
   *                     username: 'username'
   *                     nickname: '닉네임란'
   *                     createdAt: '2024-04-12T04:51:37.510Z'
   *                     authorities:
   *                       authorityName: 'USER'
   *                   - userId: 2
   *                     username: 'username2'
   *                     nickname: '닉네임란2'
   *                     createdAt: '2024-04-13T04:59:05.303Z'
   *                     authorities:
   *                       authorityName: 'ADMIN'                  
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

    // 유저 전체 조회 로직 (어드민만 접근 가능)
    findAllUser = async (req, res) => {
        try {
            const { userId } = req.user;
            const AllUser = await this.usersService.findAllUser(userId);

            return res.status(200).json({ message : "성공적으로 유저 전체 조회를 완료하였습니다.", data : AllUser });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
    }

    /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     summary: 유저 상세 조회
   *     description: 이 기능은 유저와 어드민이 접근 가능합니다.
   *     parameters:
   *       - name: userId
   *         in: path
   *         description: User ID paramId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 성공적인 유저 상세 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "성공적으로 유저 상세 조회를 완료하였습니다."
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       userId:
   *                         type: number
   *                         description: 유저 넘버링
   *                         example: '1'
   *                       nickname:
   *                         type: string
   *                         description: 유저 닉네임
   *                         example: '닉네임란'
   *                         required: true
   *                       username:
   *                         type: string
   *                         description: 유저 아이디
   *                         example: 'username'
   *                         required: true
   *                       password:
   *                         type: string
   *                         description: 유저 패스워드
   *                         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
   *                         required: true
   *                       createdAt:
   *                         type: timestamp
   *                         description: 유저가 회원가입한 일시
   *                         example: '2024-04-12T04:51:37.510Z'
   *                         required: false
   *                       updatedAt:
   *                         type: timestamp
   *                         description: 유저가 회원정보를 수정한 일시
   *                         example: '2024-04-13T04:51:37.510Z'
   *                         required: false
   *                       authorities : 
   *                         properties:
   *                            authorityName : 
   *                                type: string
   *                                enum:
   *                                    - USER
   *                                    - ADMIN
   *                                description: 유저 권한여부
   *                                example: 'USER'
   *                                required: true
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

    // 유저 상세 조회 로직 (유저와 어드민이 접근 가능)
    findUserOne = async (req, res) => {
        try {
            const { userId } = req.user;
            const { paramId } = req.params;

            const findUser = await this.usersService.findUserOne(userId, paramId);

            return res.status(200).json({ message : "성공적으로 유저 상세 조회를 완료하였습니다.", data : findUser });
        } catch(error) {
            console.log(error.message);
            return res.status(500).json({ message: "서버 에러가 발생했습니다." });
        }
    }
}