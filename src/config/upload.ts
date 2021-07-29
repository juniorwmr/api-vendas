import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  dest: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, cb) {
      const filename = `${request.user.id}-${file.originalname}`;

      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
};
