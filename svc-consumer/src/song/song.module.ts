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
                  clientId: 'song_inc_stream_consumer',
                  brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'song_consumer',
                },
              }
            },
          ]),
        ],
    controllers:[SongController],
    providers:[SongService]
})
export class SongModule {}
