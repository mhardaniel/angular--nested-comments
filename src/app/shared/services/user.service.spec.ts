import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import {HttpClient} from '@angular/common/http'
import {TestBed} from '@angular/core/testing'
import {UserService} from './user.service'
import {UserInterface} from '../types/user.interface'

describe('UserService', () => {
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let userService: UserService

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [UserService],
    })

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
    userService = TestBed.inject(UserService)
  })

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify()
  })

  describe('#get', () => {
    let expectedUser: UserInterface

    beforeEach(() => {
      userService = TestBed.inject(UserService)
      expectedUser = {
        image: {
          png: '/assets/images/avatars/yoda.png',
        },
        username: 'yoda',
      }
    })

    it('should return expected user (called once)', () => {
      userService.get().subscribe({
        next: (user) => {
          expect(user)
            .withContext('should return expected user')
            .toEqual(expectedUser)
        },
        error: fail,
      })

      // UserService should have made one request to GET user from expected URL
      const req = httpTestingController.expectOne(
        userService._apiUrl + 'currentUser',
      )
      expect(req.request.method).toEqual('GET')

      // Respond with the mock user
      req.flush(expectedUser)
    })
  })
})
