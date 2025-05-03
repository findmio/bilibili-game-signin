# Worker 使用步骤

## 安装

```bash
npm install
```

## 配置环境变量

更新 `wrangler.jsonc` 文件中 `vars.COOKIE` 字段的值为你的 Cookie，`vars.ACTIVITY_ID` 字段为活动 ID

## 部署

```bash
npm run deploy
```

## 说明
- 已配置定时任务，北京时间 00:00 执行一次，如需修改，请更新 `wrangler.jsonc` 文件中的 `triggers` 字段
