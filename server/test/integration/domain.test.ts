import jwt from "jsonwebtoken";
import app, {server} from "../../src";
import request from "supertest";


describe("Domain", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({userId: 1}, "your-access-token-secret", { expiresIn: "30s" });
    });

    afterAll(() => {
        server.close();
    });
    
    describe("POST /api/domain/create", () => {
        it("create a new domain", async () => {
            const response = await request(app)
                .post("/api/domain/create")
                .set("Authorization", "Bearer " + token)
                .send({ name: "test" });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
        });
    });
    
    describe("GET /api/domain", () => {
        it("get all the domains", async () => {
            const response = await request(app).get("/api/domain");
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    
    describe("GET /api/domain/:id", () => {
        it("get a domain by id", async () => {
            const response = await request(app).get("/api/domain/1");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
        });
        
        it("get a domain by invalid id", async () => {
            const response = await request(app).get("/api/domain/0");
            expect(response.status).toBe(404);
        });
    });
    
    describe("PUT /api/domain/:id", () => {
        it("update a domain", async () => {
            const response = await request(app)
                .put("/api/domain/1")
                .set("Authorization", "Bearer " + token)
                .send({ name: "test" });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
        });
    });
    
    describe("DELETE /api/domain/:id/posts", () => {
        it("getting posts by domain id", async () => {
            const response = await request(app)
                .get("/api/domain/1/posts")
            expect(response.status).toBe(200);
        });
    });
});
