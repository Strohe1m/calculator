let numsShowerNode = document.querySelector(".nums-shower span");
let calcButtonsNode = document.querySelector(".calc-buttons");
let valuesNotToShow = ["<-", "AC", "="];
let calculationValues = ["+", "-", "×", "÷", "(", ")", "."];
let openBracketAmount = 0;
let dotsAmount = 0;
if (numsShowerNode.innerHTML == "") numsShowerNode.innerHTML += "0";

calcButtonsNode.addEventListener("click", (event) => {
  let dataValue = event.target.dataset.value;
  widthCheck(numsShowerNode);
  if (numsShowerNode.innerHTML == "0") numsShowerNode.innerHTML = "";
  if (
    !valuesNotToShow.includes(dataValue) &&
    !calculationValues.includes(dataValue)
  )
    addValue(numsShowerNode, event);
  else if (dataValue == "<-") removeLastNum(numsShowerNode);
  else if (dataValue == "AC") clearNumShower(numsShowerNode);
  else if (dataValue == ".") checkForDots(numsShowerNode, event);
  else if ("()".includes(dataValue)) addBracket(numsShowerNode, dataValue);
  else if (calculationValues.slice(0, 4).includes(dataValue))
    addCalcValue(numsShowerNode, dataValue);
  setToZero(numsShowerNode);
});

function addValue(valueShower, event) {
  let dataValue = event.target.dataset.value;
  let parentDataValue = event.target.parentElement.dataset.value;
  if (valueShower.innerHTML.at(-1) == ")") return;
  if (dataValue) valueShower.innerHTML += dataValue;
  else if (parentDataValue) valueShower.innerHTML += parentDataValue;
}

function widthCheck(elem) {
  if (elem.innerHTML.length >= 8) elem.style.fontSize = `32px`;
  else elem.style.fontSize = `64px`;
}

function removeLastNum(elem) {
  countBracketAmount(elem);
  if (elem.innerHTML.length > 0) {
    let newStr = numsShowerNode.innerHTML.slice(0, -1);
    numsShowerNode.innerHTML = newStr;
  }
}

function getBackFontSize(elem) {
  if (elem.offsetWidth < 284) elem.style.fontSize = "64px";
}

function clearNumShower(elem) {
  elem.innerHTML = "";
  getBackFontSize(elem);
}

function checkForDots(sourceElem, event) {
  let floatNum = sourceElem.innerHTML;
  if (floatNum == "" || calculationValues.includes(floatNum.at(-1))) return;
  else addValue(sourceElem, event);
}

function setToZero(elem) {
  if (elem.innerHTML == "") elem.innerHTML = "0";
}

function addBracket(elem, dataValue) {
  console.log(openBracketAmount);
  let elemInnerHtml = elem.innerHTML;
  if (elemInnerHtml.at(-1) == ")" && dataValue == "(") return;
  else if (elemInnerHtml == "" && dataValue == "(") {
    elem.innerHTML += "(";
    openBracketAmount += 1;
  } else if (
    calculationValues.slice(0, -1).includes(elemInnerHtml.at(-1)) &&
    dataValue == "("
  ) {
    elem.innerHTML += "(";
    openBracketAmount += 1;
  } else if (
    dataValue == "(" &&
    !calculationValues.includes(elemInnerHtml.at(-1))
  ) {
    elem.innerHTML += "×(";
    openBracketAmount += 1;
  } else if (elemInnerHtml.at(-1) == "(" && dataValue == ")") {
    return;
  } else if (
    calculationValues.slice(0, -1).includes(elemInnerHtml.at(-1)) &&
    dataValue == ")" &&
    openBracketAmount > 0
  ) {
    elem.innerHTML += ")";
    openBracketAmount -= 1;
  } else if (
    dataValue == ")" &&
    openBracketAmount > 0 &&
    elemInnerHtml.at(-1) >= "."
  ) {
    elem.innerHTML += ")";
    openBracketAmount -= 1;
  }
}

function addCalcValue(elem, dataValue) {
  let eleHTML = elem.innerHTML;
  if (eleHTML == "") return;
  else if (".+-×÷".includes(eleHTML.at(-1))) {
    elem.innerHTML = eleHTML.slice(0, -1) + dataValue;
    return;
  }
  elem.innerHTML += dataValue;
}

function countBracketAmount(elem) {
  let eleHTML = elem.innerHTML;
  if (eleHTML.at(-1) == ")") openBracketAmount += 1;
  else if (eleHTML.at(-1) == "(") openBracketAmount -= 1;
}
