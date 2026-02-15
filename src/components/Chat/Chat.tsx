import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { initializeApp } from "firebase/app";
import { ref, onValue, getDatabase, push } from "firebase/database";
import "./Chat.css";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
interface IChatProps {
  sender: string;
  event: string;
}

interface IMessage {
  message: string;
  sender: string;
  timestamp: number;
}

const Chat: React.FC<IChatProps> = ({ sender, event }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  console.log("sender", sender, "event", event);

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${event}/messages`);

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray: IMessage[] = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });
  }, [event]);

  const sendMessage = () => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${event}/messages`);

    push(messagesRef, {
      message: message,
      sender: sender,
      timestamp: new Date().getTime(),
    }).then(() => {
      setMessage("");
    });
  };

  return (
    <div className="chat-container">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sender: msg.sender,
                  direction: sender === msg.sender ? "outgoing" : "incoming",
                  position: "single",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={message}
            onChange={(text) => setMessage(text)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
