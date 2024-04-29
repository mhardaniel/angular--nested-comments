import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {CommentInterface} from '../types/comment.interface'

@Injectable()
export class CommentsService {
  private _apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<CommentInterface[]>(
      // this._apiUrl + 'comments?_sort=createdAt&_order=desc',
      this._apiUrl + 'comments',
    )
  }

  create(payload: CommentInterface) {
    return this.http.post<CommentInterface>(this._apiUrl + 'comments', payload)
  }

  update(payload: CommentInterface) {
    return this.http.put(`${this._apiUrl}comments/${payload.id}`, payload)
  }

  delete(id: number) {
    return this.http.delete<CommentInterface>(`${this._apiUrl}comments/${id}`)
  }
}
