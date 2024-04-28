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
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Author not found' });
    }
    await prisma.author.delete({
      where: { id: Number(id) },
    });
    res.status(StatusCodes.ACCEPTED).json({ message: 'Author deleted' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting author' });
  }
};

/**
 * Create a new author
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - JSON response with the new user
 */
export const registerUser = async (req, res) => {
  try {
    // Hash the password
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user
    const user = await prisma.author.create({
      data: {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        age: +req.body.age,
        role: req.body.role
      },
    });
    res.status(StatusCodes.CREATED).json({message: 'User Registered', user });
}
  catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error creating user' });
  }
};


/**
 * Login a user
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - JSON response with the new user
 */

export const loginUser = async (req, res) => {
  try {
    console.log('loginUser', req.body);
    const { email, password } = req.body;
    const user = await prisma.author.findUnique({ where: { email } }); 
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Incorrect password');
    const token = jwt.sign({ id: user.id, email: user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(StatusCodes.OK).json({ message: 'Login Successful', token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error, message: 'Error logging in' });
  }
};
