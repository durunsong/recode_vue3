import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginRequireTransform from "vite-plugin-require-transform";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_NAME, VITE_APP_versionCode, VITE_APP_BASE_API } = env;
  
  // 打包文件名称 ===== 文件名称加上版本号
  const fileName = `${VITE_APP_NAME}${VITE_APP_versionCode}`;
  
  return {
    plugins: [
      vue(),
      vitePluginRequireTransform({
        fileRegex: /.js$|.vue$/
      }),
      viteMockServe({
        mockPath: "./src/mock", // 设置模拟数据的存储文件夹
        supportTs: true, // 是否读取ts文件模块
        logger: true, // 是否在控制台显示请求日志
        localEnabled: command === "serve", // 开发环境设置是否启用本地mock文件(使用mockjs)
        prodEnabled: true, // 设置打包是否启用 mock 功能
        bundled: false, // 禁用生成 bundled 文件
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    base: './',
    server: {
      host: "0.0.0.0",
      port: 3100,
      open: true,
      cors: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: "http://47.94.148.165",
          changeOrigin: true,
          rewrite: (path: string) =>
            path.replace(new RegExp(`^${VITE_APP_BASE_API}`), ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/mixin.scss";',
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: "terser",
      outDir: fileName,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: "js/[name].[hash].js",
          chunkFileNames: "js/[name].[hash].js",
          assetFileNames: (assetInfo) => {
            const extType = /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name)
              ? "media"
              : /\.(png|jpe?g|gif|svg)$/i.test(assetInfo.name)
              ? "img"
              : /\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)
              ? "fonts"
              : "assets";
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },
  };
});
