import prisma from '../../prisma/database'
import { type Author } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'

export default class AuthorRepository {
  public createAuthor = async (data: IAuthor): Promise<Error | Author> => {
    return await prisma.author.create({
      data
    })
  }

  public getAuthorById = async (id: string): Promise<Error | Author> => {
    return await prisma.author.findUniqueOrThrow({
      where: {
        id
      }
    })
  }
}
