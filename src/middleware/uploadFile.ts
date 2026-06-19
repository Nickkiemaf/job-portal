import type { Request, Response } from "express"
import multer, { type Multer } from "multer"
import fs from "fs"
import path from "path"

export const createDir = (dirName: string) => {

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true })
  }
}

export const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    let parentPath = "upload/"
    if (req.originalUrl.includes("signup")) {
      parentPath += "logo/"
    } else {
      parentPath += "application/"
    }

    createDir(parentPath)

    cb(null, parentPath)
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  }
})

// const fileFilter = (req: Request, file: Multer, cb) => {
//   const allowedExtension = [".pdf", ".jpg", ".png", ".jpeg", ".docx"]
//   const allowedMimeType = ["image/jpeg)"]
//   const fileExtension = path.extname(file)
// }

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,

  }
})
