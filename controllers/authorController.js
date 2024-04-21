import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
export const getAllAuthors = async (req, res) => {
   // if (user.role !== 'ADMIN') {
  //   return res.status(403).json({ message: 'Unauthorized' });
  // }
  try {
    const authors = await prisma.author.findMany();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error,message: 'Error getting authors' });
  }
};

export const getAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting author' });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const newAuthor = await prisma.author.create({
      data: req.body
    });
    // const token = jwt.sign(
    //   {
    //     id: newAuthor.id,
    //     email: newAuthor.email,
    //     role: newAuthor.role,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );
    return res.status(201).json({ author: newAuthor });
  } catch (error) {
    return res.status(500).json({ error,message: 'Error creating author' });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    if (email) {
      author.email = email;
    }
    if (password) {
      author.password = bcrypt.hashSync(password, 8);
    }
    if (role) {
      author.role = role;
    }
    const updatedAuthor = await prisma.author.update({
      where: { id: Number(id) },
      data: author,
    });
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating author' });
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    await prisma.author.delete({
      where: { id: Number(id) },
    });
    return res.status(204).json({ message: 'Author deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting author' });
  }
};