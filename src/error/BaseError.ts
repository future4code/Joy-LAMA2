export abstract class BaseError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export class EmptyFields extends BaseError {
  constructor(){
    super("Fields cannot be empty", 400)
  }
}

export class InvalidName extends BaseError {
  constructor(){
    super("Invalid Name", 400);
  }
}

export class InvalidEmail extends BaseError {
  constructor(){
    super("Invalid Email", 400);
  }
}

export class InvalidPassword extends BaseError {
  constructor(){
    super("Invalid Password", 400);
  }
}

export class UnauthorizedUser extends BaseError {
  constructor(){
    super("Unauthorized User", 401);
  }
}

export class InvalidToken extends BaseError {
  constructor(){
    super("Invalid Token", 498);
  }
}

export class NoLog extends BaseError{
  constructor(){
      super("User not logged in", 400)
  }
}