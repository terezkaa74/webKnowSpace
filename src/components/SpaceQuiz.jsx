import { useState } from 'react';

export const SpaceQuiz = ({ questions = [] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const defaultQuestions = [
    {
      question: 'Která planeta je nejblíže Slunci?',
      options: ['Venuše', 'Merkur', 'Země', 'Mars'],
      correctAnswer: 1,
    },
    {
      question: 'Kolik planet má naše sluneční soustava?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 1,
    },
    {
      question: 'Jaká je největší planeta sluneční soustavy?',
      options: ['Saturn', 'Neptun', 'Jupiter', 'Uran'],
      correctAnswer: 2,
    },
  ];

  const quizQuestions = questions.length > 0 ? questions : defaultQuestions;

  const handleAnswerClick = (answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (showScore) {
    return (
      <div style={styles.scoreSection}>
        <h2 style={styles.scoreTitle}>Výsledek!</h2>
        <p style={styles.scoreText}>
          Správně jsi odpověděl na {score} z {quizQuestions.length} otázek
        </p>
        <div style={styles.scoreEmoji}>
          {score === quizQuestions.length
            ? '🏆'
            : score >= quizQuestions.length / 2
            ? '🌟'
            : '💫'}
        </div>
        <button onClick={handleRestart} className="btn btn-primary">
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <div style={styles.quiz}>
      <div style={styles.questionSection}>
        <div style={styles.questionCount}>
          Otázka {currentQuestion + 1}/{quizQuestions.length}
        </div>
        <h2 style={styles.questionText}>
          {quizQuestions[currentQuestion].question}
        </h2>
      </div>

      <div style={styles.answerSection}>
        {quizQuestions[currentQuestion].options.map((option, index) => {
          const isCorrect =
            index === quizQuestions[currentQuestion].correctAnswer;
          const isSelected = selectedAnswer === index;
          const buttonStyle = answered
            ? isCorrect
              ? styles.correctAnswer
              : isSelected
              ? styles.wrongAnswer
              : styles.answerButton
            : styles.answerButton;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              style={buttonStyle}
              disabled={answered}
            >
              {option}
              {answered && isCorrect && ' ✓'}
              {answered && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {answered && (
        <button onClick={handleNext} className="btn btn-primary" style={styles.nextBtn}>
          {currentQuestion + 1 === quizQuestions.length
            ? 'Zobrazit výsledek'
            : 'Další otázka'}
        </button>
      )}
    </div>
  );
};

const styles = {
  quiz: {
    padding: 'calc(var(--spacing) * 4)',
  },
  questionSection: {
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  questionCount: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  questionText: {
    fontSize: '1.5rem',
    color: 'var(--dark)',
    lineHeight: 1.4,
  },
  answerSection: {
    display: 'grid',
    gap: 'calc(var(--spacing) * 2)',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  answerButton: {
    padding: 'calc(var(--spacing) * 2)',
    backgroundColor: 'var(--white)',
    border: '2px solid var(--gray-light)',
    borderRadius: 'calc(var(--spacing) * 1)',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 500,
  },
  correctAnswer: {
    padding: 'calc(var(--spacing) * 2)',
    backgroundColor: '#d1fae5',
    border: '2px solid var(--success)',
    borderRadius: 'calc(var(--spacing) * 1)',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'not-allowed',
    fontWeight: 500,
  },
  wrongAnswer: {
    padding: 'calc(var(--spacing) * 2)',
    backgroundColor: '#fee2e2',
    border: '2px solid var(--error)',
    borderRadius: 'calc(var(--spacing) * 1)',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'not-allowed',
    fontWeight: 500,
  },
  nextBtn: {
    width: '100%',
    justifyContent: 'center',
  },
  scoreSection: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 6)',
  },
  scoreTitle: {
    fontSize: '2rem',
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  scoreText: {
    fontSize: '1.25rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  scoreEmoji: {
    fontSize: '5rem',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
};
