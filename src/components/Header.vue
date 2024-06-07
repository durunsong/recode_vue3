<template>
  <el-header class="top">
    <component
      v-if="isCollapse == true"
      :is="Expand"
      @click="handleClick"
      class="expandFold"
    >
    </component>
    <component v-else :is="Fold" @click="handleClick" class="expandFold">
    </component>
    <div class="avatar_dropdown">
      <el-avatar
        v-if="userInfo && userInfo !== null"
        class="avatar_img"
        :size="50"
        :src="emptyImage"
        @error="errorHandler"
      >
        <img :src="userInfo.userInfo.avatar" />
      </el-avatar>
      <el-dropdown @command="quitOut">
        <span class="el-dropdown-link">
          <span v-if="userInfo && userInfo !== null"
            >你好: {{ userInfo.userInfo.loginName }}</span
          >
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">关于</el-dropdown-item>
            <el-dropdown-item command="q">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ArrowDown, Expand, Fold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computed, watch, ref } from "vue";
// 导入 pinia 中的 storeToRefs 方法
// import { storeToRefs } from "pinia";
// 导入 pinia 实例
import { userPomotionStore } from "@/store";

const emptyImage = ref("");
// 实例化容器
const router = useRouter();
const store = userPomotionStore();
const userInfo = computed(() => {
  return store.userInfo;
  console.log("00000++++",store.userInfo);
  
});
// 让数据具有响应式
// const { isCollapse } = storeToRefs(store.$state.isCollapse);
const isCollapse = computed(() => {
  return store.isCollapse;
});
// watch(isCollapse<any>, (newValue, oldValue) => {
//   isCollapse = newValue;
// });
const errorHandler = () => {
  emptyImage.value = "../assets/images/dog.jpg";
};
// 调用store方法
const handleClick = () => {
  store.statusChange();
};

const quitOut = (str: any) => {
  switch (str) {
    case "a":
      ElMessage({
        message: "暂不处理",
        type: "warning",
      });
      break;
    case "q":
      localStorage.removeItem("token");
      store.$state.userInfo = {};
      router.push("/login");
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.top {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: right;
  font-size: 14px;
  height: 100px;
  width: 100%;
  background-color: #d2cbcb;
  .expandFold {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .avatar_dropdown {
    display: flex;
    .avatar_img {
      margin-top: -10px;
      margin-right: 10px;
    }
  }
}
.el-dropdown-link {
  outline: none;
  &:hover {
    outline: none;
  }
}
</style>
