/**
 * Security utilities for sanitizing and safely rendering HTML
 * Prevents XSS attacks
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} Escaped text safe for HTML
 */
export const escapeHtml = (text) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return String(text || "").replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Safely create alert HTML with escaped message
 * @param {string} message - The alert message
 * @param {string} type - Bootstrap alert type (danger, warning, success, info)
 * @returns {string} Safe alert HTML
 */
export const createSafeAlert = (message = "", type = "danger") => {
  const escapedMsg = escapeHtml(message);
  return `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${escapedMsg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
};

/**
 * Safely set text content without interpreting HTML
 * Preferred over innerHTML for dynamic content
 * @param {HTMLElement} element - The target element
 * @param {string} text - The text to set
 */
export const setSafeTextContent = (element, text = "") => {
  if (!element) return;
  element.textContent = String(text || "");
};

/**
 * Safely create select options from array data
 * Escapes values to prevent HTML injection
 * @param {Array} items - Array of {id, name} or {value, label} objects
 * @param {string} idField - Field name for value (default: 'id' or 'value')
 * @param {string} nameField - Field name for label (default: 'name' or 'label')
 * @returns {string} Safe HTML option elements
 */
export const createSafeOptions = (items = [], idField = "id", nameField = "name") => {
  return items
    .map((item) => {
      const value = escapeHtml(String(item[idField] || ""));
      const label = escapeHtml(String(item[nameField] || ""));
      return `<option value="${value}">${label}</option>`;
    })
    .join("");
};
