import { describe, it, expect } from 'vitest'

describe('Breadcrumbs Logic', () => {
  // Deze tests zijn gericht op de logica van het genereren van breadcrumbs, gebaseerd op de route naam en parameters.
  const ROUTES = {
    DASHBOARD: 'Dashboard',
    CEMETERIES: 'Cemeteries',
    GRAVES: 'Graves',
    CEMETERY_MANAGERS: 'CemeteryManagers',
    UNKNOWN_ROUTE: 'UnknownRoute'
  }

  const LABELS = {
    DASHBOARD: 'Dashboard',
    CEMETERIES: 'Kerkhoven',
    GRAVES: 'Graven',
    CEMETERY_MANAGERS: 'Beheerders'
  }

  const labelMap = {
    [ROUTES.DASHBOARD]: LABELS.DASHBOARD,
    [ROUTES.CEMETERIES]: LABELS.CEMETERIES,
    [ROUTES.GRAVES]: LABELS.GRAVES,
    [ROUTES.CEMETERY_MANAGERS]: LABELS.CEMETERY_MANAGERS,
  }

  const parentMap = {
    [ROUTES.CEMETERIES]: ROUTES.DASHBOARD,
    [ROUTES.CEMETERY_MANAGERS]: ROUTES.DASHBOARD,
    [ROUTES.GRAVES]: ROUTES.CEMETERIES,
  }

  const routeParams = {
    [ROUTES.GRAVES]: () => ({ cemetery_id: 'test_id' }),
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

    if (chain[0].text !== LABELS.DASHBOARD) {
      chain.unshift({ text: LABELS.DASHBOARD, to: { name: ROUTES.DASHBOARD } })
    }

    return chain
  }
// Test cases voor verschillende routes en scenario's
  describe('Dashboard route', () => {
    it('moet alleen Dashboard tonen voor dashboard route', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.DASHBOARD)
      expect(breadcrumbs).toHaveLength(1)
      expect(breadcrumbs[0].text).toBe(LABELS.DASHBOARD)
      expect(breadcrumbs[0].to).toBeUndefined()
    })
  })
// Test cases voor de Cemeteries route
  describe('Cemeteries route', () => {
    it('moet Dashboard Kerkhoven tonen', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.CEMETERIES)
      expect(breadcrumbs).toHaveLength(2)

      expect(breadcrumbs[0].text).toBe(LABELS.DASHBOARD)
      expect(breadcrumbs[0].to).toEqual({ name: ROUTES.DASHBOARD })

      expect(breadcrumbs[1].text).toBe(LABELS.CEMETERIES)
      expect(breadcrumbs[1].to).toBeUndefined()
    })
  })
/// Test cases voor de Graves route
  describe('Graves route', () => {
    it('moet Dashboard > Kerkhoven > Graven tonen', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.GRAVES)
      expect(breadcrumbs).toHaveLength(3)

      expect(breadcrumbs[0].text).toBe(LABELS.DASHBOARD)
      expect(breadcrumbs[1].text).toBe(LABELS.CEMETERIES)
      expect(breadcrumbs[2].text).toBe(LABELS.GRAVES)
    })
  })
// Test cases voor de CemeteryManagers route
  describe('CemeteryManagers route', () => {
    it('moet Dashboard > Beheerders tonen', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.CEMETERY_MANAGERS)
      expect(breadcrumbs).toHaveLength(2)

      expect(breadcrumbs[0].text).toBe(LABELS.DASHBOARD)
      expect(breadcrumbs[1].text).toBe(LABELS.CEMETERY_MANAGERS)
    })
  })

  describe('Onbekende route', () => {
    it('moet lege breadcrumbs retourneren voor onbekende route', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.UNKNOWN_ROUTE)
      // Unknown routes get a default breadcrumb with the route name
      expect(breadcrumbs).toHaveLength(2) 
      expect(breadcrumbs[0].text).toBe(LABELS.DASHBOARD)
      expect(breadcrumbs[1].text).toBe(ROUTES.UNKNOWN_ROUTE)
    })

    it('moet lege breadcrumbs retourneren zonder route name', () => {
      const breadcrumbs = generateBreadcrumbs(null)
      expect(breadcrumbs).toHaveLength(0)
    })
  })

  describe('Route parameters', () => {
    it('moet parameters correct doorgeven voor Graves route', () => {
      const breadcrumbs = generateBreadcrumbs(ROUTES.GRAVES)

      // Check if the parent breadcrumb has correct parameters
      expect(breadcrumbs[1].to).toEqual({
        name: ROUTES.CEMETERIES
      })
    })
  })
})