import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import GravesDetails from '@/views/graves/GravesDetails.vue'
import axios from 'axios'

vi.mock('axios')

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useRoute: () => ({
      params: { grave_id: '1' }
    })
  }
})

const mountComponent = () =>
  mount(GravesDetails, {
    global: {
      stubs: {
        Breadcrumbs: true,
        TitleUnderline: true,
        RouterLink: true,
        'router-link': true,

        'v-container': true,
        'v-card': true,
        'v-form': true,
        'v-row': true,
        'v-col': true,
        'v-img': true,
        'v-btn': false,
        'v-icon': true,
        'v-text-field': true,
        'v-select': true,
        'v-textarea': true
      }
    }
  })

describe('GravesDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockResolvedValue({
      data: {
        grave: {
          id: 1,
          grave_number: 'A-101',
          status: 'beschikbaar',
          type: 'algemeen graf',
          sort: 'enkel graf',
          latitude: '52.123',
          longitude: '5.123',
          remarks: 'Test opmerking',
          image_url: 'graf.jpg'
        }
      }
    })

    axios.put.mockResolvedValue({ data: {} })
  })

  it('loads grave data', async () => {
    const wrapper = mountComponent()

    await flushPromises()

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/graves/1')
    )

    expect(wrapper.vm.grave.grave_number).toBe('A-101')
    expect(wrapper.vm.form.status).toBe('beschikbaar')
    expect(wrapper.vm.form.remarks).toBe('Test opmerking')
  })

  it('switches to edit mode', async () => {
    const wrapper = mountComponent()

    await flushPromises()

    await wrapper.vm.toggleEdit()

    expect(wrapper.vm.editMode).toBe(true)
  })

  it('cancels edit mode and resets form', async () => {
    const wrapper = mountComponent()

    await flushPromises()

    await wrapper.vm.toggleEdit()

    wrapper.vm.form.grave_number = 'B-202'

    await wrapper.vm.toggleEdit()

    expect(wrapper.vm.editMode).toBe(false)
    expect(wrapper.vm.form.grave_number).toBe('A-101')
  })

  it('saves grave changes', async () => {
    const wrapper = mountComponent()

    await flushPromises()

    await wrapper.vm.toggleEdit()

    wrapper.vm.form.grave_number = 'B-202'
    wrapper.vm.form.status = 'in gebruik'

    await wrapper.vm.saveGrave()
    await flushPromises()


    expect(axios.put).toHaveBeenCalled()

    const [url, formData] = axios.put.mock.calls[0]

    expect(url).toContain('/graves/1')

    expect(formData).toBeInstanceOf(FormData)
    expect(formData.get('grave_number')).toBe('B-202')
    expect(formData.get('status')).toBe('in gebruik')


    expect(wrapper.vm.editMode).toBe(false)
    expect(wrapper.vm.imagePreview).toBe('')
  })

  it('creates image preview when file is selected', async () => {
    const wrapper = mountComponent()

    global.URL.createObjectURL = vi.fn(() => 'blob:preview-url')

    const file = new File(['test'], 'grave.jpg', {
      type: 'image/jpeg'
    })

    wrapper.vm.handleFile({
      target: {
        files: [file]
      }
    })

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file)
    expect(wrapper.vm.imagePreview).toBe('blob:preview-url')
  })
})