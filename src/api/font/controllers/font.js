'use strict';

/**
 * font controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::font.font', ({ strapi }) => ({

  // Custom method to get active fonts (matching your existing API)
  async getActiveFonts(ctx) {
    try {
      const { query } = ctx;
      
      // Get fonts with relations and filters
      const fonts = await strapi.entityService.findMany('api::font.font', {
        filters: {
          publishedAt: { $notNull: true }, // Only published fonts
          ...query
        },
        populate: {
          foundry: {
            populate: ['logo']
          },
          images: true
        },
        sort: { updatedAt: 'desc' }
      });

      // Transform data to match your new API structure
      const transformedFonts = fonts.map(font => ({
        id: font.id,
        name: font.name,
        slug: font.slug,
        link: font.link,
        images: font.images?.map(image => ({
          id: image.id,
          url: image.url,
          alternativeText: image.alternativeText
        })) || [],
        is_premium: font.is_premium,
        type: font.type,
        price: font.price,
        foundry: font.foundry?.map(foundry => ({
          id: foundry.id,
          name: foundry.name,
          description: foundry.description,
          website: foundry.website,
          logo: foundry.logo ? {
            url: foundry.logo.url,
            alternativeText: foundry.logo.alternativeText
          } : null
        })) || [],
        createdAt: font.createdAt,
        updatedAt: font.updatedAt,
        publishedAt: font.publishedAt
      }));

      return transformedFonts;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Custom method to get font by slug
  async getFontBySlug(ctx) {
    try {
      const { slug } = ctx.params;
      
      const font = await strapi.entityService.findMany('api::font.font', {
        filters: { slug },
        populate: {
          foundry: {
            populate: ['logo']
          },
          images: true
        }
      });

      if (!font || font.length === 0) {
        return ctx.notFound('Font not found');
      }

      // Transform data to match your new API structure
      const transformedFont = {
        id: font[0].id,
        name: font[0].name,
        slug: font[0].slug,
        link: font[0].link,
        images: font[0].images?.map(image => ({
          id: image.id,
          url: image.url,
          alternativeText: image.alternativeText
        })) || [],
        is_premium: font[0].is_premium,
        type: font[0].type,
        price: font[0].price,
        foundry: font[0].foundry?.map(foundry => ({
          id: foundry.id,
          name: foundry.name,
          description: foundry.description,
          website: foundry.website,
          logo: foundry.logo ? {
            url: foundry.logo.url,
            alternativeText: foundry.logo.alternativeText
          } : null
        })) || [],
        createdAt: font[0].createdAt,
        updatedAt: font[0].updatedAt,
        publishedAt: font[0].publishedAt
      };

      return transformedFont;
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
