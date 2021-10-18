import {MigrationInterface, QueryRunner} from "typeorm";

export class addPostTable1632658866011 implements MigrationInterface {
    name = 'addPostTable1632658866011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`typeweb\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`registerAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastLogin\` datetime NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`postsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`typeweb\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(75) NOT NULL, \`slug\` varchar(100) NOT NULL, \`published\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` text NOT NULL, \`publishedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` ADD CONSTRAINT \`FK_8a6cdd56be8ef9b327f2d154dfc\` FOREIGN KEY (\`postsId\`) REFERENCES \`typeweb\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`user\` DROP FOREIGN KEY \`FK_8a6cdd56be8ef9b327f2d154dfc\``);
        await queryRunner.query(`DROP TABLE \`typeweb\`.\`post\``);
        await queryRunner.query(`DROP TABLE \`typeweb\`.\`user\``);
    }

}
