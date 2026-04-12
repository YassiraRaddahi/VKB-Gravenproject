import { describe, it, expect, beforeEach } from 'vitest'
import { ref, computed } from 'vue'

// Test utilities voor filter logica
describe('Filter logica', () => {
  let mockCemeteries
  let search
  let managerFilter
  let cityFilter

  beforeEach(() => {
    // Mock data
    mockCemeteries = [
      {
        id: 1,
        name: 'Begraafplaats Kranenburg',
        city: 'Zwolle',
        cemetery_managers: [
          { id: 2, first_name: 'Bea', last_name: 'Bakker' },
          { id: 3, first_name: 'Liza', last_name: 'Petrushenko' }
        ]
      },
      {
        id: 2,
        name: 'Begraafplaats Meppelerstraatweg',
        city: 'Zwolle',
        cemetery_managers: [
          { id: 15, first_name: 'Tom', last_name: 'van der Meer' }
        ]
      },
      {
        id: 12,
        name: 'Begraafplaats Nieuwleusen',
        city: 'Nieuwleusen',
        cemetery_managers: [
          { id: 3, first_name: 'Liza', last_name: 'Petrushenko' }
        ]
      },
      {
        id: 13,
        name: 'Begraafplaats Test',
        city: 'Amsterdam',
        cemetery_managers: [] // Geen beheerder
      }
    ]

    // Reactive refs
    search = ref('')
    managerFilter = ref(null)
    cityFilter = ref(null)
  })

  // Helper functie om filteredCemeteries computed te simuleren
  const createFilteredCemeteries = () => {
    return computed(() => {
      let result = mockCemeteries

      // Filter op naam
      const query = search.value.toLowerCase().trim()
      if (query) {
        result = result.filter(c => c.name.toLowerCase().includes(query))
      }

      // Filter op beheerder
      if (managerFilter.value) {
        result = result.filter(cemetery =>
          cemetery.cemetery_managers &&
          cemetery.cemetery_managers.length > 0 &&
          cemetery.cemetery_managers.some(manager => manager.id === managerFilter.value)
        )
      }

      // Filter op plaats
      if (cityFilter.value) {
        result = result.filter(cemetery => cemetery.city === cityFilter.value)
      }

      return result
    })
  }

  describe('Zoek filter', () => {
    it('moet correct filteren op exacte naam match', () => {
      search.value = 'Kranenburg'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe('Begraafplaats Kranenburg')
    })

    it('moet correct filteren op deel van naam', () => {
      search.value = 'straatweg'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe('Begraafplaats Meppelerstraatweg')
    })

    it('moet hoofdletter ongevoelig filteren', () => {
      search.value = 'NIEUWLEUSEN'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe('Begraafplaats Nieuwleusen')
    })

    it('moet meerdere resultaten tonen bij meerdere matches', () => {
      search.value = 'Begraafplaats'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(4)
      expect(filtered.value.every(c => c.name.includes('Begraafplaats'))).toBe(true)
    })

    it('moet lege resultaten tonen bij geen matches', () => {
      search.value = 'NietBestaandeNaam'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })
  })

  describe('Beheerder filter', () => {
    it('moet correct filteren op beheerder ID', () => {
      managerFilter.value = 3 // Liza Petrushenko
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery =>
        cemetery.cemetery_managers.some(manager => manager.id === 3)
      )).toBe(true)
    })

    it('moet lege resultaten tonen voor beheerder zonder begraafplaatsen', () => {
      managerFilter.value = 999 // Niet-bestaande beheerder
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })

    it('moet begraafplaats zonder beheerder uitsluiten', () => {
      managerFilter.value = 2 // Bea Bakker
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(1) // Alleen Kranenburg heeft Bea Bakker
    })
  })

  describe('Plaats filter', () => {
    it('moet correct filteren op plaatsnaam', () => {
      cityFilter.value = 'Zwolle'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery => cemetery.city === 'Zwolle')).toBe(true)
    })

    it('moet correct filteren op unieke plaats', () => {
      cityFilter.value = 'Nieuwleusen'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].city).toBe('Nieuwleusen')
    })

    it('moet lege resultaten tonen voor niet-bestaande plaats', () => {
      cityFilter.value = 'Rotterdam'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })
  })

  describe('Gecombineerde filters', () => {
    it('moet zoeken EN beheerder filter combineren', () => {
      search.value = 'Begraafplaats'
      managerFilter.value = 3 // Liza Petrushenko
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery =>
        cemetery.name.includes('Begraafplaats') &&
        cemetery.cemetery_managers.some(manager => manager.id === 3)
      )).toBe(true)
    })

    it('moet zoeken EN plaats filter combineren', () => {
      search.value = 'Nieuwleusen'
      cityFilter.value = 'Nieuwleusen'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe('Begraafplaats Nieuwleusen')
      expect(filtered.value[0].city).toBe('Nieuwleusen')
    })

    it('moet beheerder EN plaats filter combineren', () => {
      managerFilter.value = 3 // Liza Petrushenko
      cityFilter.value = 'Zwolle'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(1) // Alleen Kranenburg heeft Liza EN is in Zwolle
    })

    it('moet alle drie filters combineren', () => {
      search.value = 'Begraafplaats'
      managerFilter.value = 3 // Liza Petrushenko
      cityFilter.value = 'Nieuwleusen'
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(12)
    })

    it('moet lege resultaten tonen bij conflicterende filters', () => {
      managerFilter.value = 3 // Liza Petrushenko
      cityFilter.value = 'Amsterdam' // Liza heeft geen begraafplaats in Amsterdam
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })
  })

  describe('Filter opties genereren', () => {
    it('moet unieke beheerder opties genereren', () => {
      const managerOptions = computed(() => {
        const managers = new Map()
        mockCemeteries.forEach(cemetery => {
          if (cemetery.cemetery_managers && cemetery.cemetery_managers.length > 0) {
            cemetery.cemetery_managers.forEach(manager => {
              const key = manager.id
              const label = `${manager.first_name} ${manager.last_name}`.trim()
              if (!managers.has(key)) {
                managers.set(key, { title: label, value: key })
              }
            })
          }
        })
        return Array.from(managers.values())
      })

      const options = managerOptions.value
      expect(options).toHaveLength(3) // Bea Bakker, Liza Petrushenko, Tom van der Meer

      // Check of alle unieke beheerders aanwezig zijn
      const managerNames = options.map(opt => opt.title)
      expect(managerNames).toContain('Bea Bakker')
      expect(managerNames).toContain('Liza Petrushenko')
      expect(managerNames).toContain('Tom van der Meer')
    })

    it('moet unieke plaats opties genereren (gesorteerd)', () => {
      const cityOptions = computed(() => {
        const cities = new Set()
        mockCemeteries.forEach(cemetery => {
          if (cemetery.city && cemetery.city.trim()) {
            cities.add(cemetery.city.trim())
          }
        })
        return Array.from(cities)
          .sort()
          .map(city => ({ title: city, value: city }))
      })

      const options = cityOptions.value
      expect(options).toHaveLength(3) // Amsterdam, Nieuwleusen, Zwolle

      // Check alfabetische sortering
      expect(options[0].title).toBe('Amsterdam')
      expect(options[1].title).toBe('Nieuwleusen')
      expect(options[2].title).toBe('Zwolle')
    })

    it('moet beheerder opties uitsluiten voor begraafplaatsen zonder beheerder', () => {
      const managerOptions = computed(() => {
        const managers = new Map()
        mockCemeteries.forEach(cemetery => {
          if (cemetery.cemetery_managers && cemetery.cemetery_managers.length > 0) {
            cemetery.cemetery_managers.forEach(manager => {
              const key = manager.id
              const label = `${manager.first_name} ${manager.last_name}`.trim()
              if (!managers.has(key)) {
                managers.set(key, { title: label, value: key })
              }
            })
          }
        })
        return Array.from(managers.values())
      })

      const options = managerOptions.value

      // Begraafplaats Test (id: 13) heeft geen beheerder, dus geen nieuwe opties
      expect(options.some(opt => opt.title === 'Test Manager')).toBe(false)
    })
  })
})