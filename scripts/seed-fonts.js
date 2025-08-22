'use strict';

const { Strapi } = require('@strapi/strapi');

async function seedFonts() {
  try {
    console.log('🌱 Starting font gallery seed...');

    // Create foundries first
    const foundries = await strapi.entityService.createMany('api::foundry.foundry', [
      { 
        name: 'Google Fonts', 
        description: 'Open source fonts from Google', 
        website: 'https://fonts.google.com',
        publishedAt: new Date()
      },
      { 
        name: 'Adobe Fonts', 
        description: 'Professional fonts from Adobe', 
        website: 'https://fonts.adobe.com',
        publishedAt: new Date()
      },
      { 
        name: 'Monotype', 
        description: 'Classic typeface designs and typography solutions', 
        website: 'https://www.monotype.com',
        publishedAt: new Date()
      },
      { 
        name: 'FontShop', 
        description: 'Premium font marketplace and foundry', 
        website: 'https://www.fontshop.com',
        publishedAt: new Date()
      },
      { 
        name: 'MyFonts', 
        description: 'Font discovery platform and marketplace', 
        website: 'https://www.myfonts.com',
        publishedAt: new Date()
      }
    ]);
    console.log('✅ Foundries created');

    // Get the created foundries for relationships
    const googleFonts = await strapi.entityService.findOne('api::foundry.foundry', 1);
    const adobeFonts = await strapi.entityService.findOne('api::foundry.foundry', 2);
    const monotype = await strapi.entityService.findOne('api::foundry.foundry', 3);

    // Create sample fonts with proper relationships
    const fonts = await strapi.entityService.createMany('api::font.font', [
      {
        name: 'Anton',
        slug: 'anton',
        link: 'https://fonts.google.com/specimen/Anton',
        is_premium: false,
        type: 'sans-serif',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Baskervville',
        slug: 'baskervville',
        link: 'https://fonts.google.com/specimen/Baskervville',
        is_premium: false,
        type: 'serif',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Bebas Neue',
        slug: 'bebas-neue',
        link: 'https://fonts.google.com/specimen/Bebas+Neue',
        is_premium: false,
        type: 'display',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Borel',
        slug: 'borel',
        link: 'https://fonts.google.com/specimen/Borel',
        is_premium: false,
        type: 'handwriting',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Bricolage Grotesque',
        slug: 'bricolage-grotesque',
        link: 'https://fonts.google.com/specimen/Bricolage+Grotesque',
        is_premium: false,
        type: 'sans-serif',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Caveat',
        slug: 'caveat',
        link: 'https://fonts.google.com/specimen/Caveat',
        is_premium: false,
        type: 'handwriting',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Chillax Variable',
        slug: 'chillax-variable',
        link: 'https://fonts.google.com/specimen/Chillax+Variable',
        is_premium: false,
        type: 'variable',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'Cinzel Decorative',
        slug: 'cinzel-decorative',
        link: 'https://fonts.google.com/specimen/Cinzel+Decorative',
        is_premium: false,
        type: 'display',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'DotGothic16',
        slug: 'dotgothic16',
        link: 'https://fonts.google.com/specimen/DotGothic16',
        is_premium: false,
        type: 'sans-serif',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      },
      {
        name: 'DynaPuff',
        slug: 'dynapuff',
        link: 'https://fonts.google.com/specimen/DynaPuff',
        is_premium: false,
        type: 'display',
        price: 'free',
        foundry: [googleFonts.id],
        publishedAt: new Date()
      }
    ]);
    console.log('✅ Fonts created');

    console.log('🎉 Font gallery seeding completed successfully!');
    console.log(`Created ${foundries.length} foundries and ${fonts.length} fonts`);
    console.log('📝 Note: You can now add images to fonts through the Strapi admin panel');

  } catch (error) {
    console.error('❌ Error seeding font gallery:', error);
  }
}

module.exports = seedFonts;
