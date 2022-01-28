import * as request from "request";
const base_url = "http://localhost:1313";

describe("GET /api/images", () => {
  it("responds with 200 if called correctly and image exist", async () => {
    request.get(
      base_url + "/api/imgs?filename=fjord&height=100&width=100",
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
      }
    );
  });
});
