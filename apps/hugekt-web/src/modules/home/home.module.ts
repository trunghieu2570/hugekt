import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/hugekt-core/entities/post.entity';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule {}
