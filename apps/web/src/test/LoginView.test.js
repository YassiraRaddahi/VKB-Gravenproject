import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios'

const pushMock = vi.fn()
const fetchUserMock = vi.fn()

vi.mock('axios')

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

vi.mock('@/stores/userStore', () => ({
  useUserStore: () => ({
    fetchUser: fetchUserMock
  })
}))

function createWrapper() {
  return mount(LoginView, {
    global: {
      stubs: {
        TitleUnderline: {
          template: '<div />'
        },

        FormCard: {
          template: '<div><slot /></div>'
        },

        AppButton: {
          template: `
            <button
              :type="type"
              @click="$emit('click')"
            >
              <slot />
            </button>
          `,
          props: ['type']
        },

        AppInput: {
          props: [
            'modelValue',
            'label',
            'errorMessages'
          ],

          emits: [
            'update:modelValue',
            'blur'
          ],

          template: `
            <div>
              <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur')"
              />

              <div
                v-for="error in errorMessages"
                :key="error"
                class="error"
              >
                {{ error }}
              </div>
            </div>
          `
        }
      }
    }
  })
}

describe('LoginView', () => {

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.clearAllMocks()
  })

  it('shows validation error when email is empty', async () => {
    const wrapper = createWrapper()

    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text())
      .toContain('E-mailadres is verplicht')
  })

  it('shows validation error when password is empty', async () => {
    const wrapper = createWrapper()

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('test@test.nl')

    await wrapper.find('form')
      .trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text())
      .toContain('Wachtwoord is verplicht')
  })

  it('shows validation error when email format is invalid', async () => {
    const wrapper = createWrapper()

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('geen-email')
    await inputs[1].setValue('wachtwoord123')

    await wrapper.find('form')
      .trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text())
      .toContain('Ongeldig e-mailadres')
  })

 it('logs in successfully and redirects to dashboard', async () => {
  axios.post.mockResolvedValue({})

  const wrapper = createWrapper()

  const inputs = wrapper.findAll('input')

  await inputs[0].setValue('test@test.nl')
  await inputs[1].setValue('wachtwoord123')

  await wrapper.find('form')
    .trigger('submit.prevent')

  await flushPromises()

  expect(axios.post)
    .toHaveBeenCalledTimes(1)

  expect(fetchUserMock)
    .toHaveBeenCalledTimes(1)

  expect(pushMock)
    .toHaveBeenCalledWith('/dashboard')
})

it('sends correct credentials to login endpoint', async () => {
    axios.post.mockRejectedValue({
    response: {
      status: 401
    }
  })
    axios.post.mockResolvedValue({})

  const wrapper = createWrapper()

  const inputs = wrapper.findAll('input')

  await inputs[0].setValue('test@test.nl')
  await inputs[1].setValue('wachtwoord123')

  await wrapper.find('form')
    .trigger('submit.prevent')

  await flushPromises()

  expect(axios.post).toHaveBeenCalledWith(
    expect.stringContaining('/login'),
    {
      email: 'test@test.nl',
      password: 'wachtwoord123'
    },
    {
      withCredentials: true
    }
  )
})

  it('shows error message when too many login attempts were made', async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 429
      }
    })

    const wrapper = createWrapper()

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('test@test.nl')
    await inputs[1].setValue('wachtwoord123')

    await wrapper.find('form')
      .trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text())
      .toContain('Te veel pogingen, probeer het later opnieuw')
  })

  it('shows generic error message on unexpected error', async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 500
      }
    })

    const wrapper = createWrapper()

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('test@test.nl')
    await inputs[1].setValue('wachtwoord123')

    await wrapper.find('form')
      .trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text())
      .toContain('Er is iets misgegaan, probeer opnieuw')
  })
})

