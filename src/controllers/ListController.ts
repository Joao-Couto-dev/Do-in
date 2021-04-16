import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import ListsRepository from '../repositories/ListsRepository';

class ListController{
    async execute(name: string, index: number, projectId: string){
        
        const project_id = projectId;

        const listsRepository = getCustomRepository(ListsRepository);
        
        const list = listsRepository.create({
            name, index, project_id
        });

        await listsRepository.save(list);

    }

    async create(request: Request, response: Response){
        const {name, project_id} = request.body;

        const listsRepository = getCustomRepository(ListsRepository);

        const lists = listsRepository.find({
            project_id
        });

        const index = (await lists).length

        const list = listsRepository.create({
            name, index , project_id
        })

        await listsRepository.save(list);

        return response.status(201).json({
            list
        });
    }

    async delete(request: Request, response: Response){
        const {id, indexDeleteItem, project_id} = request.body

        const listsRepository = getCustomRepository(ListsRepository);

        const listToRemove = await listsRepository.findOne({
            id
        });


        const lists = await listsRepository.find({
            project_id
        });

        lists.map((list) => {
            if(list.index > indexDeleteItem){
                const index = list.index -1;
                listsRepository.update(list,{index});
            }
        });

        await listsRepository.remove(listToRemove);

        const updatedLists = await listsRepository.find({
            project_id
        });

        return response.status(200).json(updatedLists)
    }
    async update(request: Request, response: Response){
        const {id, indexDragList, indexDropList, project_id} = request.body;

        const listsRepository = getCustomRepository(ListsRepository);

        const lists = await listsRepository.find({
            project_id
        });

        const dragList = await listsRepository.findOne({
            id
        });

        const directionDrop = indexDropList - indexDragList;

        lists.map((list) => {
            if(directionDrop < 0){
                if(list.index >= indexDropList){
                    const index = list.index + 1;
                    listsRepository.update(list,{index});
                }
                const index = indexDropList;
                listsRepository.update(dragList, {index});
            }else {
                if(list.index <= indexDropList){
                    const index = list.index - 1;
                    listsRepository.update(list,{index}); 
                }
                const index = indexDropList;
                listsRepository.update(dragList, {index});
            }
        })

        const updatedLists = await listsRepository.find({
            project_id
        });

        return response.status(200).json(updatedLists);
    }
}

export default new ListController