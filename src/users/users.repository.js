import { authorityName } from "@prisma/client";

export class UsersRepository {
    constructor(prisma){
        this.prisma = prisma;
    }

    // 유저 전체 조회 로직
    findAllUser = async () => {
        const AllUser = await this.prisma.users.findMany({
            select : {
                userId : true,
                username : true,
                nickname : true,
                createdAt : true,
                authorities : {
                    select : {
                        authorityName : true
                    }
                }
            }
        });

        return AllUser;
    }

    // 유저 상세 조회
    findUserOne = async (paramId) => {
        const userOne = await this.prisma.users.findFirst({
            where : { userId : +paramId },
            include : {
                authorities : {
                    select : {
                        authorityName : true
                    }
                }
            }
        });

        return userOne;
    }

    // 권한 확인
    perMisson = async (userId) => {
        const permisson = await this.prisma.authorities.findFirst({ 
            where :{ userId : +userId } 
        });

        return permisson;
    }
}