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
  const [scenarioShown, setScenarioShown] = useState(false);
  const [examResult, setExamResult] = useState('');

  // Array of mock questions
  const mockQuestions = [
    "1. What immediate steps should be taken to mitigate the ongoing MITM attack?",
    "2. How can the security team identify the compromised node on VLAN 100?",
    "3. What long-term measures should be implemented to prevent similar attacks in the future?",
    "4. Why might the attacker have chosen to target the communications between the control room and the turbine control system specifically?",
    "5. How could the principle of least privilege have potentially prevented or limited the impact of this attack?"
  ];

  // Scenario text
  const scenarioText = "You are a cybersecurity expert called to respond to a critical incident at a power plant. The plant's network has been compromised, and there's an ongoing Man-in-the-Middle (MITM) attack affecting communications between the control room and the turbine control system on VLAN 100. Your task is to assess the situation, provide immediate mitigation steps, and recommend long-term security measures.";

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
          finishExam();
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

  const showScenario = () => {
    setScenarioShown(true);
    setMessages([
      { type: 'bot', content: scenarioText },
      { type: 'bot', content: mockQuestions[0] }
    ]);
    setCurrentQuestionIndex(0);
  };

  const finishExam = () => {
    // Here you would typically calculate the result based on user answers
    // For this example, we'll use a mock result
    const mockResult = `You have passed the test with a good performance. Your answers demonstrate a solid understanding of cybersecurity principles and their application to SCADA systems. There's room for improvement in some areas, particularly in detailing specific SCADA security measures and immediate response actions. However, overall, you've shown good knowledge of incident response, forensic analysis, and security best practices.
To further improve, consider delving deeper into SCADA-specific security measures and studying more about network segmentation techniques in industrial control systems.
Overall Assessment:
Total Score: 28 out of 35
Average Grade: 5.6
`;
    
    setExamResult(mockResult);
    setExamStarted(false);
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'bot', content: "Exam completed" },
    ]);
  };

  return (
    <Container
      header={
        <Header variant="h2">Exam Chatbot</Header>
      }
    >
      <SpaceBetween size="l">
        {!examStarted && !scenarioShown && (
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={showScenario}>Start exam</Button>
          </SpaceBetween>
        )}
        <Box>
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{message.type === 'user' ? 'You: ' : 'Bot: '}</strong>
              {message.content}
            </div>
          ))}
        </Box>
        {(examStarted || scenarioShown) && !examResult && (
          <SpaceBetween size="xs" direction="horizontal">
            <Input
              value={question}
              onChange={handleQuestionChange}
              placeholder="Type your answer..."
            />
            <Button onClick={handleSubmit}>Submit Answer</Button>
          </SpaceBetween>
        )}
        {examResult && (
          <Box>
            <Header variant="h3">Exam Result</Header>
            <p>{examResult}</p>
          </Box>
        )}
      </SpaceBetween>
    </Container>
  );
}

export default ChatbotComponent;
