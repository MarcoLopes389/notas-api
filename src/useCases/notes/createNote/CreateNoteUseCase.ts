import { ICreateUserDTO } from 'src/dtos/ICreateUserDTO';
import { IUserRepository } from 'src/repositories/IUserRepository';
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateNoteUseCase {

    constructor (
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    execute (user: ICreateUserDTO) {
        this.userRepository.create(user)
    }
}