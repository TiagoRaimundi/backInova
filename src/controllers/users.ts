import { CreateUserStreamer, CreateUserViewer, VerifyEmailRequest } from "#/@types/user"
import userStreamer from "#/models/userStreamer"
import nodemailer from 'nodemailer'
import path from 'path'
import userViewer from "#/models/userViewer"
import { CreateUserStreamerSchema, CreateUserViewerSchema } from "#/utils/validationSchema"
import { RequestHandler } from "express"
import { GOOGLE_USER, GOOGLE_PASS } from "#/utils/variables"
import { generateToken } from "#/utils/helpers"
import EmailVerificationToken from "#/models/emailVerificationToken"
import { generateTemplate } from "#/mail/template"
import { sendVerificationMailuserStreamer, sendVerificationMailuserViewer } from "#/utils/mail"

export const createViewerUser: RequestHandler = async (req: CreateUserViewer, res) => {
    const { email, password, name } = req.body

    CreateUserViewerSchema.validate({ email, password, name }).catch(error => {

    })

    const userviwer = await userViewer.create({ name, email, password })


    const token = generateToken()
    sendVerificationMailuserViewer(token, {name, email, userViewerId:userviwer._id.toString()})

    

    //send verification email
   
    res.status(201).json({ userviwer: userviwer._id, name, email })


}

export const createStreamerUser: RequestHandler = async (req: CreateUserStreamer, res) => {

    const { email, password, name, cpf, phoneNumber, address } = req.body
    
    CreateUserStreamerSchema.validate({ email, password, name, cpf, phoneNumber, address }).catch(error => {

    })

    const userstreamer = await userStreamer.create({ name, email, password, cpf, phoneNumber, address})


    const token = generateToken()
    sendVerificationMailuserStreamer(token, {name, email, userStreamerId:userstreamer._id.toString()})

    //send verification email
   
    res.status(201).json({ userviwer: userstreamer._id, name, email })

}


export const verifyEmail: RequestHandler = async (req, res) => {
    const { token, userId, userType } = req.body; // Inclua userType no corpo da requisição

    // Encontrar o token de verificação
    const verificationToken = await EmailVerificationToken.findOne({ owner: userId });
    if (!verificationToken) return res.status(403).json({ error: "Invalid token!" });

    // Comparar token
    const matched = await verificationToken.compareToken(token);
    if (!matched) return res.status(403).json({ error: "Invalid token!" });

    // Atualizar usuário baseado no tipo (Streamer ou Viewer)
    if (userType === 'streamer') {
        await userStreamer.findByIdAndUpdate(userId, { verified: true });
    } else if (userType === 'viewer') {
        await userViewer.findByIdAndUpdate(userId, { verified: true });
    } else {
        return res.status(400).json({ error: "Invalid user type!" });
    }

    // Deletar o token de verificação
    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

    // Resposta de sucesso
    res.json({ message: "Your email is verified" });
};



