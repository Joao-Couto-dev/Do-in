import {Request, Response} from 'express';
import { createQueryBuilder, getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import ProjectController from './ProjectController';
import * as yup from 'yup';

class UserController{
    async execute(request: Request, response: Response){
        const {name, email, password, confirmPassword} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            confirmPassword: yup.string().required()
        });

        try{
            await schema.validate(request.body, {abortEarly: false});
        }catch(err){
            return response.json(err);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExist = await usersRepository.findOne({
            email
        });

        if(password !== confirmPassword){
            return response.status(401).json({
                error: "Passwords are not the same!"
            })
        }

        if(userAlreadyExist){
            return response.status(401).json({
                error: "User already exists"
            });
        }

        const user = usersRepository.create({
            name, email, password
        });

        await usersRepository.save(user);

        await ProjectController.execute(user.id, "Project");

        return response.status(201).json({
            success: "Your user has been created"
        });


    }

    async show(request: Request, response: Response){
        const email = request.query['email'] as string;
        const password = request.query['password'] as string;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExist = await usersRepository.findOne({
            email
        });

        if(!userAlreadyExist){
            return response.status(401).json({
                error: "This email does not exists!"
            })
        }

        if(userAlreadyExist.password != password){
            return response.status(401).json({
                error: "Password is incorrect!"
            })
        }

        const id = userAlreadyExist.id;

        const user = await createQueryBuilder()
            .where("users.id = :id", { id: id});

        console.log(user.getQuery);

        return response.status(201).json(userAlreadyExist);    
    }
}

export default UserController;