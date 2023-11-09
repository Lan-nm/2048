//数组，保存数据
var data = [];
//游戏得分：0
var score = 0;
//设置游戏状态：1-开始，0-结束
var state = 1;
//游戏状态：开始
var RUNNING = 1;
//游戏状态：结束
var GAMEOVER = 0;

//游戏开始start()方法
function start() {
  //设置游戏状态为开始
  state = RUNNING;
  //初始化游戏得分为0
  score = 0;
  //创建一个二维数组
  for (var r = 0; r < 4; r++) {
    //创建一个一维数组，
    var datacell = [];
    //将一维数组值初始化为0
    for (var c = 0; c < 4; c++) {
      datacell[c] = 0;
    }
    //将一维数组的值循环赋给数组data[],成功创建一个二维数组
    data[r] = datacell;
  }

  //调用函数随机生成两个数
  randomNum();
  randomNum();
  //刷新页面，显示div的值
  updateView();
}

//随机生成两个数4或2
function randomNum() {
  while (true) {
    var r = Math.floor(Math.random() * data.length);
    var c = Math.floor(Math.random() * data.length);
    if (data[r][c] == 0) {
      //随机生成2和4的概率相等
      data[r][c] = Math.random() < 0.5 ? 2 : 4;
      break;
    }
  }
}

function updateView() {
  score = 0;
  for (var r = 0; r < data.length; r++) {
    for (var c = 0; c < data.length; c++) {
      //判断数组中的数据，为0则不做任何操作，保持原来数据和类名不变
      //动态获取标签的id：要求取id名时与数组下角标相对应
      if (data[r][c] == 0) {
        document.getElementById("cell-" + r + c).innerHTML = "";
        document.getElementById("cell-" + r + c).className = "cell";
      } else {
        //不为0，则将数组中数据显示在对应的div格子中
        document.getElementById("cell-" + r + c).innerHTML = data[r][c];
        //保持原来类名不变，并追加对应div类名（动态）
        document.getElementById("cell-" + r + c).className =
          "cell n" + data[r][c];

        score += data[r][c];
      }
    }
  }
  //将分数显示在界面上方
  document.getElementById("score").innerHTML = score;
  var gameOver = document.getElementById("gameOver");
  if (state == GAMEOVER) {
    //如果状态为GAMEOVER（即0，表示游戏结束，显示结束界面，并将最后分数显示在结束界面
    gameOver.style.display = "block";
    document.getElementById("final").innerHTML = score;
  } else {
    //如果状态为1，表示游戏还未结束，隐藏结束界面
    gameOver.style.display = "none";
  }
}

//向左移动所有行
function moveLeft() {
  //判断字符串是否移动
  //做移动操作前先将数组转换为字符串保存
  var before = String(data);
  //遍历行
  for (var r = 0; r < data.length; r++) {
    moveLeftRow(r);
  }
  //做移动操作后先将数组转换为字符串保存
  var after = String(data);
  //将移动操作前后的数组(字符串)作比较，如果不相等，即发生改变，则随机生成一个数
  if (before != after) {
    randomNum();
    //随机生成一个数后，判断游戏是否结束，设置游戏状态
    if (isGameOver()) {
      state = GAMEOVER;
    }
    //游戏未结束刷新页面，再显示随机生成数
    updateView();
  }
}

//判断并向左移动指定行中的每个元素
function moveLeftRow(r) {
  //0开始，遍历r行中每一个元素
  for (var c = 0; c < data.length - 1; c++) {
    //获得当前元素下一个不为0的元素的下标nextc
    var nextc = getNextRow(r, c);
    //如果nextc=-1，说明右侧没有元素了，退出循环
    if (nextc == -1) {
      break;
    } else if (data[r][c] == 0) {
      //如果自己==0 则将下一个位置放入当前位置，下一个位置设置为零
      data[r][c] = data[r][nextc];
      data[r][nextc] = 0;
      //重新检查
      c--;
    } else if (data[r][c] == data[r][nextc]) {
      // 如果当前位置的值==nextc的位置的值，将当前位置*=2;下一个位置设置为0
      data[r][c] *= 2;

      data[r][nextc] = 0;
    }
  }
}

//找当前位置右侧，下一个不为0的数
function getNextRow(r, c) {
  //从c+1 遍历row行中剩余元素，
  for (var i = c + 1; i < data.length; i++) {
    //如果出现不为0的值，返回它的列数
    if (data[r][i] != 0) {
      return i;
    }
  }
  //循环退出返回-1
  return -1;
}

