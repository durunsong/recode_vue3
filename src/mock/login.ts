import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const mock: Array = [
  {
    url: "/api/login",
    method: "post",
    response: (req: any, res: any) => {
      const { userName, password } = req.body;
      if (userName === "admin" && password === "123456") {
        return {
          status: 200,
          message: "登录成功",
          data: {
            token: "mock_token_eyJhbGciOiJIUzUxMiJ9",
            userInfo: {
              id: 1,
              loginName: "admin",
              nickName: "管理员",
              roleIds: [179, 202, 211],
              logo: "https://img0.baidu.com/it/u=3829523954,2467234884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
              avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc9d7d4d6-4faa-425f-b014-ea27898c58cc%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1720362980&t=0351632c12f7d58761f42b04b1e5e444",
            },
          },
        };
      } else if (userName === "admin" && password !== "123456") {
        return {
          status: 403,
          message: "登录密码错误!",
        };
      } else {
        return {
          status: 401,
          message: "用户名或密码错误",
        };
      }
    },
  },
  {
    url: "/api/getData",
    method: "get",
    response: () => {
      return {
        status: 200,
        message: "success",
        data: {
          name: "张三",
        },
      };
    },
  },
];

export default mock;
