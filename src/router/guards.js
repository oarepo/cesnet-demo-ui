import LoginModule from '@oarepo/vue-popup-login'

export function loginGuard (to, from, next) {
  if (LoginModule.store.loggedLocally) {
    // login valid, just call next guard
    next()
  } else {
    // not logged in or login expired - try to fetch login status from the server
    LoginModule.store.performLogIn(loginGuard.Router.app).then(loggedIn => {
      if (loggedIn) {
        next()
      } else {
        // otherwise the login is in progress, do not allow transition to the next page
        // the browser will redirect to login server and upon completion will get to 'to' route.
        next(false)
      }
    })
  }
}
