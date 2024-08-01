import { AuthService } from "../auth.service.js";
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
    beforeEach( async () => {
        jest.resetAllMocks();
    });

    describe('hash_Password function Test', () => {
        test('hash_Password Test', async () => {
            const body = {
                password : "password"
            };
            const saltRounds = Number(process.env.HASH_ROUND);
            const hashedPassword = 'hash_password';
    
            jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
            const testhash = await authService.hashpassword(body.password);
    
            mockHashPassword.mockResolvedValue(hashedPassword);
    
            expect(bcrypt.hash).toHaveBeenCalledTimes(1);
            expect(bcrypt.hash).toHaveBeenCalledWith(body.password, saltRounds);
            expect(testhash).toBe(hashedPassword);
        });
    });

    describe('register Service Test', () => {
        test('register Test', async () => {
            const findUser = {
                userId : 1,
                username : "user_name",
                password : await bcrypt.hash('password', 10),
                nickname : "nick_name",
                createdAt : new Date('06 October 2011 15:50 UTC'),
                updatedAt : new Date('06 October 2011 15:50 UTC')
            };
            const body = {
                username : "user_name",
                password : "hashed_password",
                nickname : "nick_name"
            };
    
            const hash_Password = 'hash_Password';
    
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
            expect(mockAuthRepository.register).toHaveBeenCalledWith(body.username, findUser.password, body.nickname);
    
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
    
            mockAuthRepository.findUsername.mockResolvedValue(findUser);
            mockAuthRepository.findNickname.mockResolvedValue(null);
            mockHashPassword.mockReturnValue(hash_Password);
    
            try {
                await authService.register(body.username, body.password, body.nickname);
            } catch (error) {
                expect(error.message).toBe("이미 존재하는 유저입니다.");
            }

            expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);
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
    
            mockAuthRepository.findUsername.mockResolvedValue(null);
            mockAuthRepository.findNickname.mockResolvedValue(findUser);
            mockHashPassword.mockReturnValue(hash_Password);
    
            try {
                await authService.register(body.username, body.password, body.nickname);
            } catch (error) {
                expect(error.message).toBe("이미 존재하는 닉네임 입니다.");
            }

            expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);

            expect(mockAuthRepository.findNickname).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findNickname).toHaveBeenCalledWith(body.nickname);
        });
    });
    
    describe('Login Service Test', () => {
        test('Login Test', async () => {
            const findUser = {
                userId : 1,
                username : "user_name",
                password : await bcrypt.hash('password', 10),
                nickname : "nick_name",
                createdAt : new Date('06 October 2011 15:50 UTC'),
                updatedAt : new Date('06 October 2011 15:50 UTC')
            };
            const body = {
                username : "user_name",
                password : "password"
            };
        
            const userJwt = process.env.JWT_SECRET;
            const refreshToken = process.env.JWT_SECRET;
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            jest.spyOn(jwt, 'sign').mockImplementation((payload, secret) => {
                if(secret === process.env.JWT_SECRET){
                    return userJwt;
                } else if(secret === process.env.JWT_SECRET_REFRESH){
                    return refreshToken;
                }
            });
            mockAuthRepository.findUsername.mockReturnValue(findUser);
        
            const login = await authService.login(body.username, body.password);
        
            expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
            expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);
            expect(bcrypt.compare).toHaveBeenCalledTimes(1);
            expect(bcrypt.compare).toHaveBeenCalledWith(body.password, findUser.password);
            expect(jwt.sign).toHaveBeenCalledTimes(2);
            expect(jwt.sign).toHaveBeenCalledWith({ userId: findUser.userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
            expect(jwt.sign).toHaveBeenCalledWith({ userId: findUser.userId }, process.env.JWT_SECRET_REFRESH, { expiresIn: '5d' });
            expect(login).toEqual({ userJwt : userJwt, refreshToken : refreshToken });
            });
        
            test('Login Service Test Not User Error', async () => {
                const body = {
                    username : "user_name",
                    password : "password"
                };
        
                mockAuthRepository.findUsername.mockResolvedValue(null);
        
                try {
                    await authService.login(body.username, body.password);
                } catch (error) {
                    expect(error.message).toBe("유저가 존재하지 않습니다.");
                }
        
                expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
                expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);
            });
        
            test('Login Service Test Password Error', async () => {
                const findUser = {
                    userId : 1,
                    username : "user_name",
                    password : await bcrypt.hash('password', 10),
                    nickname : "nick_name",
                    createdAt : new Date('06 October 2011 15:50 UTC'),
                    updatedAt : new Date('06 October 2011 15:50 UTC')
                };
        
                const body = {
                    username : "user_name",
                    password : "password"
                };
        
                mockAuthRepository.findUsername.mockResolvedValue(findUser);
                jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
        
                try {
                    await authService.login(body.username, body.password);
                } catch (error){
                    expect(error.message).toBe("패스워드가 일치하지 않습니다.");
                }
        
                expect(mockAuthRepository.findUsername).toHaveBeenCalledTimes(1);
                expect(mockAuthRepository.findUsername).toHaveBeenCalledWith(body.username);
                expect(bcrypt.compare).toHaveBeenCalledTimes(1);
                expect(bcrypt.compare).toHaveBeenCalledWith(body.password, findUser.password);
            });
    });
});
