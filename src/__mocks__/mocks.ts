export const mockRepository = {
  createAuthor: jest.fn(),
  getAuthorById: jest.fn()
}

export const mockAuthor = {
  name: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'Password123!',
  profilePic: 'img'
}
