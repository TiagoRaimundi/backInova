import { Request } from "express";

export interface CreateUserViewer extends Request{
    body: {
        name: string
        email: string
        password: string
        userType: "viewer"
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

export interface VerifyEmailRequest extends Request {
    body: {
        userId: string
        token: string
      
        
    }
}
