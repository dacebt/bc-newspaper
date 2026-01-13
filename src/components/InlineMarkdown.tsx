import { Text, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface InlineMarkdownProps {
  text: string;
}

export function InlineMarkdown({ text }: InlineMarkdownProps) {
  // Simple inline markdown parser for **bold**, *italic*, and ***bold italic***
  // Processes in order: ***bold italic***, then **bold**, then *italic*
  const parseInlineMarkdown = (input: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    const remaining = input;
    let key = 0;

    // Step 1: Handle ***bold italic*** first (must come before **bold** and *italic*)
    const boldItalicRegex = /\*\*\*(.*?)\*\*\*/g;
    const boldItalicMatches: Array<{ start: number; end: number; text: string }> = [];
    let boldItalicMatch: RegExpExecArray | null;
    
    while ((boldItalicMatch = boldItalicRegex.exec(remaining)) !== null) {
      boldItalicMatches.push({
        start: boldItalicMatch.index,
        end: boldItalicMatch.index + boldItalicMatch[0].length,
        text: boldItalicMatch[1],
      });
    }

    // Step 2: Handle **bold** (but skip if it's inside a *** match)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const boldMatches: Array<{ start: number; end: number; text: string }> = [];
    let boldMatch: RegExpExecArray | null;
    
    while ((boldMatch = boldRegex.exec(remaining)) !== null) {
      // Skip if this bold match is inside a bold+italic match
      const isInsideBoldItalic = boldItalicMatches.some(
        (bi) => boldMatch!.index >= bi.start && boldMatch!.index < bi.end
      );
      if (!isInsideBoldItalic) {
        boldMatches.push({
          start: boldMatch.index,
          end: boldMatch.index + boldMatch[0].length,
          text: boldMatch[1],
        });
      }
    }

    // Step 3: Handle *italic* (but skip if it's inside a ** or *** match)
    const italicRegex = /\*(.*?)\*/g;
    const italicMatches: Array<{ start: number; end: number; text: string }> = [];
    let italicMatch: RegExpExecArray | null;
    
    while ((italicMatch = italicRegex.exec(remaining)) !== null) {
      // Skip if this italic match is inside a bold or bold+italic match
      const isInsideBold = boldMatches.some(
        (b) => italicMatch!.index >= b.start && italicMatch!.index < b.end
      );
      const isInsideBoldItalic = boldItalicMatches.some(
        (bi) => italicMatch!.index >= bi.start && italicMatch!.index < bi.end
      );
      if (!isInsideBold && !isInsideBoldItalic) {
        italicMatches.push({
          start: italicMatch.index,
          end: italicMatch.index + italicMatch[0].length,
          text: italicMatch[1],
        });
      }
    }

    // Combine all matches and sort by position
    type Match = { start: number; end: number; text: string; type: 'boldItalic' | 'bold' | 'italic' };
    const allMatches: Match[] = [
      ...boldItalicMatches.map((m) => ({ ...m, type: 'boldItalic' as const })),
      ...boldMatches.map((m) => ({ ...m, type: 'bold' as const })),
      ...italicMatches.map((m) => ({ ...m, type: 'italic' as const })),
    ].sort((a, b) => a.start - b.start);

    // Build parts array
    let lastIndex = 0;
    for (const match of allMatches) {
      // Add text before this match
      if (match.start > lastIndex) {
        parts.push(remaining.substring(lastIndex, match.start));
      }

      // Add the formatted text
      if (match.type === 'boldItalic') {
        parts.push(
          <Text key={key++} as="strong" fontWeight="bold" color="inherit">
            <Text as="em" fontStyle="italic">{match.text}</Text>
          </Text>
        );
      } else if (match.type === 'bold') {
        parts.push(
          <Text key={key++} as="strong" fontWeight="bold" color="inherit">
            {match.text}
          </Text>
        );
      } else {
        parts.push(
          <Text key={key++} as="em" fontStyle="italic" color="inherit">
            {match.text}
          </Text>
        );
      }

      lastIndex = match.end;
    }

    // Add remaining text
    if (lastIndex < remaining.length) {
      parts.push(remaining.substring(lastIndex));
    }

    return parts;
  };

  const parsedContent = parseInlineMarkdown(text);

  return (
    <Box>
      {parsedContent.map((part, index) => (
        <span key={index}>{part}</span>
      ))}
    </Box>
  );
}
