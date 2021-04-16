import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFiles1618277478479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'files',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'path',
                        type: 'varchar'
                    },
                    {
                        name: 'card_id',
                        type: 'varchar'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'CardId',
                        columnNames: ['card_id'],
                        referencedTableName: 'cards',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    }]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('files')
    }

}
