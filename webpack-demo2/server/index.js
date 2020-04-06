const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();

// 创建 router 实例对象
const router = new KoaRouter();

// 注册路由
router.get('/user', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: {
      name: '阿林十一'
    },
    msg: 'success'
  };
});

app.use(router.routes());  // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理

app.listen(9001);

