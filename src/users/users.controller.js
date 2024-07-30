export class UsersController {
    constructor(usersService){
        this.usersService = usersService;
    }

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