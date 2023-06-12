import { type IAuthor } from '../../interfaces/author-interface'
import { type Author } from '@prisma/client'
import type AuthorRepository from '../../repositories/author/author-repository'

export default class AuthorService {
  private readonly authorRepository: AuthorRepository

  constructor (authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository
  }

  public createAuthor = async (author: IAuthor): Promise<Error | Author> => {
    if (author !== null && author !== undefined) {
      const createdAuthor = await this.authorRepository.createAuthor(author)

      return createdAuthor
    }

    return new Error("Author can't be null or undefined")
  }
}
