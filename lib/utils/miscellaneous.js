import DOMPurify from "dompurify";
const { format } = require("date-fns");
import { isEmpty } from "lodash";

export const strapiImage = (str) => {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + str;
};

export const dateFormat = (str) => {
  if (!isEmpty(str)) {
    const date = new Date(str);
    return format(date, "MMMM dd, yyyy");
  }
  return "";
};

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
  if (!isEmpty(str)) {
    str = str.replace(/&amp;/g, "&");
    return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
      return String.fromCharCode(charCode);
    });
  }
  return "";
};

export const addBlogTags = (content) => {
  if (!isEmpty(content)) {
    content = content.replace("<ol>", '<ol class="ul-list mb30">');
    return content;
  }
  return "";
};

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

export const getSeasonStartMonth = (season) => {
  switch (season) {
    case "Winter":
      return 11;
    case "Spring":
      return 2;
    case "Summer":
      return 5;
    case "Fall":
      return 8;
  }
};

export const getSeasonNumber = (seasonName) => {
  var season = 0;
  switch (seasonName) {
    case "Winter":
      season = 4;
      break;
    case "Spring":
      season = 1;
      break;
    case "Summer":
      season = 2;
      break;
    case "Fall":
      season = 3;
      break;
  }
  return season;
};

export const getSeason = (td) => {
  var season = "";
  switch (td.getMonth() + 1) {
    case 1:
      season = 0;
      break;
    case 2:
      season = 0;
      break;
    case 3:
      season = 1;
      break;
    case 4:
      season = 1;
      break;
    case 5:
      season = 1;
      break;
    case 6:
      season = 2;
      break;
    case 7:
      season = 2;
      break;
    case 8:
      season = 2;
      break;
    case 9:
      season = 3;
      break;
    case 10:
      season = 3;
      break;
    case 11:
      season = 3;
      break;
    case 12:
      season = 4;
      break;
  }
  return season;
};
