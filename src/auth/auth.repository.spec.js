import { AuthRepository } from "./auth.repository";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const mockPrisma = {
    users : {
        create : jest.fn(),
        findFirst : jest.fn(),
        findUnique : jest.fn()
    }, 
    authorities : {
        create : jest.fn()
    }
};


const authRepository = new AuthRepository(mockPrisma);


describe('AuthRepository Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Post register Create Test', async () => {
        const userCreateReturn = {
            userId: 1,
            username: "user_name",
            password: "hashed_password",
            nickname: "nickname"
        };
        const authoritieCreateReturn = 'authoritieCreate Done';
        const body = { 
            username : "user_name", 
            password : "hashed_password", 
            nickname : "nickname" 
        };

        mockPrisma.users.create.mockReturnValue(userCreateReturn);
        mockPrisma.authorities.create.mockReturnValue(authoritieCreateReturn);

        const userCreate = await authRepository.register(body.username, body.password, body.nickname);

        expect(mockPrisma.users.create).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.create).toHaveBeenCalledWith({
            data: {
                username: body.username,
                password: body.password,
                nickname: body.nickname
            }
        });

        expect(mockPrisma.authorities.create).toHaveBeenCalledTimes(1);
        expect(mockPrisma.authorities.create).toHaveBeenCalledWith({
            data: {
                userId: userCreateReturn.userId,
                authorityName: "USER"
            }
        });
        expect(userCreate).toEqual(userCreateReturn);
    });

    test('findUsername findFirst Test', async () => {
        const findUsername = {
            username : "user_name"
        };
        const body = {
            username : "user_name"
        };

        mockPrisma.users.findFirst.mockReturnValue(findUsername);

        const findName = await authRepository.findUsername(body.username);

        expect(mockPrisma.users.findFirst).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({
            where : { username : body.username }
        });

        expect(findName).toEqual(findUsername);
    });

    test('findNickname findFirst Test', async () => {
        const findNickname = {
            nickname : "nick_name"
        };
        const body = {
            nickname : "nick_name"
        };

        mockPrisma.users.findUnique.mockReturnValue(findNickname);

        const findNick = await authRepository.findNickname(body.nickname);

        expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
            where : { nickname : body.nickname }
        });

        expect(findNick).toEqual(findNickname);
    });
});
