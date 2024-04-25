import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import app from "../server.js"; // Assuming your server is exported as 'app'

const prisma = new PrismaClient();

describe("Quote API", () => {
  afterAll(async () => {
    // Clean up database after all tests are done
    await prisma.$disconnect();
  });

  describe("Create a Quote", () => {
    it("should create a new quote", async () => {
      const response = await request(app)
        .post("/api/quotes")
        .send({ text: "This is a new quote.", authorId: 1 });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toHaveProperty("quote");
      expect(response.body.quote.text).toBe("This is a new quote.");
      expect(response.body.quote.authorId).toBe(1);
    });
  });

  describe("Update a Quote", () => {
    it("should update an existing quote", async () => {
      // First, create a quote
      const createResponse = await request(app)
        .post("/api/quotes")
        .send({ text: "Original quote.", authorId: 1 });

      const quoteId = createResponse.body.quote.id;

      // Update the quote
      const updateResponse = await request(app)
        .put(`/api/quotes/${quoteId}`)
        .send({ text: "Updated quote." });

      expect(updateResponse.status).toBe(StatusCodes.OK);
      expect(updateResponse.body.text).toBe("Updated quote.");
    });
  });

  describe("Delete a Quote", () => {
    it("should delete an existing quote", async () => {
      // First, create a quote
      const createResponse = await request(app)
        .post("/api/quotes")
        .send({ text: "Quote to delete.", authorId: 1 });

      const quoteId = createResponse.body.quote.id;

      // Delete the quote
      const deleteResponse = await request(app).delete(`/api/quotes/${quoteId}`);

      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);

      // Verify that the quote is deleted by trying to retrieve it again
      const verifyResponse = await request(app).get(`/api/quotes/${quoteId}`);

      expect(verifyResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
