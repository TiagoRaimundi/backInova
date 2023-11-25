import { Request } from "express";

export interface CreateUserViewer extends Request{
    body: {
        name: string
        email: string
        password: string
    }
}

export interface CreateUserStreamer extends Request{
    body: {
        name: string
        email: string
        password: string
        cpf: string
        phoneNumber: string
        address: string

    }
}