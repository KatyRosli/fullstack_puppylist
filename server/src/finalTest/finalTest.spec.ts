// @ts-nocheck
import { puppyController } from "./finalTest";

describe('finalTest Puppy Module', () => {
    it('Should create a puppy and return the full puppy data', async (done) =>{
        const result = await puppyController.store({
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })

        expect(result).toEqual({
            breed: 'Aussie Poodle', 
            name: 'CutieCheekyPie',
            birthdate: '2016/01/06'
        })

        done();
    })
});