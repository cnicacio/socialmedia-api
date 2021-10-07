import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(3, 50)
  displayName: string;
}
