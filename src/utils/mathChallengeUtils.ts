// Utilitas pembuat soal matematika acak untuk tantangan mematikan alarm

export interface MathQuestion {
  questionText: string;
  correctAnswer: number;
  operator: "+" | "-" | "×";
}

// Menghasilkan soal aritmatika acak (penjumlahan, pengurangan, atau perkalian)
export function generateMathQuestion(): MathQuestion {
  const operators: ("+" | "-" | "×")[] = ["+", "-", "×"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === "×") {
    const a = Math.floor(Math.random() * 8) + 3; // 3..10
    const b = Math.floor(Math.random() * 7) + 2; // 2..8
    return {
      questionText: `${a} × ${b}`,
      correctAnswer: a * b,
      operator,
    };
  }

  if (operator === "-") {
    const a = Math.floor(Math.random() * 30) + 20; // 20..49
    const b = Math.floor(Math.random() * 18) + 2; // 2..19
    return {
      questionText: `${a} - ${b}`,
      correctAnswer: a - b,
      operator,
    };
  }

  const a = Math.floor(Math.random() * 35) + 12; // 12..46
  const b = Math.floor(Math.random() * 25) + 8; // 8..32
  return {
    questionText: `${a} + ${b}`,
    correctAnswer: a + b,
    operator: "+",
  };
}

// Memvalidasi apakah jawaban input pengguna sesuai dengan kunci jawaban
export function verifyMathAnswer(
  rawInput: string,
  expectedAnswer: number
): boolean {
  const trimmed = rawInput.trim();
  if (!trimmed) return false;
  const parsed = Number(trimmed);
  if (Number.isNaN(parsed)) return false;
  return parsed === expectedAnswer;
}

