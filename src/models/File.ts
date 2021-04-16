import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import {v4 as uuid} from 'uuid';
import Card from './Card';

@Entity('files')
class File{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    path: string;

    @Column()
    card_id: string;

    @ManyToOne(() => Card, card => card.files)
    @JoinColumn({name: "card_id"})
    card: Card;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export default File;