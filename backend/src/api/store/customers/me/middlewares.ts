import { MiddlewareRoute } from '@medusajs/medusa';
import { MedusaRequest, MedusaResponse, MedusaNextFunction } from '@medusajs/framework/http';
import multer from 'multer';
import { MAX_UPLOAD_FILE_SIZE_MB } from 'lib/constants';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024 },
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
                return response
                    .status(400)
                    .json({ error: `File too large. Max ${MAX_UPLOAD_FILE_SIZE_MB}MB.` });
            }
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return response.status(400).json({ error: 'Invalid file type.' });
            }
        }
        next(error);
    });
};

export const customersMiddleware: MiddlewareRoute[] = [
    {
        matcher: '/store/customers/me/files',
        methods: ['POST'],
        middlewares: [uploadMiddleware],
    },
];
