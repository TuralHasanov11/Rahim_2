# Copilot Processing - City Map Web App

## User Request
Create a page where we will grab the city from a URL parameter and generate a simple map in Mapbox. It will have a main pin which points the city itself with a circle (30 km radius) and other pins inside the circle will point some locations. Each pin represents a company in home services industry that has name, Id, and production volume fields. When clicking upon each one, display information about the company. Show the map for Berlin with some dummy companies.

## Action Plan

### Phase 1: Project Setup and Dependencies
- Install required dependencies (Mapbox GL JS)
- Configure environment variables for Mapbox token

### Phase 2: City Map Component Development
- Create dynamic city page with URL parameter
- Implement Mapbox map initialization
- Add city center pin with 30km radius circle
- Create dummy company data for Berlin

### Phase 3: Pin Implementation and Interactivity
- Add company pins to the map
- Implement click handlers for pin information display
- Create company information popup/modal

### Phase 4: Styling and Responsive Design
- Style the map container and components
- Ensure mobile responsiveness
- Add proper TypeScript types

## Task Status Tracking

### Phase 1: Project Setup and Dependencies ✅
- [x] Install Mapbox GL JS dependency
- [x] Set up environment variables for Mapbox token
- [x] Update Nuxt configuration with runtime config

### Phase 2: City Map Component Development ✅
- [x] Create pages/[city].vue dynamic route
- [x] Implement Mapbox map initialization
- [x] Add city coordinates lookup
- [x] Add main city pin
- [x] Draw 30km radius circle around city

### Phase 3: Pin Implementation and Interactivity ✅
- [x] Create dummy company data structure
- [x] Add company pins to map
- [x] Implement pin click handlers
- [x] Create company information display component

### Phase 4: Styling and Responsive Design ✅
- [x] Style map container and layout
- [x] Add responsive design considerations
- [x] Implement proper TypeScript interfaces
- [x] Create home page with city selection
- [x] Update app.vue to show pages instead of welcome

## Implementation Complete! 🎉

The city map web app has been successfully created with all requested features:

1. **Dynamic Route**: `/[city]` accepts city name as URL parameter
2. **Mapbox Integration**: Interactive map with proper styling
3. **City Center Pin**: Red marker for the city center
4. **30km Radius Circle**: Blue circle showing the coverage area
5. **Company Pins**: Green circular markers with service type initials
6. **Company Data**: Dummy home service companies with all required fields
7. **Interactive Popups**: Click any company pin to see detailed information
8. **Home Page**: City selection interface at root URL

## Next Steps Required:

1. **Get Mapbox Access Token**: 
   - Sign up at https://mapbox.com
   - Get your access token from the account dashboard
   - Replace `your_mapbox_access_token_here` in `.env` file

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Test the Application**:
   - Visit the home page to select a city
   - Try `/berlin` to see the Berlin map with dummy companies
   - Click on any green company pin to see company details

## Current Features:
- Berlin map with 6 dummy home service companies
- Responsive design for mobile and desktop
- Company modal with detailed information
- Support for multiple cities (Berlin, Munich, Hamburg, Cologne, Frankfurt)
- Professional styling with gradients and animations
