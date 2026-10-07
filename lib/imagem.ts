import imageCompression from 'browser-image-compression'

export interface ImageCompressionOptions {
  maxWidthOrHeight?: number
  maxFileSizeMB?: number
  useWebWorker?: boolean
  fileType?: string
}

const defaultOptions: ImageCompressionOptions = {
  maxWidthOrHeight: 1600,
  maxFileSizeMB: 0.3,
  useWebWorker: true,
  fileType: 'image/webp',
}

export async function compressImage(
  file: File,
  options: ImageCompressionOptions = {},
): Promise<{ compressedFile: File; originalSizeKB: number; compressedSizeKB: number }> {
  const finalOptions = { ...defaultOptions, ...options }
  const originalSizeKB = Math.round(file.size / 1024)

  const compressedBlob = await imageCompression(file, finalOptions)
  const compressedSizeKB = Math.round(compressedBlob.size / 1024)

  const compressedFile = new File([compressedBlob], file.name.replace(/\.[^.]+$/, '.webp'), {
    type: 'image/webp',
    lastModified: Date.now(),
  })

  return { compressedFile, originalSizeKB, compressedSizeKB }
}

export async function compressImageToBase64(
  file: File,
  options: ImageCompressionOptions = {},
): Promise<string> {
  const { compressedFile } = await compressImage(file, options)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(compressedFile)
  })
}
