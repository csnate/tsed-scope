import { als } from './als';
import { v4 as uuid } from 'uuid';

export function testMiddleware(req: any, res: any, next: any) {
    console.log('In testMiddleware');
    als.run(new Map<string, string>(), () => {
        const transactionId = req.get('x-request-id') || uuid();
        const store = als.getStore();
        if (store) {
            store.set('correlation-id', transactionId);
            console.log('In TestMiddleware Async', transactionId);
            console.log('In TestMiddleware Store: ', store.get('correlation-id'));
        }
        next();
    })
}

export function test2Middleware(req: any, res: any, next: any) {
    const store = als.getStore();
    if (!store) {
        console.log('Test2Middleware: store missing');
    } else {
        const a = store.get('correlation-id');
        console.log('Test2Middleware: ', a);
    }
    return next();
}