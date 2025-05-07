const multer = require('multer')
const fs = require('fs') //file system
const path = require('path') //file access

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let dstn = 'public/uploads'
        if(!fs.existsSync(dstn)){
            fs.mkdirSync(dstn, {recursive: true})
        }
            cb(null, dstn)
    },
    filename: function (req, file, cb) {
        // apple.jpg(orginal name)
        // .jpg(extname)
        // apple(basename)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      let extname = path.extname(file.originalname)
      let basename = path.basename(file.originalname,extname)  

      let final_file_name = file.fieldname + '-' + basename + '-' + uniqueSuffix + extname

      cb(null, final_file_name)
    }
  })

  const fileFilter = (req, file, cb)=>{
    if(!file.originalname.match(/[.](jpg|JPG|png|PNG|gif|GIF|svg|SVG|jpeg|JPEG)$/)){
        cb(new Error("Invalid file type", false))
    }
    cb(null, true)
  }
  
  exports.upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 200000
    },
    fileFilter: fileFilter
 })

  