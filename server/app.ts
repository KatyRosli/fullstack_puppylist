import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import puppiesRouter from 'src/routes/puppies';

const app: Application = express();

/* const puppies: Array<IPuppy> = [
  { id: '1',
    breed: 'German Shepherd',
    name: 'Fluffy',
    birthdate: '2015/04/03',
  },
  { id: '2',
    breed: 'Poodle',
    name: 'CutiePie',
    birthdate: '2016/05/19',
  },
  { id: '3',
    breed: 'French Bulldog',
    name: 'Rockstar',
    birthdate: '2017/06/22',
  },
  { id: '4',
    breed: 'Dalmation',
    name: 'Night',
    birthdate: '2018/07/29',
  }
]; */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api/puppies', puppiesRouter)

/* const nextId = (puppiesArray: Array<IPuppy>): Number => {
  const highestId = puppiesArray.reduce(
    (currentHighestId: string, currentValue: IPuppy) => (currentValue.id > currentHighestId ? currentValue.id : currentHighestId),
    '1'
  );
  return Number.parseInt(highestId, 10) + 1;
};

const createNewPuppy = (puppy: IPuppy) => {
  const createObjWithId ={
    id: String(nextId(puppies))
  };
  const createdPuppy: IPuppy = Object.assign(createObjWithId, puppy);
  puppies.push(createdPuppy);
  return createdPuppy;
};

const isFaultyData = (requestData: object) : boolean => {
  const arr = Object.keys(requestData);
  return (requestData.constructor === Object && Object.keys(requestData).length === 0)
  || requestData.constructor !== Object || arr.length !== 3;
};

const puppyNotBornYet = (puppy: IPuppy) => 
new Date(puppy.birthdate).getTime() >= new Date().getTime();

const puppiesNotExist = (id: string) => (puppies
  .filter(puppy => (puppy.id) === id).length === 0);

const showPuppyData = (id: string) => (puppies
  .filter(puppy => puppy.id === id)[0]);
 */
/* app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should.' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(puppies);
});

app.get('/api/puppies/:id', (_req: Request, res:Response) => {
  if (puppiesNotExist(String(_req.params.id))) {
    return res.status(404).json({ message: 'Puppies not found.'});
  }
  return res
  .status(200)
  .json(showPuppyData(String(_req.params.id)));
});

app.post('/api/puppies', (_req: Request, res: Response) => {
  if (isFaultyData((_req.body)) || puppyNotBornYet(_req.body))
    return res.status(400).json({message: 'Check all inputs to create new data of puppy.'});

  const addNewPuppyData = createNewPuppy(_req.body);
  res.setHeader('birthdate', (new Date()).toUTCString());
  res.setHeader('Locaton', `/api/puppies/${addNewPuppyData.id}`);
  return res.status(201).json(addNewPuppyData);
}); */
/* 
app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  if (isFaultyData((_req.body)) || puppyNotBornYet(_req.body)) {
    return res.status(400).json({message: 'Check all inputs to update an existing a puppy data.'});
}
  let updatePuppyData = showPuppyData(String(_req.params.id));
  updatePuppyData = Object.assign(updatePuppyData!, _req.body);
  return res.status(200).json(updatePuppyData);
});

app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  const getIndexOfPuppy = puppies.findIndex(object => object.id == _req.params.id);
  if (getIndexOfPuppy < 0) {
    return res.status(404).json({ message: 'Puppy not found.' })
  }
  puppies.splice(getIndexOfPuppy, 1);
  return res.status(200).json(puppies);
}); */

export default app;
