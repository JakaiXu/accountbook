//导入 lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../../data/db.json");
//获取 db 对象
const db = low(adapter);
//导入 shortid
const shortid = require("shortid");
//导入 moment
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");

//测试
// console.log(moment('2023-02-24').toDate())
//格式化日期对象
// console.log(moment(new Date()).format('YYYY-MM-DD'));
// declare check login middleware
const checkLoginMiddleware = require("../../middlewares/loginmiddleware");
const express = require("express");
const router = express.Router();
//记账本的列表
router.get("/account", checkLoginMiddleware, async function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  //读取集合信息

  try {
    await AccountModel.find({})
      .sort({ time: -1 })
      .exec()
      .then((accounts) => {
        res.render("list", { accounts: accounts, moment: moment });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", checkLoginMiddleware, async function (req, res, next) {
  try {
    res.redirect("/account");
  } catch (err) {
    res.render("error");
  }
});

//添加记录
router.get(
  "/account/create",
  checkLoginMiddleware,
  async function (req, res, next) {
    try {
      res.render("create");
    } catch (err) {
      res.render("error");
    }
  }
);

//新增记录
router.post("/account", checkLoginMiddleware, async (req, res) => {
  console.log(req.body);
  //插入数据库
  try {
    await AccountModel.create(
      {
        ...req.body,
        //修改 time 属性的值
        time: moment(req.body.time).toDate(),
      },

      //成功提醒
      res.render("success", { msg: "添加成功哦~~~", url: "/account" })
    );
  } catch (err) {
    res.status(500).send("插入失败~~");
  }
});

//删除记录
router.get("/account/:id", checkLoginMiddleware, async (req, res) => {
  //获取 params 的 id 参数
  try {
    let id = req.params.id;
    //删除
    const result = await AccountModel.deleteOne({ _id: id });
    //提醒
    if (result.deletedCount > 0) {
      res.render("success", { msg: "删除成功~~~", url: "/account" });
    } else {
      res.status(404).send("no data mathes!");
    }
  } catch (err) {
    res.status(500).send("删除失败~");
  }
});

module.exports = router;
