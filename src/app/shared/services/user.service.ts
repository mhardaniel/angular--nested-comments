import {BehaviorSubject, Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {UserInterface} from '../types/user.interface'
import {environment} from 'src/environments/environment'

@Injectable({providedIn: 'root'})
export class UserService {
  apiUrl = environment.apiUrl

  private userSource = new BehaviorSubject<UserInterface | null>(null)
  currentUser = this.userSource.asObservable()

  constructor(private http: HttpClient) {}

  get(): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.apiUrl + 'currentUser')
  }
}
