import { mockAuthor } from '../../../__mocks__/mocks'
import AuthorController from '../../../controllers/author/author-controller'

describe('Service', () => {
  describe('users input validation', () => {
    const controller = AuthorController

    it('should return an error when password is wrong', async () => {
      const password = 'password' // Wrong format password
      const incorrectMockAuthor = { ...mockAuthor, password }

      void expect(async () => {
        await controller.createAuthor(incorrectMockAuthor)
      }).rejects.toThrow()
    })

    it('should return an error when email is wrong', async () => {
      const email = 'email' // Wrong format email
      const incorrectMockAuthor = { ...mockAuthor, email }

      void expect(async () => {
        await controller.createAuthor(incorrectMockAuthor)
      }).rejects.toThrow()
    })
  })

  describe('getAuthorById', () => {
    const controller = AuthorController

    it('should return an error when id is not valid', () => {
      void expect(async () => {
        await controller.getAuthorById('invalidId')
      }).rejects.toThrow()
    })
  })
})
