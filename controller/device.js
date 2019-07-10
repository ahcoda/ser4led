const Device = require("../model/device");
const Op = require("sequelize").Op;
const moment = require("moment");
const md5 = require("md5");

const list = async ctx => {
  const query = ctx.query;
  ctx.set("Access-Control-Allow-Origin", "*");

  var from =
    query.from ||
    moment("2019-01-1")
      .toDate()
      .getTime();
  var to =
    query.to ||
    moment("2029-01-01")
      .toDate()
      .getTime();

  const where = {
    os: {
      [Op.like]: `%${query.os || ""}%`
    },
    app: {
      [Op.like]: `%${query.app || ""}%`
    },

    createdAt: {
      [Op.gt]: new Date(from),
      [Op.lt]: new Date(to)
    }
  };
  const { rows: data, count: total } = await Device.findAndCountAll({
    where,
    offset: +query.index * +query.size,
    limit: +query.size,
    order: [["createdAt", "DESC"]]
  });

  const size = data.length;

  ctx.body = {
    code: 0,
    msg: "",
    data: {
      total,
      count: size,
      items: data
    }
  };
};

const listAll = async ctx => {
  const devices = await Device.findAll({
    order: [["createdAt", "DESC"]]
  });

  ctx.body = {
    code: 0,
    msg: "",
    data: {
      total: devices.length,
      items: devices
    }
  };
};

const create = async ctx => {
  const params = ctx.request.body;

  if (!params.mac) {
    ctx.body = {
      code: 1,
      msg: "mac为空"
    };
    return false;
  }

  if (!params.udid) {
    ctx.body = {
      code: 2,
      msg: "udid为空"
    };
    return false;
  }

  if (!params.app) {
    ctx.body = {
      code: 3,
      msg: "app 名称为空"
    };
    return false;
  }

  if (!params.os) {
    ctx.body = {
      code: 4,
      msg: "os为空"
    };
    return false;
  }

  if (!params.sn) {
    ctx.body = {
      code: 5,
      msg: "sn为空"
    };
    return false;
  }

  // 验证签名
  const hash4udid = md5(params.udid);
  const hash4mac = md5(params.mac);
  const hash4app = md5(params.app);

  const sm =
    hash4udid.substr(0, 6) + hash4mac.substr(0, 6) + hash4app.substr(0, 6);
  const sn_check = md5(sm).substr(0, 12);

  if (params.sn.toLowerCase() != sn_check.toLowerCase()) {
    ctx.body = {
      code: 6,
      msg: "sn验证失败"
    };
    return false;
  }

  try {
    const one = await Device.findOne({
      where: {
        mac: params.mac,
        udid: params.udid,
        app: params.app,
        os: params.os
      }
    });

    console.log(one);
    if (one == null) {
      await Device.create(params);
    } else {
      await one.update({
        use: one.use + 1
      });
    }
    ctx.body = {
      code: 0,
      msg: "创建成功"
    };
  } catch (err) {
    const msg = err.errors[0];
    ctx.body = {
      code: 300,
      msg: msg
    };
  }
  console.log(params);
  return true;
};

module.exports = {
  listAll,
  list,
  create
};
