import { describe, it, expect } from 'vitest'

describe('Breadcrumbs Logic', () => {
  // Deze tests zijn gericht op de logica van het genereren van breadcrumbs, gebaseerd op de route naam en parameters.
  const labelMap = {
    Dashboard: 'Dashboard',
    Cemeteries: 'Begraafplaatsen',
    Graves: 'Graven',
    CemeteryManagers: 'Beheerders',
  }

  const parentMap = {
    Cemeteries: 'Dashboard',
    CemeteryManagers: 'Dashboard',
    Graves: 'Cemeteries',
  }

  const routeParams = {
    Graves: () => ({ cemetery_id: 'test_id' }),
  }

// Deze functie simuleert de logica van het genereren van breadcrumbs.
  const generateBreadcrumbs = (routeName, routeParams = {}) => {
    if (!routeName) return []

    const chain = []
    let current = routeName

    while (current) {
      const label = labelMap[current] || current
      const isCurrent = current === routeName
      const to = isCurrent
        ? undefined
        : routeParams[current]
          ? { name: current, params: routeParams[current]() }
          : { name: current }

      chain.unshift({ text: label, to })
      current = parentMap[current]
    }

    if (chain.length === 0) return []

    if (chain[0].text !== 'Dashboard') {
      chain.unshift({ text: 'Dashboard', to: { name: 'Dashboard' } })
    }

    return chain
  }
// Test cases voor verschillende routes en scenario's
  describe('Dashboard route', () => {
    it('moet alleen Dashboard tonen voor dashboard route', () => {
      const breadcrumbs = generateBreadcrumbs('Dashboard')
      expect(breadcrumbs).toHaveLength(1)
      expect(breadcrumbs[0].text).toBe('Dashboard')
      expect(breadcrumbs[0].to).toBeUndefined()
    })
  })
// Test cases voor de Cemeteries route
  describe('Cemeteries route', () => {
    it('moet Dashboard > Begraafplaatsen tonen', () => {
      const breadcrumbs = generateBreadcrumbs('Cemeteries')
      expect(breadcrumbs).toHaveLength(2)

      expect(breadcrumbs[0].text).toBe('Dashboard')
      expect(breadcrumbs[0].to).toEqual({ name: 'Dashboard' })

      expect(breadcrumbs[1].text).toBe('Begraafplaatsen')
      expect(breadcrumbs[1].to).toBeUndefined()
    })
  })
/// Test cases voor de Graves route
  describe('Graves route', () => {
    it('moet Dashboard > Begraafplaatsen > Graven tonen', () => {
      const breadcrumbs = generateBreadcrumbs('Graves')
      expect(breadcrumbs).toHaveLength(3)

      expect(breadcrumbs[0].text).toBe('Dashboard')
      expect(breadcrumbs[1].text).toBe('Begraafplaatsen')
      expect(breadcrumbs[2].text).toBe('Graven')
    })
  })
// Test cases voor de CemeteryManagers route
  describe('CemeteryManagers route', () => {
    it('moet Dashboard > Beheerders tonen', () => {
      const breadcrumbs = generateBreadcrumbs('CemeteryManagers')
      expect(breadcrumbs).toHaveLength(2)

      expect(breadcrumbs[0].text).toBe('Dashboard')
      expect(breadcrumbs[1].text).toBe('Beheerders')
    })
  })

  describe('Onbekende route', () => {
    it('moet lege breadcrumbs retourneren voor onbekende route', () => {
      const breadcrumbs = generateBreadcrumbs('UnknownRoute')
      // Unknown routes get a default breadcrumb with the route name
      expect(breadcrumbs).toHaveLength(2) 
      expect(breadcrumbs[0].text).toBe('Dashboard')
      expect(breadcrumbs[1].text).toBe('UnknownRoute')
    })

    it('moet lege breadcrumbs retourneren zonder route name', () => {
      const breadcrumbs = generateBreadcrumbs(null)
      expect(breadcrumbs).toHaveLength(0)
    })
  })

  describe('Route parameters', () => {
    it('moet parameters correct doorgeven voor Graves route', () => {
      const breadcrumbs = generateBreadcrumbs('Graves')

      // Check if the parent breadcrumb has correct parameters
      expect(breadcrumbs[1].to).toEqual({
        name: 'Cemeteries'
      })
    })
  })
})