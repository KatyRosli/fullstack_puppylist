import 'dotenv/config'
import { PuppyRepository } from '../repositories/Puppy.repository';
import { PuppyService } from'../services/Puppy.service';
import { PuppyController } from '../controllers/Puppy.controller';

const puppyRepo = new PuppyRepository();
const puppyService = new PuppyService(puppyRepo);
export const puppyController = new PuppyController(puppyService);
