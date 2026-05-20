import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProfileView from '@/views/ProfileView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'

// Mapping of permissions to the fields they control (data-testid values)
const formPermissionFieldMap = {
    'user.view.name': [
        'initials',
        'first-name',
        'infix',
        'last-name'
    ],

    'user.edit.name': [
        'initials',
        'first-name',
        'infix',
        'last-name'
    ],

    'user.view.partner_name': [
        'partner-infix',
        'partner-last-name'
    ],

    'user.edit.partner_name': [
        'partner-infix',
        'partner-last-name'
    ],

    'user.view.name_usage': ['name-usage'],
    'user.edit.name_usage': ['name-usage'],

    'user.view.gender': ['gender'],
    'user.edit.gender': ['gender'],

    'user.view.date_of_birth': ['date-of-birth'],
    'user.edit.date_of_birth': ['date-of-birth'],

    'user.view.place_of_birth': ['place-of-birth'],
    'user.edit.place_of_birth': ['place-of-birth'],

    'user.view.address': [
        'street-name',
        'house-number',
        'house-letter',
        'house-number-addition',
        'zip-code',
        'city'
    ],

    'user.edit.address': [
        'street-name',
        'house-number',
        'house-letter',
        'house-number-addition',
        'zip-code',
        'city'
    ],

    'user.view.contact': [
        'email',
        'phone-number',
        'mobile-number'
    ],

    'user.edit.contact': [
        'email',
        'phone-number',
        'mobile-number'
    ],

    'user.view.position': ['position'],
    'user.edit.position': ['position'],
};

const viewOnlyPermissionFieldMap = {
    'user.view.role': ['role-name'],
}

const actionPermissionFieldMap = {
    'user.edit.profile_picture': [
        'profile-picture-upload-btn'
    ],
    'user.view.profile_picture': [
        'profile-picture-url'
    ],
};

const allPermissions = [
    ...Object.keys(formPermissionFieldMap).map(permission => [permission, formPermissionFieldMap[permission]]),
    ...Object.keys(viewOnlyPermissionFieldMap).map(permission => [permission, viewOnlyPermissionFieldMap[permission]]),
    ...Object.keys(actionPermissionFieldMap).map(permission => [permission, actionPermissionFieldMap[permission]])
]


// Helper function to check visibility of fields based on permissions
function expectFieldsVisible(wrapper, fields) {
    fields.forEach(field => {
        expect(wrapper.find(`[data-testid="${field}"]`).exists()).toBe(true)
    })
}

// Helper function to check invisibility of fields based on permissions
function expectFieldsHidden(wrapper, fields) {
    fields.forEach(field => {
        expect(wrapper.find(`[data-testid="${field}"]`).exists()).toBe(false)
    })
}

// Helper function to check if fields are editable based on permissions
function expectFieldsEditable(wrapper, fields) {
    fields.forEach(field => {
        const input = wrapper.get(`[data-testid="${field}"]`)
        expect(input.attributes('readonly')).toBeUndefined()
    })
}

// Helper function to check if fields are readonly based on permissions
function expectFieldsReadonly(wrapper, fields) {
    fields.forEach(field => {
        const input = wrapper.find(`[data-testid="${field}"]`)

        // If the field doesn't exist, we can't check if it's readonly, so we skip it
        if (!input.exists()) return

        expect('readonly' in input.attributes()).toBe(true)
    })
}

function expectFieldsActionable(wrapper, fields) {
    fields.forEach(field => {
        const element = wrapper.find(`[data-testid="${field}"]`)
        expect(element.exists()).toBe(true)
        expect('disabled' in element.attributes()).toBe(false)
    })
}

// Helper function to set up the user store with specific permissions
function setupUser(permissions) {
    setActivePinia(createPinia())

    const userStore = useUserStore()
    userStore.user = {
        id: 1,
        first_names: 'Test',
        infix: 'van',
        last_name: 'Test',
        email: 'testuser@example.com',
        profile_picture_url: 'test.jpg'
    }

    userStore.permissions = permissions

    return userStore
}

