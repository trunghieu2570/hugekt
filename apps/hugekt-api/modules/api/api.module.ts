import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HugektCoreModule } from '@app/hugekt-core';

@Module({
    imports: [TagModule, AuthenticationModule, HugektCoreModule],
})
export class ApiModule {}
