import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GetMethod(path: string, name: string, isRealised: boolean) {
  let methodName = name;
  if (!isRealised) methodName = methodName + ' 🕑';
  return applyDecorators(Get(path), ApiOperation({ summary: methodName }));
}
