import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(
          'http://128.199.183.47:5555/containers/json?all=true&size=false',
        )
        .pipe(
          catchError((error) => {
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async start_container(): Promise<any[]> {
    var number = Date.now()
    const data = await firstValueFrom(
      this.httpService
        .post('http://128.199.183.47:5555/containers/create?name=pttest'+number, {
          Image: 'node:latest',
          ImageID:
            'sha256:0422ef8646bd74d8a4e280d7f6c1786192ab36a4f026f926cce481a1f3d19e19',
          Command: 'docker-entrypoint.sh postgres',
        })
        .pipe(
          map((resp) => resp.data),
          catchError((error) => {
            console.log(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
