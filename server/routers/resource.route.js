const express = require('express');
const { createResource, getAllResources, getResourceById, updateResource, deleteResource } = require('../controllers/resource.controller');
const router = express.Router();

// Create a new resource
router.post('/', createResource);

// Get all resources
router.get('/', getAllResources);

// Get a single resource by ID
router.get('/:id', getResourceById);

// Update a resource by ID
router.put('/:id', updateResource);

// Delete a resource by ID
router.delete('/:id', deleteResource);

module.exports = router;
