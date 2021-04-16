import {EntityRepository, Repository} from 'typeorm';
import List from '../models/List'

@EntityRepository(List)
class ListsRepository extends Repository<List>{
}

export default ListsRepository