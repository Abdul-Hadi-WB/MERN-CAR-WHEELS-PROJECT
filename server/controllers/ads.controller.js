import { AWSS3 } from "../config/aws-ses.js";
import { nanoid } from "nanoid";

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    const base64Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = image.split(";")[0].split("/")[1];

    const params = {
      Bucket: "hadiswheelsbucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Image,
      ACL: "public-read", 
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    AWSS3.upload(params, (err, data) => {
      if (err) {
       console.log(err);
       res.sendStatus(400)
      }
      else{
     console.log(data);
     res.send(data)
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ error:"Upload Failed...try again"})
  }
};
export const deleteImage = (req, res) => {
    try {
        const { Key, Bucket } = req.body;
        AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ ok: true });
            }
        });
    } catch (err) {
        console.log(err);
    }
};
