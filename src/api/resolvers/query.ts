import AuthorController from '../../controllers/author/author-controller'

export const Query = {
  getAuthor: async (_: any, args: { id: string }) => await AuthorController.getAuthorById(args.id)
}
