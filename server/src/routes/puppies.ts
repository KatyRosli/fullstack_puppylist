import puppyController from '../Factory';
import express from 'express';
const router = express.Router();

router.get('/', puppyController.getAll.bind(puppyController))
router.get('/:id', puppyController.getOne.bind(puppyController))
router.post('/', puppyController.store.bind(puppyController))
router.put('/:id', puppyController.update.bind(puppyController))
router.delete('/:id', puppyController.delete.bind(puppyController))

export default router