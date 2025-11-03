const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

/**
 * @route   GET /api/blogs
 * @desc    Fetch all blog posts
 * @access  Public
 */
router.get('/', blogController.getAllBlogs);

/**
 * @route   GET /api/blogs/search
 * @desc    Search blogs by tag or keyword
 * @access  Public
 * @query   ?tag=sustainability&keyword=carbon
 */
router.get('/search', blogController.searchBlogs);

/**
 * @route   GET /api/blogs/:slug
 * @desc    Fetch a single blog post by slug
 * @access  Public
 * @param   slug - Blog post slug
 */
router.get('/:slug', blogController.getBlogBySlug);

module.exports = router;
