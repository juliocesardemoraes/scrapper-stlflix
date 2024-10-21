interface IMediaData {
  alternativeText: string | null;
  url: string;
}

interface IThumbnail {
  data: {
    attributes: IMediaData;
  };
}

interface IHover {
  data: {
    attributes: IMediaData;
  };
}

interface ICategory {
  id: string;
  attributes: {
    slug: string;
    name: string;
  };
}

interface ITag {
  id: string;
  attributes: {
    slug: string;
    name: string;
  };
}

interface IProduct {
  id: string;
  attributes: {
    name: string;
    slug: string;
    thumbnail: IThumbnail;
    hover: IHover;
    categories: {
      data: ICategory[];
    };
    tags: {
      data: ITag[];
    };
  };
}

export interface IProductResponse {
  products: {
    data: IProduct[];
  };
}
export interface IGallery {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
  };
}

export interface IDownloadFile {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null; // You can replace `any` with a more specific type if known
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  galery: [
    {
      id: number;
      attributes: {
        alternativeText: string;
        url: string;
      };
    }
  ];
  video: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null; // You can replace `any` with a more specific type if known
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  folderPath: string;
}
