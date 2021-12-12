import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger';

@Catch()
export class ServeStaticExceptionFilter implements ExceptionFilter {
    constructor(private logger: Logger) {}

    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception.code === 'ENOENT') {
            //response.status(404).send('Không tìm thấy trang này');
            response.sendStatus(HttpStatus.NOT_FOUND);
            this.logger.error(
                `Server static content {${request.url}} was not found`,
                'ServeStaticExceptionFilter',
            );
        } else {
            this.logger.error(
                `Exception was thrown on request: {${request.url}}`,
                exception,
                'ExceptionsHandler',
            );
            console.log(exception);
            response.sendStatus(status);
        }
    }
}
