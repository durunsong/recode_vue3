import { defineStore } from "pinia";
import type { MetaInfo, UserPromotionState, UserPromotionStateKeys } from "@/types/store"

export const userPomotionStore = defineStore("promotion", {
  state: (): UserPromotionState => {
    return {
      userInfo: {},
    isCollapse: false,
      metaInfo: {
        title: "",
        keywords: "",
        description: "",
      },
      affcode: "",
      // 推广oss链接 pc
      hagobuyLoginURL: "https://www.hagobuy.com/login",
      tuiguangURL: "https://cfstatic.hagoby.com/tg",
      hagobuy: "https://www.hagobuy.com",
      hagobuyURL: "https://www.hagobuy.com/register",
      hagobuyURLforwarding: "https://www.hagobuy.com/forwarding",
      imageUrl: "https://cfstatic.hagoby.com/www/pic",
      // 推广oss链接 mobile
      m_hagobuyLoginURL: "https://www.hagobuy.com/login",
      m_hagobuyURL: "https://www.hagobuy.com/register",
      m_hagobuy:"https://www.hagobuy.com",
    };
  },
  getters: {
    dynamicURLKeys:(state) =>(property: UserPromotionStateKeys): string => {
        if (state.affcode !== "") {
          return `${state[property]}?${state.affcode}`;
        } else {
          return (state[property] as string) || "";
        }
      },
    dynamicAffcode(state): string {
      if (state.affcode !== "") {
        return `&${state.affcode}`;
      } else {
        return "";
      }
    },
  },
  actions: {
    SetUserInfo(state: any, data: any) {
      state.userInfo = data;
    },
    statusChange(state: any) {
      this.isCollapse = !this.isCollapse;
    },
    // 动态设置meta信息的方法
    setMetaInfo({state}: any, metaInfo: MetaInfo): void {
      state.metaInfo = metaInfo;
    },
    // setState
    setState({ state } :any, payload: { [key: string]: any }) {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          state[key] = payload[key];
        }
      }
    },
  },
  persist: {
    enabled: true,
    // 指定需要持久化的状态以及它们在 localStorage 中的路径
    // strategies: [
    //   { storage: localStorage, paths: ['userInfo', 'isCollapse', 'metaInfo'] },
    // ],
  },
});
