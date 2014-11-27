'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var PageActions = {

  /**
   * Set a title for the current page.
   * @param {string} text The text to be set as a page title.
   */
  setTitle: function(text) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.SET_PAGE_TITLE,
      text: text
    });
  },

  /**
   * Set description for the current page.
   * @param {string} text The text to be set as a page description.
   */
  setDescription: function(text) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.SET_PAGE_DESC,
      text: text
    });
  },

  /**
   * Set keywords for the current page.
   * @param {string} text The text to be set as page keywords.
   */
  setKeywords: function(text) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.SET_PAGE_KEYWORDS,
      text: text
    });
  }

};

module.exports = PageActions;
