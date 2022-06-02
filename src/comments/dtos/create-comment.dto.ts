import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ example: 'Крутой супер пупер велик реально', description: 'Комментарий' })
  @IsDefined()
  @IsString()
  comment: string;

  @ApiProperty({ description: 'Айди автора комментария' })
  @IsUUID()
  userId: string;
}