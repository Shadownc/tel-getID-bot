const { Telegraf } = require('telegraf');

// 获取环境变量中的BOT_TOKEN
const bot = new Telegraf(process.env.BOT_TOKEN);

// 设置命令菜单
bot.telegram.setMyCommands([
    { command: 'getme', description: '获取你的用户ID' },
    { command: 'getgroupid', description: '获取群组ID（群组内使用）' },
    { command: 'help', description: '获取帮助信息' }
]).then(() => {
    console.log('命令菜单设置成功');
}).catch((error) => {
    console.error('设置命令菜单时出错:', error);
});

// 帮助消息
const helpMessage = `
👋 欢迎使用本机器人！

你可以使用以下指令：

- /getme 获取你的用户ID。
- /getgroupid 获取当前群组的ID（需要将机器人加入群组）。
- /help 查看帮助信息。

请注意，/getgroupid 指令只能在群组或超级群组中使用。如果在私聊中使用该指令，将会提示您需要将机器人邀请进群组。
`;

// 处理 /start 指令
bot.start((ctx) => {
    ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});

// 处理 /help 指令
bot.help((ctx) => {
    ctx.reply(helpMessage, { parse_mode: 'Markdown' });
});

// 处理 /getme 和 /getgroupid 指令
bot.on('message', async (ctx) => {
    console.log('收到消息：', ctx.message);
    
    // 获取用户 ID 和聊天 ID
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const chatType = ctx.chat.type;

    // 获取消息中的命令（去掉可能的 @botname 后缀）
    const messageText = ctx.message.text ? ctx.message.text.split('@')[0] : '';

    // 处理 /getme 指令
    if (messageText === '/getme') {
        ctx.reply(`👤 **你的用户ID:** ${userId}`, { parse_mode: 'Markdown' });
        return;
    }

    // 处理 /getgroupid 指令
    if (messageText === '/getgroupid') {
        if (chatType === 'group' || chatType === 'supergroup') {
            ctx.reply(`📌 **群组ID:** ${chatId}`, { parse_mode: 'Markdown' });
        } else {
            ctx.reply('⚠️ 请将机器人邀请进群组后再调用 /getgroupid 指令。');
        }
        return;
    }
});

// 处理 Webhook 请求
module.exports = async (req, res) => {
    try {
        // 处理来自 Telegram 的更新
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } catch (error) {
        console.error('处理更新时出错:', error);
        res.status(500).send('内部服务器错误');
    }
};
