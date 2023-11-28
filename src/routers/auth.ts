import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'
import { Router } from 'express'
import { CreateUserStreamer, CreateUserViewer } from '#/@types/user'
import { validate } from '#/middleware/validator'
import { CreateUserViewerSchema } from '#/utils/validationSchema'

const router = Router()
router.post(
    "/createViewerUser",
    
    validate(CreateUserViewerSchema),
    async (req: CreateUserViewer, res) => {
        const {email, password, name } = req.body
        CreateUserViewerSchema.validate({email, password, name}).catch(error => {

        })

        const user = await userViewer.create({name, email, password})
        res.json({user})

    }

)

router.post(
    '/createStreamerUser',
    (req, res, next) => {

        const { email, password, name } = req.body
        if (!name.trim()) return res.json({ error: "Name is missing!" })
        if (name.length < 3) return res.json({ error: 'Invalid name!' })
        

        next()

    },
    
    async (req: CreateUserStreamer, res) => {
    const { email, password, name, cpf, phoneNumber, address } = req.body
    //const newUserViewer = new userViewer ({email, password, name})
    //newUserViewer.save()
    const userstreamer = await userStreamer.create({ email, password, name, cpf, phoneNumber, address })
    res.json({ userstreamer })
})


export default router