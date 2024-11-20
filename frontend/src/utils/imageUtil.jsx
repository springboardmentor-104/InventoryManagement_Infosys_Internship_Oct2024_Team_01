
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return `${process.env.REACT_APP_BACKEND_URL}/placeholder.jpg`; // Default image
  }
  return `${process.env.REACT_APP_BACKEND_URL}/${imagePath}`;
};

