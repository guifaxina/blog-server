import { type Author } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'
import { type IAuthorService } from '../../services/author/author-interface'
import { AuthorService } from '../../services/author/author-service'

class AuthorController {
  private readonly authorService: IAuthorService

  constructor () {
    this.authorService = new AuthorService()
  }

  public createAuthor = async (author: IAuthor): Promise<Error | Author> => {
    return await this.authorService.createAuthor(author)
  }
}

export default new AuthorController()
