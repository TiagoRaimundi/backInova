import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema, SignInValidationSchema, EmailVerificationBody as TokenAndIDValidation, updatePasswordSchema } from '#/utils/validationSchema'
import { createStreamerUser, createViewerUser, generateForgetPasswordLink, grantValid, sendReVerificationTokenStreamer, sendReVerificationTokenViewer, signInStreamer, signInViewer, updateStreamerPassword, updateViewerPassword, verifyEmail } from '#/controllers/users'
import { isValidPassResetToken, mustAuthStreamer, mustAuthViewer } from '#/middleware/auth'
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


 router.get('/is-auth-userViewer', mustAuthViewer, (req, res) => {
    res.json({
        profile: req.user,

    })
}
)


router.get('/is-auth-userStreamer', mustAuthStreamer, (req, res) => {
    res.json({
        profile: req.user,

    })
}
)
router.get('/public', (req, res) => {
    res.json({
        message: "You are in public route."

    })
})

router.get('/private', mustAuthViewer, mustAuthStreamer, (req, res) => {
    res.json({
        message: "You are in private route."

    })
})




export default router