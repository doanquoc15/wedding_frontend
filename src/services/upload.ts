import axios from "axios";

import {
  NEXT_CLOUDINARY_NAME,
  NEXT_UPLOAD_PRESET,
  NEXT_URL_CLOUD,
} from "@/app/constant.env";

export const UploadImage = async (pics: any) => {
  console.log( NEXT_CLOUDINARY_NAME,
    NEXT_UPLOAD_PRESET,
    NEXT_URL_CLOUD);
  if (!pics) {
    return;
  } else if (pics.type.startsWith("image/")) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", NEXT_UPLOAD_PRESET as string);
    data.append("cloud_name", NEXT_CLOUDINARY_NAME as string);

    try {
      const response = await axios.post(NEXT_URL_CLOUD as string, data);
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  }
};
