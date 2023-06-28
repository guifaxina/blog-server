import prisma from '../../../prisma/database'
import { type IAuthor } from '../../interfaces/author-interface'
import { logger } from '../../app'
import { type Author } from '@prisma/client'

export default class AuthorRepository {
  public createAuthor = async (data: IAuthor): Promise<Error | Author> => {
    try {
      return await prisma.author.create({
        data
      })
    } catch (error) {
      logger.error(error)
      throw new Error('An unexpected error occurred.')
    }
  }

  public getAuthorById = async (id: string): Promise<Error | Author> => {
    try {
      return await prisma.author.findUniqueOrThrow({
        where: {
          id
        }
      })
    } catch (error) {
      logger.error(error)
      throw new Error('An unexpected error ocurred.')
    }
  }
}
