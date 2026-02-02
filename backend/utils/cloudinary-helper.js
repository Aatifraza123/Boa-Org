const cloudinary = require('../config/cloudinary');

/**
 * Extract public_id from Cloudinary URL
 * Example: https://res.cloudinary.com/demo/image/upload/v1234567890/boa-certificates/abc123.jpg
 * Returns: boa-certificates/abc123
 */
const getPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return null;
  }

  try {
    const parts = imageUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload' and version (v1234567890)
    const pathParts = parts.slice(uploadIndex + 2); // Skip 'upload' and version
    const fullPath = pathParts.join('/');
    
    // Remove file extension
    const publicId = fullPath.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    return null;
  }
};

/**
 * Delete image from Cloudinary
 */
const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = getPublicIdFromUrl(imageUrl);
    
    if (!publicId) {
      return { success: false, message: 'Invalid image URL' };
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  getPublicIdFromUrl,
  deleteImageFromCloudinary
};
