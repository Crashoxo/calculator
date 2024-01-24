// 計算開始 參考資料
// https://github.com/woai3c/Front-end-articles/issues/15

let tokenKey = "";
let tokensKey = []; //陣列倉庫

// 1. 字串進來 轉 陣列 清掉空白輸入值
function lexicalAnalysis(expression) {
  // console.log('字串進來',expression);
  // const symbol = ["(", ")", "+", "-", "*", "/"];
  // const re = /\d/;  //正則表達式 數字

  // const tokens = []; //陣列倉庫
  // const chars = expression.trim().split(""); // 去兩邊空白，轉陣列
  // console.log('chars',chars);
  // let token = ""; //初始化
  // chars.forEach((c) => {
  //   if (re.test(c) || "." ) {
  //     // 數字 test() 是否符合正則表達式 回傳Boolean
  //     // (1) 數字 進 字串
  //     console.log('數字進來',c);
  //     token += c;
  //   } else if (c == " " && token) {
  //     // 去中間的空白 (防呆用)
  //     tokens.push(token);
  //     // console.log('防呆',token);
  //     token = "";
  //   } else if (symbol.includes(c)) {
  //     // includes 包含
  //     // 遇到 運算符號
  //     if (token) {
  //       // (2) 把 字串的數字 推進 陣列
  //       tokens.push(token);
  //       token = "";
  //     }
  //     // (3) 計算符號 推進 陣列
  //     tokens.push(c);
  //     console.log('符號進來',tokens);
  //   }
  // });

  // // (4) 最後一個數字
  // if (token) {
  //   tokens.push(token);
  // }

  // console.log('tokens',tokens);
  // return tokens;

  // ============================
  console.log("字串進來", expression);
  let strArr = expression.split(""); //字串分割轉陣列
  let opeArr = ["(", ")", "+", "-", "*", "/"];

  let num = ""; //數字串接用

  let arr = []; //數字符號陣列組合

  console.log("strArr: ", strArr);

  strArr.forEach((item, index) => {
    // item 是否有在opeArr裡面
    if (opeArr.indexOf(item) == -1) {
      //  1. 沒有則 表示是數字和小數點 ， 讓該字串 串接。
      num += item;
    } else {
      // 有，表示遇到運算符號
      if (num != "") {
        // 要讓 數字串接用的變數 送到 陣列裡面
        // 數字串接用的變數不等於空時，送進陣列裡面
        arr.push(num);
        num = "";
      }
      // 2. 數字送進陣列後，接著送符號到陣列
      arr.push(item);
    }
  });
  // 3. 最後的數字不會遇到符號無法推送，另外推進陣列
  if (num) {
    arr.push(num);
    num = "";
  }
  console.log("expression:", expression);
  console.log("num: ", num);
  console.log("arr: ", arr);

  return arr;
}