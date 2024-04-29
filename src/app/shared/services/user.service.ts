import {BehaviorSubject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {UserInterface} from '../types/user.interface'

@Injectable()
export class UserService {
  readonly _apiUrl = 'http://localhost:3000/'

  private userSource = new BehaviorSubject<UserInterface | null>(null)
  currentUser = this.userSource.asObservable()

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<UserInterface>(this._apiUrl + 'currentUser')
  }
}
