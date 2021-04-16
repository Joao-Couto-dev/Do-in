import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjects1616105695061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "projects",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "user_id",
                    type: "varchar"
                }
            ],
            foreignKeys: [
                {
                    name: "UserId",
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("projects");
    }

}
