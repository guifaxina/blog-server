import { type Author } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'
import AuthorRepository from '../../repositories/author/author-repository'
import AuthorService from '../../services/author/author-service'

class AuthorController {
  private readonly authorService: AuthorService

  constructor (authorService: AuthorService) {
    this.authorService = authorService
  }

  public createAuthor = async (author: IAuthor): Promise<Error | Author> => {
    return await this.authorService.createAuthor(author)
  }
}

export default new AuthorController(new AuthorService(new AuthorRepository()))
