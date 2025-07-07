import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAvailableTopics } from '@/data/quotes';

// Form validation schema using Zod
const formSchema = z.object({
  topic: z
    .string()
    .min(2, {
      message: 'Topic must be at least 2 characters.',
    })
    .max(50, {
      message: 'Topic must not be longer than 50 characters.',
    }),
});

interface QuoteFormProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

export function QuoteForm({ onSubmit, isLoading = false }: QuoteFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const availableTopics = getAvailableTopics();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  // Handle form submission
  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.topic);
    setShowSuggestions(false);
  }

  // Handle suggestion click
  const handleSuggestionClick = (topic: string) => {
    form.setValue('topic', topic);
    setShowSuggestions(false);
    onSubmit(topic);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quote Generator
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Discover inspiring quotes on any topic that moves you
        </p>
      </div>

      {/* Form Section */}
      <div className="card bg-card shadow-[var(--shadow-form)] border-0 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    What inspires you today?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter a topic (e.g., life, success, happiness)"
                        className="pl-10 h-12 text-lg"
                        {...field}
                        onFocus={() => setShowSuggestions(true)}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter any topic to discover three inspiring quotes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Topic Suggestions */}
            {showSuggestions && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Popular topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
                      onClick={() => handleSuggestionClick(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating Quotes...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Quotes
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}