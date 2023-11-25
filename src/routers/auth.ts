import userViewer from '#/models/userViewer'
import userStreamer from '#/models/userStreamer'


import { Router } from 'express'

const router = Router()
router.post('/createViewerUser', async (req, res) => {
    const { email, password, name } = req.body
    //const newUserViewer = new userViewer({ email, password, name })
    //newUserViewer.save()
    const userviewer = await userViewer.create({ name, email, password })
    res.json({ userviewer })
})

router.post('/createStreamerUser', async (req, res) => {
    const { email, password, name, cpf, phoneNumber, address } = req.body
    //const newUserViewer = new userViewer ({email, password, name})
    //newUserViewer.save()
    const userstreamer = await userStreamer.create({ email, password, name, cpf, phoneNumber, address })
    res.json({ userstreamer })
})




export default router