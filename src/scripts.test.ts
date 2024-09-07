import "@testing-library/jest-dom";
import {
  parseExpression,
  performOperation,
  processOperations,
} from "./scripts";

test("parseEspression correctly", () => {
  const tokens = parseExpression("2+3*7");
  expect(tokens).toEqual([2, "+", 3, "*", 7]);
});

test("performOperation correctly", () => {
  expect(performOperation("+", 2, 5)).toBe(7);
  expect(performOperation("-", 5, 3)).toBe(2);
  expect(performOperation("*", 2, 4)).toBe(8);
  expect(performOperation("/", 10, 5)).toBe(2);
  expect(performOperation("√", 9)).toBe(3);
  expect(performOperation("%", 50)).toBe(0.5);
});

test("processesOperation correctly", () => {
  const res = processOperations([2, "+", 3, "*", 7]);
  expect(res).toEqual([23]);
});
