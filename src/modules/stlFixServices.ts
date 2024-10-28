export const getSlugsApi = async (
  token,
  pageSize = 24,
  productsPage = 1,
  filters = null
) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
  myHeaders.append("Referer", "https://platform.stlflix.com/");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("authorization", `Bearer ${token}`);
  myHeaders.append("Origin", "https://platform.stlflix.com");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-site");
  myHeaders.append("Priority", "u=4");
  myHeaders.append("TE", "trailers");
  const date = new Date();
  const formattedDate = date.toISOString().split(".")[0] + "Z";

  let graphqlQuery: any = {
    query:
      "query GET_LIST_PRODUCTS($filters: ProductFiltersInput, $productsPage: Int, $productsPageSize: Int, $sort: [String]) {\n  products(\n    filters: $filters\n    pagination: {page: $productsPage, pageSize: $productsPageSize}\n    sort: $sort\n  ) {\n    data {\n      id\n      attributes {\n        name\n        slug\n        thumbnail {\n          ...mediaData\n          __typename\n        }\n        hover {\n          ...mediaData\n          __typename\n        }\n        categories {\n          data {\n            id\n            attributes {\n              slug\n              name\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        tags {\n          data {\n            id\n            attributes {\n              slug\n              name\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment mediaData on UploadFileEntityResponse {\n  data {\n    attributes {\n      alternativeText\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
    variables: {
      filters: {
        release_date: { lte: formattedDate },
      },
      productsPage: productsPage,
      productsPageSize: pageSize,
      sort: "release_date:DESC",
    },
  };

  if (filters !== null)
    graphqlQuery.variables.filters.categories = filters.categories;

  const graphql = JSON.stringify(graphqlQuery);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  };

  const response = await fetch(
    "https://k8s.stlflix.com/graphql",
    requestOptions
  );
  const data = await response.json();

  return data;
};

const fetchData = (requestOptions) => {
  return new Promise((resolve, reject) => {
    fetch("https://k8s.stlflix.com/graphql", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        resolve({
          id: data.data.products.data[0].attributes.files[1].file.data.id,
          thumbnail:
            data.data.products.data[0].attributes.thumbnail.data.attributes.url,
          galery: data.data.products.data[0].attributes.gallery.data,
          video:
            data.data.products.data[0].attributes.hover.data.attributes.url,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/*
      "data": {
        "products": {
            "data": [
                {
                    "__typename": "ProductEntity",
                    "id": "2174",
                    "attributes": {
  */

export const getProductId = async (token, slugs) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
  myHeaders.append("Referer", "https://platform.stlflix.com/");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("authorization", `Bearer ${token}`);
  myHeaders.append("Origin", "https://platform.stlflix.com");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-site");
  myHeaders.append("Priority", "u=4");
  myHeaders.append("TE", "trailers");

  const allPromises = [];

  for (let i = 0; i < slugs.length; i++) {
    const graphql = JSON.stringify({
      query:
        "query GET_PRODUCTS($slug: String) {\n  products(filters: {slug: {eq: $slug}}) {\n    data {\n      __typename\n      id\n      attributes {\n        name\n        slug\n        description\n        iframe\n        updatedAt\n        release_date\n        technical_overview_url\n        assemble_tutorial_url\n        change_log\n        bambu_file {\n          data {\n            id\n            __typename\n          }\n          __typename\n        }\n        stl_preview {\n          ...mediaData\n          __typename\n        }\n        thumbnail {\n          ...mediaData\n          __typename\n        }\n        hover {\n          ...mediaData\n          __typename\n        }\n        gallery(pagination: {pageSize: 50}) {\n          data {\n            id\n            attributes {\n              alternativeText\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        keywords\n        files(pagination: {pageSize: 50}) {\n          text\n          commercial_only\n          file {\n            data {\n              id\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        filaments {\n          data {\n            attributes {\n              url_pt_br\n              name_pt_br\n              url_pt_br\n              price_pt_br\n              store_id_pt_br\n              hex_color\n              thumbnail_url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        categories {\n          data {\n            id\n            attributes {\n              name\n              slug\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        tags {\n          data {\n            attributes {\n              name\n              parent_tag {\n                data {\n                  attributes {\n                    name\n                    __typename\n                  }\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        drop {\n          data {\n            id\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n    }\n    __typename\n  }\n}\n\nfragment mediaData on UploadFileEntityResponse {\n  data {\n    attributes {\n      alternativeText\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
      variables: { slug: slugs[i] },
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
    };
    const productIdRes = fetchData(requestOptions);
    allPromises.push(productIdRes);
  }

  const ids = await Promise.all(allPromises);

  // const response = await fetch(
  //   "https://k8s.stlflix.com/graphql",
  //   requestOptions
  // );

  // const data = await response.json();

  return ids;
};

const fetchFilesUrls = (requestOptions) => {
  return new Promise((resolve, reject) => {
    fetch("https://k8s.stlflix.com/api/product/product-file", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchDownloadFileUrl = async (token, productsIds) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
  myHeaders.append("Referer", "https://platform.stlflix.com/");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", `Bearer ${token}`);
  myHeaders.append("Origin", "https://platform.stlflix.com");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-site");
  myHeaders.append("Priority", "u=0");
  myHeaders.append("TE", "trailers");

  const allPromises = [];

  for (let i = 0; i < productsIds.length; i++) {
    const raw = JSON.stringify({
      jwt: token,
      fid: productsIds[i].id,
      uid: 58224,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    allPromises.push(fetchFilesUrls(requestOptions));
  }

  const products = await Promise.all(allPromises);

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productsIds[i].id) {
      products[i].thumbnail = productsIds[i].thumbnail;
      products[i].galery = productsIds[i].galery;
      products[i].video = productsIds[i].video;
    }
  }

  return products;
};
