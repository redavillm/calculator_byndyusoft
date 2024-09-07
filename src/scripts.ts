export const parseExpression = (exp: string): (string | number)[] => {
  const tokens: (string | number)[] = [];
  let numberBuffer = "";

  for (let i = 0; i < exp.length; i++) {
    const char = exp[i];

    if (/\d|\./.test(char)) {
      numberBuffer += char;
    } else if (/[+\-*/√%]/.test(char)) {
      if (numberBuffer) {
        tokens.push(parseFloat(numberBuffer));
        numberBuffer = "";
      }
      tokens.push(char);
    }
  }
  if (numberBuffer) {
    tokens.push(parseFloat(numberBuffer));
  }
  return tokens;
};

export const performOperation = (
  operator: string,
  a: number,
  b?: number
): number => {
  switch (operator) {
    case "+":
      return a + (b || 0);
    case "-":
      return a - (b || 0);
    case "*":
      return a * (b || 0);
    case "/":
      return b !== 0 ? a / (b || 1) : NaN;
    case "√":
      return Math.sqrt(a);
    case "%":
      return a / 100;
    default:
      return 0;
  }
};

export const processOperations = (
  tokens: (string | number)[]
): (string | number)[] => {
  let output: (string | number)[] = [];

  let i = 0;
  while (i < tokens.length) {
    if (
      tokens[i] === "*" ||
      tokens[i] === "/" ||
      tokens[i] === "√" ||
      tokens[i] === "%"
    ) {
      const operator = tokens[i] as string;
      const leftOperand =
        operator === "√" || operator === "%"
          ? (tokens[i + 1] as number)
          : (output.pop() as number);
      const rightOperand = tokens[i + 1] as number;
      const result =
        operator === "√" || operator === "%"
          ? performOperation("√", leftOperand)
          : performOperation(operator, leftOperand, rightOperand);
      output.push(result);
      i += operator === "√" ? 2 : 2;
    } else {
      output.push(tokens[i]);
      i++;
    }
  }

  let finalReult: (string | number)[] = [];
  i = 0;
  while (i < output.length) {
    if (output[i] === "+" || output[i] === "-") {
      const operator = output[i] as string;
      const leftOperand = finalReult.pop() as number;
      const rightOperand = output[i + 1] as number;
      const result = performOperation(operator, leftOperand, rightOperand);
      finalReult.push(result);
      i += 2;
    } else {
      finalReult.push(output[i]);
      i++;
    }
  }

  return finalReult;
};
