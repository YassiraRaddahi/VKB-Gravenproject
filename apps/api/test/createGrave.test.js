import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import conn from "../src/config/db-conn.js";

const CEMETERY_ID = 1;
const createdGraveIds = [];

function query(sql, params) {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function uniqueGraveNumber() {
  return `T${Date.now()}`;
}

afterAll(async () => {
  if (createdGraveIds.length > 0) {
    await query("DELETE FROM graves WHERE id IN (?)", [createdGraveIds]);
  }
});

describe("POST /api/cemeteries/:cemetery_id/graves", () => {
  it("maakt een nieuw graf aan en geeft 201 met grave_id terug", async () => {
    const grave_number = uniqueGraveNumber();

    const response = await request(app)
      .post(`/api/cemeteries/${CEMETERY_ID}/graves`)
      .field("grave_number", grave_number)
      .field("type", "algemeen graf")
      .field("sort", "enkel graf")
      .field("status", "beschikbaar")
      .field("latitude", "52.1234567")
      .field("longitude", "6.7890123")
      .field("remarks", "Aangemaakt door de test");

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.grave_id).toBe("number");

    createdGraveIds.push(response.body.grave_id);

    const getResponse = await request(app).get(
      `/api/graves/${response.body.grave_id}`
    );

    expect(getResponse.status).toBe(200);
    const grave = getResponse.body.grave;
    expect(grave.grave_number).toBe(grave_number);
    expect(grave.type).toBe("algemeen graf");
    expect(grave.sort).toBe("enkel graf");
    expect(grave.status).toBe("beschikbaar");
    expect(grave.cemetery_id).toBe(CEMETERY_ID);
    expect(grave.remarks).toBe("Aangemaakt door de test");
  });

  it("geeft 409 wanneer het grafnummer al bestaat op dit kerkhof", async () => {
    const grave_number = uniqueGraveNumber();

    const first = await request(app)
      .post(`/api/cemeteries/${CEMETERY_ID}/graves`)
      .field("grave_number", grave_number)
      .field("type", "particulier graf")
      .field("sort", "dubbel graf")
      .field("status", "in gebruik")
      .field("latitude", "52.1234567")
      .field("longitude", "6.7890123");

    expect(first.status).toBe(201);
    createdGraveIds.push(first.body.grave_id);

    const duplicate = await request(app)
      .post(`/api/cemeteries/${CEMETERY_ID}/graves`)
      .field("grave_number", grave_number)
      .field("type", "particulier graf")
      .field("sort", "dubbel graf")
      .field("status", "in gebruik")
      .field("latitude", "52.1234567")
      .field("longitude", "6.7890123");

    expect(duplicate.status).toBe(409);
    expect(duplicate.body.error).toBe(
      "Dit grafnummer bestaat al op dit kerkhof."
    );
  });
});
