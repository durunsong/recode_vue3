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
              avatar:
                "http://img.crcz.com/allimg/202002/12/1581508930134676.jpg",
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
