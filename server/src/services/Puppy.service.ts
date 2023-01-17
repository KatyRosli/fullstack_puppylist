import { IPuppy } from "../Database";
import { PuppyRepository } from "../repositories/Puppy.repository";

export class PuppyService {
    constructor(public puppyRepo: PuppyRepository) {}

    async create(puppyData: Omit<IPuppy, 'id'>) {
        const puppyNotBornYet =
            new Date(puppyData.birthdate).getTime() > new Date().getTime();
        if(puppyNotBornYet) {
            throw new Error('Puppy not born yet');
        }
        return this.puppyRepo.create(puppyData);
    }

    async update(puppyData: IPuppy) {
        const puppyNotBornYet =
            new Date(puppyData.birthdate).getTime() > new Date().getTime();
        if(puppyNotBornYet) {
            throw new Error('Puppy not born yet');
        }
        return this.puppyRepo.update(puppyData);
    }

    async getAll() {
        return this.puppyRepo.getAll();
    }

    async getOne(id: Number) {
        const puppiesNotExist = ((await this.getAll())
            .filter(puppy => (puppy.id) === String(id)).length === 0);
        if(puppiesNotExist) {
            throw new Error('Puppy not found');
        }
        return this.puppyRepo.getOne(id);
    }

    async delete(id: Number) {
        const puppiesNotExist = ((await this.getAll())
            .filter(puppy => (puppy.id) === String(id)).length === 0);
        if(puppiesNotExist) {
            throw new Error('Puppy not found');
        }
        return this.puppyRepo.delete(id);
    }
}
