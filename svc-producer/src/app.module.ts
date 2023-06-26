import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { DataSource } from 'typeorm';



@Module({
  imports: [
    SongModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "song",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: false,
      logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
