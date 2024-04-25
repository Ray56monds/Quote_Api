import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from '../server.js';

describe('Author endpoints', () => {
  let token; // Variable to store JWT token for authenticated requests

  // Test user registration endpoint
  describe('POST /api/auth/register', () => {
    it('should register a new author', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Author',
          age: 30,
          password: 'password123',
        });
      expect(res.statusCode).toEqual(StatusCodes.CREATED);
      expect(res.body.message).toEqual('Author Created');
      expect(res.body).toHaveProperty('token');
      token = res.body.token; // Store the token for authenticated requests
    });
  });

  // Test user login endpoint
  describe('POST /api/auth/login', () => {
    it('should login an existing author', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          name: 'Test Author',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body.message).toEqual('Login Successful ✔');
      expect(res.body).toHaveProperty('token');
      token = res.body.token; // Store the token for authenticated requests
    });
  });

  // Test get all authors endpoint
  describe('GET /api/authors', () => {
    it('should return all authors', async () => {
      const res = await request(app)
        .get('/api/authors')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  // Test get single author endpoint
  describe('GET /api/authors/:id', () => {
    it('should return a single author by id', async () => {
      const res = await request(app)
        .get('/api/authors/1')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty('name');
    });
  });

// Test create author endpoint
describe('POST /api/authors', () => {
    it('should create a new author', async () => {
      const newAuthor = {
        name: 'New Author',
        age: 35,
        password: 'newpassword123',
      };
  
      const res = await request(app)
        .post('/api/authors')
        .set('Authorization', `Bearer ${token}`)
        .send(newAuthor);
  
      expect(res.statusCode).toEqual(StatusCodes.CREATED);
      expect(res.body).toHaveProperty('author');
      expect(res.body.author.name).toEqual(newAuthor.name);
    });
  });
  
  // Test update author endpoint
  describe('PUT /api/authors/:id', () => {
    it('should update an existing author', async () => {
      const authorId = 1;
      const updatedAuthor = {
        name: 'Updated Author',
        age: 40,
      };
  
      const res = await request(app)
        .put(`/api/authors/${authorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedAuthor);
  
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body.name).toEqual(updatedAuthor.name);
      expect(res.body.age).toEqual(updatedAuthor.age);
    });
  });
  
  // Test delete author endpoint
  describe('DELETE /api/authors/:id', () => {
    it('should delete an existing author', async () => {
      const authorId = 1;
  
      const res = await request(app)
        .delete(`/api/authors/${authorId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });
  
});
