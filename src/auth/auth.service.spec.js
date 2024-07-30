import { AuthService } from "../auth/auth.service.js";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mockAuthRepository = {
    register: jest.fn(),
    findUsername: jest.fn(),
    findNickname: jest.fn()
  };

  
const mockHashPassword = jest.fn();
  

const authService = new AuthService(mockAuthRepository, mockHashPassword);

describe('AuthService Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('hash_Password Test', async () => {
        const body = {
            password : "password"
        };
        const saltRounds = Number(process.env.HASH_ROUND);
        const hashedPassword = 'hashed_password';

        bcrypt.hash.mockResolvedValue(hashedPassword);

        const hashResult = await hashedPassword(body.password);
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(bcrypt.hash).toHaveBeenCalledWith(body.password, saltRounds);
        expect(hashResult).toBe(hashedPassword);
    });

    test('register Service Test', async () => {
        const findUser = {
            userId : 1,
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name",
            createdAt : new Date('06 October 2011 15:50 UTC'),
            updatedAt : new Date('06 October 2011 15:50 UTC')
        };
        const body = {
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name"
        };
        const hash_Password = await authService.hashpassword(body.password);
        mockAuthRepository.findUsername.mockReturnValue(null);
        mockAuthRepository.findNickname.mockReturnValue(null);
        mockAuthRepository.register.mockReturnValue(findUser);
        mockHashPassword.mockReturnValue(hash_Password);

        const userCreate = await authService.register(body.username, body.password, body.nickname);

        expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);

        expect(mockAuthRepository.findNickname).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.findNickname).toHaveBeenCalledWith(body.nickname);

        expect(mockAuthRepository.register).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.register).toHaveBeenCalledWith(body.username, hash_Password, body.nickname);

        expect(userCreate).toEqual(findUser);
    });

    test('register Service findUsername already Error', async () => {
        const findUser = {
            userId : 1,
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name",
            createdAt : new Date('06 October 2011 15:50 UTC'),
            updatedAt : new Date('06 October 2011 15:50 UTC')
        };
        const body = {
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name"
        };
        const hash_Password = 'hashed_password';

        mockAuthRepository.findUsername.mockReturnValue(findUser);
        mockAuthRepository.findNickname.mockReturnValue(null);
        mockHashPassword.mockReturnValue(hash_Password);

        try {
            await authService.register(body.username, body.password, body.nickname);
        } catch (error) {
            expect(error.message).toBe("이미 존재하는 유저입니다.");
        }
    });
    
    test('register Service findNickname already Error', async () => {
        const findUser = {
            userId : 1,
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name",
            createdAt : new Date('06 October 2011 15:50 UTC'),
            updatedAt : new Date('06 October 2011 15:50 UTC')
        };
        const body = {
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name"
        };
        const hash_Password = 'hashed_password';

        mockAuthRepository.findUsername.mockReturnValue(null);
        mockAuthRepository.findNickname.mockReturnValue(findUser);
        mockHashPassword.mockReturnValue(hash_Password);

        try {
            await authService.register(body.username, body.password, body.nickname);
        } catch (error) {
            expect(error.message).toBe("이미 존재하는 닉네임 입니다.");
        }
    });

    test('Login Service Test', async () => {
        const findUser = {
            userId : 1,
            username : "user_name",
            password : "hashed_password",
            nickname : "nick_name",
            createdAt : new Date('06 October 2011 15:50 UTC'),
            updatedAt : new Date('06 October 2011 15:50 UTC')
        };
        const body = {
            username : "user_name",
            password : "password"
        };

        const userJwt = 'user_jwt_token';
        const refreshToken = 'refresh_token';
        bcrypt.compare.mockResolvedValue(true);
        mockAuthRepository.findUsername.mockReturnValue(findUser);
 
        const login = await authService.login(body.username, body.password);

        expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);


        
    });
});

//   describe('Auth Service Test', () => {

//     beforeEach(() => {
//         jest.resetAllMocks(); 
//     });

//     test('register Repository Test', async () => {
//         const registerReturn = {
//             userId : 1,
//             nickname : "test",
//             username : "user_test",
//             password : "hashed_password",
//             createdAt: new Date('07 October 2011 15:50 UTC'),
//             updatedAt: new Date('07 October 2011 15:50 UTC'),
//         };
//         const hashPasswordReturn = 'hashed_password';
        
//         mockAuthRepository.findUsername.mockReturnValue(null); 
//         mockAuthRepository.findNickname.mockReturnValue(null);
//         mockHashPassword.mockReturnValue(hashPasswordReturn);
//         mockAuthRepository.register.mockReturnValue(registerReturn);

//         const createUserParams = {
//             username: 'user_test',
//             password: 'plain_password',
//             nickname: 'test',
//         };
        
//         const CreateUser = await authService.register(
//             createUserParams.username,
//             createUserParams.password,
//             createUserParams.nickname
//         );

//         expect(CreateUser).toEqual(registerReturn);
//         expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(createUserParams.username);
//         expect(mockAuthRepository.findNickname).toHaveBeenCalledWith(createUserParams.nickname);
//         expect(mockHashPassword).toHaveBeenCalledWith(createUserParams.password); 
//         expect(mockAuthRepository.register).toHaveBeenCalledTimes(1);
//         expect(mockAuthRepository.register).toHaveBeenCalledWith(createUserParams.username, hashPasswordReturn, createUserParams.nickname);
//     });

//     test('username already exists', async () => {
//         const alreadyUser = { username : "user_test" };
//         const hashPasswordReturn = 'hashed_password';

//         mockAuthRepository.findUsername(alreadyUser);
//         mockAuthRepository.findNickname(null);
//         mockHashPassword.mockReturnValue(hashPasswordReturn);
        
//         await expect(authService.register('user_test', 'plain_password', 'test')).rejects.toThrow('이미 존재하는 유저입니다.');
//     });

//     test('nickname aleady exists', async () => {
//         const aleadyNickname = { nickname : "nickname" };
//         const findUsernameReturn = null;
//         const hashPasswordReturn = 'hashed_password';

//         mockAuthRepository.findUsername.mockResolvedValue(findUsernameReturn);
//         mockAuthRepository.findNickname.mockResolvedValue(aleadyNickname);
//         mockHashPassword.mockReturnValue(hashPasswordReturn);

//         await expect(authService.register('user_test', 'plain_password', 'test')).rejects.toThrow('이미 존재하는 닉네임 입니다.');
//     });

//   });