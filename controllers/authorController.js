import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const getAllAuthors = async (req, res) => {
  try {
    const authorsData = await prisma.author.findMany();
    return res.status(StatusCodes.OK).json(authorsData);
  } catch (error) {
    await prisma.$disconnect();
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Error getting authors", error });
  }
};

const getAuthor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide Author ID!" });
    return;
  }
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    return res.status(StatusCodes.OK).json(author);
  } catch (error) {
    await prisma.$disconnect();
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Author not Found!" });
  }
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id || !name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide Author ID and Name!" });
  }
  try {
    const author = await prisma.author.update({
      where: { id: Number(id) },
      data: {
        name: name,
      },
    });
    return res.status(StatusCodes.OK).json(author);
  } catch (error) {
    await prisma.$disconnect();
    return res.status(StatusCodes.NOT_MODIFIED).json({ error });
  }
};

const createAuthor = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Author Name not provided!" });
  }
  try {
    const newAuthor = await prisma.author.create({
      data: req.body,
    });
    return res.status(StatusCodes.CREATED).json(newAuthor);
  } catch (error) {
    await prisma.$disconnect();
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide Author ID!" });
  }
  const author = await prisma.author.delete({
    where: { id: Number(id) },
  });
  return res.status(StatusCodes.NO_CONTENT).json(author);
};

export { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };