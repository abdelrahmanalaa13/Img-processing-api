import * as request from 'request';
const base_url = 'http://localhost:1313';

describe('GET imgsList API', (): void => {
  it('responds with 200', async () => {
    request.get(base_url + '/api/imgList', (error, response, body) => {
      expect(response.statusCode).toBe(200);
    });
  });
});
