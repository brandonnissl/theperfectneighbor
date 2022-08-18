import DOMPurify from 'dompurify';
const {format} = require('date-fns');

export const dateFormat = (str) => {
  const date = new Date(str)
  return format(date, 'MMMM dd, yyyy')
}

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = (content) => {

  return process.browser ? DOMPurify.sanitize(content) : content;
};

export const specialChar = (str) => {

  str = str.replace(/&amp;/g, '&') 
  return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}


export const addBlogTags = (content) => {
  
  content = content.replace('<ol>','<ol class="ul-list mb30">');
  return content;
}

/**
 * Get Singular or plural text.
 *
 * @param {Int} count Count.
 * @param {String} text text.
 *
 * @returns {string} Singular or plural from of text.
 */
export const getSingularOrPluralText = (count, text) => {
  return 1 < count ? `${text}s` : text;
};
