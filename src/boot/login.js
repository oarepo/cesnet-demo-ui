import PopupAuthModule from '@oarepo/vue-popup-login'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'

export default async ({ app, Vue }) => {
  let apiURL = process.env.VUE_APP_OAREPO_API_URL
  if (!apiURL.endsWith('/')) {
    apiURL += '/'
  }

  Vue.use(PopupAuthModule, {
    // the module saves state to store, "auth" module
    store: app.store,

    // url on the backend that returns current auth state
    authStateURL: `${apiURL}auth/state/`,

    // url on the backend that provides login
    authLoginURL: `${apiURL}auth/login/`,

    // url on the backend that provides logout
    authLogoutURL: `${apiURL}auth/logout/`,

    iframeCreator: undefined,

    // callback when popup is blocked. Can be used to
    // degrade gracefully to redirect-based authentication
    popupBlockedCallback: () => {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: i18n.t('messages.allowPopups')
      })
    }
  })
}
