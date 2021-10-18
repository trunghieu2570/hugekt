import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelationUserAndPost1632659371708 implements MigrationInterface {
    name = 'updateRelationUserAndPost1632659371708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` DROP FOREIGN KEY \`FK_8a6cdd56be8ef9b327f2d154dfc\``);
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` DROP COLUMN \`postsId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` ADD \`postsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` ADD CONSTRAINT \`FK_8a6cdd56be8ef9b327f2d154dfc\` FOREIGN KEY (\`postsId\`) REFERENCES \`typeweb\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
