import { type Author } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'
import { AuthorController } from '../../controllers/author/author-controller'

export const Mutation = {
  createAuthor: async (_: any, { input }: any, __: any): Promise<Error | Author> => {
    const { name, lastName, email, password, profilePic }: IAuthor = input
    const author = {
      name,
      lastName,
      email,
      password,
      profilePic
    }
    const controller = new AuthorController()

    return await controller.createAuthor(author)
  }
}
