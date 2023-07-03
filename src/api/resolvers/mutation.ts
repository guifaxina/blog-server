import { type Author, type Post } from '@prisma/client'
import { type IAuthor } from '../../interfaces/author-interface'
import { type IPost } from '../../interfaces/post-interface'
import AuthorController from '../../controllers/author/author-controller'
import PostController from '../../controllers/post/post-controller'

export const Mutation = {
  createAuthor: async (_: any, args: { input: IAuthor }): Promise<Error | Author> => {
    return await AuthorController.createAuthor(args.input)
  },
  createPost: async (_: any, args: { input: IPost }): Promise<Error | Post> => {
    return await PostController.createPost(args.input)
  }
}
