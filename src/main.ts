import {provideHttpClient} from '@angular/common/http'
import {isDevMode} from '@angular/core'
import {bootstrapApplication} from '@angular/platform-browser'
import {provideRouter} from '@angular/router'
import {provideEffects} from '@ngrx/effects'
import {provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {AppComponent} from './app/app.component'
import {appRoutes} from './app/app.routes'
import * as commentsEffects from './app/comments/store/comments.effects'
import {commentFeature} from './app/comments/store/comments.reducers'
import {userFeature} from './app/shared/store/users/users.reducers'
import * as userEffects from './app/shared/store/users/users.effects'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    // provideState(commentFeatureKey, commentReducer),
    provideState(userFeature),
    provideState(commentFeature),
    provideEffects(userEffects, commentsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
})
