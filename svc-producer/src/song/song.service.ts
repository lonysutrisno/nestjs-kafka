import { Injectable,Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from "./song.entity";

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
        await this.client.emit(
            'song',
            {title:request.body.title},
        ) 
    }
}
