import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { CreateUserStreamer, CreateUserViewer } from '#/@types/user'
import { validate } from '#/middleware/validator'
import { CreateUserStreamerSchema, CreateUserViewerSchema } from '#/utils/validationSchema'

const router = Router()
router.post(
    "/createViewerUser",
    
    validate(CreateUserViewerSchema),
    async (req: CreateUserViewer, res) => {
        const {email, password, name } = req.body
        CreateUserViewerSchema.validate({email, password, name}).catch(error => {

        })

        const userviwer = await userViewer.create({name, email, password})
        res.json({userviwer})

    }

)
router.post(
    "/createStreamerUser",
    validate(CreateUserStreamerSchema),
    async (req: CreateUserStreamer, res) => {
        const {email, password, name, cpf, phoneNumber, address } = req.body
        CreateUserStreamerSchema.validate({email, password, name, cpf, phoneNumber, address}).catch(error => {

        })

        const userstreamer = await userStreamer.create({name, email, password, cpf, phoneNumber, address})
        res.json({userstreamer})

    }

)






export default router