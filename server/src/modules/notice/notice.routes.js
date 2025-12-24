import { Router } from 'express'
import { noticeController } from './notice.controller.js'

const router = Router();

router.post('/v1/notices', noticeController.noticeCreate)
router.get('/v1/notices', noticeController.getAllNotice)
router.get('/v1/notices/:id', noticeController.getNoticeById)
router.put('/v1/notices/:id', noticeController.updateNotice)


export const noticeRoutes = router
