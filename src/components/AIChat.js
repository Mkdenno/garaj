import { useState, useRef, useEffect } from "react";
import "./AIChat.css";

function AIChat({ garages, onSelectGarage, userLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hi! 👋 I'm your garage finder assistant. You can ask me things like:\n• 'Find garages near Westlands'\n• 'Show me garages with oil change service'\n• 'Garages near Sarit Centre'\n• 'Best rated garages in Nairobi'\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findGaragesByQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    let results = [];
    let responseText = "";

    // Check for landmarks
    const landmarkMatches = garages.filter(garage =>
      garage.landmarks.some(landmark => 
        landmark.toLowerCase().includes(lowerQuery) ||
        lowerQuery.includes(landmark.toLowerCase().split(" ")[0])
      )
    );

    // Check for services
    const serviceMatches = garages.filter(garage =>
      garage.services.some(service => 
        service.toLowerCase().includes(lowerQuery) ||
        lowerQuery.includes(service.toLowerCase())
      ) ||
      garage.specialties.some(specialty =>
        specialty.toLowerCase().includes(lowerQuery) ||
        lowerQuery.includes(specialty.toLowerCase())
      )
    );

    // Check for city/location
    const locationMatches = garages.filter(garage =>
      garage.city.toLowerCase().includes(lowerQuery) ||
      garage.country.toLowerCase().includes(lowerQuery) ||
      lowerQuery.includes(garage.city.toLowerCase())
    );

    // Check for garage name
    const nameMatches = garages.filter(garage =>
      garage.name.toLowerCase().includes(lowerQuery)
    );

    // Check for ratings
    const ratingMatch = lowerQuery.match(/(\d+\.?\d*)\s*(star|rating)/);
    let ratingMatches = [];
    if (ratingMatch) {
      const minRating = parseFloat(ratingMatch[1]);
      ratingMatches = garages.filter(garage => garage.rating >= minRating);
    }

    // Check for "best" or "top"
    if (lowerQuery.includes("best") || lowerQuery.includes("top")) {
      results = [...garages].sort((a, b) => b.rating - a.rating).slice(0, 5);
      responseText = `Here are the top-rated garages I found:`;
    }
    // Check for "nearest" or "closest"
    else if (lowerQuery.includes("nearest") || lowerQuery.includes("closest") || lowerQuery.includes("near me")) {
      results = [...garages].sort((a, b) => a.distance - b.distance).slice(0, 5);
      responseText = `Here are the nearest garages to you:`;
    }
    // Prioritize results
    else if (landmarkMatches.length > 0) {
      results = landmarkMatches.slice(0, 5);
      responseText = `I found ${landmarkMatches.length} garage${landmarkMatches.length > 1 ? 's' : ''} near that landmark:`;
    }
    else if (nameMatches.length > 0) {
      results = nameMatches.slice(0, 5);
      responseText = `I found ${nameMatches.length} garage${nameMatches.length > 1 ? 's' : ''} matching that name:`;
    }
    else if (serviceMatches.length > 0) {
      results = serviceMatches.slice(0, 5);
      responseText = `I found ${serviceMatches.length} garage${serviceMatches.length > 1 ? 's' : ''} offering that service:`;
    }
    else if (locationMatches.length > 0) {
      results = locationMatches.slice(0, 5);
      responseText = `I found ${locationMatches.length} garage${locationMatches.length > 1 ? 's' : ''} in that area:`;
    }
    else if (ratingMatches.length > 0) {
      results = ratingMatches.slice(0, 5);
      responseText = `I found ${ratingMatches.length} garage${ratingMatches.length > 1 ? 's' : ''} with that rating or higher:`;
    }
    else {
      responseText = "I couldn't find any garages matching that. Try asking about:\n• A specific location (e.g., 'Nairobi', 'Westlands')\n• A service (e.g., 'oil change', 'brake repair')\n• A landmark (e.g., 'near Sarit Centre')\n• Or just say 'show nearest garages'";
    }

    return { results, responseText };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const { results, responseText } = findGaragesByQuery(input);
      
      setMessages(prev => [
        ...prev,
        { type: "ai", text: responseText, garages: results }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`ai-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <span className="ai-icon">🤖</span>
        <span className="ai-text">Ask AI</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-content">
              <span className="ai-avatar">🤖</span>
              <div>
                <h3>Garage Finder AI</h3>
                <p>Ask me anything about garages</p>
              </div>
            </div>
            <button 
              className="ai-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`ai-message ${message.type}`}>
                {message.type === "ai" && <span className="message-avatar">🤖</span>}
                <div className="message-content">
                  <p className="message-text">{message.text}</p>
                  {message.garages && message.garages.length > 0 && (
                    <div className="message-garages">
                      {message.garages.map(garage => (
                        <div 
                          key={garage.id} 
                          className="message-garage-card"
                          onClick={() => {
                            onSelectGarage(garage);
                            setIsOpen(false);
                          }}
                        >
                          <div className="garage-card-header">
                            <h4>{garage.name}</h4>
                            <span className="garage-rating">⭐ {garage.rating}</span>
                          </div>
                          <p className="garage-location">📍 {garage.city}, {garage.country}</p>
                          <p className="garage-distance">🚗 {garage.distance} km away</p>
                          <p className="garage-specialties">{garage.specialties.join(" • ")}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.type === "user" && <span className="message-avatar">👤</span>}
              </div>
            ))}
            {isTyping && (
              <div className="ai-message ai">
                <span className="message-avatar">🤖</span>
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Ask about garages, services, or locations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
