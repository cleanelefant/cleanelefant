import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { astroImageTools } from "astro-imagetools";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [tailwind(), react(), astroImageTools, image()]
});