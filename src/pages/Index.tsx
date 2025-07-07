import { useState } from 'react';
import { QuoteForm } from '@/components/QuoteForm';
import { QuoteDisplay } from '@/components/QuoteDisplay';
import { getQuotesByTopic } from '@/data/quotes';
import { Quote } from '@/data/quotes';

const Index = () => {
  // State management for quotes and current topic
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission - fetch quotes for the given topic
  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      const fetchedQuotes = getQuotesByTopic(topic);
      setQuotes(fetchedQuotes);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--quote-background)] py-8 px-4">
      <div className="container mx-auto">
        {/* Quote Generation Form */}
        <QuoteForm onSubmit={handleTopicSubmit} isLoading={isLoading} />
        
        {/* Loading State */}
        {isLoading && (
          <div className="w-full max-w-4xl mx-auto mt-12">
            <div className="card bg-card p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Finding inspiring quotes...</h3>
              <p className="text-muted-foreground">
                Searching for the best {currentTopic} quotes just for you
              </p>
            </div>
          </div>
        )}
        
        {/* Quote Display - Only show when we have results and not loading */}
        {!isLoading && quotes.length > 0 && (
          <QuoteDisplay quotes={quotes} topic={currentTopic} />
        )}
        
        {/* No results state - Only show when we have searched but found nothing */}
        {!isLoading && currentTopic && quotes.length === 0 && (
          <QuoteDisplay quotes={[]} topic={currentTopic} />
        )}
      </div>
    </div>
  );
};

export default Index;
