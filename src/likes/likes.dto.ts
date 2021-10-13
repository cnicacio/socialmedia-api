import { IsNumber, IsOptional } from 'class-validator';

export class CreateLikeDto {
  @IsOptional()
  @IsNumber()
  post: number;

  @IsOptional()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  user: number;

  @IsOptional()
  @IsNumber()
  userId: number;
}
