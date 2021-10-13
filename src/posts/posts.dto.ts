import {
  IsNumber,
  IsString,
  Length,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  likes: number[];

  @IsNotEmpty()
  @IsString()
  @Length(1, 280)
  text: string;

  @IsOptional()
  @IsString()
  picture: string;
}
