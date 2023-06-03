type ImageInfo = {
  meta: {
    size: number;
    name: string;
    mimetype: string;
  };
  url: string;
};

type FileTokenPayload = {
  userId: string | null;
  eventId: string | null;
  maxImageSize?: number;
};

export { ImageInfo, FileTokenPayload };
