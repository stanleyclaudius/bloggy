export const uploadImage = async(image, type) => {
  const formData = new FormData();
  formData.append("file", image);

  if (type === 'user')  {
    formData.append("upload_preset", "rxtjobdd");
  } else if (type === 'blogs') {
    formData.append("upload_preset", "jwgyqapk");
  } else if (type === 'thumbnail') {
    formData.append("upload_preset", "vbbsnwdg");
  }

  formData.append("cloud_name", "dpef9sjqt");

  const res = await fetch("https://api.cloudinary.com/v1_1/dpef9sjqt/image/upload", {
    method: "POST",
    body: formData
  });
  const data = await res.json();

  return({
    secure_url: data.secure_url,
    public_id: data.public_id
  });
}