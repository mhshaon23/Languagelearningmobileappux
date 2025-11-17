import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'post-lesson' | 'settings';
}

export function FeedbackDialog({ isOpen, onClose, context = 'settings' }: FeedbackDialogProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const emojis = [
    { value: 'terrible', emoji: '😞', label: 'Terrible' },
    { value: 'poor', emoji: '😕', label: 'Poor' },
    { value: 'okay', emoji: '😐', label: 'Okay' },
    { value: 'good', emoji: '🙂', label: 'Good' },
    { value: 'amazing', emoji: '😍', label: 'Amazing' },
  ];

  const categories = [
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'general', label: 'General Feedback' },
  ];

  const handleSubmit = () => {
    // In a real app, this would send the feedback to a backend
    console.log('Feedback submitted:', {
      rating: selectedRating,
      category: selectedCategory,
      feedback: feedbackText,
      context,
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setSelectedRating(null);
      setFeedbackText('');
      setSelectedCategory('general');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-gray-900 mb-2">Thank you!</div>
            <div className="text-sm text-gray-600">Your feedback helps us improve.</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="text-gray-900">
                {context === 'post-lesson' ? 'How was this lesson?' : 'Send Feedback'}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Emoji Rating */}
              <div>
                <div className="text-sm text-gray-700 mb-2">How do you feel?</div>
                <div className="flex justify-between gap-2">
                  {emojis.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setSelectedRating(item.value)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                        selectedRating === item.value
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection - Only for settings context */}
              {context === 'settings' && (
                <div>
                  <div className="text-sm text-gray-700 mb-2">Category</div>
                  <div className="flex gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                          selectedCategory === cat.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Text */}
              <div>
                <div className="text-sm text-gray-700 mb-2">
                  Tell us more (optional)
                </div>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedRating}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    selectedRating
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
