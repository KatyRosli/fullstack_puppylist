// @ts-nocheck

import { Response } from "express";
import { PuppyController } from "./Puppy.controller";

class MockedPuppyService {
    public readonly puppyRepo: unknown
    async createPuppy(data: unknown) {
        return data
    }
}

describe('Puppy Controller', () => {
    let puppyController = new PuppyController(new MockedPuppyService())
    
    it('Should have access to the puppy service', () => {
        expect(puppyController.puppyService).toBeDefined()
    })

    it('Should have a method called Store', () => {
        expect(puppyController.store).toBeDefined()
    })

    it('Should make a call to puppyService.createPuppy', async () => {
        const spy = jest.spyOn(puppyController.puppyService, 'create')
        await puppyController.store({
            body:{
                breed: 'Aussie Poodle', 
                name: 'CutieCheekyPie',
                birthdate: '2016/01/06'
            }
        }, new Response())

        expect(spy).toHaveBeenCalled()
    })

    it('Should return a puppy with the breed Aussie Poodle, name CutieCheekyPie, birthdate 2016/01/06', async () => {
        const result = await puppyController.store({
            body:{
                breed: 'Aussie Poodle', 
                name: 'CutieCheekyPie',
                birthdate: '2016/01/06'
            }
        }, new Response())
        const result2 = await puppyController.store({
            body:{
                breed: 'Bulldog', 
                name: 'Rockstar',
                birthdate: '2017/06/01'
            }
        }, new Response())

        expect(result.breed).toBe('Aussie Poodle')
        expect(result.name).toBe('CutieCheekyPie')
        expect(result.birthdate).toBe('2016/01/06')
        expect(result2.breed).toBe('Bulldog')
        expect(result2.name).toBe('Rockstar')
        expect(result2.birthdate).toBe('2017/06/01')
    })
});