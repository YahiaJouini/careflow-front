import axios from "axios"

// TODO: to be changed into an api endpoint
const CLOUDINARY_CLOUD_NAME = "dcpldhzsd"
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "careflow_preset")
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
    return response.data.secure_url
  } catch (error: any) {
    if (formData.get("upload_preset") !== "default") {
        formData.set("upload_preset", "default")
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            )
            return response.data.secure_url
        } catch (retryError) {
             throw new Error("Image upload failed. Please try again.")
        }
    }
    
    throw new Error("Image upload failed. Please try again.")
  }
}
