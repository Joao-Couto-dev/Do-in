import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {v4 as uuid} from 'uuid';
import List from './List';
import File from './File'

@Entity('cards')
class Card{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    description: string;

    @Column()
    timeworked: string;

    @Column()
    completecycles: string;

    @Column()
    list_id: string;

    @ManyToOne(() => List, list => list.cards)
    @JoinColumn({name: "list_id"})
    list: List;

    @OneToMany(() => File, file => file.card, {
        cascade: ['insert','update']
    })

    @JoinColumn({ name: "card_id" })
    files: File[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export default Card