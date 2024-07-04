import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import list from "./data.json";
import fs from "fs";
import path from "path";

const mock: MockMethod[] = [
  // 获取列表（包含分页和搜索功能）
  {
    url: "/api/list",
    method: "get",
    response: (req: any) => {
      const { page, pageSize, keyword } = req.query;
      const filteredList = list.filter(
        (item) =>
          item.name.includes(keyword) || item.description.includes(keyword)
      );
      const paginatedList = filteredList.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      return {
        status: 200,
        message: "success",
        data: paginatedList,
        page: parseInt(page, 10),
        pageSize: parseInt(pageSize, 10),
        total: filteredList.length,
      };
    },
  },
  // 添加项目
  {
    url: "/api/list",
    method: "post",
    response: (req: any) => {
      const { name, description } = req.body;
      const id = list.length ? list[list.length - 1].id + 1 : 1;
      const newItem = { id, name, description };
      list.push(newItem);
      // 将新项目添加到 data.json 文件中
      const dataFilePath = path.join(__dirname, "data.json");
      fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2));
      return {
        status: 200,
        message: "Item added successfully",
        data: newItem,
      };
    },
  },
  // 更新项目
  {
    url: "/api/list/:id",
    method: "put",
    response: (req) => {
      const ids = req.query.id;
      const { name, description } = req.body;
      const item = list.find((item) => item.id === parseInt(ids));
      if (item) {
        item.name = name;
        item.description = description;
        // 将更新后的列表保存到 data.json 文件中
        const dataFilePath = path.join(__dirname, "data.json");
        fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2));
        return {
          status: 200,
          message: "Item updated successfully",
          data: item,
        };
      } else {
        return {
          status: 404,
          message: "Item not found",
        };
      }
    },
  },
  // 删除项目
  {
    url: "/api/list/:id",
    method: "delete",
    response: (option) => {
      const ids = option.query.id;
      const itemId = parseInt(ids, 10);
      const index = list.findIndex((v) => v.id === itemId);
      if (index !== -1) {
        // 从列表中删除项目
        list.splice(index, 1);
        const dataFilePath = path.join(__dirname, "data.json");
        fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2));
        return {
          status: 200,
          message: "Item deleted successfully",
        };
      } else {
        return {
          status: 404,
          message: "Item not found",
        };
      }
    },
  },
];

export default mock;
