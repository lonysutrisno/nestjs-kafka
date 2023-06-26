import { Injectable,Inject } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { Song } from "./song.entity";
import {
    Ctx,
    KafkaContext,
    MessagePattern,
    Payload,
  } from '@nestjs/microservices';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @Inject('SONG_SERVICE') private readonly client: ClientKafka,
    
    ) {}

    postSong(request:Request): string {
        const song = new Song()
        song.title = request.body.title
        song.artist = request.body.artist
        song.year =request.body.year

        this.songsRepository.save(song)
        return 'Success';
    }

    async incStream(request:Request):Promise<void>{
        let updatedsong= await this.songsRepository.findOneByOrFail({title:request.body.title})
        updatedsong.streams=updatedsong.streams+1
        this.songsRepository.save(updatedsong)
        
    }

    async onModuleInit() {
        this.client.subscribeToResponseOf('song');
        await this.client.connect();
      }

      @MessagePattern('song')
    async readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
      const originalMessage = context.getMessage();
      const response =
        `Receiving a new message from topic: medium.rocks: ` +
        JSON.stringify(originalMessage.value);
      console.log(response);
      return response;
    }
      
}
