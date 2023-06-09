import { type IAuthor } from '../../interfaces/author-interface'
import { AuthorRepository } from '../../repositories/author/author-repository'
import { type Author } from '@prisma/client'

export class AuthorService {
  private readonly authorRepository: AuthorRepository

  constructor () {
    this.authorRepository = new AuthorRepository()
  }

  public createAuthor = async (author: IAuthor): Promise<Error | Author> => {
    if (author !== null && author !== undefined) {
      const createdAuthor = await this.authorRepository.createAuthor(author)

      return createdAuthor
    }

    return new Error("Author can't be null or undefined")
  }
}
