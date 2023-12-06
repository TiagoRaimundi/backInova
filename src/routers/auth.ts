import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema, EmailVerificationBody } from '#/utils/validationSchema'
import { createStreamerUser, createViewerUser, sendReVerificationTokenStreamer, sendReVerificationTokenViewer, verifyEmail } from '#/controllers/users'

const router = Router()
router.post(
    "/createViewerUser",
    
    validate(CreateUserViewerSchema), createViewerUser

)
router.post(
    "/createStreamerUser",
    validate(CreateUserStreamerSchema), createStreamerUser
)

router.post("/verify-email", validate(EmailVerificationBody), verifyEmail)
router.post("/re-verify-Viewer-email", sendReVerificationTokenViewer)
router.post("/re-verify-Streamer-email", sendReVerificationTokenStreamer)



export default router