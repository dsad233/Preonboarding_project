// import { AuthController } from "./auth.controller.js";
// import { jest } from '@jest/globals';

// // Mock 서비스 설정
// const mockAuthService = {
//   register: jest.fn(),
//   login: jest.fn()
// };

// // Mock 요청, 응답, 넥스트 객체 설정
// const mockReq = {
//   body: {}
// };

// const mockRes = {
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn(),
//   cookie: jest.fn(),
// };

// const mockNext = jest.fn();

// // AuthController 인스턴스 생성
// const authController = new AuthController(mockAuthService);

// describe('AuthController', () => {
//   describe('register', () => {
//     test('username not input', async () => {
//       mockReq.body = { password: 'password', passwordConfirm: 'passwordConfirm', nickname: 'nickname' };

//       await authController.register(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "유저 아이디를 입력해주세요." });
//     });

//     test('password not input', async () => {
//       mockReq.body = { username: 'username', passwordConfirm: 'passwordConfirm', nickname: 'nickname' };

//       await authController.register(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "패스워드란을 입력해주세요." });
//     });

//     test('passwordConfirm not input', async () => {
//       mockReq.body = { username: 'username', password: 'password', nickname: 'nickname' };

//       await authController.register(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "패스워드 확인란과 일치하지 않습니다. 다시 입력해주세요." });
//     });

//     test('nickname not input', async () => {
//       mockReq.body = { username: 'username', password: 'password', passwordConfirm: 'passwordConfirm' };

//       await authController.register(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "닉네임을 입력해주세요." });
//     });

//     test('Create Done.', async () => {
//       mockReq.body = { username: 'username', password: 'password', passwordConfirm: 'passwordConfirm', nickname: 'nickname' };

//       await authController.register(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(201);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "성공적으로 회원가입이 완료되었습니다." });
//     });
//   });

//   describe('login', () => {
//     test('username not input', async () => {
//       mockReq.body = { password: 'password' };

//       await authController.login(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "유저 아이디를 입력해주세요." });
//     });

//     test('password not input', async () => {
//       mockReq.body = { username: 'username' };

//       await authController.login(mockReq, mockRes, mockNext);
//       expect(mockRes.status).toHaveBeenCalledWith(400);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "패스워드란을 입력해주세요." });
//     });

//     test('Login Done.', async () => {
//       mockReq.body = { username: 'username', password: 'password' };
//       const token = { userJwt: 'userJwt', refreshToken: 'refreshToken' };

//       mockAuthService.login.mockResolvedValue(token);

//       await authController.login(mockReq, mockRes, mockNext);
//       expect(mockAuthService.login).toHaveBeenCalledWith('username', 'password');
//       expect(mockRes.cookie).toHaveBeenCalledWith('authorization', `Bearer ${token.userJwt}`);
//       expect(mockRes.cookie).toHaveBeenCalledWith('refreshToken', token.refreshToken);
//       expect(mockRes.status).toHaveBeenCalledWith(200);
//       expect(mockRes.json).toHaveBeenCalledWith({ message: "로그인 완료." });
//     });
//   });
// });
