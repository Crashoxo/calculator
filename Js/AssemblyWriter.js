// 2. 轉換數字符號 物件
// ( 拿Parser物件轉換： push 數字 、 + = add )
// AssemblyWriter 物件屬性
function AssemblyWriter() {
    this.output = "";
    console.log("\n");
    // 轉換數字
    this.writePush = function (digit) {
      this.output += `push ${digit}\r\n`; //換行 幾個數字推幾次
      console.log("推進數字.", digit);
      console.log(this.output);
    };
    // 轉換符號
    this.writeOP = function (op) {
      this.output += op + "\r\n";
      console.log("推進符號", op);
    };
  
    // 回傳全部的字串
    this.outputStr = function () {
      console.log("數字+符號" + "\r\n", this.output);
      console.log("\n");
      return this.output;
    };
  }
  
  // AssemblyWriter 物件方法 .prototype
  // 第二種寫法，等同前述
  // AssemblyWriter.prototype = {
  //   writePush(digit) {
  //     this.output += `push ${digit}\r\n`;
  //   },
  
  //   writeOP(op) {
  //     this.output += op + "\r\n";
  //   },
  
  //   // 回傳字串
  //   outputStr() {
  //     return this.output;
  //   },
  // };
  
  
  
 