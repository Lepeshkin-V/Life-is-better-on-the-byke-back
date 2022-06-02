import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PostType } from "../enums";

export class CreatePostDto {

  @ApiProperty({ example: 'https://cdn1.ozone.ru/s3/multimedia-r/c1200/6065737071.jpg', description: 'Ссылка на картинку' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'Новый супер пупер дупер офигеть какой крутой велик', description: 'Название абзаца' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: PostType.REVIEW, description: 'Тип поста' })
  @IsEnum(PostType)
  type: PostType;

  @ApiProperty({ example: 'Текст и текст еще. Текст и текст еще.', description: 'Тест' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  text: string;

}