// Helper function to set up user store based on role
function setupRole(role) {

    if (role === 'admin') {
        return setupUser(['user.view.name', 'user.edit.name', 'user.view.contact', 'user.edit.contact', 'user.view.profile_picture', 'user.edit.profile_picture', 'user.view.role', 'user.view.position', 'user.edit.position'])
    }


    if (role === 'cemetery manager') {
        return setupUser(['user.view.name', 'user.edit.name', 'user.view.contact', 'user.edit.contact', 'user.view.profile_picture', 'user.edit.profile_picture', 'user.view.role', 'user.view.position', 'user.edit.position'])
    }


    if (role === 'grave owner') {
        return setupUser(['user.view.name', 'user.edit.name', 'user.view.contact', 'user.edit.contact', 'user.view.profile_picture', 'user.edit.profile_picture', 'user.view.role', 'user.view.partner_name', 
            'user.edit.partner_name', 'user.view.name_usage', 'user.edit.name_usage', 'user.view.gender', 'user.edit.gender', 'user.view.date_of_birth', 'user.view.place_of_birth', 'user.view.address', 'user.edit.address'])
    }

    if (role === 'grave caretaker') {
        return setupUser(['user.view.name', 'user.edit.name', 'user.view.contact', 'user.edit.contact', 'user.view.profile_picture', 'user.edit.profile_picture', 'user.view.role', 'user.view.position', 'user.edit.position'])
    }
}

const roles = ['admin', 'cemetery manager', 'grave owner', 'grave caretaker']


roles.forEach(role => {

    describe(
        role
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        () => {

            it('sees correct fields', () => {
                const user = setupRole(role)

                const wrapper = mount(ProfileView)

                allPermissions.forEach(([permission, fields]) => {
                    if (permission.startsWith('user.view') &&
                        user.permissions.includes(permission)) {
                        expectFieldsVisible(wrapper, fields)
                    }
                })
            })

            it('cannot see fields without view permissions', () => {
                const user = setupRole(role)

                const wrapper = mount(ProfileView)

                allPermissions.forEach(([permission, fields]) => {
                    if (permission.startsWith('user.view') &&
                        !user.permissions.includes(permission)) {
                        expectFieldsHidden(wrapper, fields)
                    }
                })
            })

            it('can edit fields with edit permissions', () => {
                const user = setupRole(role)

                const wrapper = mount(ProfileView)

                Object.entries(formPermissionFieldMap).forEach(([permission, fields]) => {
                    if (permission.startsWith('user.edit')
                        && user.permissions.includes(permission)) {
                        expectFieldsEditable(wrapper, fields)
                    }
                })


                Object.entries(actionPermissionFieldMap).forEach(([permission, fields]) => {
                    if (permission.startsWith('user.edit')
                        && user.permissions.includes(permission)) {
                        expectFieldsActionable(wrapper, fields)
                    }
                })


            })

            it('cannot edit fields without permission', () => {
                const user = setupRole(role)

                const wrapper = mount(ProfileView)

                Object.entries(formPermissionFieldMap).forEach(([permission, fields]) => {
                    if (!user.permissions.includes(permission)
                        && user.permissions.includes(permission.replace('user.edit.', 'user.view.'))
                    ) {
                        expectFieldsReadonly(wrapper, fields)
                    }
                })


            })

        })
})


describe('Snackbar', () => {

    it('is shown when save button is clicked and form is valid', async () => {
        const user = setupRole('admin')

        const wrapper = mount(ProfileView)

        wrapper.vm.valid = true

        const button = wrapper.get('[data-testid="save-button"]')

        expect(wrapper.find('[data-testid="snackbar-success"]').exists()).toBe(false)
        await button.trigger('click')

        const snackbar = wrapper.get('[data-testid="snackbar-success"]')
        expect(snackbar.exists()).toBe(true)

        expect(snackbar.text()).toContain('Profiel succesvol bijgewerkt!')
    })


    it('is not shown when save button is clicked and form is not valid', async () => {
        const user = setupRole('admin')

        const wrapper = mount(ProfileView)

        wrapper.vm.valid = false

        const button = wrapper.get('[data-testid="save-button"]')

        expect(wrapper.find('[data-testid="snackbar-success"]').exists()).toBe(false)
        await button.trigger('click')

        expect(wrapper.find('[data-testid="snackbar-success"]').exists()).toBe(false)
    })

})