import Database, { IPuppy } from "../Database";

export class PuppyRepository {
    public readonly db = Database

    async getAll() {
        return this.db.all()
    }

    async getOne(id: Number): Promise<IPuppy> {
        return this.db.getOne(id)
    }

    async delete(id: Number): Promise<IPuppy[]> {
        return this.db.delete(id)
    }

    async create(puppyData: Omit<IPuppy, 'id'>): Promise<Omit<IPuppy, 'id'>> {
        return this.db.create(puppyData)
    }

    async update(puppyData: IPuppy): Promise<Omit<IPuppy, 'id'>> {
        return this.db.update(puppyData)
    }
}

