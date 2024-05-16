import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('local storage set error ', e)
    }
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key)
      return localStorageItem ? JSON.parse(localStorageItem) : null
    } catch (e) {
      console.error('local storage get error ', e)
      return null
    }
  }
}
