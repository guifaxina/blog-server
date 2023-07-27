import { type Author, type Post } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'
import { type IPost } from '../../interfaces/post-interface'
import AuthorController from '../../controllers/author/author-controller'
import PostController from '../../controllers/post/post-controller'

interface IContext {
  req: Express.Request
}

export const Mutation = {
  createAuthor: async (_: any, args: { input: IAuthor }, context: IContext): Promise<Author> => {
    const author: Author = await AuthorController.createAuthor(args.input)

    context.req.session.userId = author.id

    return author
  },
  createPost: async (_: any, args: { input: IPost }): Promise<Error | Post> => {
    return await PostController.createPost(args.input)
  }
}
