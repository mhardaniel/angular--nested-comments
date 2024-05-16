import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {CommentInterface} from '../types/comment.interface'

@Injectable({providedIn: 'root'})
export class CommentsService {
  private _apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  get(): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>(
      this._apiUrl + 'comments?_sort=-createdAt',
    )
  }

  create(data: CommentInterface): Observable<CommentInterface> {
    return this.http.post<CommentInterface>(this._apiUrl + 'comments', data)
  }

  update(payload: CommentInterface): Observable<CommentInterface> {
    return this.http.put<CommentInterface>(
      `${this._apiUrl}comments/${payload.id}`,
      payload,
    )
  }

  delete(id: number): Observable<CommentInterface> {
    return this.http.delete<CommentInterface>(`${this._apiUrl}comments/${id}`)
  }
}
