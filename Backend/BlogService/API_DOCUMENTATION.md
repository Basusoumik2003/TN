# Blog Service API - Complete Documentation

## Base URL

**Development:** `http://localhost:8001`
**Production:** `https://your-blog-api.onrender.com`

---

## 1. Get All Blogs

### Request

```http
GET /api/blogs HTTP/1.1
Host: localhost:8001
Content-Type: application/json
```

### cURL Example

```bash
curl -X GET "http://localhost:8001/api/blogs" \
  -H "Content-Type: application/json"
```

### JavaScript/Fetch Example

```javascript
const response = await fetch('http://localhost:8001/api/blogs');
const data = await response.json();
console.log(data);
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const fetchBlogs = async () => {
  try {
    const response = await axios.get('http://localhost:8001/api/blogs');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};
```

### Success Response (200)

```json
{
  "success": true,
  "count": 6,
  "message": "Blogs fetched successfully",
  "data": [
    {
      "_id": "abc123def456",
      "title": "Understanding Carbon Credits: A Beginner's Guide",
      "slug": "carbon-credits-101",
      "excerpt": "Learn the fundamentals of carbon credits and how they play a crucial role in fighting climate change.",
      "coverImage": {
        "url": "https://cdn.sanity.io/images/4h1b4m3p/production/abc123.jpg?w=800&h=600&fit=crop",
        "alt": "Carbon Credits Concept"
      },
      "author": {
        "name": "Sarah Johnson",
        "avatar": "https://cdn.sanity.io/images/4h1b4m3p/production/avatar123.jpg",
        "bio": "Climate Change Advocate & Sustainability Consultant"
      },
      "publishedAt": "2024-01-15",
      "tags": ["Carbon Credit", "Sustainability", "Climate Change"],
      "_createdAt": "2024-01-15T10:30:00Z",
      "_updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "xyz789uvw012",
      "title": "Sustainable Development Goals: Building a Better Future",
      "slug": "sustainable-development-goals",
      "excerpt": "Explore the UN's Sustainable Development Goals and how they guide global efforts towards a sustainable future.",
      "coverImage": {
        "url": "https://cdn.sanity.io/images/4h1b4m3p/production/xyz789.jpg?w=800&h=600&fit=crop",
        "alt": "SDG Goals"
      },
      "author": {
        "name": "Michael Chen",
        "avatar": "https://cdn.sanity.io/images/4h1b4m3p/production/avatar789.jpg",
        "bio": "Development Economics Expert"
      },
      "publishedAt": "2024-01-10",
      "tags": ["Sustainable Development", "SDGs", "Social Impact"],
      "_createdAt": "2024-01-10T14:20:00Z",
      "_updatedAt": "2024-01-10T14:20:00Z"
    }
  ]
}
```

### Error Response (500)

```json
{
  "success": false,
  "error": "Failed to fetch blogs",
  "details": "ECONNREFUSED: Unable to reach Sanity API"
}
```

---

## 2. Get Single Blog by Slug

### Request

```http
GET /api/blogs/:slug HTTP/1.1
Host: localhost:8001
Content-Type: application/json
```

### cURL Example

```bash
curl -X GET "http://localhost:8001/api/blogs/carbon-credits-101" \
  -H "Content-Type: application/json"
```

### JavaScript/Fetch Example

```javascript
const slug = 'carbon-credits-101';
const response = await fetch(`http://localhost:8001/api/blogs/${slug}`);
const blog = await response.json();
console.log(blog.data);
```

### React Component Example

```jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/blogs/${slug}`);
        const data = await response.json();
        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <article>
      <h1>{blog.title}</h1>
      <img src={blog.coverImage.url} alt={blog.coverImage.alt} />
      <p>{blog.excerpt}</p>
      {/* Render content blocks */}
    </article>
  );
};
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Blog post fetched successfully",
  "data": {
    "_id": "abc123def456",
    "title": "Understanding Carbon Credits: A Beginner's Guide",
    "slug": "carbon-credits-101",
    "excerpt": "Learn the fundamentals of carbon credits and how they play a crucial role in fighting climate change.",
    "coverImage": {
      "url": "https://cdn.sanity.io/images/4h1b4m3p/production/abc123.jpg",
      "alt": "Carbon Credits Concept"
    },
    "author": {
      "name": "Sarah Johnson",
      "avatar": "https://cdn.sanity.io/images/4h1b4m3p/production/avatar123.jpg",
      "bio": "Climate Change Advocate & Sustainability Consultant"
    },
    "publishedAt": "2024-01-15",
    "tags": ["Carbon Credit", "Sustainability", "Climate Change"],
    "readTime": "5 min read",
    "content": [
      {
        "_type": "block",
        "_key": "block001",
        "style": "normal",
        "children": [
          {
            "_type": "span",
            "_key": "span001",
            "marks": [],
            "text": "Carbon credits are a key instrument in the global effort to combat climate change. Each carbon credit represents the right to emit one tonne of carbon dioxide equivalent (CO2e)."
          }
        ],
        "markDefs": []
      },
      {
        "_type": "block",
        "_key": "block002",
        "style": "h2",
        "children": [
          {
            "_type": "span",
            "_key": "span002",
            "marks": [],
            "text": "What Are Carbon Credits?"
          }
        ],
        "markDefs": []
      }
    ],
    "_createdAt": "2024-01-15T10:30:00Z",
    "_updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Error Responses

**Not Found (404):**
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

**Bad Request (400):**
```json
{
  "success": false,
  "error": "Slug parameter is required"
}
```

---

## 3. Search Blogs

### Request

```http
GET /api/blogs/search?tag=sustainability&keyword=carbon HTTP/1.1
Host: localhost:8001
Content-Type: application/json
```

### Query Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| tag       | string | No       | Filter by tag name             |
| keyword   | string | No       | Search in title and excerpt    |

### Examples

**Search by tag:**
```bash
curl "http://localhost:8001/api/blogs/search?tag=renewable"
```

**Search by keyword:**
```bash
curl "http://localhost:8001/api/blogs/search?keyword=carbon"
```

**Search by tag AND keyword:**
```bash
curl "http://localhost:8001/api/blogs/search?tag=renewable&keyword=energy"
```

### JavaScript Example

```javascript
const searchBlogs = async (tag, keyword) => {
  const params = new URLSearchParams();
  if (tag) params.append('tag', tag);
  if (keyword) params.append('keyword', keyword);

  const response = await fetch(
    `http://localhost:8001/api/blogs/search?${params}`
  );
  const results = await response.json();
  return results.data;
};

