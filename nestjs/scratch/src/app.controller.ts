import { Controller, Get } from "@nestjs/common";

//Decorator to handle requests
@Controller('/app')
export class AppController {

  @Get('/test')
  getRootRoute(){
    return 'Hello!'
  }

  @Get('/byethere')
  getByeText(){
    return 'Nospi!'
  }
}
