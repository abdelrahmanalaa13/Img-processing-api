import * as request from 'supertest';
import app from '../..';

describe('GET imgsList API', (): void => {
  it('responds with 200', async () => {
    const result = await request(app).get('/api/imgList');
    expect(result.statusCode).toEqual(200);
  });
});
