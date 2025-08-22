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
          is_active: true,
          ...query
        },
        populate: {
          foundry: true,
          assets: {
            filters: {
              asset_type: 'image'
            },
            sort: { sort_order: 'asc' }
          },
          categories: true
        },
        sort: { last_updated: 'desc' }
      });

      // Transform data to match your existing API structure
      const transformedFonts = fonts.map(font => ({
        id: font.id,
        name: font.name,
        is_premium: font.is_premium,
        is_active: font.is_active,
        slug: font.slug,
        icon_url: font.icon_url?.url || null,
        created: font.createdAt,
        type: font.type,
        last_updated: font.updatedAt,
        foundary: {
          id: font.foundry?.id,
          name: font.foundry?.name
        },
        price: font.price,
        download_link: font.download_link,
        assets: font.assets?.map(asset => ({
          id: asset.id,
          asset_url: asset.asset_url,
          created: asset.createdAt,
          last_updated: asset.updatedAt,
          asset_type: asset.asset_type,
          thumbnail: asset.thumbnail?.url || null
        })) || []
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
          foundry: true,
          assets: {
            sort: { sort_order: 'asc' }
          },
          categories: true
        }
      });

      if (!font || font.length === 0) {
        return ctx.notFound('Font not found');
      }

      // Transform data to match your existing API structure
      const transformedFont = {
        id: font[0].id,
        name: font[0].name,
        is_premium: font[0].is_premium,
        is_active: font[0].is_active,
        slug: font[0].slug,
        icon_url: font[0].icon_url?.url || null,
        created: font[0].createdAt,
        type: font[0].type,
        last_updated: font[0].updatedAt,
        foundary: {
          id: font[0].foundry?.id,
          name: font[0].foundry?.name
        },
        price: font[0].price,
        download_link: font[0].download_link,
        assets: font[0].assets?.map(asset => ({
          id: asset.id,
          asset_url: asset.asset_url,
          created: asset.createdAt,
          last_updated: asset.updatedAt,
          asset_type: asset.asset_type,
          thumbnail: asset.thumbnail?.url || null
        })) || []
      };

      return transformedFont;
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
