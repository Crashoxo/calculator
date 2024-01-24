// 3. 後序式 並給 AssemblyWriter 命名用
  // Parser(lexicalAnalysis物件 使用者輸入陣列, AssemblyWriter物件 照順序輸出數字)
  function Parser(tokens, writer) {
    this.tokens = tokens; // 使用者輸入陣列 物件
    this.writer = writer; // 轉換數字符號 物件
    this.i = 0; // tokens 陣列索引
    this.opMap1 = {
      // 權重小
      "+": "add",
      "-": "sub",
    };
  
    this.opMap2 = {
      // 權重大
      "/": "div",
      "*": "mul",
    };
    this.init(); // 執行預設
  }
  
  Parser.prototype = {
    init() {
      this.compileAddExpr();
    },
  
    compileExpression() {
      this.compileAddExpr();
    },
  
    // 拿 AssemblyWriter 物件 轉 符號
    // 權重小 + -
    compileAddExpr() {
      this.compileMultExpr();
      while (true) {
        this.getNextToken(); // this.token索引值 + 1 抓值判斷
        if (this.opMap1[this.token]) {
          // ["+"] or ["-"] 運算符號
          let op = this.opMap1[this.token]; //
          this.compileMultExpr(); // 執行權重大的
          this.writer.writeOP(op); // 推 符號並變更 進 字串 , AssemblyWriter 物件
          console.log("\n");
          console.log("Parser + - ：", op, this.token);
        } else {
          // 沒有配對到 + -
          // 將 token 索引退後一位
          this.i--;
          console.log("\n");
          console.log("Parser i-1：", this.i);
          break;
        }
      }
    },
  
    // 拿 AssemblyWriter 物件 轉 符號
    // 權重大 * /
    compileMultExpr() {
      this.compileTerm(); // () 判斷
      while (true) {
        this.getNextToken(); // this.token索引值 + 1 抓值判斷
        if (this.opMap2[this.token]) {
          // ["*"] or ["/"] 運算符號
          let op = this.opMap2[this.token];
          this.compileTerm();
          this.writer.writeOP(op); // 推 符號並變更 進 字串 , AssemblyWriter 物件
          console.log("\n");
          console.log("Parser */：", op, this.token);
        } else {
          // 沒有配對到 * /
          // 將 token 索引退後一位
          this.i--;
          console.log("\n");
          console.log("索引值 i-1：", this.i);
          break;
        }
      }
    },
  
    // 拿 AssemblyWriter 物件 轉 數字
    // ( )
    compileTerm() {
      this.getNextToken(); // 增加索引值
      if (this.token == "(") {
        this.compileExpression(); // 從頭判斷
        this.getNextToken(); // 增加索引值
        if (this.token != ")") {
          throw "缺少右邊括號：)"; // 報錯誤
        }
      } else if (/^(([1-9]{1}\d*)|(0{1}))(\.\d*)?$/.test(this.token)) {
        // ^開頭 、 [1~9]{出現1次} 、 \d 數字 、 * 0~多個 、 |或
        // 0{出現1次} 、  \. 指定. 、  \d 數字  、 * 0~多個  、 ? 0或1個  、$ 結束
        // 判斷是否為數字，是，writer ex:5 => push 5
        this.writer.writePush(this.token); // 推 數字並變更 進 字串 , AssemblyWriter 物件
        console.log("\n");
        console.log("Parser 目前值：", this.token);
      } else {
        throw (
          "錯誤的 token：第 " + (this.i + 1) + " 個 token (" + this.token + ")"
        );
      }
    },
  
    // 1. 執行完之後 索引值++ 並抓該值
    getNextToken() {
      this.token = this.tokens[this.i++];
      console.log("索引值+1抓判斷：", this.token);
      console.log("索引值：", this.i);
    },
  
    getInstructions() {
      return this.writer.outputStr();
    },
  };