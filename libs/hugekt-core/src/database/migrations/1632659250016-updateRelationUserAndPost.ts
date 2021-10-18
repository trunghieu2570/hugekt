import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelationUserAndPost1632659250016 implements MigrationInterface {
    name = 'updateRelationUserAndPost1632659250016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` ADD \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`typeweb\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` DROP COLUMN \`authorId\``);
    }

}
