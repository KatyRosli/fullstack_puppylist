export interface IPuppy {
    id: string;
    breed: string;
    name: string;
    birthdate: string;
}

export interface PuppyRequestDto {
  breed: string;
  name: string;
  birthdate: string;
}

export interface IDatabaseState {
    puppies: IPuppy[];
}

class Database {
    private state: IDatabaseState = {
        puppies: [] = [
          { 
            id: '1',
            breed: 'German Shepherd',
            name: 'Fluffy',
            birthdate: '2015/04/03',
          },
          { 
            id: '2',
            breed: 'Poodle',
            name: 'CutiePie',
            birthdate: '2016/05/19',
          },
          { 
            id: '3',
            breed: 'French Bulldog',
            name: 'Rockstar',
            birthdate: '2017/06/22',
          },
          { 
            id: '4',
            breed: 'Dalmation',
            name: 'Night',
            birthdate: '2018/07/29',
          }
        ], 
    };

    nextId = (puppiesArray: Array<IPuppy>): string => {
        const highestId = puppiesArray.reduce(
          (currentHighestId: string, currentValue: IPuppy) => (currentValue.id > currentHighestId ? currentValue.id : currentHighestId),
          '0'
        );
        return String(Number.parseInt(highestId, 10) + 1);
    };
    
 
  async create(puppy: Omit<IPuppy, 'id'>): Promise<Omit<IPuppy, 'id'>> {
    if(!puppy) {
        throw new Error('Missing puppydata')
    }
    const createdPuppy: IPuppy = {
        id: this.nextId(this.state.puppies),
        ...puppy,
    }
    this.state.puppies.push(createdPuppy);
    return createdPuppy;
  }

 
  async getOne(id: Number): Promise<IPuppy> {
    const foundPuppy = this.findPuppy(id);
    if (!foundPuppy) {
      throw new Error('Puppy not found');
    }
    return foundPuppy;
  }

  findPuppy(id: Number) {
    return this.state.puppies.filter(puppy => puppy.id === String(id))[0];
  }

 
  async update(puppy: IPuppy): Promise<Omit<IPuppy, 'id'>> {
    if(!puppy) {
        throw new Error('Missing puppydata')
    }
    const currentPuppyData = this.findPuppy(Number(puppy.id));
    const updatedPuppyData = Object.assign(currentPuppyData!, puppy);
    return updatedPuppyData;
  }


  async delete(id: Number): Promise<IPuppy[]> {
    const foundPuppyIndex = this.state.puppies.findIndex(object => Number(object.id) == id);
    if (foundPuppyIndex < 0) {
      throw new Error('Puppy not found')
    }
    return this.state.puppies.splice(foundPuppyIndex, 1);
  }

  
  async all() {
    return this.state.puppies
  }

  public clear() {
    this.state.puppies = []
  }

}

export default new Database()