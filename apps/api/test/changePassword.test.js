import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const TEST_USER = {
  email: "lisa.devries@gmail.com",
  password: "test123",
};

describe("POST /api/change-password", () => {
  it("should return 400 for missing fields or new password shorter than 6 chars", async () => {
    const agent = request.agent(app);

    const loginResponse = await agent.post("/api/login").send(TEST_USER);
    expect(loginResponse.status).toBe(200);

    // missing currentPassword
    const missingCurrent = await agent
      .post("/api/change-password")
      .send({ newPassword: "nieuw123" });
    expect(missingCurrent.status).toBe(400);
    expect(missingCurrent.body.error).toBe("Vul beide wachtwoorden in");

    // missing newPassword
    const missingNew = await agent
      .post("/api/change-password")
      .send({ currentPassword: TEST_USER.password });
    expect(missingNew.status).toBe(400);
    expect(missingNew.body.error).toBe("Vul beide wachtwoorden in");

    // newPassword too short
    const tooShort = await agent
      .post("/api/change-password")
      .send({ currentPassword: TEST_USER.password, newPassword: "12345" });
    expect(tooShort.status).toBe(400);
    expect(tooShort.body.error).toBe(
      "Nieuw wachtwoord moet minimaal 6 tekens zijn"
    );
  });

  // test case for incorrect current password
  it("should return 401 when currentPassword is incorrect", async () => {
    const agent = request.agent(app);

    const loginResponse = await agent.post("/api/login").send(TEST_USER);
    expect(loginResponse.status).toBe(200);

    const response = await agent
      .post("/api/change-password")
      .send({ currentPassword: "verkeerdwachtwoord", newPassword: "nieuw123" });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Huidig wachtwoord is onjuist");
  });

  // test case for successful password change
  it("should change the password and allow login with the new password", async () => {
    const agent = request.agent(app);
    const newPassword = "tijdelijk123";

    // log in with the original password
    const loginResponse = await agent.post("/api/login").send(TEST_USER);
    expect(loginResponse.status).toBe(200);

    // change the password
    const changeResponse = await agent
      .post("/api/change-password")
      .send({ currentPassword: TEST_USER.password, newPassword });
    expect(changeResponse.status).toBe(200);
    expect(changeResponse.body.message).toBe("Wachtwoord succesvol bijgewerkt");

    // verify the new password
    const restoreAgent = request.agent(app);
    const verifyLogin = await restoreAgent
      .post("/api/login")
      .send({ email: TEST_USER.email, password: newPassword });
    expect(verifyLogin.status).toBe(200);

    // restore password
    const restoreResponse = await restoreAgent
      .post("/api/change-password")
      .send({ currentPassword: newPassword, newPassword: TEST_USER.password });
    expect(restoreResponse.status).toBe(200);
  });
});
