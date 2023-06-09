import { type IAuthor } from '../../interfaces/author-interface'
import { type Author } from '@prisma/client'

export interface IAuthorService {
  createAuthor: (author: IAuthor) => Promise<Error | Author>
}
