
import { Router } from 'express'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema, SignInValidationSchema, EmailVerificationBody as TokenAndIDValidation, updatePasswordSchema } from '#/utils/validationSchema'
import { createStreamerUser, createViewerUser, generateForgetPasswordLink, grantValid, sendReVerificationTokenStreamer, sendReVerificationTokenViewer, signInStreamer, signInViewer, updateStreamerPassword, updateViewerPassword, verifyEmail } from '#/controllers/users'
import { isValidPassResetToken, mustAuthStreamer, mustAuthViewer } from '#/middleware/auth'

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
})

import formidable from 'formidable'

router.post('/update-profile', (req, res) => {

    if(!req.headers['content-type']?.startsWith("multipart/form-data"))
        return res.status(422).json({error: "Only accepts form-data"})


    //handle the file upload
    const form = formidable()
    form.parse(req, (err, fields, files) => {
        console.log("fields: ", fields)
        console.log("files: ", files)

        res.json({ uploaded: true})
    })
})







export default router