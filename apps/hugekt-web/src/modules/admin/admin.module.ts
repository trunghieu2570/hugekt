import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PostModule } from './post/post.module';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [PostModule],
})
export class AdminModule {}
