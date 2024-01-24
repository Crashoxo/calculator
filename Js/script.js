//DOM
var btn = document.querySelector(".calculator");
console.log(btn);
var topScreen = document.getElementById("topScreen");
console.log(topScreen);
var mainScreen = document.getElementById("mainScreen");
console.log(mainScreen);

//監聽事件click + function
btn.addEventListener("click", numberEnter);

//事件
function numberEnter(e) {
  console.log(e);
  // 取消事件的預設 a標籤
  e.preventDefault();

  // nodeName DOM名稱
  if (e.target.nodeName != "A") {
    // 判斷是否按到計算格
    // function的return = Switch的break
    return;
  }

  // console.log(e.target.nodeName);

  // 1. AC、=、⌫ 處理個別狀態s
  // innerText = textContent
  if (
    (e.target.innerText == "AC") |
    (e.target.innerText == "=") |
    (e.target.innerText == "⌫")
  ) {
    // 2. 處理使用者按功能鍵的狀況
    let func_btn = e.target.innerText;

    //針對 backspace 符號無法判別的修正 符號轉字串
    if (e.target.id == "backspace") {
      func_btn = "backspace";
      console.log(func_btn);
    }

    //將使用者輸入顯示在 Screen上
    let userData = ""; //用來儲存使用者輸入
    userData = mainScreen.innerText;
    switch (func_btn) {
      case "AC":
        userData = "";
        topScreen.innerText = "";
        mainScreen.innerText = "";
        window.location.reload();
        break;
      case "backspace":
        topScreen.innerText = userData.slice(0, -1);
        mainScreen.innerText = userData.slice(0, -1);
        console.log(userData);
        break;
      case "=":
        // 1. 字串轉陣列
        userData = lexicalAnalysis(topScreen.innerText); // 字串轉陣列
        console.log("userData", userData);

        // 2. writer = 轉換數字符號 物件
        const writer = new AssemblyWriter();

        // 3. parser = 放入參數：給 陣列屬性 命名 (陣列,轉換數字符號 物件) 物件
        const parser = new Parser(userData, writer);

        // 4. instructions = 使用 parser 方法：後序式 並給 AssemblyWriter 命名
        const instructions = parser.getInstructions(); // 輸出全部的字串

        // 5. emulator = 計算字串(轉陣列) 後序法 物件
        const emulator = new CpuEmulator(instructions);
        mainScreen.innerText = emulator.getResult();
        userData = "";
        window.location.reload(); // 刷新給羅馬數字讀取
        break;
    }
  } else {
    // 數字
    mainScreen.innerText += e.target.innerText;
    topScreen.innerText += e.target.innerText;
  }
}





// 抓貨幣
// 方法 1. 抓API (存變數)
let apiToken = "3b0ea361e3bbb6b38bf6228c"; // Jess的 //bd91ea1e2ad9b36ea414d848 我的
let API = `https://v6.exchangerate-api.com/v6/${apiToken}/latest/`; //Jess的
let country = "TWD";
let jsonData = ""; // 裝axios資料
API += country;
axios
  // https://www.exchangerate-api.com/docs/standard-requests
  // 註冊= = "inactive-account" if your email address wasn't confirmed.
  .get(API) //成功
  .then((res) => {
    console.log(res); //可察看詳細內容
    console.log(res.data.conversion_rates);
    jsonData = res.data.conversion_rates;
    console.log(jsonData);
  })
  .catch((err) => {
    // console.log(err);
    console.log(err.response); //失敗顯示在response裏頭
  });

function apiChangeMoney(ele) {
  console.log(ele.id);
  toArab(); //把 mainScreen 轉回數字
  let changeCountry = ele.id;
  let oldMoney = mainScreen.innerText; // 原始值
  let moneyToFixed = ""; // 轉匯後

  moneyToFixed = oldMoney / jsonData[changeCountry]; // 動態物件[]，切換轉拿變數
  moneyToFixed = moneyToFixed.toFixed(2); // Num.toFixed(位數)
  console.log(moneyToFixed);
  document.getElementById(
    "display"
  ).innerText = ` API 轉 ALL ${moneyToFixed} 元`;
}

