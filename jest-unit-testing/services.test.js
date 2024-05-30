// services.test.js
import {jest} from '@jest/globals';
import mut from "../packages/backend/services.js";

describe('getUser function', () => {
    test('Testing getUser function w/ no name', () => {
        jest.spyOn(mut, 'findUserByName').mockResolvedValue([]);
        const expected = [];
        return mut.getUsers().then(got => {
            expect(got).toEqual(expected);
        });
    });
    
    test('Testing getUser function w/ username', () => {
        jest.spyOn(mut,'findUserByName').mockResolvedValue([{username: 'User1'}]);
        const expected = [{username: 'User1'}];
        return mut.getUsers('User1').then(got => {
            expect(got).toEqual(expected);
        });
    });
})

describe('getTags function', ()=> {gi
    test('Testing getTags w/ no name', () => {
        jest.spyOn(mut, 'find').mockResolvedValue([]);
        const expected = [];
        return mut.getTags().then(got => {
            expect(got).toEqual(expected);
        });
    });
    
    test('Testing getUser function w/ name', () => {
        jest.spyOn(mut,'find').mockResolvedValue([{name: 'School'}]);
        const expected = [{name: 'School'}];
        return mut.getTags('School').then(got => {
            expect(got).toEqual(expected);
        });
    });
})

describe('getEvent function', ()=> {
    test('Testing getEvent w/ no title', () => {
        jest.spyOn(mut, 'find').mockResolvedValue([]);
        const expected = [];
        return mut.getEvent().then(got => {
            expect(got).toEqual(expected);
        });
    });
    
    test('Testing getUser function w/ title', () => {
        jest.spyOn(mut,'find').mockResolvedValue([{title: 'Meeting'}]);
        const expected = [{title: 'Meeting'}];
        return mut.getEvent('Meeting').then(got => {
            expect(got).toEqual(expected);
        });
    });
})

describe('findUserByUsernameAndPassword function', () => {
    test('should return user based on username and password', () => {
        jest.spyOn(User,'find').mockResolvedValue([{username: 'User1', password: 'password'}]);
        const expected = [{username: 'User1', password: 'password'}];
        return mut.findUserByUsernameAndPassword('User1','password').then(got => {
            expect(got).toEqual(expected);
        });
    });
})

describe('findUserByName function', () => {
    test('should return user based on only username', () => {
        jest.spyOn(User,'find').mockResolvedValue([{username: 'User1', password: 'password'}]);
        const expected = [{username: 'User1', password: 'password'}];
        return mut.findUserByName('User1').then(got => {
            expect(got).toEqual(expected);
        });
    });
})
