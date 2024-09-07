import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./App";
import React from "react";

test("render initial state correctly", () => {
  render(React.createElement<typeof App>(App));
  expect(screen.getByRole("button", { name: "0" })).toBeInTheDocument();
});

test("handles number and operator button clicks", () => {
  render(React.createElement<typeof App>(App));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  expect(screen.getByText("2+3")).toBeInTheDocument();
});

test("clicked calculates", () => {
  render(React.createElement<typeof App>(App));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));
  expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
});

test("handles keyboard input", () => {
  render(React.createElement<typeof App>(App));
  fireEvent.keyDown(window, { key: "2" });
  fireEvent.keyDown(window, { key: "+" });
  fireEvent.keyDown(window, { key: "3" });
  fireEvent.keyDown(window, { key: "Enter" });
  expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
});

test("reset calc", () => {
  render(React.createElement<typeof App>(App));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("C"));
  expect(screen.getByRole("button", { name: "0" })).toBeInTheDocument();
});

// test("errors", () => {
//   render(React.createElement<typeof App>(App));
//   fireEvent.click(screen.getByRole("button", { name: "2" }));
//   fireEvent.click(screen.getByRole("button", { name: "/" }));
//   fireEvent.click(screen.getByRole("button", { name: "0" }));
//   fireEvent.click(screen.getByRole("button", { name: "=" }));
//   expect(screen.getByText(/Error/i)).toBeInTheDocument();
// });

test("larg numbers", () => {
  render(React.createElement<typeof App>(App));

  const buttonNine = screen.getByRole("button", { name: "9" });

  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(buttonNine);
  fireEvent.click(screen.getByText("="));
  expect(screen.getByText("19998")).toBeInTheDocument();
});

// test("small numbers", () => {
//   render(React.createElement<typeof App>(App));
//   fireEvent.click(screen.getByRole("button", { name: "0" }));
//   fireEvent.click(screen.getByText("."));
//   fireEvent.click(screen.getByText("1"));
//   fireEvent.click(screen.getByText("+"));
//   fireEvent.click(screen.getByRole("button", { name: "0" }));
//   fireEvent.click(screen.getByText("."));
//   fireEvent.click(screen.getByText("2"));
//   fireEvent.click(screen.getByText("="));
//   expect(screen.getByText("0.3")).toBeInTheDocument();
// });

test("uncorrect values", () => {
  render(React.createElement<typeof App>(App));
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));
  expect(screen.getByText("Error")).toBeInTheDocument();
});

// test("single operator", () => {
//   render(React.createElement<typeof App>(App));
//   fireEvent.click(screen.getByText("+"));
//   fireEvent.click(screen.getByText("="));
//   expect(screen.getByText("Error")).toBeInTheDocument();
// });
