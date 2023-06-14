import { type IAuthor } from '../../interfaces/author-interface'
import { type Author } from '@prisma/client'
import type AuthorRepository from '../../repositories/author/author-repository'
import bcrypt from 'bcrypt'
import { logger } from '../../app'
import { type IValidateCredentials } from '../../interfaces/validate-credentials'

export default class AuthorService {
  private readonly authorRepository: AuthorRepository

  constructor (authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository
  }

  public createAuthor = async (author: IAuthor): Promise<Error | Author> => {
    try {
      const isAuthorCredentialsValid = this.validateCredentials(author)

      if (isAuthorCredentialsValid.status === 'error') {
        return new Error(isAuthorCredentialsValid.errorMessage)
      }

      const password = this.hashPassword(author.password)

      return await this.authorRepository.createAuthor({ ...author, password })
    } catch (error) {
      logger.error(error)
      return new Error('Oops! Something went wrong')
    }
  }

  private readonly validateCredentials = (author: IAuthor): IValidateCredentials => {
    if (author === null || author === undefined) {
      const errorMessage = "Author can't be null or undefined"
      return { status: 'error', errorMessage }
    }

    if (!this.verifyEmptyFields(author)) {
      const errorMessage = 'There is empty fields.'
      return { status: 'error', errorMessage }
    }

    if (!this.validateEmailPasswordFormat(author.email, author.password)) {
      const errorMessage = 'Invalid credentials.'
      return { status: 'error', errorMessage }
    }

    return { status: 'success' }
  }

  private readonly verifyEmptyFields = (author: IAuthor): boolean => {
    const authorKeys = Object.keys(author)

    authorKeys.forEach((key) => {
      if (author[key] === '') {
        return false
      }
    })

    return true
  }

  private readonly validateEmailPasswordFormat = (
    email: string,
    password: string
  ): boolean => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/

    const isPasswordValid = passwordRegex.test(password)
    const isEmailValid = emailRegex.test(email)

    return isPasswordValid && isEmailValid
  }

  private readonly hashPassword = (password: string): string =>
    bcrypt.hashSync(password, 10)
}
