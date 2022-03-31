export const changeImageUrl = (images, name) => {
  if (!images) return;
  const baseUrl = process.env[name === '업체' ? 'REACT_APP_STORE_IMG_URL' : 'REACT_APP_REVIEW_IMG_URL'];
  if (typeof images === 'object') {
    return images.map(({ id, image, imageIdentify, name }) => {
      return { id, name, image: `${baseUrl}/${image || imageIdentify}` };
    });
  } else {
    return `${baseUrl}/${images}`;
  }
};
