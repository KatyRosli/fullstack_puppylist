// @ts-nocheck
import Database from "../Database";
import { PuppyRepository } from '../repositories/Puppy.repository';
import { PuppyService } from './Puppy.service';

describe('Puppy service', () => {
    let puppyService = new PuppyService(new PuppyRepository());

    it('Should have access to the puppy repository', () => {
        expect(puppyService.puppyRepo).toBeDefined();
    })

    it('Should have a method called createPuppy', () => {
        expect(puppyService.create).toBeDefined();
    })

    it('Should call the createPuppy method on the puppyRepository when the createPuppy mthod on the service gets invoked', async () => {
        const spy = jest.spyOn(puppyService.puppyRepo, 'create')
        const result = await puppyService.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })
        expect(spy).toHaveBeenCalled();
    })

    it('Should return a created puppy', async () => {
        const createdPuppy = await puppyService.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })
        const createdPuppy2 = await puppyService.create({
            breed: 'Bulldog', 
            name: 'Rockstar',
            birthdate: '2017/06/01'
        })

        expect(createdPuppy).toEqual({
            id: '1',
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })

        expect(createdPuppy2).toEqual({
            id: '2',
            breed: 'Bulldog', 
            name: 'Rockstar',
            birthdate: '2017/06/01'
        })
    });

    it('Should not create puppy not born yet', async () => {
        expect(await puppyService.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2030/01/06'
        })).toThrowError(new Error('Puppy not born yet'))
    });

    afterEach(() => {
        Database.clear()
    })
})
