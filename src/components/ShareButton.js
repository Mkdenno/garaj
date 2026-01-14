import { useState } from 'react';
import './ShareButton.css';

function ShareButton({ garage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}?garage=${garage.id}`;
  const shareText = `Check out ${garage.name} in ${garage.city}, ${garage.country}! ⭐ ${garage.rating} rating. ${shareUrl}`;

  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      sms: `sms:?body=${encodedText}`,
      email: `mailto:?subject=${encodeURIComponent(`Check out ${garage.name}`)}&body=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
      setShowMenu(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowMenu(false);
    }, 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: garage.name,
          text: shareText,
          url: shareUrl,
        });
        setShowMenu(false);
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="share-button-container">
      <button 
        className="share-button"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Share garage"
      >
        📤 Share
      </button>

      {showMenu && (
        <>
          <div className="share-overlay" onClick={() => setShowMenu(false)} />
          <div className="share-menu">
            <h4>Share this garage</h4>
            
            {navigator.share && (
              <button onClick={handleNativeShare} className="share-option">
                <span className="share-icon">📱</span>
                <span>Share via...</span>
              </button>
            )}

            <button onClick={() => handleShare('whatsapp')} className="share-option">
              <span className="share-icon">💬</span>
              <span>WhatsApp</span>
            </button>

            <button onClick={() => handleShare('sms')} className="share-option">
              <span className="share-icon">💬</span>
              <span>SMS</span>
            </button>

            <button onClick={() => handleShare('email')} className="share-option">
              <span className="share-icon">📧</span>
              <span>Email</span>
            </button>

            <button onClick={() => handleShare('twitter')} className="share-option">
              <span className="share-icon">🐦</span>
              <span>Twitter</span>
            </button>

            <button onClick={() => handleShare('facebook')} className="share-option">
              <span className="share-icon">👍</span>
              <span>Facebook</span>
            </button>

            <button onClick={copyLink} className="share-option">
              <span className="share-icon">{copied ? '✅' : '🔗'}</span>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShareButton;
