import * as request from 'supertest';
import app from '../..';
import sizeOf from 'image-size';
import * as path from 'path';

describe('GET /api/images', () => {
  it('responds with 200 if called correctly and image exist', async () => {
    const result = await request(app).get(
      '/api/imgs?filename=fjord&height=100&width=100'
    );
    expect(result.statusCode).toEqual(200);
  });

  it('create an edited version of the image with checking height and width', async () => {
    request(app)
      .get('/api/imgs?filename=fjord&height=200&width=100')
      .then(() => {
        const imgDimensions = sizeOf(
          path.resolve(__dirname, '../../../assets/edited/fjord-200x150.jpg')
        );
        expect(imgDimensions.height).toEqual(200);
        expect(imgDimensions.width).toEqual(150);
      });
  });
});
