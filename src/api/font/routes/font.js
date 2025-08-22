'use strict';

/**
 * font router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::font.font');

// Customize the default router
const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

// Add custom routes
const extraRoutes = [
  {
    method: 'GET',
    path: '/active-fonts',
    handler: 'font.getActiveFonts',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/font/:slug',
    handler: 'font.getFontBySlug',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = customRouter(defaultRouter, extraRoutes);
