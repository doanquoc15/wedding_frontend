//import {
//  NEXT_CLOUDINARY_NAME,
//  NEXT_UPLOAD_PRESET,
//  NEXT_URL_CLOUD,
//} from "@/app/constant.env";
//import axios from "axios";

//export const UploadImage = async (pics: any) => {
//  if (!pics) {
//  } else if (pics.type.startsWith("image/")) {
//    const data = new FormData();
//    data.append("file", pics);
//    data.append("upload_preset", NEXT_UPLOAD_PRESET);
//    data.append("cloud_name", NEXT_CLOUDINARY_NAME);

//    try {
//      const response = await axios.post(NEXT_URL_CLOUD, data);
//      return response.data.secure_url;
//    } catch (error) {
//      console.log(error);
//    }
//  }
//};
