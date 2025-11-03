/**
 * Utility functions for handling Sanity block content
 */

/**
 * Convert Sanity block content to plain text
 * @param {Array} blocks - Sanity block content array
 * @returns {String} - Plain text content
 */
const blockContentToText = (blocks = []) => {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map(block => {
      if (block._type === 'block') {
        return block.children?.map(child => child.text || '').join('') || '';
      }
      return '';
    })
    .join('\n');
};

/**
 * Extract plain text and limit to specified length
 * @param {Array} blocks - Sanity block content array
 * @param {Number} limit - Character limit (default: 300)
 * @returns {String} - Truncated plain text with ellipsis
 */
const getExcerptFromBlocks = (blocks = [], limit = 300) => {
  const text = blockContentToText(blocks);
  if (text.length <= limit) return text;
  return text.substring(0, limit).trim() + '...';
};

/**
 * Calculate read time based on word count
 * @param {Array} blocks - Sanity block content array
 * @param {Number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {String} - Read time formatted as "X min read"
 */
const calculateReadTime = (blocks = [], wordsPerMinute = 200) => {
  const text = blockContentToText(blocks);
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

/**
 * Sanitize and validate block content
 * @param {Array} blocks - Sanity block content array
 * @returns {Array} - Validated block content
 */
const sanitizeBlockContent = (blocks = []) => {
  if (!Array.isArray(blocks)) return [];

  return blocks.filter(block => {
    if (!block._type) return false;
    if (block._type === 'block' && !block.children) return false;
    return true;
  });
};

module.exports = {
  blockContentToText,
  getExcerptFromBlocks,
  calculateReadTime,
  sanitizeBlockContent,
};
