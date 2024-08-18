import jwt from "jsonwebtoken";
import app, {server} from "../../src";
import request from "supertest";

describe("Follow", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign({userId: 1}, "your-access-token-secret", { expiresIn: "30s" });
    });

    afterAll(() => {
        server.close();
    });
    
    describe("POST /api/follow/follow/:id", () => {
        it("follow a user", async () => {
            const response = await request(app)
                .post("/api/follow/follow/2")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
        });
    });
    
    describe("POST /api/follow/unfollow/:id", () => {
        it("unfollow a user", async () => {
            const response = await request(app)
                .delete("/api/follow/unfollow/2")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
        });
    });
    
    describe("GET /api/follow/followers", () => {
        it("get all the followers", async () => {
            const response = await request(app)
                .get("/api/follow/followers")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    
    describe("GET /api/follow/followings", () => {
        it("get all the following", async () => {
            const response = await request(app)
                .get("/api/follow/followings")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    
    describe("GET /api/follow/is-following/:id", () => {
        it("get follow status", async () => {
            const response = await request(app)
                .get("/api/follow/is-following/2")
                .set("Authorization", "Bearer " + token);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("follow");
        });
    });
});
