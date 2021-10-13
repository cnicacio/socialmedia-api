import {
  IsNumber,
  IsString,
  Length,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsNumber({}, { each: true })
  nOfPosts: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  nOfFollows: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  nOfLikes: number[];

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  displayName: string;

  @IsOptional()
  @IsString()
  birthday: string;

  @IsOptional()
  @IsString()
  bio: string;
}
