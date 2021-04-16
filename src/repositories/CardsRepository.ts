import {EntityRepository, Repository} from 'typeorm';
import Card from '../models/Card';

@EntityRepository(Card)
class CardsRepository extends Repository<Card>{
}

export default CardsRepository