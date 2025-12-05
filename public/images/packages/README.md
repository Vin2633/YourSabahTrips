# Package Images

This folder contains all package tour images used in the YourSabahTrips application.

## Directory Structure

```
public/images/packages/
├── maldives_island.jpg
├── peru_trek.jpg
├── tokyo_food.jpg
├── kinabalu_climb.jpg
└── klias_cruise.jpg
```

## How to Add Images

1. Add your `.jpg` or `.png` image files to this folder
2. The files will be automatically served by Vite dev server during development
3. In production, they'll be served from the `dist/` folder

## Example Image Naming

- `maldives_island.jpg` - For Tropical Island Retreat
- `peru_trek.jpg` - For Ancient Ruins Trek
- `tokyo_food.jpg` - For City Food Tour
- `kinabalu_climb.jpg` - For Kinabalu Summit Climb
- `klias_cruise.jpg` - For Wildlife River Cruise

## Database Updates

Once you add your images, the database ImageURL field will reference them like:

```
/images/packages/maldives_island.jpg
/images/packages/peru_trek.jpg
etc.
```

The app will automatically serve them from the public folder during both development and production.

## File Size Recommendations

- Optimize images to reduce load time
- Recommended size: 400x300px minimum
- Format: JPG (compressed) or PNG (transparency support)
- File size: < 100KB per image for best performance
