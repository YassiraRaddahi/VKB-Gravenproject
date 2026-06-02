import { describe, it, expect, beforeEach } from 'vitest'
import { ref, computed } from 'vue'

// Test constants
const TEST_CEMETERIES = {
  KRANENBURG: {
    id: 1,
    name: 'Kerkhof Kranenburg',
    city: 'Zwolle'
  },
  MEPPELERSTRAATWEG: {
    id: 2,
    name: 'Kerkhof Meppelerstraatweg',
    city: 'Zwolle'
  },
  NIEUWLEUSEN: {
    id: 12,
    name: 'Kerkhof Nieuwleusen',
    city: 'Nieuwleusen'
  },
  TEST: {
    id: 13,
    name: 'Kerkhof Test',
    city: 'Amsterdam'
  }
}

const TEST_MANAGERS = {
  BEA_BAKKER: { id: 2, first_names: 'Bea', last_name: 'Bakker' },
  LIZA_PETRUSHENKO: { id: 3, first_names: 'Liza', last_name: 'Petrushenko' },
  TOM_VAN_DER_MEER: { id: 15, first_names: 'Tom', last_name: 'van der Meer' }
}

const TEST_CITIES = {
  ZWOLLE: 'Zwolle',
  NIEUWLEUSEN: 'Nieuwleusen',
  AMSTERDAM: 'Amsterdam',
  ROTTERDAM: 'Rotterdam'
}

