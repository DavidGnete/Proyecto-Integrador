import { v2 as cloudinary } from "cloudinary";

const stripQuotes = (v?: string) => {
  if (!v) return v;
  return v.replace(/^"(.*)"$/, "$1").replace(/^\'(.*)\'$/, "$1");
};

cloudinary.config({
  cloud_name: stripQuotes(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: stripQuotes(process.env.CLOUDINARY_API_KEY) || process.env.CLOUDINARY_API_KEY,
  api_secret: stripQuotes(process.env.CLOUDINARY_API_SECRET) || process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
