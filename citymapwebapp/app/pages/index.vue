<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>City Home Services Explorer</h1>
      <p>Discover home service companies in major cities with interactive maps</p>
      
      <div class="city-grid">
        <NuxtLink
          v-for="city in cities"
          :key="city.name"
          :to="`/${city.name.toLowerCase()}`"
          class="city-card"
        >
          <div class="city-icon">🏙️</div>
          <h3>{{ city.name }}</h3>
          <p>{{ city.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface City {
  name: string
  description: string
}

const cities = ref<City[]>([
  {
    name: 'Berlin',
    description: 'Explore home services in Germany\'s capital'
  },
  {
    name: 'Izmir',
    description: 'Discover services in Izmir'
  },
  {
    name: 'Hamburg',
    description: 'Find providers in the port city'
  },
  {
    name: 'Cologne',
    description: 'Browse services in the Rhine metropolis'
  },
  {
    name: 'Frankfurt',
    description: 'Search providers in the financial hub'
  }
])
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  color: white;
  max-width: 800px;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-section > p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.city-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.city-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.city-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.city-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.city-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.city-card p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .city-grid {
    grid-template-columns: 1fr;
  }
}
</style>
