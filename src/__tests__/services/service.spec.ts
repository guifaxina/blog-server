import AuthorService from '../../services/author/author-service'
import { mockRepository, mockAuthor } from '../../__mocks__/mocks'

describe('Service', () => {
  describe('users input validation', () => {
    const service = new AuthorService(mockRepository)

    afterEach(() => {
      mockRepository.createAuthor.mockReset()
    })

    it('should hash the password', async () => {
      await service.createAuthor(mockAuthor)

      expect(mockRepository.createAuthor.mock.calls[0][0].password).not.toBe(mockAuthor.password)
    })

    it('should return an error when password is wrong', async () => {
      const password = 'password' // Wrong format password
      const incorrectMockAuthor = { ...mockAuthor, password }

      void expect(async () => {
        await service.createAuthor(incorrectMockAuthor)
      }).rejects.toThrow('Invalid credentials.')
    })

    it('should return an error when email is wrong', async () => {
      const email = 'email' // Wrong format email
      const incorrectMockAuthor = { ...mockAuthor, email }

      void expect(async () => {
        await service.createAuthor(incorrectMockAuthor)
      }).rejects.toThrow('Invalid credentials.')
    })
  })
})
