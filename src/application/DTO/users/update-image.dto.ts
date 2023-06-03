import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ description: 'token with image info from image-upload-s3' })
  token: string;
}
