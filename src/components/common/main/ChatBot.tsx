import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    Fade,
    Slide
} from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBotIcon = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  z-index: 1000;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatWindow = styled(Paper)`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 360px;
  height: 500px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled(Box)`
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatBody = styled(Box)`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f5f5f5;
`;

const ChatInputArea = styled(Box)`
  padding: 16px;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
`;

const Message = styled(Box)<{ isUser?: boolean }>`
  max-width: 80%;
  margin: 8px 0;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${props => props.isUser ? '#2196F3' : 'white'};
  color: ${props => props.isUser ? 'white' : 'inherit'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface ChatMessage {
    id: number;
    text: string;
    isUser: boolean;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            text: '안녕하세요! 해외 취업에 대해 어떤 것이든 물어보세요 😊',
            isUser: false
        }
    ]);

    const handleSend = async () => {
        if (!message.trim()) return;

        // 사용자 메시지 추가
        const newMessage: ChatMessage = {
            id: messages.length + 1,
            text: message,
            isUser: true
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        try {
            // 로딩 메시지 추가 (선택사항)
            setMessages(prev => [...prev, {
                id: prev.length + 2,
                text: "답변을 생성하고 있습니다...",
                isUser: false
            }]);

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/chatbot/post/${encodeURIComponent(message)}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            // 로딩 메시지 제거하고 실제 응답 추가
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => msg.text !== "답변을 생성하고 있습니다...");
                return [...filteredMessages, {
                    id: prev.length + 2,
                    text: data.answer,
                    isUser: false
                }];
            });

        } catch (error) {
            console.error('Error fetching response:', error);
            // 에러 메시지 표시
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => msg.text !== "답변을 생성하고 있습니다...");
                return [...filteredMessages, {
                    id: prev.length + 2,
                    text: "죄송합니다. 잠시 후 다시 시도해주세요.",
                    isUser: false
                }];
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <ChatBotIcon
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="56" fill="#2196F3" />
                    <circle cx="60" cy="60" r="52" fill="#1976D2" />
                    <rect x="35" y="40" width="50" height="45" rx="8" fill="white" />
                    <path d="M60 25 L60 35" stroke="white" stroke-width="4" stroke-linecap="round" />
                    <circle cx="60" cy="22" r="4" fill="white" />
                    <circle cx="45" cy="55" r="5" fill="#1976D2" />
                    <circle cx="75" cy="55" r="5" fill="#1976D2" />
                    <path d="M45 70 Q60 80 75 70" stroke="#1976D2" stroke-width="4" fill="none" stroke-linecap="round" />
                    <circle cx="28" cy="60" r="4" fill="white" />
                    <circle cx="92" cy="60" r="4" fill="white" />
                </svg>
            </ChatBotIcon>

            <AnimatePresence>
                {isOpen && (
                    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                        <ChatWindow>
                            <ChatHeader>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6">Koreer Assistant</Typography>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => setIsOpen(false)}
                                    sx={{ color: 'white' }}
                                >
                                    <Close />
                                </IconButton>
                            </ChatHeader>

                            <ChatBody>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1
                                }}>
                                    {messages.map((msg) => (
                                        <Message key={msg.id} isUser={msg.isUser}>
                                            <Typography variant="body1">{msg.text}</Typography>
                                        </Message>
                                    ))}
                                </Box>
                            </ChatBody>

                            <ChatInputArea>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="메시지를 입력하세요..."
                                    size="small"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    multiline
                                    maxRows={4}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                >
                                    <Send />
                                </IconButton>
                            </ChatInputArea>
                        </ChatWindow>
                    </Slide>
                )}
            </AnimatePresence>
        </>
    );
}