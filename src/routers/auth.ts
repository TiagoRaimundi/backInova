import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema, SignInValidationSchema, EmailVerificationBody as TokenAndIDValidation, updatePasswordSchema } from '#/utils/validationSchema'
import { createStreamerUser, createViewerUser, generateForgetPasswordLink, grantValid, sendReVerificationTokenStreamer, sendReVerificationTokenViewer, signInStreamer, signInViewer, updateStreamerPassword, updateViewerPassword, verifyEmail } from '#/controllers/users'
import { isValidPassResetToken } from '#/middleware/auth'

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


export default router