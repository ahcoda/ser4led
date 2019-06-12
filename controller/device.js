const Device = require("../model/device");
const Op = require("sequelize").Op;

const list = async ctx => {
  const query = ctx.query;

  console.log(query);

  const where = {
    os: {
      [Op.like]: `%${query.os || ""}%`
    },
    app: {
      [Op.like]: `%${query.app || ""}%`
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
      msg: "mac 不可以为空"
    };
    return false;
  }

  try {
    await Device.create(params);
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
