import { RedocOptions } from '@juicyllama/nestjs-redoc';

export const redocOptions: RedocOptions = {
  title: 'Event Board API',
  logo: {
    url: 'https://redocly.github.io/redoc/petstore-logo.png',
    backgroundColor: '#F0F0F0',
    altText: 'PetStore logo',
  },
  sortPropsAlphabetically: false,
  hideDownloadButton: false,
  hideHostname: false,
  tagGroups: [],
};
