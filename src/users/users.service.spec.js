import { UsersService } from "./users.service.js";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const mockUserPrisma = {
    findAllUser : jest.fn(),
    findUserOne : jest.fn(),
    perMisson : jest.fn()
};


const usersService = new UsersService(mockUserPrisma);


describe('UsersService Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Get findAllUser Servcie', async () => {
        const userId = 1;
        const permission = { authorityName: "ADMIN" };
        const findAll = [
            {
                userId : 1,
                username : "user_name",
                nickname : "nick_name",
                createdAt : new Date('06 October 2011 15:50 UTC')
            },
            {
                userId : 2,
                username : "user_name2",
                nickname : "nick_name2",
                createdAt : new Date('06 October 2011 15:55 UTC')
            }
        ];

        mockUserPrisma.perMisson.mockResolvedValue(permission);
        mockUserPrisma.findAllUser.mockResolvedValue(findAll);

        const findAllUsers = await usersService.findAllUser(userId);

        expect(mockUserPrisma.findAllUser).toHaveBeenCalledTimes(1);
        expect(mockUserPrisma.perMisson).toHaveBeenCalledWith(userId);
        expect(findAllUsers).toEqual(findAll);
    });

    test('Get findUserOne Service', async () => {
        const userId = 1;
        const paramId = 1;
        const permission = { authorityName: "USER" };
        const findOne = {
            userId : 1,
            nickname : "nick_name",
            username : "user_name",
            password : "hashed_password",
            createdAt : new Date('07 October 2011 15:50 UTC'),
            updatedAt : new Date('07 October 2011 15:50 UTC')
        };

        mockUserPrisma.findUserOne.mockResolvedValue(findOne);
        mockUserPrisma.perMisson.mockResolvedValue(permission);

        const findOneUser = await usersService.findUserOne(userId, paramId);

        expect(mockUserPrisma.findUserOne).toHaveBeenCalledTimes(1);
        expect(mockUserPrisma.perMisson).toHaveBeenCalledTimes(1);
        expect(mockUserPrisma.findUserOne).toHaveBeenCalledWith(paramId);
        expect(mockUserPrisma.perMisson).toHaveBeenCalledWith(userId);
        expect(findOneUser).toEqual(findOne);
    });

    test('UserOne undefined', async () => {
        const userId = 1;
        const paramId = 1;

        const undefined = null;

        mockUserPrisma.findUserOne.mockReturnValue(undefined);

        try{
            await usersService.findUserOne(userId, paramId);
        } catch (error) {
            expect(error.message).toBe('조회하신 유저가 존재하지 않습니다.');
        }
    });

    test('UserId and ParamId false', async () => {
        const userId = 2;
        const paramId = 1;
        const findOne = {
            userId : 1,
            nickname : "nick_name",
            username : "user_name",
            password : "hashed_password",
            createdAt : new Date('07 October 2011 15:50 UTC'),
            updatedAt : new Date('07 October 2011 15:50 UTC')
        };

        mockUserPrisma.findUserOne.mockResolvedValue(findOne);

        try {
            await usersService.findUserOne(userId, paramId);
        } catch (error) {
            expect(error.message).toBe("유저 정보가 다릅니다.");
        }
    });

    test('UserOne same userId and permisson check', async () => {
        const userId = 1;
        const paramId = 1;
        const permission = { authorityName: "USER" };
        const findOne = {
            userId : 1,
            nickname : "nick_name",
            username : "user_name",
            password : "hashed_password",
            createdAt : new Date('07 October 2011 15:50 UTC'),
            updatedAt : new Date('07 October 2011 15:50 UTC')
        };

        mockUserPrisma.findUserOne.mockResolvedValue(findOne);
        mockUserPrisma.perMisson.mockResolvedValue(permission);

        try {
            await usersService.findUserOne(userId, paramId);
        } catch (error) {
            expect(error.message).toBe('접근 권한이 없습니다.');
        }
    });
});