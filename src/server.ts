import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import { json, urlencoded } from "body-parser";
import { Test2Middleware, TestMiddleware } from './middlewares/testMiddleware';
import { PlatformAsyncHookContext } from '@tsed/async-hook-context';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"]
})
export class Server extends PlatformAsyncHookContext {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(json())
      .use(urlencoded({
        extended: true
      }))
      .use(TestMiddleware)
      .use(Test2Middleware);
  }
}