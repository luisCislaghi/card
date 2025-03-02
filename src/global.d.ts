// Type declaration for importing GLSL shader files as strings
declare module "*.glsl" {
  const content: string;
  export default content;
}
