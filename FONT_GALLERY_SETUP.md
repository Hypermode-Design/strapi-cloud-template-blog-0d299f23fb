# Font Gallery Strapi CMS Setup

This Strapi instance is configured for managing a font gallery application with the following content types:

## Content Types

### 1. Font
- **Purpose**: Main font information and metadata
- **Key Fields**:
  - `name`: Font name
  - `slug`: URL-friendly identifier
  - `description`: Font description
  - `type`: Font classification (serif, sans-serif, display, etc.)
  - `category`: Font category
  - `price`: Pricing (free, paid, trial)
  - `download_link`: Download URL
  - `icon_url`: Font icon/logo
  - `is_premium`: Premium font flag
  - `is_active`: Active status
  - `foundry`: Relationship to foundry
  - `assets`: Related images and files
  - `categories`: Multiple category relationships

### 2. Foundry
- **Purpose**: Font developers and companies
- **Key Fields**:
  - `name`: Foundry name
  - `description`: Foundry description
  - `website`: Foundry website
  - `logo`: Foundry logo
  - `fonts`: Related fonts

### 3. Asset
- **Purpose**: Font images, demos, and media files
- **Key Fields**:
  - `asset_url`: Asset URL
  - `asset_type`: Type (image, file, video, demo)
  - `title`: Asset title
  - `description`: Asset description
  - `font`: Related font
  - `sort_order`: Display order
  - `is_featured`: Featured asset flag

### 4. Category
- **Purpose**: Font classifications and organization
- **Key Fields**:
  - `name`: Category name
  - `slug`: URL-friendly identifier
  - `description`: Category description
  - `icon`: Category icon
  - `parent_category`: Parent category (for hierarchical structure)
  - `sub_categories`: Child categories
  - `fonts`: Related fonts

## API Endpoints

### Custom Font Endpoints
- `GET /api/fonts/active-fonts` - Get all active fonts (matches your existing API)
- `GET /api/fonts/font/:slug` - Get font by slug
- `GET /api/fonts` - Standard Strapi CRUD operations
- `GET /api/foundries` - Get all foundries
- `GET /api/assets` - Get all assets
- `GET /api/categories` - Get all categories

## Setup Instructions

### 1. Install Dependencies
```bash
cd strapi-cloud-template-blog-0d299f23fb
npm install
```

### 2. Start Development Server
```bash
npm run develop
```

### 3. Access Admin Panel
- Open: http://localhost:1337/admin
- Create your first admin user
- Navigate to Content-Types Builder to see the configured schemas

### 4. Seed Sample Data
```bash
npm run seed:fonts
```

### 5. Configure Media
- Upload font icons, demo images, and other assets
- Organize them in the Assets section
- Link them to your fonts

## Data Migration

### From Your Current API
Your Remix app currently fetches from: `https://backend.fontcert.com/api/active-fonts/?format=json`

To migrate to Strapi:
1. Update your Remix app to use: `http://localhost:1337/api/fonts/active-fonts`
2. The response format matches your existing structure
3. Update asset URLs to point to Strapi media files

### API Response Format
The custom endpoints return data in the same format as your current API:
```json
{
  "id": "1",
  "name": "Roboto",
  "slug": "roboto",
  "icon_url": "/uploads/roboto_icon.png",
  "foundary": {
    "id": "1",
    "name": "Google Fonts"
  },
  "category": "Sans-Serif",
  "price": "free",
  "download_link": "https://fonts.google.com/specimen/Roboto",
  "assets": [...]
}
```

## Environment Configuration

### Database
- Default: SQLite (development)
- Production: Configure in `config/database.js`

### CORS
- Configured for localhost:3000 and fontcert.com
- Update in `config/api.js` as needed

### Media Storage
- Local file system by default
- Configure cloud storage for production

## Next Steps

1. **Customize Schemas**: Modify content types in the admin panel
2. **Add Fields**: Add any additional fields your app needs
3. **Configure Permissions**: Set up public/private access in Users & Permissions
4. **Deploy**: Deploy to your preferred hosting platform
5. **Update Remix App**: Point your app to the new Strapi endpoints

## Troubleshooting

### Common Issues
- **Port conflicts**: Change port in `config/server.js`
- **Database errors**: Delete `.tmp` folder and restart
- **Media uploads**: Check file permissions and storage configuration

### Support
- Strapi Documentation: https://docs.strapi.io/
- Community Forum: https://forum.strapi.io/
