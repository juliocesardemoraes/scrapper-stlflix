import { chromium } from "playwright";
import {
  fetchDownloadFileUrl,
  getProductId,
  getSlugsApi,
} from "./modules/stlFixServices.js";
import getSlugs from "./modules/services.js";
import { downloadFile } from "./downloader/services.js";

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false }); // Set to false to see the browser
  const page = await browser.newPage();

  // Open Google
  await page.goto(
    "https://platform.stlflix.com/sign-in?_gl=1*j6fu0r*_gcl_au*MTAyMTIxMTU3NS4xNzI5NDU4NTE2"
  );

  // Type 'augusto' in the email field
  await page.fill('input[name="email"]', "augusto_tavares@outlook.com.br");

  // Type 'pass' in the password field
  await page.fill('input[name="password"]', "milhovalor1425");

  // Click the login button
  await page.click('button[type="submit"]');

  await page.waitForTimeout(7500);
  const jwt = await page.evaluate(() => {
    return localStorage.getItem("jwt");
  });
  await page.goto("https://platform.stlflix.com/explore");

  let datas = [];

  //   const res = await getSlugsApi(jwt, 24, 1);
  //   const res2 = await getSlugsApi(jwt, 24, 2);
  //   datas.push(res2.data.products.data);

  for (let i = 0; i < 2; i++) {
    const res = await getSlugsApi(jwt, 24, i + 1);
    datas.push(res.data.products.data);
  }
  datas = datas.flat();

  const slugs = await getSlugs(datas);
  const productIds = await getProductId(jwt, slugs);
  const fileUrls = await fetchDownloadFileUrl(jwt, productIds);

  for (let i = 0; i < fileUrls.length; i++) {
    await downloadFile(fileUrls[i]);
  }

  await page.waitForTimeout(15000);

  // Optionally close the browser
  await browser.close();
})();