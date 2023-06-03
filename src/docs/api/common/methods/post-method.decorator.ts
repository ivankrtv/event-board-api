import { applyDecorators, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function PostMethod(path: string, name: string, isRealised: boolean) {
  let methodName = name;
  if (!isRealised) methodName = methodName + ' 🕑';
  return applyDecorators(Post(path), ApiOperation({ summary: methodName }));
}
