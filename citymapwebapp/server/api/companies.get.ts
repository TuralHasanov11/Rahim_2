import type { Company } from '../../types/company'

// Dummy data for Izmir (same as in [city].vue)
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

export default defineEventHandler(() => {
  return companies
})
