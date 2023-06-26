import AuthorController from '../../controllers/author/author-controller'

export const Query = {
  getAuthor: async (_: any, { id }: any, __: any) => await AuthorController.findAuthorById(id),
  hello: () => 'World'
}
