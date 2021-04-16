import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLists1616115761739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "lists",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "index",
                        type: "integer"
                    },
                    {
                        name: "project_id",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
                    {
                        name: "ProjectId",
                        columnNames: ["project_id"],
                        referencedTableName: "projects",
                        referencedColumnNames: ["id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE"
                    }
                ]
            }) 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("lists");
    }

}
