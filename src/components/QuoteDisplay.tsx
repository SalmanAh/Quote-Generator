import { Quote as QuoteIcon, Heart, Share2 } from 'lucide-react';
import { Quote } from '@/data/quotes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface QuoteDisplayProps {
  quotes: Quote[];
  topic: string;
}

export function QuoteDisplay({ quotes, topic }: QuoteDisplayProps) {
  const { toast } = useToast();

  // Handle quote sharing
  const handleShare = async (quote: Quote) => {
    const text = `"${quote.text}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspiring Quote',
          text: text,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Quote copied!",
          description: "The quote has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Unable to copy the quote. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle quote liking (for demonstration purposes)
  const handleLike = (quote: Quote) => {
    toast({
      title: "Quote liked!",
      description: `You liked: "${quote.text.substring(0, 50)}..."`,
    });
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="card bg-card border border-destructive/20 p-8 text-center">
          <QuoteIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No quotes found</h3>
          <p className="text-muted-foreground">
            Sorry, we couldn't find any quotes for "{topic}". Try a different topic like "life", "success", or "happiness".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* Results Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 capitalize">
          {topic}
        </Badge>
        <h2 className="text-3xl font-bold mb-2">
          Inspiring Quotes About{' '}
          <span className="text-primary capitalize">{topic}</span>
        </h2>
        <p className="text-muted-foreground">
          Here are {quotes.length} carefully selected quotes to inspire you
        </p>
      </div>

      {/* Quotes Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="card bg-[var(--gradient-card)] shadow-[var(--shadow-card)] border-0 p-8 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Quote Icon */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                <QuoteIcon className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                {/* Quote Text */}
                <blockquote className="text-xl leading-relaxed text-foreground font-medium">
                  "{quote.text}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <cite className="text-lg font-semibold text-primary not-italic">
                    — {quote.author}
                    {quote.source && (
                      <span className="text-muted-foreground font-normal text-base ml-2">
                        ({quote.source})
                      </span>
                    )}
                  </cite>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(quote)}
                      className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(quote)}
                      className="hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">
          Want more inspiration? Try searching for another topic above!
        </p>
      </div>
    </div>
  );
}