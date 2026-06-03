# uniCloud 搭建任务

> 接手人：________ ｜ 开始时间：________ ｜ 完成时间：________

## 一、创建 uniCloud 服务空间

1. 打开 https://unicloud.dcloud.net.cn
2. 注册/登录 DCloud 账号
3. 点击「创建服务空间」
4. 选择云服务商：**阿里云**（推荐，微信小程序兼容最好）或腾讯云
5. 空间名称：`pididi-miniapp`
6. 付费模式：按量付费（开发阶段够用）
7. 创建完成后，复制 **SpaceID**

## 二、关联项目到服务空间

1. 打开 `pididi-miniapp` 项目
2. 在 VS Code 中打开 `src/manifest.json`
3. 找到「uni-app 应用标识」，点击「重新获取」，生成 AppID
4. 在项目根目录找到或创建 `uniCloud` 目录
5. 右键 `uniCloud` 目录 → 选择「关联云服务空间」
6. 粘贴刚才的 SpaceID

## 三、上传数据库 Schema（建表）

`uniCloud/database/` 下已有 5 个 Schema 文件，结构和权限都定义好了：

| Schema | 表名 | 用途 |
|---|---|---|
| `articles.schema.json` | 攻略文章 | 标题、分类、富文本内容、封面、浏览量 |
| `destinations.schema.json` | 目的地 | 名称、区域、封面、简介、排序 |
| `cta_config.schema.json` | CTA配置 | 四个转化触点的文案、活码、触发条件 |
| `user_collections.schema.json` | 用户收藏 | 用户-文章收藏关系 |
| `browse_history.schema.json` | 浏览历史 | 用户-文章浏览记录 |

操作：在 HBuilderX 或 VS Code 中，右键 `uniCloud/database` → 「上传所有 Schema」

## 四、初始化 uni-id（用户系统）

1. 右键 `uniCloud` 目录 → 「创建 uniCloud 云函数」
2. 选择 `uni-id` 模板
3. 上传云函数

## 五、验证

上传完成后，在 uniCloud 控制台 → 数据库，应该能看到 5 张表已创建。

把 SpaceID 发到群里，我和 admin 项目需要关联同一个空间。

## 有问题看这里

- uniCloud 文档：https://uniapp.dcloud.net.cn/uniCloud/
- 数据库 Schema 文档：https://uniapp.dcloud.net.cn/uniCloud/schema
