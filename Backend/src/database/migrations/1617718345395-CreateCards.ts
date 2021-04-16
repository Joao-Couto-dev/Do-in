import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCards1617718345395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "cards",
               columns: [
                   {
                       name: 'id',
                       type: 'varchar',
                       isPrimary: true
                   },
                   {
                       name: 'name',
                       type: 'varchar'
                   },
                   {
                       name: 'date',
                       type: 'varchar'
                   },
                   {
                       name: 'description',
                       type: 'varchar'
                   },                   
                   {
                       name: 'timeworked',
                       type: 'varchar',
                       isNullable: true
                   },
                   {
                       name: 'completecycles',
                       type: 'integer',
                       isNullable: true
                   },
                   {
                       name: 'list_id',
                       type: 'varchar'
                   }
               ],
               foreignKeys: [
                    {
                        name: 'ListId',
                        columnNames: ['list_id'],
                        referencedTableName: 'lists',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    }
               ]
            }) 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cards');
    }

}
