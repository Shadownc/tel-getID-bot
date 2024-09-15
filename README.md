# tel-getID-bot

这是一个基于 [Telegraf](https://telegraf.js.org/) 的 Telegram 机器人，支持获取用户 ID、获取群组 ID 以及查看帮助信息。

## 功能

- `/getme`: 获取你的 Telegram 用户 ID。
- `/getgroupid`: 获取当前群组的 ID（只能在群组或超级群组中使用）。
- `/help`: 查看帮助信息。

## 部署到 Vercel

你可以使用以下按钮一键部署该`Telegram`机器人到 [Vercel](https://vercel.com)：

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Shadownc/tel-getID-bot)

## 环境变量

在部署到`Vercel`时，你需要设置以下环境变量：

- `BOT_TOKEN`: 你的`Telegram Bot`的`API TOKEN`令牌，可以通过 [BotFather](https://t.me/BotFather) 获取。

## Webhook 设置

部署到`Vercel`后，请使用以下命令为你的`Bot`设置`Webhook`：

```bash
curl https://api.telegram.org/bot<Your-Bot-Token>/setWebhook?url=https://your-project-name.vercel.app/

```
## 浏览器打开链接检查`Webhook`的状态
```
https://api.telegram.org/bot<Your-Bot-Token>/getWebhookInfo
```