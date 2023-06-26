import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { SongService } from './song.service';


@Controller('song')
export class SongController {

    constructor(private readonly songService: SongService) {}

    @Post()
    postSong(@Req() request: Request): string{
      return this.songService.postSong(request);
    }

    @Put()
    async incStream(@Req() request: Request): Promise<any>{
        await this.songService.incStream(request);
        let resp={"status":"success"}

        return resp
    }

    
}
