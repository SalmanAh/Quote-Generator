// Quote data structure for the Quote Generator App
// Each topic contains an array of inspiring quotes from notable figures

export interface Quote {
  text: string;
  author: string;
  source?: string;
}

export interface QuoteCollection {
  [topic: string]: Quote[];
}

export const quotesData: QuoteCollection = {
  life: [
    {
      text: "The purpose of our lives is to be happy.",
      author: "Dalai Lama",
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
    },
    {
      text: "Get busy living or get busy dying.",
      author: "Stephen King",
    },
  ],
  success: [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The way to success is to take massive, determined action.",
      author: "Tony Robbins",
    },
    {
      text: "Success is walking from failure to failure with no loss of enthusiasm.",
      author: "Winston Churchill",
    },
  ],
  happiness: [
    {
      text: "The best way to cheer yourself up is to try to cheer somebody else up.",
      author: "Mark Twain",
    },
    {
      text: "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama",
    },
    {
      text: "The secret of happiness is freedom, the secret of freedom is courage.",
      author: "Carrie Jones",
    },
  ],
  motivation: [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
  ],
  love: [
    {
      text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
      author: "Lao Tzu",
    },
    {
      text: "The best thing to hold onto in life is each other.",
      author: "Audrey Hepburn",
    },
    {
      text: "Love is composed of a single soul inhabiting two bodies.",
      author: "Aristotle",
    },
  ],
  wisdom: [
    {
      text: "The only true wisdom is in knowing you know nothing.",
      author: "Socrates",
    },
    {
      text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
      author: "Bill Keane",
    },
    {
      text: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
      author: "William Shakespeare",
    },
  ],
  courage: [
    {
      text: "Courage is not the absence of fear, but action in spite of it.",
      author: "Mark Twain",
    },
    {
      text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius",
    },
    {
      text: "It takes courage to grow up and become who you really are.",
      author: "E.E. Cummings",
    },
  ],
  dreams: [
    {
      text: "All our dreams can come true, if we have the courage to pursue them.",
      author: "Walt Disney",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "A dream you dream alone is only a dream. A dream you dream together is reality.",
      author: "John Lennon",
    },
  ],
};

// Function to get quotes by topic
export const getQuotesByTopic = (topic: string): Quote[] => {
  const normalizedTopic = topic.toLowerCase().trim();
  return quotesData[normalizedTopic] || [];
};

// Function to get all available topics
export const getAvailableTopics = (): string[] => {
  return Object.keys(quotesData);
};