const TEST_STRINGS = {
  KERKHOF: 'Kerkhof',
  KRANENBURG: 'Kranenburg',
  STRAATWEG: 'straatweg',
  NIEUWLEUSEN_UPPER: 'NIEUWLEUSEN',
  NON_EXISTENT_NAME: 'NietBestaandeNaam',
  ROTTERDAM: 'Rotterdam',
  TEST_MANAGER: 'Test Manager'
}

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
        ...TEST_CEMETERIES.KRANENBURG,
        cemetery_managers: [
          TEST_MANAGERS.BEA_BAKKER,
          TEST_MANAGERS.LIZA_PETRUSHENKO
        ]
      },
      {
        ...TEST_CEMETERIES.MEPPELERSTRAATWEG,
        cemetery_managers: [
          TEST_MANAGERS.TOM_VAN_DER_MEER
        ]
      },
      {
        ...TEST_CEMETERIES.NIEUWLEUSEN,
        cemetery_managers: [
          TEST_MANAGERS.LIZA_PETRUSHENKO
        ]
      },
      {
        ...TEST_CEMETERIES.TEST,
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
      search.value = TEST_STRINGS.KRANENBURG
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe(TEST_CEMETERIES.KRANENBURG.name)
    })

    it('moet correct filteren op deel van naam', () => {
      search.value = TEST_STRINGS.STRAATWEG
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe(TEST_CEMETERIES.MEPPELERSTRAATWEG.name)
    })

    it('moet hoofdletter ongevoelig filteren', () => {
      search.value = TEST_STRINGS.NIEUWLEUSEN_UPPER
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe(TEST_CEMETERIES.NIEUWLEUSEN.name)
    })

    it('moet meerdere resultaten tonen bij meerdere matches', () => {
      search.value = TEST_STRINGS.KERKHOF
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(4)
      expect(filtered.value.every(c => c.name.includes(TEST_STRINGS.KERKHOF))).toBe(true)
    })

    it('moet lege resultaten tonen bij geen matches', () => {
      search.value = TEST_STRINGS.NON_EXISTENT_NAME
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })
  })

  describe('Beheerder filter', () => {
    it('moet correct filteren op beheerder ID', () => {
      managerFilter.value = TEST_MANAGERS.LIZA_PETRUSHENKO.id
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery =>
        cemetery.cemetery_managers.some(manager => manager.id === TEST_MANAGERS.LIZA_PETRUSHENKO.id)
      )).toBe(true)
    })

    it('moet lege resultaten tonen voor beheerder zonder kerkhoven', () => {
      managerFilter.value = 999 // Niet-bestaande beheerder
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })

    it('moet kerkhof zonder beheerder uitsluiten', () => {
      managerFilter.value = TEST_MANAGERS.BEA_BAKKER.id
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(TEST_CEMETERIES.KRANENBURG.id)
    })
  })

  describe('Plaats filter', () => {
    it('moet correct filteren op plaatsnaam', () => {
      cityFilter.value = TEST_CITIES.ZWOLLE
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery => cemetery.city === TEST_CITIES.ZWOLLE)).toBe(true)
    })

    it('moet correct filteren op unieke plaats', () => {
      cityFilter.value = TEST_CITIES.NIEUWLEUSEN
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].city).toBe(TEST_CITIES.NIEUWLEUSEN)
    })

    it('moet lege resultaten tonen voor niet-bestaande plaats', () => {
      cityFilter.value = TEST_CITIES.ROTTERDAM
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(0)
    })
  })

  describe('Gecombineerde filters', () => {
    it('moet zoeken EN beheerder filter combineren', () => {
      search.value = TEST_STRINGS.KERKHOF
      managerFilter.value = TEST_MANAGERS.LIZA_PETRUSHENKO.id
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(2)
      expect(filtered.value.every(cemetery =>
        cemetery.name.includes(TEST_STRINGS.KERKHOF) &&
        cemetery.cemetery_managers.some(manager => manager.id === TEST_MANAGERS.LIZA_PETRUSHENKO.id)
      )).toBe(true)
    })

    it('moet zoeken EN plaats filter combineren', () => {
      search.value = TEST_CITIES.NIEUWLEUSEN
      cityFilter.value = TEST_CITIES.NIEUWLEUSEN
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].name).toBe(TEST_CEMETERIES.NIEUWLEUSEN.name)
      expect(filtered.value[0].city).toBe(TEST_CITIES.NIEUWLEUSEN)
    })

    it('moet beheerder EN plaats filter combineren', () => {
      managerFilter.value = TEST_MANAGERS.LIZA_PETRUSHENKO.id
      cityFilter.value = TEST_CITIES.ZWOLLE
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(TEST_CEMETERIES.KRANENBURG.id)
    })

    it('moet alle drie filters combineren', () => {
      search.value = TEST_STRINGS.KERKHOF
      managerFilter.value = TEST_MANAGERS.LIZA_PETRUSHENKO.id
      cityFilter.value = TEST_CITIES.NIEUWLEUSEN
      const filtered = createFilteredCemeteries()

      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].id).toBe(TEST_CEMETERIES.NIEUWLEUSEN.id)
    })

    it('moet lege resultaten tonen bij conflicterende filters', () => {
      managerFilter.value = TEST_MANAGERS.LIZA_PETRUSHENKO.id
      cityFilter.value = TEST_CITIES.AMSTERDAM
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
              const label = `${manager.first_names} ${manager.last_name}`.trim()
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
      expect(managerNames).toContain(`${TEST_MANAGERS.BEA_BAKKER.first_names} ${TEST_MANAGERS.BEA_BAKKER.last_name}`)
      expect(managerNames).toContain(`${TEST_MANAGERS.LIZA_PETRUSHENKO.first_names} ${TEST_MANAGERS.LIZA_PETRUSHENKO.last_name}`)
      expect(managerNames).toContain(`${TEST_MANAGERS.TOM_VAN_DER_MEER.first_names} ${TEST_MANAGERS.TOM_VAN_DER_MEER.last_name}`)
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
      expect(options[0].title).toBe(TEST_CITIES.AMSTERDAM)
      expect(options[1].title).toBe(TEST_CITIES.NIEUWLEUSEN)
      expect(options[2].title).toBe(TEST_CITIES.ZWOLLE)
    })

    it('moet beheerder opties uitsluiten voor kerkhoven zonder beheerder', () => {
      const managerOptions = computed(() => {
        const managers = new Map()
        mockCemeteries.forEach(cemetery => {
          if (cemetery.cemetery_managers && cemetery.cemetery_managers.length > 0) {
            cemetery.cemetery_managers.forEach(manager => {
              const key = manager.id
              const label = `${manager.first_names} ${manager.last_name}`.trim()
              if (!managers.has(key)) {
                managers.set(key, { title: label, value: key })
              }
            })
          }
        })
        return Array.from(managers.values())
      })

      const options = managerOptions.value

      // Kerkhof Test (id: 13) heeft geen beheerder, dus geen nieuwe opties
      expect(options.some(opt => opt.title === TEST_STRINGS.TEST_MANAGER)).toBe(false)
    })
  })
})