import React, { useState } from 'react';
import {
  Container,
  Header,
  Input,
  Button,
  SpaceBetween,
  Box,
} from '@cloudscape-design/components';

function ChatbotComponent() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [examStarted, setExamStarted] = useState(false);

  // Array of mock questions
  const mockQuestions = [
    "1. What immediate steps should be taken to mitigate the ongoing MITM attack?",
    "2.	How can the security team identify the compromised node on VLAN 100?",
    "3.	What long-term measures should be implemented to prevent similar attacks in the future?",
    "4.	Why might the attacker have chosen to target the communications between the control room and the turbine control system specifically?",
    "5.	How could the principle of least privilege have potentially prevented or limited the impact of this attack?"
  ];

  const handleQuestionChange = (event) => {
    setQuestion(event.detail.value);
  };

  const handleSubmit = () => {
    if (question.trim()) {
      setMessages([...messages, { type: 'user', content: question }]);
      
      // Mock bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
        ]);
        
        // Move to the next question
        if (currentQuestionIndex < mockQuestions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          askNextQuestion(currentQuestionIndex + 1);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { type: 'bot', content: "Exam completed! Thank you for participating." }
          ]);
          setExamStarted(false);
        }
      }, 500);

      setQuestion('');
    }
  };

  const startExam = () => {
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setMessages([]);
    askNextQuestion(0);
  };

  const askNextQuestion = (index) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'bot', content: mockQuestions[index] }
    ]);
  };

  return (
    <Container
      header={
        <Header variant="h2">Exam Chatbot</Header>
      }
    >
      <SpaceBetween size="l">
        {!examStarted && (
          <Button onClick={startExam}>Start Exam</Button>
        )}
        <Box>
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{message.type === 'user' ? 'You: ' : 'Bot: '}</strong>
              {message.content}
            </div>
          ))}
        </Box>
        {examStarted && (
          <SpaceBetween size="xs" direction="horizontal">
            <Input
              value={question}
              onChange={handleQuestionChange}
              placeholder="Type your answer..."
            />
            <Button onClick={handleSubmit}>Submit Answer</Button>
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Container>
  );
}

export default ChatbotComponent;
