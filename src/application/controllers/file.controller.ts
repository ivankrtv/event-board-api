import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../decorators/auth.decorator';
import { ImageTypesEnum } from '../../enums/image-types.enum';
import { FileUploadImageDto } from '../DTO/file/file-upload-image.dto';
import { FileService } from '../../domain/file/file.service';
import { TokensResponseDto } from '../DTO/auth/tokens.response.dto';

@Auth()
@ApiTags('file')
@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse({ status: 200, type: TokensResponseDto })
  @Get('/image/upload')
  async uploadImage(@Query() query: FileUploadImageDto) {
    if (!ImageTypesEnum[query.type]) {
      throw new BadRequestException(`incorrect image type, allow: ${Object.keys(ImageTypesEnum)}`);
    }
    return await this.fileService.getUploadToken(query);
  }
}
