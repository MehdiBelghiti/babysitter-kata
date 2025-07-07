import { calculatePay } from "../utils/calculatePay";

describe("calculatePay - Family A", () => {
  it("should calculate pay from 5pm to 11pm correctly", () => {
    const result = calculatePay("A", "5:00PM", "11:00PM");
    expect(result).toBe(90); // 6 hours * $15
  });

  it("should calculate pay from 11pm to 1am correctly", () => {
    const result = calculatePay("A", "11:00PM", "1:00AM");
    // 2 hours @ $20 = $40
    expect(result).toBe(40);
  });

  it("should calculate pay from 5pm to 1am correctly", () => {
    const result = calculatePay("A", "5:00PM", "1:00AM");
    // 6 hours @ $15 + 2 hours @ $20 = $130
    expect(result).toBe(130);
  });
});

describe("calculatePay - Family B", () => {
  it("should calculate correct pay from 5pm to 9pm", () => {
    const result = calculatePay("B", "5:00PM", "9:00PM");
    // 5pm–10pm = 4h * 12 = 48
    expect(result).toBe(48);
  });

  it("should calculate correct pay from 10pm to 11pm", () => {
    const result = calculatePay("B", "10:00PM", "11:00PM");
    // 10pm–11am = 1h * 8 = 8
    expect(result).toBe(8);
  });

  it("should calculate correct pay from 12am to 1am", () => {
    const result = calculatePay("B", "12:00AM", "1:00AM");
    // 12am–1am = 1h * 16 = 16
    expect(result).toBe(16);
  });

  it("should calculate correct pay from 5pm to 1am", () => {
    const result = calculatePay("B", "5:00PM", "1:00AM");
    // 5pm–10pm = 5h * 12 = 60
    // 10pm–12am = 2h * 8 = 16
    // 12am–1am = 1h * 16 = 16
    expect(result).toBe(92);
  });
});

describe("calculatePay - Family C", () => {
  it("should calculate pay from 5pm to 8pm", () => {
    const result = calculatePay("C", "5:00PM", "8:00PM");
    // 5pm–8pm = 3h * 21 = 63
    expect(result).toBe(63);
  });

  it("should calculate pay from 10pm to 1am", () => {
    const result = calculatePay("C", "10:00PM", "1:00AM");
    // 10pm–1am = 3h * 15 = 45
    expect(result).toBe(45);
  });

  it("should calculate pay from 5pm to 1am", () => {
    const result = calculatePay("C", "5:00PM", "1:00AM");
    // 5pm–9pm = 4h * 21 = 84
    // 9pm–1am = 4h * 15 = 60
    expect(result).toBe(144);
  });
});
