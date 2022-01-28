import { Request, Response } from 'express';
import * as express from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Stats } from 'fs';
import * as sharp from 'sharp';

const imgRouter = express.Router();

imgRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query['filename'] + '';
  const height: number | null = req.query['height']
    ? +req.query['height']
    : null;
  const width: number | null = req.query['width'] ? +req.query['width'] : null;
  console.log('filename', 'height', 'width');

  // check if the query is correct
  if (!filename || !height || !width) {
    res
      .status(400)
      .send(
        'Please make sure url of the filename, height and width paramitars'
      );
    return;
  }

  // get the Orignal full path from the filename
  const filePathOrgImage = `${path.resolve(
    __dirname,
    `../../../assets/imgs/${filename}.jpg`
  )}`;
  console.log('filePathOrgImage');

  // edited path in the ${filename}-${height}x${width} format to save different dimensions
  const filePathEditedImage = `${path.resolve(
    __dirname,
    `../../../assets/edited/${filename}-${height}x${width}.jpg`
  )}`;
  console.log('filePathEditedImage');

  // Check if filename exists in full folder
  const fullImage: Stats | null = await fs.stat(filePathOrgImage).catch(() => {
    res.status(404).send('Image does not exist');
    return null;
  });
  console.log('fullImage');

  if (!fullImage) return;

  // Check if edited was already created
  const existingEdited: Stats | null = await fs
    .stat(filePathEditedImage)
    .catch(() => {
      return null;
    });

  if (existingEdited) {
    fs.readFile(filePathEditedImage)
      .then((editedData: Buffer) => {
        res.status(200).contentType('jpg').send(editedData);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  } else {
    (async () => {
      const dataBuffer: Buffer | null = await fs
        .readFile(filePathOrgImage)
        .catch(() => null);

      if (!dataBuffer) {
        return Promise.reject();
      }

      const imgBuffer: Buffer | null = await sharp(dataBuffer)
        .resize(width, height)
        .toBuffer()
        .catch(() => null);

      if (!imgBuffer) {
        return Promise.reject();
      }

      return fs
        .writeFile(filePathEditedImage, imgBuffer)
        .then(() => {
          console.log(imgBuffer);

          res.status(200).contentType('jpg').send(imgBuffer);
        })
        .catch(() => {
          res.status(500).send('Error occured processing the image');
        });
    })();
  }
});

export default imgRouter;
