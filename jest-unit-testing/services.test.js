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
        jest.spyOn(User,'find').mockResolvedValue([{username: 'User1'},{username: 'User2'}]);
        const expected = [{username: 'User1'}];
        return mut.getUsers('User1').then(got => {
            expect(got).toEqual(expected);
        });
    });
})


