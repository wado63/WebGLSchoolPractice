const fs = require("fs");
const path = require("path");

const dir = "./src/works"; // ← 変更してね
const addHead = "textBox_"; // ← 変更してね
const fileNameList = fs.readdirSync(dir);
console.log(fileNameList);

const entryPoints = fileNameList.reduce((a, c) => {
  const filename = c.replace(/\.ts/, "");
  const filePath = `./src/${c}`;

  return Object.assign(a, { [filename]: filePath });
}, {});

console.log(entry);

// targetFileNames.forEach(fileName => {
//   // console.log(fileName)
//   const filePath = {};
//   const newName = addHead + fileName;
//   filePath.before = path.join(dir, fileName);
//   filePath.after = path.join(dir, newName);
//   // console.log(filePath);
//   fs.rename(filePath.before, filePath.after, err => {
//     if (err) throw err;
//     console.log(filePath.before + "-->" + filePath.after);
//   });
// });
