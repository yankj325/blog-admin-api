
const Common=require('./common');
const CateModel=require('../models/cate');
const Constant = require('../constant/constant');
const dateFormat=require('dateformat');
// 定义一个对象
const exportObj = {
    list,
    info,
    add,
    update,
    remove
};
// 导出对象，方便其他方法调用
module.exports = exportObj;

function list(req,res){
    // 定义一个返回对象
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
        // 校验参数方法
        checkParams: (cb) => {
            if(req.query.dropList){
                cb(null)
            } else {
                Common.checkParams (req.query, ['page', 'rows'], cb);
            }
        },
        // 查询方法，依赖校验参数方法
        query: ['checkParams', (results, cb) => {
            let searchOption;
            if(req.query.dropList){
                searchOption={
                    order:[['created_at','DESC']]
                }
            }else {
                let offset=req.query.rows*(req.query.page-1)||0;
                let limit=parseInt(req.query.rows)||20;
                let whereCondition={};
                if(req.query.name){
                    whereCondition.name=req.query.name;
                }
                searchOption={
                    where:whereCondition,
                    offset:offset,
                    limit:limit,
                    order:[['created_at','DESC']]
                }
            }
            CateModel
                .findAndCountAll (searchOption)
                .then (function (result) {
                    // 查询结果处理
                        let list = [];
                        result.rows.forEach((v, i) => {
                            let obj = {
                                id: v.id,
                                name: v.name,
                                createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
                            };
                            list.push(obj);
                        });
                        // 如果查询到了结果
                        // 组装数据，将查询结果组装到成功返回的数据中
                        resObj.data = {
                            list,
                            count: result.count
                        };
                        cb(null)
                    })
                    .catch (function (err) {
                    // 错误处理
                    // 打印错误日志
                    console.log (err);
                    // 传递错误信息到async最终方法
                    cb (Constant.DEFAULT_ERROR);
                });
        }]
        };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)
}

function info(req,res){
    // 定义一个返回对象
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
        // 校验参数方法
        checkParams: (cb) => {
            // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
            Common.checkParams (req.params, ['id'], cb);
        },
        // 查询方法，依赖校验参数方法
        query: ['checkParams', (results, cb) => {
            // 使用admin的model中的方法查询
            CateModel
                .findByPk (req.params.id)
                .then (function (result) {
                    // 查询结果处理
                    // 如果查询到结果
                    if(result){
                        // 将查询到的结果给返回对象赋值
                        resObj.data = {
                            id: result.id,
                            name: result.name,
                            createdAt: dateFormat (result.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        // 继续后续操作
                        cb(null);
                    }else{
                        // 查询失败，传递错误信息到async最终方法
                        cb (Constant.CATE_NOT_EXSIT);
                    }
                })
                .catch (function (err) {
                    // 错误处理
                    // 打印错误日志
                    console.log (err);
                    // 传递错误信息到async最终方法
                    cb (Constant.DEFAULT_ERROR);
                });

        }]
    };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)

};
function add(req,res){
    // 定义一个返回对象
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
        // 校验参数方法
        checkParams: (cb) => {
            // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
            Common.checkParams (req.body, [ 'name'], cb);
        },
        // 添加方法，依赖校验参数方法
        add: cb => {
            // 使用admin的model中的方法插入到数据库
            CateModel
                .create ({
                    name: req.body.name,

                })
                .then (function (result) {
                    // 插入结果处理
                    // 继续后续操作
                    cb (null);
                })
                .catch (function (err) {
                    // 错误处理
                    // 打印错误日志
                    console.log (err);
                    // 传递错误信息到async最终方法
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)

};
function update(req,res){
    // 定义一个返回对象
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
        // 校验参数方法
        checkParams: (cb) => {
            // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
            Common.checkParams (req.body, ['id',  'name'], cb);
        },
        // 更新方法，依赖校验参数方法
        update: cb => {
            // 使用admin的model中的方法更新
            CateModel
                .update ({
                    name: req.body.name
                }, {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (result) {
                    // 更新结果处理
                    if(result[0]){
                        // 如果更新成功
                        // 继续后续操作
                        cb (null);
                    }else{
                        // 更新失败，传递错误信息到async最终方法
                        cb (Constant.CATE_NOT_EXSIT);
                    }
                })
                .catch (function (err) {
                    // 错误处理
                    // 打印错误日志
                    console.log (err);
                    // 传递错误信息到async最终方法
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)

};
function remove(req,res){
    // 定义一个返回对象
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
        // 校验参数方法
        checkParams: (cb) => {
            // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
            Common.checkParams (req.body, ['id'], cb);
        },
        remove: cb => {
            // 使用admin的model中的方法更新
            CateModel
                .destroy ({
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (result) {
                    // 删除结果处理
                    if(result){
                        // 如果删除成功
                        // 继续后续操作
                        cb (null);
                    }else{
                        // 删除失败，传递错误信息到async最终方法
                        cb (Constant.CATE_NOT_EXSIT);
                    }
                })
                .catch (function (err) {
                    // 错误处理
                    // 打印错误日志
                    console.log (err);
                    // 传递错误信息到async最终方法
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)

}
