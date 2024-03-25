const express = require('express');
const router = express.Router();
const paginationMiddleware = require('./pagination.middleware');
const controllers = require('../controllers/controller');

// Define CRUD routes for User entity
router.post('/users', controllers.createNote);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Define CRUD routes for Note entity
router.post('/notes', controllers.createNote);
router.get('/allnotes', controllers.getAllNotes);
router.get('/notes/:user_id',paginationMiddleware, controllers.getNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', controllers.deleteNote);

// Additional endpoints
router.post('/send-note', sendNote);
router.get('/timeline-notes', listTimelineNotes);
router.delete('/delete-notes', deleteNotes);
router.get('/notify-users', notifyUsers);

module.exports = router;
