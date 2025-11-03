const { sanityClient, SANITY_DATASET } = require('../config/sanityClient');

const blogController = {
  /**
   * Fetch all blog posts
   * GET /api/blogs
   */
  getAllBlogs: async (req, res) => {
    try {
      const query = `*[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "coverImage": {
          "url": coverImage.asset->url,
          "alt": coverImage.alt
        },
        "author": {
          "name": author->name,
          "avatar": author->image.asset->url,
          "bio": author->bio
        },
        publishedAt,
        tags,
        _createdAt,
        _updatedAt
      }`;

      const response = await sanityClient.get(
        `/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
      );

      if (!response.data || !response.data.result) {
        return res.status(200).json({
          success: true,
          data: [],
          message: 'No blogs found',
        });
      }

      const blogs = response.data.result.map(blog => ({
        ...blog,
        publishedAt: new Date(blog.publishedAt).toISOString().split('T')[0],
      }));

      res.status(200).json({
        success: true,
        data: blogs,
        count: blogs.length,
        message: 'Blogs fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blogs',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },

  /**
   * Fetch a single blog post by slug
   * GET /api/blogs/:slug
   */
  getBlogBySlug: async (req, res) => {
    try {
      const { slug } = req.params;

      if (!slug || slug.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Slug parameter is required',
        });
      }

      const query = `*[_type == "blog" && slug.current == "${slug}"] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "coverImage": {
          "url": coverImage.asset->url,
          "alt": coverImage.alt
        },
        "author": {
          "name": author->name,
          "avatar": author->image.asset->url,
          "bio": author->bio
        },
        publishedAt,
        tags,
        content[] {
          ...,
          markDefs[] {
            ...,
            _type == "image" => {
              "url": asset->url
            }
          }
        },
        "readTime": round(length(content[].children[].text) / 200) + " min read",
        _createdAt,
        _updatedAt
      }[0]`;

      const response = await sanityClient.get(
        `/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
      );

      if (!response.data.result) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found',
        });
      }

      const blog = {
        ...response.data.result,
        publishedAt: new Date(response.data.result.publishedAt)
          .toISOString()
          .split('T')[0],
      };

      res.status(200).json({
        success: true,
        data: blog,
        message: 'Blog post fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching blog by slug:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blog post',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },

  /**
   * Search blogs by tag or keyword
   * GET /api/blogs/search?tag=sustainability
   */
  searchBlogs: async (req, res) => {
    try {
      const { tag, keyword } = req.query;

      let query = '*[_type == "blog"';

      if (tag) {
        query += ` && "${tag}" in tags`;
      }

      if (keyword) {
        query += ` && (title match "*${keyword}*" || excerpt match "*${keyword}*")`;
      }

      query += `] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "coverImage": {
          "url": coverImage.asset->url,
          "alt": coverImage.alt
        },
        "author": {
          "name": author->name,
          "avatar": author->image.asset->url,
          "bio": author->bio
        },
        publishedAt,
        tags,
        _createdAt,
        _updatedAt
      }`;

      const response = await sanityClient.get(
        `/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
      );

      if (!response.data || !response.data.result) {
        return res.status(200).json({
          success: true,
          data: [],
          message: 'No blogs match your search',
        });
      }

      const blogs = response.data.result.map(blog => ({
        ...blog,
        publishedAt: new Date(blog.publishedAt).toISOString().split('T')[0],
      }));

      res.status(200).json({
        success: true,
        data: blogs,
        count: blogs.length,
        message: 'Search completed successfully',
      });
    } catch (error) {
      console.error('Error searching blogs:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to search blogs',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },
};

module.exports = blogController;