// 方法 2. 配額滿了 自己寫匯率
const countryMoney = [
  { name: "USD", exchang: 27.4 },
  { name: "EUR", exchang: 30.8 },
  { name: "JPY", exchang: 0.2 },
  { name: "HDK", exchang: 3.39 },
  { name: "GBP", exchang: 37.1 },
  { name: "CHF", exchang: 29.1 },
  { name: "KRW", exchang: 0.025 },
  { name: "CAD", exchang: 22.1 },
  { name: "PHP", exchang: 0.6 },
  { name: "TRY", exchang: 1.8 },
];

function changeMoney(ele) {
  toArab(); //把 mainScreen 轉回數字
  let oldMoney = mainScreen.innerText; // 原始值
  let moneyToFixed = ""; // 轉匯後

  // 1. html btn 抓本身元素 id
  console.log(ele.id);
  let country = ele.id;

  // 2. filter 對應 id
  const filterCountryMoney = countryMoney.filter(function (item, index) {
    // console.log(item, index); // 每一個,索引值
    return item.name === country; // 塞選 回傳[]
  });
  console.log(filterCountryMoney);
  console.log(filterCountryMoney[0].exchang);
  moneyToFixed = oldMoney / filterCountryMoney[0].exchang;
  moneyToFixed = moneyToFixed.toFixed(2); // Num.toFixed(位數)
  document.getElementById(
    "display"
  ).innerText = ` ${ele.innerText} ${moneyToFixed} 元`;
}

// 綁事件測試
// function testEvent(e){
//  console.log(e.target.innerText);
// }

// local storage 保留前次輸入或運算的資料
// https://hugh-program-learning-diary-js.medium.com/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-javascript-%E7%AF%87-%E7%B6%B2%E9%A0%81%E7%9A%84%E8%B3%87%E6%96%99%E5%84%B2%E5%AD%98-e8c2ebaccdc6
btn.addEventListener("click", function () {
  const valueTS = document.getElementById("topScreen").innerText;
  localStorage.setItem("topScreenValue", valueTS); //key Value
  const valueMain = document.getElementById("mainScreen").innerText;
  localStorage.setItem("mainScreenValue", valueMain); //key Value
});

const oldTSValue = window.localStorage.getItem("topScreenValue");
document.getElementById("topScreen").innerText = oldTSValue;

const oldMainValue = window.localStorage.getItem("mainScreenValue");
document.getElementById("mainScreen").innerText = oldMainValue;

// 轉換羅馬數字
// https://medium.com/%E5%89%8D%E7%AB%AF%E8%8F%9C%E9%9B%9E%E7%AD%86%E8%A8%98%E4%B8%AD/javascript-%E7%BE%85%E9%A6%AC%E6%95%B8%E5%AD%97%E8%BD%89%E6%8F%9B%E5%99%A8-97115c011645
// 1. 轉羅馬
var romanBtn = document.getElementById("roman");
let originalMoney = mainScreen.innerText;
console.log("1", mainScreen.innerText);
romanBtn.addEventListener("click", toRoman);

const basicNum = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const basicLetters = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];

function toRoman() {
  let num = parseInt(originalMoney);
  console.log(num);
  let RomanString = ""; //先準備一個空字串
  if (!isNaN(num)) {
    for (let i = 0; i < basicNum.length; i++) {
      //用來比對陣列的迴圈
      while (num >= basicNum[i]) {
        //用來檢視是否重複列印該羅馬數字
        RomanString += basicLetters[i]; //將對應的羅馬數字推入字串
        num -= basicNum[i]; //將轉換過的數字扣掉
      }
    }
    //  console.log('RomanString',RomanString);
    //  console.log('2',mainScreen.innerText);
      arabBtn.removeAttribute('class')
      romanBtn.setAttribute("class","color")
    return (mainScreen.innerText = `${RomanString}`);
  }
}

// 2. 轉數值
var arabBtn = document.getElementById("arab");
let romanMoney = mainScreen.innerText;
arabBtn.addEventListener("click", toArab);
function toArab() {
  console.log(romanMoney);
  romanBtn.removeAttribute('class')
  arabBtn.setAttribute("class","color")
  mainScreen.innerText = romanMoney;
}
