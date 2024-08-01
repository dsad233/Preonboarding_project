import { UsersController } from "../users.controller.js";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const mockUserService = {
    findAllUser : jest.fn(),
    findUserOne : jest.fn()
};

const mockRequest = {
    user: jest.fn(),
    params: jest.fn()
};

const mockResponse = {
    status : jest.fn(),
    json : jest.fn()
};

const usersController = new UsersController(mockUserService);

describe('UsersController Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockResponse.status.mockReturnValue(mockResponse);
        mockResponse.json.mockReturnValue(mockResponse);
    });

    describe('Get findAllUser Controller', () => {
        test('findAllUser Controller Test', async () => {
            const AllUser = [
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
    
            mockRequest.user = { userId : 1 };
    
            mockUserService.findAllUser.mockReturnValue(AllUser);
    
            await usersController.findAllUser(mockRequest, mockResponse);
    
            expect(mockUserService.findAllUser).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "성공적으로 유저 전체 조회를 완료하였습니다.",
                data : AllUser
            });
        });
    
        test('Get findAllUser Server Error', async () => {
            mockRequest.user = { userId : 1 };
            const errorMessage = "서버 에러가 발생했습니다.";
            
            mockUserService.findAllUser.mockRejectedValue(new Error(errorMessage));
    
            await usersController.findAllUser(mockRequest, mockResponse);
    
            expect(mockUserService.findAllUser).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message : errorMessage });
        });
    });


    describe('Get findUserOne Controller', () => {
        test('findUserOne Controller Test', async () => {
            const findOne = {
                userId : 1,
                username : "user_name",
                nickname : "nick_name",
                createdAt : new Date('06 October 2011 15:50 UTC')
            };
    
            mockRequest.user = { userId : 1 };
            mockRequest.params = { paramId : 1 };
    
            mockUserService.findUserOne.mockReturnValue(findOne);
    
            await usersController.findUserOne(mockRequest, mockResponse);
    
            expect(mockUserService.findUserOne).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "성공적으로 유저 상세 조회를 완료하였습니다.",
                data: findOne
            });
        });
    
        test('Get findUserOne Server Error', async () => {
            mockRequest.user = { userId : 1 };
            mockRequest.params = { paramId : 1 };
            const errorMessage = "서버 에러가 발생했습니다.";
    
            mockUserService.findUserOne.mockRejectedValue(new Error(errorMessage));
    
            await usersController.findUserOne(mockRequest, mockResponse);
    
            expect(mockUserService.findUserOne).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message : errorMessage });
        });
    });
});