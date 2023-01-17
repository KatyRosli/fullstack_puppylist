import { NextFunction, Request, Response } from 'express'
import { PuppyService } from '../services/Puppy.service'

export class PuppyController {
    constructor(public puppyService: PuppyService) {}

    isFaultyData = (requestData: object) : boolean => {
        const arr = Object.keys(requestData);
        return (requestData.constructor === Object && Object.keys(requestData).length === 0)
            || requestData.constructor !== Object || arr.length !== 3;
    };

    async store(req: Request, res: Response) {
        if (this.isFaultyData(req.body)) {
            return res.status(400).json({
                error: 'Bad request'
            });
        }
        return res.status(201).json(await this.puppyService.create(req.body))
    }

    async update(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400).json({
                error: 'Bad request'
            });
        }
        const updateThisPuppy = Object.assign({ id: req.params.id }, req.body);
        return res.status(200).json(await this.puppyService.update(updateThisPuppy))
    }

    async getAll(_: Request, res: Response) {
        return res.status(200).json(await this.puppyService.getAll());
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return res.status(404)
        }
        try {
            const result = await this.puppyService.getOne(Number(req.params.id))
            return res.status(200).json(result)
        } catch(err) {
            next(err)
        } return res.status(200).json({})
    }

    async delete(req: Request, res: Response) {
        await this.puppyService.delete(Number(req.params.id))
        return res.status(200).json(await this.puppyService.getAll())
    }
}