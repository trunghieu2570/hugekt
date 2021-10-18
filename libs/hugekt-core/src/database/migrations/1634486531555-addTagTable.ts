import {MigrationInterface, QueryRunner} from "typeorm";

export class addTagTable1634486531555 implements MigrationInterface {
    name = 'addTagTable1634486531555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`slug\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_tags_tag\` (\`postId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_b651178cc41334544a7a9601c4\` (\`postId\`), INDEX \`IDX_41e7626b9cc03c5c65812ae55e\` (\`tagId\`), PRIMARY KEY (\`postId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` ADD CONSTRAINT \`FK_b651178cc41334544a7a9601c45\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` ADD CONSTRAINT \`FK_41e7626b9cc03c5c65812ae55e8\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` DROP FOREIGN KEY \`FK_41e7626b9cc03c5c65812ae55e8\``);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` DROP FOREIGN KEY \`FK_b651178cc41334544a7a9601c45\``);
        await queryRunner.query(`DROP INDEX \`IDX_41e7626b9cc03c5c65812ae55e\` ON \`post_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_b651178cc41334544a7a9601c4\` ON \`post_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`post_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
    }

}
