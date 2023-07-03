import prisma from '../../../prisma/database'
import { logger } from '../../app'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { type Author } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'

export default class AuthorRepository {
  public createAuthor = async (data: IAuthor): Promise<Error | Author> => {
    try {
      return await prisma.author.create({
        data
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Email already in use.')
      }
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
