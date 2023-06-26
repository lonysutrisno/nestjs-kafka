import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm"

export class QuestionRefactoringTIMESTAMP implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "song",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "artist",
                        type: "varchar",
                    },
                    {
                        name: "year",
                        type: "int",
                    },
                ],
            }),
            true,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("song")
    }
}