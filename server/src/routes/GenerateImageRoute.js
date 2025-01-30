import { Router } from 'express'
import { generateImage } from '../controller/GenerateImageAI.js'

const router = Router()

router.post('/' , generateImage)

export default router