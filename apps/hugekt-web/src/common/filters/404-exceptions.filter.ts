import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger) {}

    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        this.logger.error(
            `Page {${request.url}} was not found`,
            exception,
            'NotFoundExceptionFilter',
        );

        const url = encodeURIComponent(
            `${request.protocol}://${request.get('host')}${
                request.originalUrl
            }`,
        );

        response.status(404).redirect(`/404.html?url=${url}`);
    }
}
