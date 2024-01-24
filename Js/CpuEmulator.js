 // 計算
 function CpuEmulator(instructions) {
    this.ins = instructions.split("\r\n"); //分割轉陣列
    console.log("計算陣列", this.ins);
    this.memory = []; //裝 計算陣列
    // ^開始(包含push)) \s 空白 \w 中間數字字母與底線 +一個以上
    this.re = /^(push)\s\w+/;
    this.execute(); // 執行
  }
  
  CpuEmulator.prototype = {
    execute() {
      this.ins.forEach((i) => {
        switch (i) {
          case "add":
            this.add();
            break;
          case "sub":
            this.sub();
            break;
          case "mul":
            this.mul();
            break;
          case "div":
            this.div();
            break;
          default:
            //數字
            if (this.re.test(i)) {
              console.log("i", i.split(" "));
              console.log("i2", i.split(" ")[1]);
              this.push(i.split(" ")[1]); //使用方法 split分割轉陣列 取第二個位置
              console.log("this.push", this.memory);
            }
        }
      });
    },
  
    add() {
      const b = parseFloat(this.pop()); //收最後一個值
      const a = parseFloat(this.pop());
  
      // 取小數點兩位
      // 先讓小數轉整數，再除回來(解0.1+0.2) = toFixed(2)
      let c = ((( a * 10 ) + ( b * 10 )) / 10 );
      // let c = a + b;
      // c = c.toFixed(2) // Num.toFixed(位數)
      this.memory.push(c); //計算完推回陣列
      console.log("add", this.memory);
    },
  
    sub() {
      const b = parseFloat(this.pop());
      const a = parseFloat(this.pop());
      this.memory.push(a - b); //計算完推回陣列
      console.log("sub", this.memory);
    },
  
    mul() {
      const b = parseFloat(this.pop());
      const a = parseFloat(this.pop());
      // 取小數點兩位
      let c = a * b;
      c = c.toFixed(2); // Num.toFixed(位數)
      this.memory.push(c); //計算完推回陣列
      console.log("mul", this.memory);
    },
  
    div() {
      const b = parseFloat(this.pop());
      const a = parseFloat(this.pop());
      // 取小數點兩位
      let c = a / b;
      c = c.toFixed(2); // Num.toFixed(位數)
      this.memory.push(c); //計算完推回陣列
      console.log("div", this.memory);
    },
  
    push(x) {
      // this.memory.push(parseInt(x));
      this.memory.push(parseFloat(x)); //推進 含小數
    },
  
    pop() {
      //自己的方法
      //js的方法 拿掉最後一個 + return 最後一個值
      return this.memory.pop();
    },
  
    getResult() {
      console.log("結果", this.memory[0]);
      return this.memory[0];
    },
  };
  
  const tokens = lexicalAnalysis("1+2*3-4");
  console.log("tokens", tokens);
  const writer = new AssemblyWriter();
  const parser = new Parser(tokens, writer);
  const instructions = parser.getInstructions();
  const emulator = new CpuEmulator(instructions);
  console.log(emulator.getResult());