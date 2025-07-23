<template>
  <div class="city-map-container">
    <div class="header">
      <h1>{{ capitalizedCity }} - Home Services Map</h1>
      <p>Explore home service companies within 30km radius</p>
    </div>
    
    <div class="map-wrapper">
      <div id="map" ref="mapContainer" class="map-container"></div>
      
      <!-- Company Info Modal -->
      <div v-if="selectedCompany" class="company-modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal">&times;</button>
          <h3>{{ selectedCompany.name }}</h3>
          <div class="company-details">
            <p><strong>ID:</strong> {{ selectedCompany.id }}</p>
            <p><strong>Service Type:</strong> {{ selectedCompany.serviceType }}</p>
            <p><strong>Production Volume:</strong> {{ selectedCompany.productionVolume }}</p>
            <p><strong>Rating:</strong> {{ selectedCompany.rating }}/5</p>
            <p><strong>Contact:</strong> {{ selectedCompany.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Company } from '../../types/company'
import type { CityCoordinates } from '../../types/city'

// Route parameters
const route = useRoute()
const city = computed(() => (route.params.city as string)?.toLowerCase() || 'berlin')
const capitalizedCity = computed(() => 
  city.value.charAt(0).toUpperCase() + city.value.slice(1)
)

// Runtime config
const config = useRuntimeConfig()

// Reactive state
const mapContainer = ref<HTMLElement>()
const selectedCompany = ref<Company | null>(null)
let map: mapboxgl.Map | null = null

// City coordinates (Berlin as default, can be extended)
const cityCoordinates: CityCoordinates = {
  berlin: [13.4050, 52.5200],
  izmir: [27.1428, 38.4237],
  hamburg: [9.9937, 53.5511],
  cologne: [6.9603, 50.9375],
  frankfurt: [8.6821, 50.1109]
}

// Dummy company data for Izmir (within 30km radius)
const companies: Company[] = [
  {
    id: 'IZ001',
    name: 'Izmir Plumbing Masters',
    serviceType: 'Plumbing',
    productionVolume: '400 jobs/month',
    rating: 4.7,
    contact: '+90 232 1234567',
    coordinates: [27.1500, 38.4300]
  },
  {
    id: 'IZ002',
    name: 'Elektrikçi Izmir',
    serviceType: 'Electrical',
    productionVolume: '650 jobs/month',
    rating: 4.6,
    contact: '+90 232 7654321',
    coordinates: [27.1600, 38.4200]
  },
  {
    id: 'IZ003',
    name: 'TemizEv Izmir',
    serviceType: 'Cleaning',
    productionVolume: '1000 jobs/month',
    rating: 4.4,
    contact: '+90 232 1122334',
    coordinates: [27.1400, 38.4400]
  },
  {
    id: 'IZ004',
    name: 'BahçeBakım Izmir',
    serviceType: 'Landscaping',
    productionVolume: '250 jobs/month',
    rating: 4.5,
    contact: '+90 232 5566778',
    coordinates: [27.1300, 38.4100]
  },
  {
    id: 'IZ005',
    name: 'EvTadilat Izmir',
    serviceType: 'General Repairs',
    productionVolume: '800 jobs/month',
    rating: 4.3,
    contact: '+90 232 9988776',
    coordinates: [27.1700, 38.4500]
  },
  {
    id: 'IZ006',
    name: 'BoyaUsta Izmir',
    serviceType: 'Painting',
    productionVolume: '500 jobs/month',
    rating: 4.2,
    contact: '+90 232 3344556',
    coordinates: [27.1200, 38.4150]
  }
]

// Methods
const initializeMap = () => {
  if (!mapContainer.value) return

  // Get coordinates for the current city
  const coordinates = cityCoordinates[city.value] ?? [0, 0]

// Set Mapbox access token from environment variable
  mapboxgl.accessToken = config.public.mapboxAccessToken

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 10
  })

  map.on('load', () => {
    addCityMarkerAndCircle(coordinates)
    addCompanyMarkers()
  })
}

const addCityMarkerAndCircle = (coordinates: [number, number]) => {
  if (!map) return

  // Add city center marker
  new mapboxgl.Marker({ color: '#FF0000', scale: 1.5 })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${capitalizedCity.value} City Center</h3>`))
    .addTo(map)

  // Add 30km radius circle
  const radius = 30 // km
  
  // Simple circle calculation (for demonstration - in production, use turf.js for accuracy)
  const circle = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'Polygon' as const,
      coordinates: [createCircleCoordinates(coordinates, radius)]
    }
  }

  map.addSource('circle', {
    type: 'geojson',
    data: circle
  })

  map.addLayer({
    id: 'circle-fill',
    type: 'fill',
    source: 'circle',
    paint: {
      'fill-color': '#007cbf',
      'fill-opacity': 0.1
    }
  })

  map.addLayer({
    id: 'circle-stroke',
    type: 'line',
    source: 'circle',
    paint: {
      'line-color': '#007cbf',
      'line-width': 2,
      'line-opacity': 0.8
    }
  })
}

const createCircleCoordinates = (center: [number, number], radiusKm: number): number[][] => {
  const points: number[][] = []
  const steps = 80
  
  for (let i = 0; i < steps; i++) {
    const angle = (i * 360) / steps
    const lat = center[1] + (radiusKm / 111) * Math.cos((angle * Math.PI) / 180)
    const lng = center[0] + (radiusKm / (111 * Math.cos((center[1] * Math.PI) / 180))) * Math.sin((angle * Math.PI) / 180)
    points.push([lng, lat])
  }
  
  // Close the circle
  if (points.length > 0 && points[0]) {
    points.push(points[0])
  }
  return points
}

const addCompanyMarkers = () => {
  if (!map) return

  companies.forEach((company) => {
    // Create custom marker element
    const markerElement = document.createElement('div')
    markerElement.className = 'company-marker'
    markerElement.style.cssText = `
      width: 30px;
      height: 30px;
      background-color: #00AA00;
      border: 2px solid #ffffff;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 12px;
    `
    markerElement.textContent = company.serviceType.charAt(0)

    // Add click event to marker
    markerElement.addEventListener('click', () => {
      selectedCompany.value = company
    })

    // Create and add marker
    new mapboxgl.Marker({ element: markerElement })
      .setLngLat(company.coordinates)
      .addTo(map!)
  })
}

const closeModal = () => {
  selectedCompany.value = null
}

// Initialize map on component mount
const initMap = () => {
  if (typeof window !== 'undefined' && mapContainer.value) {
    initializeMap()
  }
}

// Call init on next tick to ensure DOM is ready
setTimeout(initMap, 100)
</script>

<style scoped>
.city-map-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.map-wrapper {
  position: relative;
  height: calc(100vh - 140px);
  padding: 1rem;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Company Modal Styles */
.company-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 2rem;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  min-width: 300px;
  max-width: 500px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.modal-content h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.5rem;
  padding-right: 2rem;
}

.company-details p {
  margin: 0.75rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

.company-details strong {
  color: #555;
  display: inline-block;
  min-width: 140px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
  
  .map-wrapper {
    padding: 0.5rem;
    height: calc(100vh - 120px);
  }
  
  .company-modal {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  
  .modal-content {
    margin: 0;
    min-width: auto;
    max-width: calc(100vw - 2rem);
  }
}

/* Loading state */
.map-container:empty::before {
  content: 'Loading map...';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: #666;
}
</style>
