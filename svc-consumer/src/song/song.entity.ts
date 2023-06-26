import { Entity, Column, PrimaryGeneratedColumn, Int32 } from "typeorm"

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    title: string

    @Column("text")
    artist: string

    @Column("int")
    year: number

    @Column("int")
    streams: number
}