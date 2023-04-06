import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty()
  userId: number;

  @ApiProperty({ description: 'token with image info from image-upload-s3' })
  token: string;
}
