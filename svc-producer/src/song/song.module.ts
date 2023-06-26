import { Module } from '@nestjs/common';
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { ClientsModule,Transport } from '@nestjs/microservices';


@Module({
    imports:[
        TypeOrmModule.forFeature([Song]),
        ClientsModule.register([
            {
              name: 'SONG_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'song_inc_stream',
                  brokers: ['localhost:9092'],
                }
              }
            },
          ]),
        ],
    controllers:[SongController],
    providers:[SongService]
})
export class SongModule {}
