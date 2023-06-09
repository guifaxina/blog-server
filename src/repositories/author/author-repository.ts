import prisma from '../../../prisma/database'
import { type IAuthor } from '../../interfaces/author-interface'
import { logger } from '../../app'
import { type Author } from '@prisma/client'

export class AuthorRepository {
  public createAuthor = async (data: IAuthor): Promise<Error | Author> => {
    try {
      return await prisma.author.create({
        data
      })
    } catch (error) {
      logger.error(error)
      return new Error('An error occurred')
    }
  }
}
