import {UserInterface} from '../../shared/types/user.interface'

export interface CommentInterface {
  id?: number
  content: string
  createdAt: string
  score: number
  user: UserInterface
  replies?: CommentInterface[]
  replyingTo?: string | undefined
}
