import { UsersRepository } from "../users.repository";
import { beforeEach, describe, jest, test, expect } from "@jest/globals";


const mockUserPrisma = {
    users : {
        findMany : jest.fn(),
        findFirst : jest.fn()
    },
    authorities : {
        findFirst : jest.fn()
    }
};


const usersRepository = new UsersRepository(mockUserPrisma);


describe('UsersRepository Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('Get findAllUser', () => {
        test('findAllUser Test', async () => {
            const findAllUser = 'findMany String';
            mockUserPrisma.users.findMany.mockReturnValue(findAllUser);
            
            const findAll = await usersRepository.findAllUser();
    
            expect(usersRepository.prisma.users.findMany).toHaveBeenCalledTimes(1);
            expect(findAll).toBe(findAllUser);
        });
    });

    describe('Get findUserOne', () => {
        test('findUserOne Test', async () => {
            const paramId = 1;
            const findUserOne = 'findFirst String';
            mockUserPrisma.users.findFirst.mockReturnValue(findUserOne);
    
            const findOne = await usersRepository.findUserOne(paramId);
    
            expect(usersRepository.prisma.users.findFirst).toHaveBeenCalledTimes(1);
            expect(usersRepository.prisma.users.findFirst).toHaveBeenCalledWith({
                where: { userId: paramId },
                include : {
                    authorities : {
                        select : {
                            authorityName : true
                        }
                    }
                }
            });
            expect(findOne).toBe(findUserOne);
        });
    });
    
    describe('Get Permission check', () => {
        test('Permission check Test', async () => {
            const userId = 1;
            const findPermission = 'Permission String';
            mockUserPrisma.authorities.findFirst.mockReturnValue(findPermission);
    
            const permisson = await usersRepository.perMisson(userId);
    
            expect(usersRepository.prisma.authorities.findFirst).toHaveBeenCalledTimes(1);
            expect(usersRepository.prisma.authorities.findFirst).toHaveBeenCalledWith({
                where: { userId: userId }
            });
            expect(permisson).toBe(findPermission);
        });
    });
});