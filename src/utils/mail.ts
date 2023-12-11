import { generateTemplate } from "#/mail/template";
import emailVerificationToken from "#/models/emailVerificationToken";
import userViewer from "#/models/userViewer";
import path from 'path'
import { GOOGLE_PASS, GOOGLE_USER, SIGN_IN_URL, VERIFICATION_EMAIL } from "./variables";
import nodemailer from 'nodemailer'




const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GOOGLE_USER,
            pass: GOOGLE_PASS
        }
    });
    return transport
}

interface Profile {
    name: string
    email: string
    userViewerId: string
}

export const sendVerificationMailuserViewer = async (token: string, profile: Profile) => {
    const transport = generateMailTransporter()
    const {name, email, userViewerId} = profile
    await emailVerificationToken.create({
        owner: userViewerId,
        token
    })

    const welcomeMessageViewerUser = `Bem-vindo ${name}! 🛍️ Prepare-se para uma experiência de compra inesquecível, onde incríveis lives de compras esperam por você. Descubra produtos únicos, interaja em tempo real e aproveite ofertas exclusivas. Feliz compras e diversão!"`

    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: welcomeMessageViewerUser,
        html: generateTemplate({
            title: "Divirta-se",
            message: welcomeMessageViewerUser,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    })

}

interface ProfileStreamer {
    name: string
    email: string
    userStreamerId: string
}

export const sendVerificationMailuserStreamer = async (token: string, profile: ProfileStreamer) => {
    const transport = generateMailTransporter()
    const {name, email, userStreamerId} = profile
    await emailVerificationToken.create({
        owner: userStreamerId,
        token
    })
  
    const welcomeMessageStreamerUser = `${name} 🛍️ Prepare-se para uma experiência de vendas inesquecível, onde incríveis lives de compras e vendas esperam por você. Venda seus produtos de forma mais organizada e diversificada, interaja em tempo real com seus clientes. Tenha ótimas vendas!"`

    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: welcomeMessageStreamerUser,
        html: generateTemplate({
            title: "Divirta-se",
            message: welcomeMessageStreamerUser,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    })

}

interface Options {
    email: string
    link: string
}

export const sendForgetPasswordLink = async (options: Options) => {
    const transport = generateMailTransporter()
    
    const { email, link} = options

    
      const message = "Acabamos de receber uma solicitação informando que você esqueceu sua senha. Não tem problema, você pode usar o link abaixo e criar uma nova senha."
      transport.sendMail({

        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Reset Password Link",
        html: generateTemplate({
            title: "Forget Password",
            message,
            logo:"cid:logo",
            banner: "cid:forget_password",
            link, 
            btnTitle: "Reset Password",
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forgot_password.png"),
                cid: "forget_password"
            }
        ]
      })
}

export const  sendPassResetSuccessEmail = async (name: string, email: string) => {
    const transport = generateMailTransporter()
    
    
      const message = "Sua nova senha foi salva com sucesso."
      transport.sendMail({

        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Password Reset Successfully",
        html: generateTemplate({
            title: "Password Reset Successfully",
            message,
            logo:"cid:logo",
            banner: "cid:forget_password",
            link: SIGN_IN_URL, 
            btnTitle: "Login",
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forgot_password.png"),
                cid: "forget_password"
            }
        ]
      })
}
