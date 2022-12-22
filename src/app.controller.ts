import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import 'axios';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
  test() {
    return this.appService.findAll();
  }

  @Post('/post')
  start_container() {
    return this.appService.start_container();
  }

  @Get('/b')
  b() {
    var b = null
    axios
      .get('http://128.199.183.47:5555/containers/json?all=true&size=false')
      .then((res) => b = res.data)
      .catch((err) => b = err);
    return b
  }
}
