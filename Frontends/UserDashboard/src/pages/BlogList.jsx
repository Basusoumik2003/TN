import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import blogsData from '../data/blogsData';
import Footer from '../components/Footer';
import '../styles/BlogList.css';

const BlogList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const allCategories = new Set(['All']);
    blogsData.forEach(blog => {
      blog.tags.forEach(tag => allCategories.add(tag));
    });
    return Array.from(allCategories);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogsData;
    }
    return blogsData.filter(blog => blog.tags.includes(selectedCategory));
  }, [selectedCategory]);

  const handleJoinCommunity = () => {
    navigate('/community');
  };

  const handleReadMore = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="blog-list-wrapper">
      {/* Hero Section with Video Background */}
      <section className="blog-hero">
        <video
          autoPlay
          muted
          loop
          className="blog-hero-video"
          poster="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
        >
          <source src="https://videos.unsplash.com/video-1512245176029-430a63602af0?w=1200" type="video/mp4" />
        </video>
        <div className="blog-hero-overlay" />
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Our Blogs</h1>
          <p className="blog-hero-tagline">
            Learn more about sustainable development and green initiatives
          </p>
          <button className="blog-cta-button" onClick={handleJoinCommunity}>
            Join Community
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <div className="blog-filter-container">
        <div className="blog-filter-wrapper">
          {categories.map(category => (
            <button
              key={category}
              className={`blog-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid-container">
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-grid-card">
              <div className="blog-card-image-wrapper">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-card-image"
                />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="blog-author-avatar"
                  />
                  <div className="blog-author-info">
                    <p className="blog-author-name">{blog.author.name}</p>
                    <p className="blog-publish-date">
                      {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-tags">
                  {blog.tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <button
                  className="blog-read-more-btn"
                  onClick={() => handleReadMore(blog.slug)}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
