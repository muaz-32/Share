import jwt from "jsonwebtoken";
import app, {server} from "../../src";
import request from "supertest";

describe("Comment", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({userId: 1}, "your-access-token-secret", { expiresIn: "30s" });
    });

    afterAll(() => {
        server.close();
    });
    
    describe(("POST /api/comment/add"), () => {
        it("create a new comment", async () => {
            const response = await request(app)
                .post("/api/comment/add")
                .set("Authorization", "Bearer " + token)
                .send({ content: "test", postId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("content");
        });
    });
    
    describe(("DELETE /api/comment/:id"), () => {
        it("delete a comment", async () => {
            const response = await request(app)
                .delete("/api/comment/1")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("content");
        });
    });
    
    describe(("PUT /api/comment/:id"), () => {
        it("update a comment", async () => {
            const response = await request(app)
                .put("/api/comment/2")
                .set("Authorization", "Bearer " + token)
                .send({ content: "test" });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("content");
        });
    });
    
    describe(("GET /api/comment/count/1"), () => {
        it("get comment count by post id", async () => {
            const response = await request(app)
                .get("/api/comment/count/1")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
        });
    });
});
