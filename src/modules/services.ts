import { IProductResponse } from "../types/interfaces";

const getSlugs = async (data: any) => {
  const slugs = [];
  if (!data) return;

  for (let i = 0; i < data.length; i++) {
    if (data[i]?.attributes?.slug) slugs.push(data[i].attributes.slug);
  }
  return slugs;
};

export default getSlugs;
