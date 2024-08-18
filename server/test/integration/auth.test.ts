import request from "supertest";
import app, {server} from "../../src/index";

describe("Auth", () => {
    let accessToken: string;
    let refreshToken: string;
    
    afterAll(() => {
        server.close();
    });
    
    describe("POST /api/user/signup", () => {
        it("create a new user", async () => {
            const response = await request(app)
                .post("/api/user/signup")
                .send({email: "test@c.com", password: "test"});
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("accessToken");
            expect(response.body).toHaveProperty("refreshToken");
        });
    });
    
    describe("POST /api/user/login", () => {
        it("login a user", async () => {
            const response = await request(app)
                .post("/api/user/login")
                .send({email: "test@c.com", password: "test"});
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("accessToken");
            expect(response.body).toHaveProperty("refreshToken");
            accessToken = response.body.accessToken;
            refreshToken = response.body.refreshToken;
        });
    });
    
    describe("POST /api/user/dashboard", () => {
        it("logout a user", async () => {
            const response = await request(app)
                .get("/api/user/dashboard")
                .set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(200);
        });
    });
});
