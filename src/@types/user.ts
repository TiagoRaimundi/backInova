import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: any,
                name: string,
                email: string,
                verified: boolean,
                avatar?: string,
                followers: number,
                followings: number
            }
        }
    }
}

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
        userType: "streamer"
        

    }
}

export interface VerifyViewerEmailRequest extends Request {
    body: {
        userViewerId: string
        token: string
      
        
    }
}

export interface VerifyStreamerEmailRequest extends Request {
    body: {
        userStreamerId: string
        token: string
      
        
    }
}
