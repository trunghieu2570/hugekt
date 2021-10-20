import {MigrationInterface, QueryRunner} from "typeorm";

export class changePostPublishDateToNullable1634748954763 implements MigrationInterface {
    name = 'changePostPublishDateToNullable1634748954763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` CHANGE \`publishedAt\` \`publishedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`typeweb\`.\`post\` CHANGE \`publishedAt\` \`publishedAt\` datetime NOT NULL`);
    }

}
