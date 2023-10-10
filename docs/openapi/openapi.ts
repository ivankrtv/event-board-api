import { OpenApiDoc, OpenAPIDocConfig } from '@ivankrtv/openapidoc/dist';

export const eventBoardOpenApi = new OpenApiDoc({
  title: 'EventBoard API',
  version: '0.23.0',
} as OpenAPIDocConfig);

export const commonController = eventBoardOpenApi.createController();

import('./users.doc');
export const usersTag = eventBoardOpenApi.createTag('Users');

export const eventBoardDocument = eventBoardOpenApi.compileOpenApi();
