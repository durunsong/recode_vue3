import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginRequireTransform from "vite-plugin-require-transform";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  console.log('Current working directory:', process.cwd());

  const env = loadEnv(mode, process.cwd());
  // const { VITE_APP_NAME, VITE_APP_versionCode, VITE_APP_BASE_API } = env;

  // 输出环境变量进行调试
  // console.log('VITE_APP_NAME:', VITE_APP_NAME);
  // console.log('VITE_APP_versionCode:', VITE_APP_versionCode);
  // console.log('VITE_APP_BASE_API:', VITE_APP_BASE_API);

  // 打包文件名称 ===== 文件名称加上版本号
  // const fileName = `${VITE_APP_NAME}${VITE_APP_versionCode}`;

  // if (!VITE_APP_NAME || !VITE_APP_versionCode) {
  //   throw new Error('VITE_APP_NAME or VITE_APP_versionCode is not defined in .env file');
  // }

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
      open: false,
      cors: true,
      proxy: {
        ['/api']: {
          target: "http://47.94.148.165",
          changeOrigin: true,
          rewrite: (path: string) =>
            path.replace(new RegExp(`^/api`), ""),
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
      outDir: 'dist',
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
          assetFileNames: (assetInfo :any) => {
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
