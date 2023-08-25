var express = require("express");
var router = express.Router();
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

//记账本的列表
router.get("/account", async function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  //读取集合信息
  try {
    await AccountModel.find({})
      .sort({ time: -1 })
      .exec()
      .then((accounts) => {
        res.json({
          code: "0000",
          msg: "read success",
          data: accounts,
        });
      })
      .catch((error) => {
        res.json({
          code: "1001",
          msg: "read failed",
          data: null,
        });
      });
  } catch (error) {
    console.log(error);
  }
});
router.get("/account/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    await AccountModel.findById(id);
    res.json({
      code: "0000",
      msg: "read success",
      data: res.data,
    });
  } catch (err) {
    res.json({
      code: "1004",
      msg: "read failded",
      data: null,
    });
  }
});
router.patch("/account/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    await AccountModel.updateOne({_id:id},req.body);
    res.json({
      code: "0000",
      msg: "updated success",
      data: res.data,
    });
  } catch (err) {
    res.json({
      code: "1005",
      msg: "updated failded",
      data: null,
    });
  }
});
//新增记录
router.post("/account", async (req, res) => {
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
    res.json({
      code: "1002",
      msg: "create failed",
      data: null,
    });
  }
});

//删除记录
router.delete("/account/:id", async (req, res) => {
  //获取 params 的 id 参数
  try {
    let id = req.params.id;
    //删除
    const result = await AccountModel.deleteOne({ _id: id });
    //提醒
    if (result.deletedCount > 0) {
      res.json({
        code: "0000",
        msg: "deleted success",
        data: {},
      });
    } else {
      res.status(404).send("no data mathes!");
    }
  } catch (err) {
    res.json({
      code: "1003",
      msg: "deleted success",
      data: null,
    });
  }
});

module.exports = router;
