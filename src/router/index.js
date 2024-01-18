import { createRouter, createWebHistory } from "vue-router";
import StorageHelper from "../helper/StorageHelper";
import { state } from "../store";

const routes = [
  {
    path: "/box",
    name: "VoidCloud",
    redirect: { name: "VoidCloud-Folder", params: { folder: ["drive"] } },
    component: () => import("../views/VoidCloud.vue"),
    meta: { title: "雲端資料夾", auth: true },
    children: [
      {
        path: "folder/:folder*",
        name: "VoidCloud-Folder",
        meta: { title: "資料夾", auth: false },
        beforeEnter: async (to) => {
          const { folder } = to.params;
          if (!folder)
            return StorageHelper.token
              ? { name: "VoidCloud-Folder", params: { folder: ["drive"] } }
              : { name: "Login" };
          const path = folder?.join("/") || "/drive/";
          StorageHelper.client.setHeaders({
            ...StorageHelper.client.getHeaders(),
            ...(to.query.folder && { Folder: to.query.folder }),
          });
          const exists = await StorageHelper.client
            .exists(path)
            .catch(() => {});
          if (!exists)
            return path !== "/drive/" && StorageHelper.token
              ? { name: "VoidCloud" }
              : { name: "Login" };
        },
        component: () => import("../views/VoidCloudFolder.vue"),
      },
      {
        path: "computer",
        name: "VoidCloud-Computer",
        meta: { title: "我的電腦" },
        component: () => import("../views/VoidCloudComputer.vue"),
        show: "Computer",
      },
      {
        path: "trash",
        name: "VoidCloud-Trash",
        meta: { title: "垃圾桶" },
        component: () => import("../views/VoidCloudTrash.vue"),
        show: "Trash",
      },
    ],
  },
  {
    path: "/file",
    name: "File",
    meta: { title: "檔案" },
    component: () => import("../views/File.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登入" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/test",
    name: "Test",
    meta: { title: "測試" },
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/box/folder/drive",
    meta: { title: "雲端" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  console.log("[路由]", "->", to.name, "頁面");

  // 必須要登入的介面，自動跳轉到登入頁面
  if (to.meta.auth && !state.user) return { name: "Login" };

  // 如果要前往首頁，自動跳轉到自己的資料夾頁面
  // if (to.name === 'Box') return { name: 'Box-Folder' };

  // 跳轉登入頁面時，若已登入則跳轉到首頁
  if (to.name == "Login" && state.user)
    return { name: "VoidCloud-Folder", params: { folder: ["drive"] } };

  // 更新頁面標題
  window.document.title = to.meta.title + " - VoidCloud";
});

export default router;
