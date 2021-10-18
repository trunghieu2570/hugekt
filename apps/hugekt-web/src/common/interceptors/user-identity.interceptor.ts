import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { url as gravatar } from 'gravatar';

@Injectable()
export class UserIdentityInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const user = context.switchToHttp().getRequest<Request>().user;

        return next.handle().pipe(
            map((data) => {
                return { user, gravatar, ...data };
            }),
        );
    }
}
