import { Cookies, Notify, openURL } from 'quasar'

// TODO: make this a generic library for oarepo?

class Gdpr {
  isGdprAccepted () {
    return Cookies.has('gdpr') === true
  }

  showGdprPrompt (acceptedFn, app) {
    if (this.isGdprAccepted()) {
      acceptedFn()
    } else {
      Notify.create({
        message: app.$t('messages.gdprPrompt'), // `By clicking on 'Accept', you give your consent with our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong> for this service.`,
        multiline: true,
        icon: 'policy',
        html: true,
        classes: 'doc-gdpr',
        timeout: 0,
        position: 'center',
        actions: [
          {
            label: app.$t('labels.tosBtn'),
            size: 'sm',
            icon: 'launch',
            color: 'grey-3',
            noDismiss: true,
            handler () {
              openURL('https://du.cesnet.cz/en/provozni_pravidla/start')
            }
          },
          {
            label: app.$t('labels.privacyPolicyBtn'),
            size: 'sm',
            icon: 'launch',
            color: 'grey-3',
            noDismiss: true,
            handler () {
              openURL('https://www.cesnet.cz/cesnet/personal-data-protection/?lang=en')
            }
          },
          {
            label: app.$t('labels.declineBtn'),
            color: 'red',
            handler () {
            }
          },
          {
            label: app.$t('labels.acceptBtn'),
            color: 'yellow',
            handler () {
              Cookies.set('gdpr', 'true', { expires: 5 * 365 })
              acceptedFn()
            }
          }
        ]
      })
    }
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$gdpr = new Gdpr()
}
