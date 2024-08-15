import request from "supertest";
import app, {server} from "../../src";
import jwt from "jsonwebtoken";

describe("Post", () => {
    let token: string;
    
    beforeAll(() => {
        token = jwt.sign({userId: 1}, "your-access-token-secret", { expiresIn: "30s" });
    });
    
    afterAll(() => {
        server.close();
    });
    
    describe("GET /api/post", () => {
        it("get all the posts", async () => {
            const response = await request(app).get("/api/post");
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe("GET /api/post/:id", () => {
        it("get a post by id", async () => {
            const response = await request(app).get("/api/post/1");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
        });

        it("get a post by invalid id", async () => {
            const response = await request(app).get("/api/post/0");
            expect(response.status).toBe(404);
        });
    });

    describe("POST /api/post/create", () => {
        it("create a new post", async () => {
            const response = await request(app)
                .post("/api/post/create")
                .set("Authorization", "Bearer " + token)
                .send({ title: "test", content: "test", domainId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
        });
    });
    
    describe("PUT /api/post/:id", () => {
        it("update a post", async () => {
            const response = await request(app)
                .put("/api/post/11")
                .set("Authorization", "Bearer " + token)
                .send({ title: "test", content: "test", domainId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title");
            expect(response.body).toHaveProperty("content");
        });

        it("update a post by invalid id", async () => {
            const response = await request(app)
                .put("/api/post/0")
                .set("Authorization", "Bearer " + token)
                .send({ title: "test", content: "test", domainId: 1 });
            expect(response.status).toBe(404);
        });
    });
});
