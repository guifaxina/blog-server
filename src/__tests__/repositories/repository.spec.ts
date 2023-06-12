import AuthorService from '../../services/author/author-service'

describe('Repository', () => {
  describe('Create Author', () => {
    const mockRepository = {
      createAuthor: jest.fn()
    }

    const mockAuthor = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      profilePic: 'img'
    }

    const service = new AuthorService(mockRepository)

    afterEach(() => {
      mockRepository.createAuthor.mockReset()
    })

    it('should send the correct data', async () => {
      await service.createAuthor(mockAuthor)

      expect(mockRepository.createAuthor.mock.calls[0][0]).toStrictEqual(mockAuthor)
    })

    it('should be called only once', async () => {
      await service.createAuthor(mockAuthor)

      expect(mockRepository.createAuthor.mock.calls.length).toBe(1)
    })
  })
})
