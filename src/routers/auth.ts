import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema, SignInValidationSchema, EmailVerificationBody as TokenAndIDValidation, updatePasswordSchema } from '#/utils/validationSchema'
import { createStreamerUser, createViewerUser, generateForgetPasswordLink, grantValid, sendReVerificationTokenStreamer, sendReVerificationTokenViewer, signInStreamer, signInViewer, updateStreamerPassword, updateViewerPassword, verifyEmail } from '#/controllers/users'
import { isValidPassResetToken } from '#/middleware/auth'
import { JwtPayload, verify } from 'jsonwebtoken'
import { JWT_SECRET } from '#/utils/variables'

const router = Router()
router.post(
    "/createViewerUser",
    
    validate(CreateUserViewerSchema), createViewerUser

)
router.post(
    "/createStreamerUser",
    validate(CreateUserStreamerSchema), createStreamerUser
)

router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail)
router.post("/re-verify-Viewer-email", sendReVerificationTokenViewer)
router.post("/re-verify-Streamer-email", sendReVerificationTokenStreamer)
router.post("/forget-password", generateForgetPasswordLink)
router.post("/verify-pass-|reset-token", validate(TokenAndIDValidation), isValidPassResetToken, grantValid)
router.post('/update-password', validate(updatePasswordSchema), isValidPassResetToken, updateViewerPassword, updateStreamerPassword)
router.post('/sign-in',
 validate(SignInValidationSchema),
 signInViewer, signInStreamer)


 router.get('/is-auth-UserViewer', async (req, res) => {
    const {authorization} = (req.headers)
    const token = authorization?.split("Bearer ")[1]
    if(!token) res.status(403).json({error: "Unauthorized request!" })

    const payload = verify(token, JWT_SECRET) as JwtPayload
    const id = payload.userId

    const userviewer = await userViewer.findById(id)
    const userstreamer = await userViewer.findById(id)
    if(!userviewer) return res.status(403).json({error: "Unauthorized request!"})

    res.json({
        profile: { 
            id: userviewer._id, 
            name: userviewer.name, 
            email: userviewer.email, 
            verified: userviewer.verified, 
            avatar: userviewer.profilePicture?.url, 
            followers: userviewer.followers.length, 
            followings: userviewer.followings.length 
        },
        token
    })
})

router.get('/is-auth-UserStreamer', async (req, res) => {
    const {authorization} = (req.headers)
    const token = authorization?.split("Bearer ")[1]
    if(!token) res.status(403).json({error: "Unauthorized request!" })

    const payload = verify(token, JWT_SECRET) as JwtPayload
    const id = payload.userId


    const userstreamer = await userStreamer.findById(id)
    if(!userstreamer) return res.status(403).json({error: "Unauthorized request!"})

    res.json({
        profile: { 
            id: userstreamer._id, 
            name: userstreamer.name, 
            email: userstreamer.email, 
            verified: userstreamer.verified, 
            avatar: userstreamer.profilePicture?.url, 
            followers: userstreamer.followers.length, 
            followings: userstreamer.followings.length 
        },
    })
})






export default router