export interface ILogin {
    token: IToken,
    user: IUser
}

interface IToken {
    accessToken: string,
    refreshToken: string,
}

interface IUser {
    email: string,
    id: string
}