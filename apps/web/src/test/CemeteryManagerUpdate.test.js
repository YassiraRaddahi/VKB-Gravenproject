import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CemeteryManagerView from '@/views/managers/CemeteryManagerView.vue'
import axios from 'axios'
import { ref } from 'vue'

vi.mock('axios')

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { manager_id: '1' },
    fullPath: '/cemetery-managers/1'
  }),
  useRouter: () => ({
    push: mockPush
  })
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({
    mdAndUp: ref(true),
    smAndUp: ref(true)
  })
}))

describe('CemeteryManagerView', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockImplementation((url) => {
      if (url.includes('/cemetery-managers/1')) {
        return Promise.resolve({
          data: {
            cemetery_manager: {
              id: 1,
              first_names: 'Jan',
              infix: 'de',
              last_name: 'Vries',
              email: 'jan@test.nl',
              phone_number: '0612345678',
              position: 'Beheerder',
              profile_picture_url: 'foto.jpg'
            }
          }
        })
      }

      return Promise.resolve({
        data: {
          cemeteries: []
        }
      })
    })

    axios.put.mockResolvedValue({ data: {} })
  })

  it('loads manager data', async () => {
    const wrapper = mount(CemeteryManagerView)

    await flushPromises()

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/cemetery-managers/1')
    )

    expect(wrapper.vm.cemeteryManager.first_names).toBe('Jan')
    expect(wrapper.vm.cemeteryManager.infix).toBe('de')
    expect(wrapper.vm.cemeteryManager.last_name).toBe('Vries')
  })

  it('switches to edit mode', async () => {
    const wrapper = mount(CemeteryManagerView)

    await flushPromises()

    const editButton = wrapper.findAll('button').find(button =>
      button.text().includes('Wijzig')
    )

    expect(editButton).toBeTruthy()

    await editButton.trigger('click')

    expect(wrapper.text()).toContain('Opslaan')
  })

  it('saves manager changes', async () => {
    const wrapper = mount(CemeteryManagerView)

    await flushPromises()

    const editButton = wrapper.findAll('button').find(button =>
      button.text().includes('Wijzig')
    )

    await editButton.trigger('click')

    wrapper.vm.editManager.first_names = 'Piet'
    wrapper.vm.editManager.last_name = 'Jansen'

    const saveButton = wrapper.findAll('button').find(button =>
      button.text().includes('Opslaan')
    )

    await saveButton.trigger('click')
    await flushPromises()

    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining('/cemetery-managers/1'),
      expect.objectContaining({
        first_names: 'Piet',
        last_name: 'Jansen'
      })
    )
  })

  it('navigates to linked cemeteries', async () => {
    const wrapper = mount(CemeteryManagerView)

    await flushPromises()

    const button = wrapper.findAll('button').find(button =>
      button.text().includes('Naar gekoppelde kerkhoven')
    )

    await button.trigger('click')

    expect(mockPush).toHaveBeenCalledWith({
      name: 'CemeteriesOfManager',
      params: {
        manager_id: 1
      }
    })
  })
})