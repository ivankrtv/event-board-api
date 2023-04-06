type ImageInfo = {
  meta: {
    size: number;
    name: string;
    mimetype: string;
  };
  url: string;
};

type FileTokenPayload = {
  userId: number | null;
  eventId: number | null;
  maxImageSize?: number;
};

export { ImageInfo, FileTokenPayload };
