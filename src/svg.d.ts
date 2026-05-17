// Vite ?raw import type declaration
declare module "*.svg?raw" {
  const content: string;
  export default content;
}
