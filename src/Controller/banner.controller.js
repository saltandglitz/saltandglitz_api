const uploadImage = require("../middleware/upload");
const { banner_Services } = require("../Services")

module.exports.addBanner = async (req, res) => {
    let body = req.body
    let { path, originalname } = req.file;

    let cloud = await uploadImage(path, originalname);

    let newBody = {
        ...body,
        bannerImage: cloud.url,
    };

    try {
        let banner = await banner_Services.createBnner(newBody)

        return res.status(201).json({
            message: "BANNER POSTED SUCCESSFULLY",
            bannerUrl: banner
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

module.exports.getBanner = async (req, res) => {
    try {
        let banner = await banner_Services.getBanner()        

        const banners = banner.map((val, index) => {
            const { _id, ...body } = val.toObject()
            return {
                banner_id: _id,
                ...body
            }
        })
        if (banners.length === 0) {
            return res.status(404).json({ message: "YOU HAVE NO ANAY BANNER" })
        }

        res.status(200).json({
            message: "GET BANNER SUCCESSFULY",
            banners
        })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports.deleteBanner = async (req, res) => {
    let { id } = req.params
    let banner = await banner_Services.deleteBanner(id)
    res.status(200).json({
        message: "BANNER DELETED SUCCESSFULLY",
        banner
    })
}