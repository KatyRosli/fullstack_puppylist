// @ts-nocheck
import Database from "../Database";
import { IPuppy } from "../Database";
import { PuppyRepository } from "./Puppy.repository";

describe('puppy repository', () => {
    let puppyRepo: PuppyRepository = new PuppyRepository();
    
    it('should have access to a databse connection', () => {
        expect(puppyRepo.db).toBeDefined();
    })
    
    it('should have a method called createPuppy',() => {
        expect(puppyRepo.create).toBeDefined();
    });

    it('should call the create method on the database when invoking the createPuppy method on puppyRepository', async () => {
        const spy = jest.spyOn(puppyRepo.db, 'create')
        const result = await puppyRepo.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie', 
            birthdate: '2016/01/06' });

        expect(spy).toHaveBeenCalled();
    });

    it('The createPuppy method should return a new puppy', async () => {
        
        expect(await puppyRepo.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })).toEqual({
            id: '1',
            breed: 'Aussie Poodle',
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        } as IPuppy)
    })

    it('the getAll method should return all puppies', async () => {
        const result = await puppyRepo.getAll();
        expect(result.length).toEqual(0);
        expect(await puppyRepo.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })).toEqual({
            id: '1',
            breed: 'Aussie Poodle',
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        } as IPuppy)
        const resultAll = await puppyRepo.getAll();
        expect(resultAll.length).toEqual(1);
    })

    it('should get one puppy id', async () => {
        const result = await puppyRepo.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie', 
            birthdate: '2016/01/06' });
        expect(result.id).toEqual('1');
        const puppy = await puppyRepo.getOne(result.id);
        expect(puppy.id).toEqual(result.id);
    })

    it('should delete one puppy', async () => {
        const result = await puppyRepo.create({ 
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie', 
            birthdate: '2016/01/06' });
        expect(result.id).toEqual('1');
        const puppy = await puppyRepo.getOne(result.id);
        expect(puppy.id).toEqual(result.id);
        const puppies = await puppyRepo.delete(result.id);
        expect(puppies.length).toEqual(1);
        expect(puppies[0].id).toEqual(result.id);

    })

    afterEach(() => {
        Database.clear()
    })
});