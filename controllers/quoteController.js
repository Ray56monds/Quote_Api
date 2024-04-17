import { PrismaClient } from "@prisma/client";
import verifyToken from "../middleware/verifyToken.js";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const getQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: Number(id) },
    });
    if (!quote) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(quote);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getAllQuotes = async (req, res) => {
  const { id } = req.params;
  try {
    const quotes = await prisma.quote.findMany({
      where: { author: { id: Number(id) } },
    });
    if (!quotes) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(quotes);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const createQuote = async (req, res) => {
  const { quote, authorId } = req.body;
  try {
    const newQuote = await prisma.quote.create({
      data: {
        quote,
        author: {
          connect: { id: authorId },
        },
      },
    });
    return res.status(StatusCodes.CREATED).json(newQuote);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const updateQuote = async (req, res) => {
  const { id } = req.params;
  const { quote, authorId } = req.body;
  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: Number(id) },
      data: {
        quote,
        author: {
          connect: { id: authorId },
        },
      },
    });
    if (!updatedQuote) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(updatedQuote);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deleteQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuote = await prisma.quote.delete({
      where: { id: Number(id) },
    });
    if (!deletedQuote) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export { getQuote, getAllQuotes, createQuote, updateQuote, deleteQuote, verifyToken };