import { IsNumber, IsOptional } from 'class-validator';

export class CreateFollowDto {
  @IsOptional()
  @IsNumber()
  user: number;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  followedId: number;
}
