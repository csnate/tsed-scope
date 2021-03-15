import { Controller, Get } from '@tsed/common';
import { Property, Format, Default, Description, Hidden, Returns } from '@tsed/schema';

export class HealthResponse {
    @Property()
    public message: string;
}

@Controller('/health')
@Description('This controls all of the health')
@Hidden()
export class HealthController {
    constructor() {}

    @Get()
    @Returns(200, HealthResponse)
    public async get(): Promise<HealthResponse> {
        return Promise.resolve({ message: 'OK' });
    }
}
