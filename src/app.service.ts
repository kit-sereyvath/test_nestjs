import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>('http://128.199.183.47:5555/containers/json?all=true&size=false').pipe(
        catchError((error) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
