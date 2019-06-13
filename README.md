# slight 及公版 设备使用情况统计服务器

## 一、接口文档

## 服务器地址

### 添加记录

1. 地址: `http://www.yiqibangbang.com:8080/led/create`
2. 方法: `post`
3. 参数:

| 字段名称   | 含义         | 类型   | 可空 | 示例        |
| ---------- | ------------ | ------ | ---- | ----------- |
| udid       | 手机 的 id   | string | 否   | xx-xx       |
| mac        | led 灯带 mac | string | 否   | GTK-01      |
| os         | 平台类型     | string | 否   | ios/android |
| app        | app 名称     | string | 否   | slight      |
| longtitude | 经度         | double | 是   | 33.0        |
| latitude   | 纬度         | double | 是   | 160.00      |

响应结果

```json
{
  code:0,
  msg:""
  data:{}
}
```

## 查询接口 1

- 地址: `/led/all`
- 方法: `get`
- 参数: 无

响应

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 3,
    "items": [
      {
        "createdAt": "2019-06-12 11:09",
        "updatedAt": "2019-06-12 11:09",
        "id": 12,
        "mac": "234xcvxfsdf",
        "longtitude": 33,
        "latitude": 33,
        "app": "slight",
        "os": "ios"
      },
      {
        "createdAt": "2019-06-12 10:27",
        "updatedAt": "2019-06-12 10:27",
        "id": 11,
        "mac": "234xcvxfsdf",
        "longtitude": 33,
        "latitude": 33,
        "app": "slight",
        "os": "ios"
      },
      {
        "createdAt": "2019-06-12 10:27",
        "updatedAt": "2019-06-12 10:27",
        "id": 10,
        "mac": "2342xvcsdfsdf",
        "longtitude": 33,
        "latitude": 33,
        "app": "slight",
        "os": "ios"
      }
    ]
  }
}
```

## 查询接口 2

- 地址: `/led/all`
- 方法: `get`
- 参数:

| 参数  | 含义               | 可空 | 示例        |
| ----- | ------------------ | ---- | ----------- |
| index | page index         | 否   | 0 从 0 开始 |
| size  | page size 分页大小 | 否   | 10          |
| os    | 平台类型           | 是   | ios/android |
| app   | app 名称           | 是   | slight      |
|       |                    |      |             |

响应报文

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 12,
    "count": 2,
    "items": [
      {
        "createdAt": "2019-06-12 11:09",
        "updatedAt": "2019-06-12 11:09",
        "id": 12,
        "mac": "234xcvxfsdf",
        "longtitude": 33,
        "latitude": 33,
        "app": "slight",
        "os": "ios"
      },
      {
        "createdAt": "2019-06-12 10:27",
        "updatedAt": "2019-06-12 10:27",
        "id": 11,
        "mac": "234xcvxfsdf",
        "longtitude": 33,
        "latitude": 33,
        "app": "slight",
        "os": "ios"
      }
    ]
  }
}
```

## 相关参数

1. 数据库名称为 led
   www.yiqibangbang.com

mysql: July3253^&
ssh root@47.95.114.42
chenhe@123
