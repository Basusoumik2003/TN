import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogsData from '../data/blogsData';
import Footer from '../components/Footer';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = useMemo(() => {
    return blogsData.find(b => b.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!blog) return [];
    return blog.relatedPostIds
      .map(id => blogsData.find(b => b.id === id))
      .filter(Boolean);
  }, [blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-detail-wrapper">
        <div className="blog-not-found">
          <h1>Blog Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/blogs')} className="blog-back-btn">
            ← Back to Blogs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-detail-wrapper">
      {/* Blog Header */}
      <header className="blog-detail-header">
        <button
          onClick={() => navigate('/blogs')}
          className="blog-back-button"
          title="Back to all blogs"
        >
          ← Back
        </button>
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div className="blog-detail-meta">
          <div className="blog-detail-author">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="blog-detail-avatar"
            />
            <div className="blog-author-details">
              <p className="blog-author-name">{blog.author.name}</p>
              <p className="blog-author-bio">{blog.author.bio}</p>
            </div>
          </div>
          <div className="blog-detail-date-time">
            <p className="blog-publish-date">
              {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="blog-read-time">{blog.readTime}</p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.image && (
        <div className="blog-detail-image-wrapper">
          <img
            src={blog.image}
            alt={blog.title}
            className="blog-detail-image"
          />
        </div>
      )}

      {/* Main Content */}
      <article className="blog-detail-content">
        <div className="blog-content-inner">
          <div className="blog-article-text">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Check if paragraph is a heading (ends with numbers 1-3)
              const isHeading = /^[\d]+\.\s+/.test(paragraph.trim()) || 
                               paragraph.trim().match(/^[A-Z][^.!?]*$/);
              
              if (isHeading) {
                return (
                  <h2 key={index} className="blog-section-heading">
                    {paragraph.trim()}
                  </h2>
                );
              }
              
              return (
                <p key={index} className="blog-paragraph">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="blog-tags-section">
            <h3 className="blog-tags-title">Tags</h3>
            <div className="blog-tags-list">
              {blog.tags.map(tag => (
                <span key={tag} className="blog-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="blog-related-section">
          <h2 className="blog-related-title">Related Posts</h2>
          <div className="blog-related-grid">
            {relatedPosts.map(relatedBlog => (
              <article
                key={relatedBlog.id}
                className="blog-related-card"
                onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
              >
                <img
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  className="blog-related-image"
                />
                <div className="blog-related-content">
                  <h3 className="blog-related-title-text">{relatedBlog.title}</h3>
                  <p className="blog-related-excerpt">{relatedBlog.excerpt}</p>
                  <button className="blog-related-link">Read More →</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
