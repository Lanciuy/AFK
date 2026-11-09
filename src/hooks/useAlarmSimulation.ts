// Hook simulasi dering alarm beserta tantangan matematika dan pemutaran audio native

import { useEffect, useState } from "react";
import {
  playAlarmSoundAsync,
  stopAlarmSoundAsync,
} from "@/services/soundService";
import {
  generateMathQuestion,
  MathQuestion,
  verifyMathAnswer,
} from "@/utils/mathChallengeUtils";

export function useAlarmSimulation(ringtoneName: string) {
  // State status dering simulasi dan penghitung detik berjalan
  const [isSimulating, setIsSimulating] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // State soal tantangan matematika dan input jawaban pengguna
  const [mathQuestion, setMathQuestion] = useState<MathQuestion>(() =>
    generateMathQuestion()
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [challengeError, setChallengeError] = useState<string | null>(null);

  // Mengatur pemutaran audio dan hitungan detik saat simulasi aktif
  useEffect(() => {
    if (!isSimulating) {
      stopAlarmSoundAsync().catch(() => {
        // Pembersihan player saat simulasi dihentikan
      });
      return;
    }

    playAlarmSoundAsync(ringtoneName, true).catch((err: Error) => {
      setChallengeError(
        err.message || "Gagal memutar audio dering simulasi di perangkat."
      );
    });

    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      stopAlarmSoundAsync().catch(() => {
        // Pembersihan player saat layar ditutup
      });
    };
  }, [isSimulating, ringtoneName]);

  // Memulai simulasi dering alarm dan menyiapkan soal matematika baru
  const startSimulation = () => {
    setMathQuestion(generateMathQuestion());
    setUserAnswer("");
    setChallengeError(null);
    setElapsedSeconds(0);
    setIsSimulating(true);
  };

  // Mengacak ulang soal matematika jika pengguna ingin mengganti soal
  const refreshMathQuestion = () => {
    setMathQuestion(generateMathQuestion());
    setUserAnswer("");
    setChallengeError(null);
  };

  // Memperbarui teks jawaban dan menghapus pesan error sebelumnya
  const handleAnswerChange = (text: string) => {
    setUserAnswer(text);
    if (challengeError) {
      setChallengeError(null);
    }
  };

  // Memeriksa jawaban matematika dan mematikan alarm hanya jika jawaban benar
  const submitChallengeAndStop = () => {
    if (!verifyMathAnswer(userAnswer, mathQuestion.correctAnswer)) {
      setChallengeError(
        "Jawaban belum tepat! Hitung kembali agar alarm berhenti berbunyi."
      );
      return;
    }

    setChallengeError(null);
    setUserAnswer("");
    setElapsedSeconds(0);
    setIsSimulating(false);
    stopAlarmSoundAsync().catch(() => {
      // Menghentikan pemutar audio dering setelah jawaban benar
    });
  };

  return {
    isSimulating,
    elapsedSeconds,
    mathQuestion,
    userAnswer,
    challengeError,
    startSimulation,
    refreshMathQuestion,
    handleAnswerChange,
    submitChallengeAndStop,
  };
}
