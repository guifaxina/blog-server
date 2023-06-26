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

const repository = new AuthorRepository()
const service = new AuthorService(repository)

export default new AuthorController(service)
