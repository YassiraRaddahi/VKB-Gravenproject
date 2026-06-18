
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

import SettingsGraveView from '../views/SettingsGraveView.vue'
import { useUserStore } from '../stores/userStore'

vi.mock('axios')

vi.mock('../stores/userStore', () => ({
  useUserStore: vi.fn()
}))

describe('SettingsGraveView.vue', () => {
  const mockData = {
    'dubbel graf': { width: 200, length: 250 },
    'enkel graf': { width: 100, length: 200 },
    kindergraf: { width: 80, length: 150 },
    keldergraf: { width: 220, length: 260 },
    urnengraf: { width: 0, length: 0 }
  }

  const hasPermissionMock = vi.fn()

  function createWrapper() {
    return mount(SettingsGraveView, {
      global: {
        stubs: {
          TitleUnderline: true,

          FormCard: {
            template: '<div><slot /></div>'
          },

          AppButton: {
            emits: ['click'],
            template: `
              <button @click="$emit('click')">
                <slot />
              </button>
            `
          },

          AppInput: {
            props: ['modelValue'],
            emits: ['update:modelValue'],
            template: `
              <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
              />
            `
          },

          'v-container': {
            template: '<div><slot /></div>'
          },

          'v-row': {
            template: '<div><slot /></div>'
          },

          'v-col': {
            template: '<div><slot /></div>'
          },

          'v-card-text': {
            template: '<div><slot /></div>'
          },

          'v-card-actions': {
            template: '<div><slot /></div>'
          },

          'v-spacer': {
            template: '<div />'
          }
        }
      }
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()

    hasPermissionMock.mockReturnValue(true)

    useUserStore.mockReturnValue({
      hasPermission: hasPermissionMock
    })

    axios.get.mockResolvedValue({
      data: mockData
    })

    axios.put.mockResolvedValue({})
  })

  it('laadt instellingen bij mount', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    expect(axios.get).toHaveBeenCalledTimes(1)

    expect(wrapper.vm.form).toEqual(mockData)
  })

  it('vraagt de juiste permissie op', async () => {
    createWrapper()

    await flushPromises()

    expect(hasPermissionMock).toHaveBeenCalledWith(
      'admin.edit_grave_settings'
    )
  })

  it('toont alle grafsoorten', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    expect(wrapper.text()).toContain('Dubbel graf')
    expect(wrapper.text()).toContain('Enkel graf')
    expect(wrapper.text()).toContain('Kindergraf')
    expect(wrapper.text()).toContain('Keldergraf')
    expect(wrapper.text()).toContain('Urnengraf')
  })

  it('toont de Wijzig knop als gebruiker rechten heeft', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    expect(wrapper.text()).toContain('Wijzig')
  })

  it('zet editMode aan', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    expect(wrapper.vm.editMode).toBe(false)

    wrapper.vm.toggleEdit()

    expect(wrapper.vm.editMode).toBe(true)
  })

  it('annuleert wijzigingen en herstelt originele waarden', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    wrapper.vm.toggleEdit()

    wrapper.vm.form['dubbel graf'].width = 999

    wrapper.vm.toggleEdit()

    expect(wrapper.vm.editMode).toBe(false)

    expect(
      wrapper.vm.form['dubbel graf'].width
    ).toBe(200)
  })

  it('slaat instellingen op', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    wrapper.vm.editMode = true

    await wrapper.vm.saveSettings()

    expect(axios.put).toHaveBeenCalledTimes(1)

    expect(axios.put).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/settings/grave`,
      mockData
    )

    expect(wrapper.vm.editMode).toBe(false)
  })

  it('handelt fouten af tijdens opslaan', async () => {
    const wrapper = createWrapper()

    await flushPromises()

    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    axios.put.mockRejectedValueOnce(
      new Error('Opslaan mislukt')
    )

    await wrapper.vm.saveSettings()

    expect(consoleSpy).toHaveBeenCalledWith(
      'Fout bij opslaan:',
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  it('toont geen Wijzig knop zonder rechten', async () => {
    hasPermissionMock.mockReturnValue(false)

    const wrapper = createWrapper()

    await flushPromises()

    expect(wrapper.text()).not.toContain('Wijzig')
  })
})
