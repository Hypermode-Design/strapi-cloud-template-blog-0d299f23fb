'use strict';

const { Strapi } = require('@strapi/strapi');

async function seedFonts() {
  try {
    console.log('🌱 Starting font gallery seed...');

    // Create categories
    const categories = await strapi.entityService.createMany('api::category.category', [
      { name: 'Serif', slug: 'serif', description: 'Traditional serif fonts with decorative strokes' },
      { name: 'Sans-Serif', slug: 'sans-serif', description: 'Modern sans-serif fonts without decorative strokes' },
      { name: 'Display', slug: 'display', description: 'Decorative display fonts for headlines and titles' },
      { name: 'Handwriting', slug: 'handwriting', description: 'Handwritten style fonts that mimic natural writing' },
      { name: 'Monospace', slug: 'monospace', description: 'Fixed-width fonts where each character takes the same space' },
      { name: 'Variable', slug: 'variable', description: 'Variable fonts with adjustable properties' }
    ]);
    console.log('✅ Categories created');

    // Create foundries
    const foundries = await strapi.entityService.createMany('api::foundry.foundry', [
      { name: 'Google Fonts', description: 'Open source fonts from Google', website: 'https://fonts.google.com' },
      { name: 'Adobe Fonts', description: 'Professional fonts from Adobe', website: 'https://fonts.adobe.com' },
      { name: 'Monotype', description: 'Classic typeface designs and typography solutions', website: 'https://www.monotype.com' },
      { name: 'FontShop', description: 'Premium font marketplace and foundry', website: 'https://www.fontshop.com' },
      { name: 'MyFonts', description: 'Font discovery platform and marketplace', website: 'https://www.myfonts.com' }
    ]);
    console.log('✅ Foundries created');

    console.log('🎉 Font gallery seeding completed successfully!');
    console.log(`Created ${categories.length} categories and ${foundries.length} foundries`);
    console.log('📝 Note: Fonts and assets should be added manually through the Strapi admin panel');

  } catch (error) {
    console.error('❌ Error seeding font gallery:', error);
  }
}

module.exports = seedFonts;
