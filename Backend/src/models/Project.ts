import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {v4 as uuid} from 'uuid';
import List from './List';
import User from './User';

@Entity("projects")
class Project{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToMany(() => List, list => list.project, {
        cascade: ['insert','update']
    })

    @JoinColumn({ name: "project_id" })
    lists: List[];
  

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export default Project