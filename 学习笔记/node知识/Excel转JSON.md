nodejs中有什么npm包支持把Excel文件转换为JSON格式吗？

在 Node.js 中，有多个 npm 包可以将 Excel 文件转换为 JSON 格式。以下是一些常用的 npm 包：

1. xlsx：这是一个强大的库，支持读取和写入 Excel 文件，并可以将 Excel 文件转换为 JSON 格式。

1. exceljs：这是另一个功能强大的库，支持创建、读取和操作 Excel 文件，同样可以将 Excel 文件转换为 JSON 格式。

\### 使用 `xlsx` 库

以下是使用 `xlsx` 库将 Excel 文件转换为 JSON 格式的示例代码：

\#### 安装 `xlsx` 包

```sh
npm install xlsx
```

\#### 示例代码

```javascript
const xlsx = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const workbook = xlsx.readFile('path/to/your/excel-file.xlsx');

// 获取第一个工作表
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 将工作表转换为 JSON 格式
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 输出 JSON 数据
console.log(jsonData);

// 将 JSON 数据写入文件
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));
```

\### 使用 `exceljs` 库

以下是使用 `exceljs` 库将 Excel 文件转换为 JSON 格式的示例代码：

\#### 安装 `exceljs` 包

```sh
npm install exceljs
```

\#### 示例代码

```javascript
const ExcelJS = require('exceljs');
const fs = require('fs');

async function convertExcelToJson() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('path/to/your/excel-file.xlsx');

  const worksheet = workbook.getWorksheet(1); // 获取第一个工作表
  const jsonData = [];

  worksheet.eachRow((row, rowNumber) => {
    const rowValues = row.values.slice(1); // 去除第一个空值
    jsonData.push(rowValues);
  });

  // 输出 JSON 数据
  console.log(jsonData);

  // 将 JSON 数据写入文件
  fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));
}

convertExcelToJson();
```

说明

1. `xlsx` 库：

- `xlsx.readFile('path/to/your/excel-file.xlsx')`：读取 Excel 文件。

- `workbook.SheetNames[0]`：获取第一个工作表的名称。

- `xlsx.utils.sheet_to_json(worksheet)`：将工作表转换为 JSON 格式。

1. `exceljs` 库：

- `workbook.xlsx.readFile('path/to/your/excel-file.xlsx')`：读取 Excel 文件。

- `workbook.getWorksheet(1)`：获取第一个工作表。

- `worksheet.eachRow((row, rowNumber) => {...})`：遍历工作表中的每一行，并将其转换为 JSON 格式。

通过以上示例代码，您可以轻松地将 Excel 文件转换为 JSON 格式，并根据需要进行进一步处理。