import { AuthController } from "../auth.controller.js";
import { beforeEach, describe, expect, jest, test } from '@jest/globals';


const mockAuthService = {
  register: jest.fn(),
  login: jest.fn()
};

// 가상 request 설정
const mockRequest = {
    body : {}
};

// 가상 response 설정
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn(),
};

// 가상 next 요청 설정
const mockNext = jest.fn();

// AuthController 인스턴스 생성
const authController = new AuthController(mockAuthService);


describe('AuthController Test', () => {
    describe('register Controller Test', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            mockResponse.status.mockReturnValue(mockResponse);
            mockResponse.json.mockReturnValue(mockResponse);
        });
        test('Post register Controller Test', async () => {
            const body = {
                username : "user_name",
                password : "password",
                passwordConfirm : "password",
                nickname : "nick_name"
            };
            const findUser = {
                userId : 1,
                username : "user_name",
                password : "password",
                nickname : "nick_name",
                createdAt : new Date('06 October 2011 15:50 UTC'),
                updatedAt : new Date('06 October 2011 15:50 UTC')
            };

            mockRequest.body = body;

            mockAuthService.register.mockReturnValue(findUser);

            await authController.register(mockRequest, mockResponse, mockNext);

            expect(mockAuthService.register).toHaveBeenCalledTimes(1);
            expect(mockAuthService.register).toHaveBeenCalledWith(
                body.username,
                body.password,
                body.nickname
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "성공적으로 회원가입이 완료되었습니다." });

        });

        test('Post register Controller Test Error', async() => {
            const errorMessage = "서버 에러가 발생했습니다.";

            mockAuthService.register.mockRejectedValue(new Error(errorMessage));

            await authController.register(mockRequest, mockResponse, mockNext);

            expect(mockAuthService.register).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message : errorMessage });
        });

        test('Post login Controller Test', async () => {
            const body = {
                username : "user_name",
                password : "password"
            };

            const userJwt = 'userjwt_token';
            const refreshToken = 'refresh_token';

            const token = {
                userJwt,
                refreshToken
            };

            const Done = "로그인 완료."

            const result = { message : Done, token };

            mockRequest.body = body;

            mockAuthService.login.mockReturnValue(token);

            await authController.login(mockRequest, mockResponse, mockNext);

            expect(mockAuthService.login).toHaveBeenCalledTimes(1);
            expect(mockAuthService.login).toHaveBeenCalledWith(
                body.username,
                body.password
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(result);
            expect(mockResponse.cookie).toHaveBeenCalledWith("authorization", `Bearer ${token.userJwt}`);
            expect(mockResponse.cookie).toHaveBeenCalledWith("refreshToken", token.refreshToken);
        });

        test('Post login Controller Test Error', async () => {
            const errorMessage = "서버 에러가 발생했습니다.";
            
            mockAuthService.login.mockRejectedValue(new Error(errorMessage));

            await authController.login(mockRequest, mockResponse, mockNext);

            expect(mockAuthService.login).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message : errorMessage });
        });
    });
});
