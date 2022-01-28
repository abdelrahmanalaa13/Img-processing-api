import * as request from 'supertest';
import app from '..';

describe('GET / (to the base)', (): void => {
  it('responds with 200', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toEqual(200);
  });
});
