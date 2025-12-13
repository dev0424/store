import { MiddlewareRoute } from '@medusajs/medusa';
import {
    authenticate,
    MedusaRequest,
    MedusaResponse,
    MedusaNextFunction,
} from '@medusajs/framework/http';
import multer from 'multer';

const MAX_FILE_SIZE_MB = 5;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
    fileFilter: (_, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
            return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
        }
        callback(null, true);
    },
});

const uploadMiddleware = (
    request: MedusaRequest,
    response: MedusaResponse,
    next: MedusaNextFunction,
) => {
    upload.array('files')(request, response, error => {
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res
                    .status(400)
                    .json({ error: `File too large. Max ${MAX_FILE_SIZE_MB}MB.` });
            }
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return response.status(400).json({ error: 'Invalid file type.' });
            }
        }
        next(error);
    });
};

export const registerMiddleware: MiddlewareRoute[] = [
    {
        matcher: '/store/register',
        methods: ['POST'],
        middlewares: [authenticate('customer', ['bearer'], { allowUnregistered: true })],
    },
    {
        matcher: '/store/register/files',
        methods: ['POST'],
        middlewares: [uploadMiddleware],
    },
];