// Usage
const results = await searchBlogs('sustainability', 'carbon');
console.log(results);
```

### Success Response (200)

```json
{
  "success": true,
  "count": 2,
  "message": "Search completed successfully",
  "data": [
    {
      "_id": "abc123def456",
      "title": "Understanding Carbon Credits: A Beginner's Guide",
      "slug": "carbon-credits-101",
      "excerpt": "Learn the fundamentals of carbon credits...",
      "coverImage": {
        "url": "https://cdn.sanity.io/images/4h1b4m3p/production/abc123.jpg",
        "alt": "Carbon Credits Concept"
      },
      "author": {
        "name": "Sarah Johnson",
        "avatar": "https://cdn.sanity.io/images/4h1b4m3p/production/avatar123.jpg",
        "bio": "Climate Change Advocate"
      },
      "publishedAt": "2024-01-15",
      "tags": ["Carbon Credit", "Sustainability"]
    }
  ]
}
```

---

## 4. Health Check

### Request

```http
GET /health HTTP/1.1
Host: localhost:8001
```

### Response

```json
{
  "status": "ok",
  "service": "Blog Service",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

## Response Structure

All API responses follow this standard structure:

```json
{
  "success": true|false,
  "data": {},
  "message": "Description of response",
  "error": "Error message (if applicable)",
  "details": "Detailed error info (development only)",
  "count": 0
}
```

### Status Codes

| Code | Meaning                                 |
|------|-----------------------------------------|
| 200  | Success                                 |
| 400  | Bad request (missing/invalid params)   |
| 404  | Not found (blog doesn't exist)          |
| 500  | Server error                            |
| 403  | CORS error (frontend not whitelisted)  |

---

## CORS Configuration

The API allows requests from these origins:

- `https://79145e8bbc1a402b83e7b01884d6c2b9-e7d3808c681146c38bd383fb6.fly.dev`
- `https://frontend-user-etef.onrender.com`
- `http://localhost:3000`
- `http://localhost:5173`

To add more origins, edit `server.js` and add to `allowedOrigins` array.

---

## Integration Examples

### Vue.js

```vue
<template>
  <div>
    <h1>Blog Posts</h1>
    <div v-for="blog in blogs" :key="blog._id">
      <h2>{{ blog.title }}</h2>
      <p>{{ blog.excerpt }}</p>
      <router-link :to="`/blog/${blog.slug}`">Read More</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const blogs = ref([]);

onMounted(async () => {
  const response = await fetch('http://localhost:8001/api/blogs');
  const data = await response.json();
  blogs.value = data.data;
});
</script>
```

### Angular

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8001/api/blogs';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${slug}`);
  }

  searchBlogs(tag?: string, keyword?: string): Observable<any> {
    let url = `${this.apiUrl}/search`;
    const params = new URLSearchParams();
    if (tag) params.append('tag', tag);
    if (keyword) params.append('keyword', keyword);
    return this.http.get(`${url}?${params}`);
  }
}
```

---

## Troubleshooting

### CORS Error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Check frontend URL in `server.js` `allowedOrigins` array
2. Ensure frontend URL matches exactly (https vs http, trailing slash, etc.)
3. Add your frontend URL to the list and restart server

### 404 on Blog
**Error:** `Blog post not found`

**Solution:**
1. Verify slug exists in Sanity CMS
2. Check slug is URL-friendly (lowercase, hyphens, no spaces)
3. Verify blog is published in Sanity

### Sanity API Error
**Error:** `Unable to reach Sanity API`

**Solution:**
1. Check SANITY_PROJECT_ID and SANITY_API_TOKEN in `.env`
2. Verify API token has read permissions
3. Ensure internet connectivity

---

**Last Updated:** January 2024
**API Version:** 1.0.0
