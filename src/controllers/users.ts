import { CreateUserStreamer, CreateUserViewer } from "#/@types/user"
import userStreamer from "#/models/userStreamer"
import nodemailer from 'nodemailer'
import userViewer from "#/models/userViewer"
import { CreateUserStreamerSchema, CreateUserViewerSchema } from "#/utils/validationSchema"
import { RequestHandler } from "express"
import { GOOGLE_USER, GOOGLE_PASS } from "#/utils/variables"
import { generateToken } from "#/utils/helpers"
import emailVerificationToken from "#/models/emailVerificationToken"

export const createViewerUser: RequestHandler = async (req: CreateUserViewer, res) => {
    const { email, password, name } = req.body
    CreateUserViewerSchema.validate({ email, password, name }).catch(error => {

    })

    const userviwer = await userViewer.create({ name, email, password })


    const token = generateToken()
    const verificationToken = await emailVerificationToken.create({
        owner: userviwer._id,
        token

    })
    //send verification email
    const transport = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: GOOGLE_USER,
          pass: GOOGLE_PASS
        }
      });

      transport.sendMail({
        to: userviwer.email,
        from: "auth@yapp.com",
        html: `<h1>Your verification token is ${token}</h1>`
      })
    res.status(201).json({ userviwer })


}

export const createStreamerUser: RequestHandler = async (req: CreateUserStreamer, res) => {
    const { email, password, name, cpf, phoneNumber, address } = req.body
    CreateUserStreamerSchema.validate({ email, password, name, cpf, phoneNumber, address }).catch(error => {

    })

    const userstreamer = await userStreamer.create({ name, email, password, cpf, phoneNumber, address })

        
    const token = generateToken()
    const verificationToken = await emailVerificationToken.create({
        owner: userstreamer._id,
        token

    })

    //send verification email
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GOOGLE_USER,
          pass: GOOGLE_PASS
        }
      });

      transport.sendMail({
        to: userstreamer.email,
        from: "auth@yapp.com",
        html: `<h1>Your verification token is ${token}</h1>`
      })
    res.status(201).json({ userstreamer })

}

