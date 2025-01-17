import { Prisma } from "@prisma/client";

export class AuthRepository{
    constructor(prisma){
        this.prisma = prisma;
    }

    // 회원가입 로직
    register = async (username, hashpassword, nickname) => {
        const [userCreate, authoritiesCreate] = await this.prisma.$transaction(async (tx) => {
            const userCreate = await tx.users.create({
                data : {
                    username,
                    password : hashpassword,
                    nickname
                }
            });
    
            const authoritiesCreate = await tx.authorities.create({
                data : {
                    userId : userCreate.userId,
                    authorityName : "USER"
                }
            });
        
            return [userCreate, authoritiesCreate];
        }, {
            isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
        });

        return { userCreate, authoritiesCreate };
    };

    // 일치하는 유저이름 확인 로직
    findUsername = async (username) => {
        const findUsername = await this.prisma.users.findFirst({ where : { username } });

        return findUsername;
    };

    // 일치하는 닉네임 확인 로직
    findNickname = async (nickname) => {
        const findNickname = await this.prisma.users.findUnique({ where : { nickname } });
        
        return findNickname;
    };
}