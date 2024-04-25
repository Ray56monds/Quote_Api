import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

/**
 * Get all authors
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with all authors
 */
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    return res.status(StatusCodes.OK).json(authors);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error getting authors' });
  }
};

/**
 * Get a single author by id
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with the author or a 404 error if not found
 */
export const getAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (!author) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Author not found' });
    }
    return res.status(StatusCodes.OK).json(author);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting author' });
  }
};

/**
 * Create a new author
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with the new author
 */
export const createAuthor = async (req, res) => {
  try {
    const newAuthor = await prisma.author.create({
      data: req.body
    });
return res.status(StatusCodes.CREATED).json({ author: newAuthor });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error creating author' });
  }
};

/**
 * Update an existing author
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with the updated author or a 404 error if not found
 */
export const updateAuthor = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  try {
    // Update the author based on the fields provided in req.body
    const updatedAuthor = await prisma.author.update({
      where: { id: Number(id) },
      data: req.body,
    });

    // Return the updated author as JSON
    return res.status(StatusCodes.OK).json(updatedAuthor);
  } catch (error) {
    // If an error occurs, return a 500 error along with the error message
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error updating author' });
  }
};

/**
 * Delete an author
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} - JSON response with a success message or a 404 error if not found
 */
export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (!author) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Author not found' });
    }
    await prisma.author.delete({
      where: { id: Number(id) },
    });
    return res.status(StatusCodes.NO_CONTENT).json({ message: 'Author deleted' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting author' });
  }
};

/**
 * Create a new user
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - JSON response with the new user
 */
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
  }
  
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        role: role || 'USER',
      },
    });

    // Generate token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });

    return res.status(StatusCodes.CREATED).json({ user: newUser, token });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user' });
  }
};

/**
 * Login a user
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - JSON response with the new user
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });

    return res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error logging in' });
  }
};

