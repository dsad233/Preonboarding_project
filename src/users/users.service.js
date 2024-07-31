export class UsersService {
    constructor(usersRepository){
        this.usersRepository = usersRepository;
    }

    // 유저 전체 조회 서비스 로직
    findAllUser = async (userId) => {
        const permisson = await this.usersRepository.perMisson(userId);
        const findAllUser = await this.usersRepository.findAllUser();
        
        if(permisson.authorityName !== "ADMIN"){
            throw new Error("관리자 권한이 존재하지 않아 접근이 불가합니다.");
        }

        if(findAllUser.length === 0){
            throw new Error("현재 존재하는 유저가 없습니다.");
        }

        return findAllUser;
    }
    
    // 유저 상세 조회
    findUserOne = async (userId, paramId) => {
        console.log("paramId : ", paramId);
        console.log("userId : ",userId);
        const userOne = await this.usersRepository.findUserOne(paramId);
        const permisson = await this.usersRepository.perMisson(userId);

        if(!userOne){
            throw new Error("조회하신 유저가 존재하지 않습니다.");
        }

        if(userOne.userId !== userId){
            throw new Error("유저 정보가 다릅니다.");
        }

        if(userOne.userId === userId && permisson.authorityName === 'USER' || permisson.authorityName === 'ADMIN'){
            return userOne;
        } else {
            throw new Error("접근 권한이 없습니다.");
        }
    }
}