//向右移动所有行
function moveRight() {
  var before = String(data);
  for (var r = 0; r < data.length; r++) {
    moveRightRow(r);
  }
  var after = String(data);
  if (before != after) {
    randomNum();
    if (isGameOver()) {
      state = GAMEOVER;
    }
    updateView();
  }
}

function moveRightRow(r) {
  for (var c = data.length - 1; c > 0; c--) {
    var prec = getPreRow(r, c);
    if (prec == -1) {
      break;
    } else if (data[r][c] == 0) {
      data[r][c] = data[r][prec];
      data[r][prec] = 0;
      c++;
    } else if (data[r][c] == data[r][prec]) {
      data[r][c] *= 2;
      data[r][prec] = 0;
    }
  }
}

function getPreRow(r, c) {
  for (var i = c - 1; i >= 0; i--) {
    if (data[r][i] != 0) return i;
  }
  return -1;
}

function moveUp() {
  var before = String(data);
  for (var c = 0; c < data.length; c++) {
    moveUpCol(c);
  }
  var after = String(data);
  if (before != after) {
    randomNum();
    if (isGameOver()) {
      state = GAMEOVER;
    }
    updateView();
  }
}

//向上移动所有列
function moveUpCol(c) {
  for (var r = 0; r < data.length - 1; r++) {
    var nextr = getNextCol(r, c);
    if (nextr == -1) {
      break;
    } else if (data[r][c] == 0) {
      data[r][c] = data[nextr][c];
      data[nextr][c] = 0;
      r--;
    } else if (data[r][c] == data[nextr][c]) {
      data[r][c] *= 2;
      score += data[r][c];
      data[nextr][c] = 0;
    }
  }
}
function upadataScore() {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      score += Number(data[i][j]);
    }
  }
}
function getNextCol(r, c) {
  for (var i = r + 1; i < data.length; i++) {
    if (data[i][c] != 0) return i;
  }
  return -1;
}

//向下移动所有列
function moveDown() {
  var before = String(data);
  for (var c = 0; c < data.length; c++) {
    moveDownCol(c);
  }
  var after = String(data);
  if (before != after) {
    randomNum();
    if (isGameOver()) {
      state = GAMEOVER;
    }
    updateView();
  }
}

function moveDownCol(c) {
  for (var r = data.length - 1; r > 0; r--) {
    var prer = getPreCol(r, c);
    if (prer == -1) {
      break;
    } else if (data[r][c] == 0) {
      data[r][c] = data[prer][c];
      data[prer][c] = 0;
      r++;
    } else if (data[r][c] == data[prer][c]) {
      data[r][c] *= 2;
      score += data[r][c];
      data[prer][c] = 0;
    }
  }
}

function getPreCol(r, c) {
  for (var i = r - 1; i >= 0; i--) {
    if (data[i][c] != 0) return i;
  }
  return -1;
}

function isGameOver() {
  //游戏结束条件：
  //1.数组中所有数据均不为0；
  //2.数组中每一行数据相邻位置值不相等
  //3.数组中每一列数据相邻位置值不相等
  for (var c = 0; c < data.length; c++) {
    for (var r = 0; r < data.length; r++) {
      //判断所有不为0
      if (data[r][c] == 0) {
        return false;
      }
      if (c < 3) {
        if (data[r][c] == data[r][c + 1]) {
          return false;
        }
      }
      if (r < 3) {
        if (data[r][c] == data[r + 1][c]) {
          return false;
        }
      }
    }
  }
  return true;
}

//调用函数开始游戏
start();
document.onkeydown = function (event) {
  //按下左键或者字母键a，向左移动
  if (event.keyCode == 37 || event.keyCode == 65) {
    moveLeft();
  }
  //按下向上键或者字母键w，向上移动
  if (event.keyCode == 38 || event.keyCode == 87) {
    moveUp();
  }
  //按下右键或者字母键d，向右移动
  if (event.keyCode == 39 || event.keyCode == 68) {
    moveRight();
  }
  //按下向下键或者字母键s，向下移动
  if (event.keyCode == 40 || event.keyCode == 83) {
    moveDown();
  }
  //按下空格键重新开始游戏
  if (event.keyCode == 32) {
    start();
  }
};
