import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import ProjectsRepository from '../repositories/ProjectsRepository';
import ListController from './ListController';

class ProjectController{
    async execute(id: string, projectName: string){
        const user_id = id;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const name = projectName;

        const project = projectsRepository.create({
            user_id, name
        });

        await projectsRepository.save(project);

        await ListController.execute('A Fazer', 0, project.id);
        await ListController.execute('Fazendo', 1, project.id);
        await ListController.execute('Feito', 2, project.id);

    }

    async update(request: Request, response: Response){
        const {id, name} = request.body;

        const listsRepository = getCustomRepository(ProjectsRepository);

        const project = await listsRepository.findOne({
            id
        });

        await listsRepository.update(project, {name});

        const updatedProject = await listsRepository.findOne({
            id
        });

        return response.status(201).json(updatedProject);
    }
}

export default new ProjectController;