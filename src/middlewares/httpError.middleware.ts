import { CONSTANTS } from '@src/utils';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after', priority: 1 })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err?: any) => any) {
        if (error instanceof HttpError) {
            return response.status(error.httpCode).json({ ...error, status: CONSTANTS.status.error });
        }

        return response.status(500).send(error);
    }
}