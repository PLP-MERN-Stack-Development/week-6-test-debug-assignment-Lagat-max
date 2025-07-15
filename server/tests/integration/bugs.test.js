const request = require('supertest');
const express = require('express');
const bugsRouter = require('../../routes/bugs');
const errorHandler = require('../../middleware/errorHandler');

jest.mock('../../models/Bug');
const Bug = require('../../models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugsRouter);
app.use(errorHandler);

describe('Bug API integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/bugs should return all bugs', async () => {
    Bug.find.mockResolvedValueOnce([
      { _id: '1', title: 'Bug 1', description: 'Desc', status: 'open' },
    ]);
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Bug 1');
  });

  it('POST /api/bugs should create a bug', async () => {
    Bug.prototype.save = jest.fn().mockResolvedValueOnce({
      _id: '2', title: 'Bug 2', description: 'Desc', status: 'open',
    });
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Bug 2', description: 'Desc', status: 'open' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Bug 2');
  });

  it('PUT /api/bugs/:id should update a bug', async () => {
    Bug.findByIdAndUpdate.mockResolvedValueOnce({
      _id: '1', title: 'Bug 1', description: 'Updated', status: 'resolved',
    });
    const res = await request(app)
      .put('/api/bugs/1')
      .send({ title: 'Bug 1', description: 'Updated', status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('DELETE /api/bugs/:id should delete a bug', async () => {
    Bug.findByIdAndDelete.mockResolvedValueOnce({ _id: '1' });
    const res = await request(app).delete('/api/bugs/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
}); 