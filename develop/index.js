var glob=require("glob");
var path=require("path");
var process = require("child_process");
var fs = require("fs");
var chokidar = require("chokidar");
var config = require("./config.js");
var tools = require("./tools.js");
const chalk = require('chalk');

// var  filesPathArr=[];
// glob(config.src,function (er, files) {
//   files.map(item=>{
//     filesPathArr.push(path.resolve(__dirname,"../"+item));
//   });
//
//     // filesPathArr.map(item=>{
//     //   process.exec("lessc "+item+" "+item.replace(".less",".css"));
//     // });
//
//   filesPathArr.map(item=>{
//     fs.watch(item, function (event, filename) {
//       console.log("file=>>>" + event);
//       if (filename) {
//         console.log("filename=>>>: " + filename);
//         console.log("file to less=>>>: " + filename);
//         process.exec("lessc "+item+" "+item.replace(".less",".wxss"));
//       } else {
//         console.log("filename not provided");
//       }
//     });
//   });
//
//   console.log(">>>less文件监听已开启<<<");
//   console.log(">>>新建less文件需要重新运行 npm start 才可监听到<<<");
// });

//建立命令行，编译less文件为wxss文件
function compileLess(filepath){
  process.exec("lessc "+filepath+" "+filepath.replace(".less",".wxss"));
}

//===================
var ready = false;
// 文件新增时 若文件为less文件 则将其编译为wxss文件至其所在目录
function addFileListener(path_) {
  if (ready) {
    var isLess = tools.isLessFile(path_);
    if (isLess) {
      compileLess(path_);
    }
    console.log(chalk.green("File", path_, "has been added"));
  }
}

//增加目录时 不做操作
function addDirecotryListener(path) {
  if (ready) {
    console.log(chalk.green("Directory", path, "has been added"));
  }
}

// 文件内容改变时 同样判断是否为less文件，若是则编译文件为wxss
function fileChangeListener(path_) {
  var isLess = tools.isLessFile(path_);
  if (isLess) {
    compileLess(path_);
  }
  console.log(chalk.green("File", path_, "has been changed"));
}

// 删除文件时不做操作
function fileRemovedListener(path_) {
  console.log(chalk.green("File", path_, "has been removed"));
}

// 删除目录时不做操作
function directoryRemovedListener(path) {
  console.log(chalk.green("Directory", path, "has been removed"));
}
//监听目录改变
var watcher = chokidar.watch(config.src);
watcher
.on("add", addFileListener)
.on("addDir", addDirecotryListener)
.on("change", fileChangeListener)
.on("unlink", fileRemovedListener)
.on("unlinkDir", directoryRemovedListener)
.on("error", function (error) {
  console.log(chalk.red("Error happened", error));
})
.on("ready", function () {
  console.log(chalk.green(">>>less文件监听已开启<<<"));
  ready = true;
});
