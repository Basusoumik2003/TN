# Blog Service API

A Node.js + Express backend service for managing blog posts using Sanity CMS. This service provides RESTful API endpoints for fetching, searching, and managing blog content.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Sanity CMS account with a project
- Sanity API token with read access

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd Backend/BlogService
npm install
```

### 2. Environment Variables

Create a `.env` file in the `BlogService` folder by copying `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your Sanity credentials:

```env
PORT=8001
NODE_ENV=development
SANITY_PROJECT_ID=4h1b4m3p
SANITY_DATASET=production
SANITY_API_TOKEN=skmyMxrx0JOrh35hjBA8NHJCeLyRB5AcXLiHiJ5BQNq2nDlIKQsIN199vz6BKzWoAybIMBtSnRHntJvxONxhUBjrl4EiiHjPUfCAuHlBp2Y7lezRrHamPZ35EUExkih0SfqnD9SKNKRiB6hDPTqhhaVTkydeqhfns2igkazeLX39dIk0w57D
FRONTEND_URL=https://79145e8bbc1a402b83e7b01884d6c2b9-e7d3808c681146c38bd383fb6.fly.dev
```

### 3. Start the Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will run on `http://localhost:8001`

## 📚 API Endpoints

### 1. Get All Blogs

**Endpoint:** `GET /api/blogs`

**Description:** Fetch all published blog posts, ordered by newest first

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "blog-id-123",
      "title": "Understanding Carbon Credits",
      "slug": "understanding-carbon-credits",
      "excerpt": "Learn the fundamentals of carbon credits...",
      "coverImage": {
        "url": "https://cdn.sanity.io/images/...",
        "alt": "Image description"
      },
      "author": {
        "name": "Sarah Johnson",
        "avatar": "https://cdn.sanity.io/images/...",
        "bio": "Climate Change Advocate"
      },
      "publishedAt": "2024-01-15",
      "tags": ["Carbon Credit", "Sustainability"],
      "_createdAt": "2024-01-15T10:00:00Z",
      "_updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "count": 6,
  "message": "Blogs fetched successfully"
}
```

---

### 2. Get Single Blog by Slug

**Endpoint:** `GET /api/blogs/:slug`

**Description:** Fetch a complete blog post with full content, including all blocks and rich text

**Parameters:**

- `slug` (string, required): The URL-friendly slug of the blog post

**Example:** `GET /api/blogs/understanding-carbon-credits`

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "blog-id-123",
    "title": "Understanding Carbon Credits",
    "slug": "understanding-carbon-credits",
    "excerpt": "Learn the fundamentals of carbon credits...",
    "coverImage": {
      "url": "https://cdn.sanity.io/images/...",
      "alt": "Image description"
    },
    "author": {
      "name": "Sarah Johnson",
      "avatar": "https://cdn.sanity.io/images/...",
      "bio": "Climate Change Advocate"
    },
    "publishedAt": "2024-01-15",
    "tags": ["Carbon Credit", "Sustainability"],
    "content": [
      {
        "_type": "block",
        "_key": "abc123",
        "style": "normal",
        "children": [
          {
            "_type": "span",
            "text": "Carbon credits are a key instrument in fighting climate change...",
            "marks": []
          }
        ]
      }
    ],
    "readTime": "5 min read",
    "_createdAt": "2024-01-15T10:00:00Z",
    "_updatedAt": "2024-01-15T10:00:00Z"
  },
  "message": "Blog post fetched successfully"
}
```

---

### 3. Search Blogs

**Endpoint:** `GET /api/blogs/search`

**Description:** Search blogs by tag or keyword

**Query Parameters:**

- `tag` (string, optional): Filter by tag name
- `keyword` (string, optional): Search in title and excerpt

**Examples:**

- `GET /api/blogs/search?tag=sustainability`
- `GET /api/blogs/search?keyword=carbon`
- `GET /api/blogs/search?tag=renewable&keyword=energy`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "blog-id-456",
      "title": "The Rise of Renewable Energy",
      "slug": "renewable-energy-future",
      "excerpt": "Discover how renewable energy is transforming...",
      "coverImage": { "url": "...", "alt": "..." },
      "author": { "name": "Emma Rodriguez", "avatar": "...", "bio": "..." },
      "publishedAt": "2024-01-05",
      "tags": ["Renewable Energy", "Clean Energy"],
      "_createdAt": "2024-01-05T10:00:00Z",
      "_updatedAt": "2024-01-05T10:00:00Z"
    }
  ],
  "count": 3,
  "message": "Search completed successfully"
}
```

---

### 4. Health Check

**Endpoint:** `GET /health`

**Description:** Check if the service is running

**Response:**

```json
{
  "status": "ok",
  "service": "Blog Service",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

---

## 🗂️ Folder Structure

```
BlogService/
├── config/
│   └── sanityClient.js       # Sanity API client configuration
├── controllers/
│   └── blogController.js     # Business logic for blog operations
├── routes/
│   └── blogRoutes.js         # API route definitions
├── server.js                 # Express server setup
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
└── README.md                 # Documentation
```

## 🔒 Security

- **CORS:** Configured to allow only specified frontend URLs
- **Environment Variables:** Sensitive credentials stored in `.env`
- **Error Handling:** Detailed errors in development mode, minimal in production
- **Input Validation:** Slug parameters validated before querying

## 🧠 Sanity CMS Integration

This service uses Sanity's GROQ query language to fetch data from your CMS.

### Required Schemas in Sanity:

**Blog Schema**
```javascript
{
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', title: 'Short Description' },
    { name: 'coverImage', type: 'image', title: 'Cover Image' },
    { name: 'content', type: 'array', title: 'Content', of: [{ type: 'block' }] },
    { name: 'author', type: 'reference', to: [{ type: 'author' }], title: 'Author' },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' }
  ]
}
```

**Author Schema**
```javascript
{
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'image', type: 'image', title: 'Avatar' },
    { name: 'bio', type: 'text', title: 'Bio' }
  ]
}
```

## 🛠️ Development

### Add New Endpoints

1. **Create a new method in `controllers/blogController.js`**
2. **Add a new route in `routes/blogRoutes.js`**
3. **Test the endpoint using curl or Postman**

### Example: Add a "Latest Blogs" endpoint

**Controller:**
```javascript
getLatestBlogs: async (req, res) => {
  // Query logic here
}
```

**Route:**
```javascript
router.get('/latest', blogController.getLatestBlogs);
```

## 📝 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "error": "Blog post not found",
  "details": "Error details (only in development)"
}
```

### Common HTTP Status Codes:

- `200` - Success
- `400` - Bad request (missing slug, invalid query)
- `404` - Blog not found
- `500` - Server error
- `403` - CORS error

## 🚢 Deployment

### Deploy to Render (Node.js)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard
6. Deploy

### Deploy to Other Platforms

- **Heroku:** Use Procfile
- **Railway:** Use start script from package.json
- **Vercel:** Create API routes in functions folder
- **AWS Lambda:** Wrap Express app with serverless handler

## 📞 Support

For issues or questions:
1. Check logs: `npm run dev`
2. Verify Sanity credentials in `.env`
3. Ensure CORS origin is whitelisted
4. Check frontend URL in `server.js` CORS configuration

## 📄 License

ISC

---

**Last Updated:** January 2024
**Service Version:** 1.0.0
