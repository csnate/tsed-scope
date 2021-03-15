import { Context, IMiddleware, Next, $log, Middleware } from '@tsed/common';
import { v4 as uuid } from 'uuid';
import { als } from './als';

@Middleware()
export class TestMiddleware implements IMiddleware {
    use(@Context() ctx: Context, @Next() next: Next) {
        $log.info('In TestMiddleware');
        als.run(new Map<string, string>(), () => {
            const transactionId = ctx.request.get('x-request-id') || ctx.request.get('x-correlation-id') || uuid();
            const store = als.getStore();
            if (store) {
                store.set('correlation-id', transactionId);
                $log.info('In TestMiddleware Async', transactionId);
                $log.info('In TestMiddleware Store: ', store.get('correlation-id'));
            }
            next();
        });
    }
}

@Middleware()
export class Test2Middleware implements IMiddleware {
    use(@Context() ctx: Context, @Next() next: Next) {
        const store = als.getStore();
        if (!store) {
            $log.info('Test2Middleware: store missing');
        } else {
            const a = store.get('correlation-id');
            $log.info('Test2Middleware: ', a);
        }
        return next();
    }
}