import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {v4 as uuid} from 'uuid';
import Project from './Project';
import Card from './Card'

@Entity('lists')
class List{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    index: number;

    @Column()
    project_id: string;

    @ManyToOne(() => Project, project => project.lists)
    @JoinColumn({name: "project_id"})
    project: Project;

    @OneToMany(() => Card, card => card.list, {
        cascade: ['insert','update']
    })

    @JoinColumn({ name: "list_id" })
    cards: Card[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export default List;