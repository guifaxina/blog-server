import AuthorService from '../../services/author/author-service'
import { mockRepository, mockAuthor } from '../../__mocks__/mocks'

describe('Repository', () => {
  describe('create author', () => {
    const service = new AuthorService(mockRepository)

    beforeEach(async () => {
      await service.createAuthor(mockAuthor)
    })

    afterEach(() => {
      mockRepository.createAuthor.mockReset()
    })

    it('should send the correct data', async () => {
      const password = mockRepository.createAuthor.mock.calls[0][0].password
      expect(mockRepository.createAuthor.mock.calls[0][0]).toStrictEqual({ ...mockAuthor, password })
    })

    it('should be called only once', async () => {
      expect(mockRepository.createAuthor.mock.calls.length).toBe(1)
    })
  })
})
