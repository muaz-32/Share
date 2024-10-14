import jwt from "jsonwebtoken";
import app, {server} from "../../src";
import request from "supertest";

describe("Vote", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({userId: 1}, "your-access-token-secret", { expiresIn: "30s" });
    });

    afterAll(() => {
        server.close();
    });
    
    describe("POST /api/vote/give", () => {
        it("give a vote", async () => {
            const response = await request(app)
                .post("/api/vote/give")
                .set("Authorization", "Bearer " + token)
                .send({ postId: 1, value: true });
            expect(response.status).toBe(200);
        });
    });
    
    describe("PUT /api/vote/", () => {
        it("update a vote", async () => {
            const response = await request(app)
                .put("/api/vote/")
                .set("Authorization", "Bearer " + token)
                .send({ postId: 1, value: false });
            expect(response.status).toBe(200);
        });
    });
    
    describe("DELETE /api/vote/", () => {
        it("delete a vote", async () => {
            const response = await request(app)
                .delete("/api/vote/")
                .set("Authorization", "Bearer " + token)
                .send({ postId: 1 });
            expect(response.status).toBe(200);
        });
    });
    
    describe("GET /api/vote/count/:postId", () => {
        it("get votes by post id", async () => {
            const response = await request(app).get("/api/vote/count/1");
            expect(response.status).toBe(200);
        });
    });
    
    describe("GET /api/vote/net/:postId", () => {
        it("get net vote by post id", async () => {
            const response = await request(app)
                .get("/api/vote/net/1")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
        });
    });
});
