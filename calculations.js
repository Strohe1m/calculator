let getAnswerNode = document.querySelector("#get-answer");
let errorMessageNode = document.querySelector(".error-message");

getAnswerNode.addEventListener("click", () => {
  let strToEvaluate = addabsentBrackets(numsShowerNode.innerHTML);
  let re = /×/gi,
    re1 = /÷/gi;
  strToEvaluate = strToEvaluate.replace(re, "*");
  strToEvaluate = strToEvaluate.replace(re1, "/");
  try {
    numsShowerNode.innerHTML = eval(strToEvaluate);
  } catch (e) {
    showError(errorMessageNode);
  }
});

function addabsentBrackets(elem) {
  if (openBracketAmount > 0) {
    for (let i = openBracketAmount; i > 0; i--) {
      elem += ")";
    }
  }
  openBracketAmount = 0;
  return elem;
}

function showError(errorElem) {
  errorElem.style.top = "0";
  setTimeout(() => {
    errorElem.style.top = "-40px";
  }, 5000);
}
