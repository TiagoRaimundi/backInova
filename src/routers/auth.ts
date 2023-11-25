import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'


import { Router } from 'express'
import { CreateUserStreamer, CreateUserViewer } from '#/@types/user'

const router = Router()
router.post('/createViewerUser', async (req: CreateUserViewer, res) => {
    const { email, password, name } = req.body
    //const newUserViewer = new userViewer({ email, password, name })
    //newUserViewer.save()
    const userviewer = await userViewer.create({ name, email, password })
    res.json({ userviewer })
})

router.post('/createStreamerUser', async (req: CreateUserStreamer, res) => {
    const { email, password, name, cpf, phoneNumber, address } = req.body
    //const newUserViewer = new userViewer ({email, password, name})
    //newUserViewer.save()
    const userstreamer = await userStreamer.create({ email, password, name, cpf, phoneNumber, address })
    res.json({ userstreamer })
})




export default router