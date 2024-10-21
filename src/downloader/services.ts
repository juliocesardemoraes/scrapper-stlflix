import https from "https";
import fs from "fs";
import path from "path";
import { IDownloadFile, IGallery } from "../types/interfaces";

const downloadStlFile = async (file) => {
  const folderPath = path.join(
    process.cwd(),
    "src",
    "downloader",
    "STLS",
    file.hash
  );
  const filePath = path.join(folderPath, file.name);

  let fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log("FILE ALREADY EXISTS");
    return;
  }

  fs.mkdirSync(folderPath, { recursive: true });

  https
    .get(file.url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Download completed and saved to", filePath);
        });
      } else {
        console.error("Download failed with status code:", response.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the file:", err.message);
    });
};

const downloadStlThumbnail = async (file) => {
  const folderPath = path.join(
    process.cwd(),
    "src",
    "downloader",
    "STLS",
    file.hash
  );
  const filePath = path.join(folderPath, `${file.hash}.png`);

  fs.mkdirSync(folderPath, { recursive: true });

  let fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log("FILE ALREADY EXISTS");
    return;
  }

  https
    .get(file.thumbnail, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Download completed and saved to", filePath);
        });
      } else {
        console.error("Download failed with status code:", response.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the file:", err.message);
    });
};

const downloadStlVideo = async (file) => {
  const folderPath = path.join(
    process.cwd(),
    "src",
    "downloader",
    "STLS",
    file.hash
  );
  const filePath = path.join(folderPath, `${file.hash}.webm`);

  fs.mkdirSync(folderPath, { recursive: true });

  let fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log("FILE ALREADY EXISTS");
    return;
  }

  https
    .get(file.video, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Download completed and saved to", filePath);
        });
      } else {
        console.error("Download failed with status code:", response.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the file:", err.message);
    });
};

const downloadStlGallery = async (file: IGallery, hash) => {
  const folderPath = path.join(
    process.cwd(),
    "src",
    "downloader",
    "STLS",
    hash
  );
  const filePath = path.join(folderPath, `${file.id}.png`);

  fs.mkdirSync(folderPath, { recursive: true });

  let fileExists = fs.existsSync(filePath);

  if (fileExists) {
    console.log("FILE ALREADY EXISTS");
    return;
  }

  https
    .get(file.attributes.url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Download completed and saved to", filePath);
        });
      } else {
        console.error("Download failed with status code:", response.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error downloading the file:", err.message);
    });
};

export const downloadFile = async (file: IDownloadFile) => {
  await downloadStlFile(file);
  await downloadStlThumbnail(file);
  await downloadStlVideo(file);

  console.log("FF", file);

  if (!file?.galery?.length) {
    console.log("SEM GALERIA");
    return;
  }
  for (let i = 0; i < file.galery.length; i++) {
    downloadStlGallery(file.galery[i], file.hash);
  }
};
