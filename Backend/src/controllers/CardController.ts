import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import CardsRepository from '../repositories/CardsRepository';

import * as Yup from 'yup';

class CardController{
    async execute(request: Request, response: Response){
        const {name, date, description, list_id} = request.body;

        const cardsRepository = getCustomRepository(CardsRepository);

        const requestFiles = request.files as Express.Multer.File[];



        const files = requestFiles.map(file => {
            return { path: file.filename }
          });

          const data = {
            name,
            date, 
            description, 
            list_id, 
            files
        }
          
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            date: Yup.string().required(),
            description: Yup.string().required().max(300),
            list_id: Yup.string().required(),
            files: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        try{
            await schema.validate(data, {abortEarly: false});
        }catch(err){
            return response.json(err);
        }

        const card = cardsRepository.create(data);
        
        await cardsRepository.save(card);

        return response.status(201).json({card});
    }

    async delete(request: Request, response: Response){
        const {id} = request.body;

        const cardsRepository = getCustomRepository(CardsRepository);
        
        const cardAlreadyExists = cardsRepository.findOne({
            id
        });

        if(!cardAlreadyExists){
            return response.status(404).json({
                error: "Your card does not exists!"
        })
        }

        await cardsRepository.delete(id);

        return response.status(201).json({
            deleted: 'your card has been deleted'
        })
    }

    async move(request: Request, response: Response){
        const {id ,list_id} = request.body;

        const cardsRepository = getCustomRepository(CardsRepository);

        const cardAlreadyExist = await cardsRepository.findOne({
            id
        });

        if(!cardAlreadyExist){
            return response.json({
                error: "This card does not exists!"
            });
        }

        await cardsRepository.update(cardAlreadyExist, {list_id});

        return response.status(201).json({
            success: "The card has been moved!"
        });
    }

    async update(request: Request, response: Response){
        const {id, timeworked, completecycles} = request.body;

        const cardsRepository = getCustomRepository(CardsRepository);

        const cardAlreadyExist = await cardsRepository.findOne({
            id
        });

        if(!cardAlreadyExist){
            return response.json({
                error: "This card does not exists!"
            });
        }

        await cardsRepository.update(cardAlreadyExist, {timeworked, completecycles});

        return response.status(201).json({
            success: "The card has been updated!"
        });
    }

}

export default CardController