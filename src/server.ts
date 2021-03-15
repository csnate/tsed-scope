import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import { json, urlencoded } from "body-parser";
import { Test2Middleware, TestMiddleware } from './middlewares/testMiddleware';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"]
})
export class Server {
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