import { globalConfig } from '@app/hugekt-web/globalConfig';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalConfigInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return { globalConfig, DateTime, ...data };
            }),
        );
    }
}
