import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception) {
            //response.redirect(`/404?url=${request.url}`);
            response.status(404).send('Không tìm thấy trang này');
        } else {
            response.redirect('/error');
        }
    }
}
