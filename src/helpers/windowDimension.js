export function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  // Return default dimensions or handle the error as desired
  return { width: 0, height: 0 };
}
