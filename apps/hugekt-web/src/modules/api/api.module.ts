import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
    imports: [TagModule, AuthenticationModule],
})
export class ApiModule {}
