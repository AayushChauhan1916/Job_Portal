let url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_NAME
}/auto/upload`;

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "JobPortal");

    // Check file type and set the resource type accordingly
    const resourceType = file.type === "application/pdf" ? "raw" : "auto";

    url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/${resourceType}/upload`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Upload error:", error);
    return error;
  }
};

export default uploadFile;
