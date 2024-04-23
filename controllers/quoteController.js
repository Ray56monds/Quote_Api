import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

/**
 * Get all quotes
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with all quotes
 */
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    return res.status(StatusCodes.OK).json(quotes);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error getting quotes' });
  }
};

/**
 * Create a quote
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {void}
 */
export const createQuote = async (req, res) => {
  try {
    const newQuote = await prisma.quote.create({
      data: req.body
    });
    return res.status(StatusCodes.CREATED).json({ quote: newQuote });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error creating quote' });
  }
};

/**
 * Get a specific quote by its ID
 * @param {Object} req - The request object
 * @param {String} id - The ID of the quote to get
 * @param {Object} res - The response object
 * @return {Object} - The quote with the specified ID
 */
export const getQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: Number(id) }
    });
    if (!quote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Quote not found' });
    }
    return res.status(StatusCodes.OK).json(quote);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error getting quote' });
  }
};

/**
 * Update an existing quote
 * @param {Object} req - The request object
 * @param {string} id - ID of the quote to update
 * @param {Object} body - The request body containing updated information for the quote
 * @param {Function} next - A callback function
 * @returns {Object} - The updated quote
 */
export const updateQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: Number(id) },
      data:req.body
    });
    return res.status(StatusCodes.OK).json(updatedQuote);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error updating quote' });
  }
};


/**
 * Delete a specific quote by its ID
 * @param {Object} req - The request object
 * @param {String} id - The ID of the quote to delete
 * @param {Object} res - The response object
 * @return {Object} - A success message
 */
export const deleteQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: Number(id) }
    });
    if (!quote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Quote not found' });
    }
    await prisma.quote.delete({
      where: { id: Number(id) }
    });
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error deleting quote' });
  }
};