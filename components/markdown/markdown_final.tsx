'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import 'katex/dist/katex.min.css';

const randomId = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

export function MarkdownFinal({ content, isChoice }: { content: string, isChoice: boolean }) {
  const { theme } = useTheme();
  const mermaidContainerId = useRef(`mermaid-${randomId()}`);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      securityLevel: 'loose'
    });
  }, []);

  const CodeBlock = ({ inline, children = [], className, ...props }: any) => {
    const [mermaidSvg, setMermaidSvg] = useState<string>('');
    const code = props.node && props.node.children ? getCodeString(props.node.children) : children;
    const isMermaid = className && /^language-mermaid/.test(className.toLowerCase());
    const isMath = true;

    useEffect(() => {
      if (isMermaid && typeof code === 'string') {
        const renderMermaid = async () => {
          try {
            const { svg } = await mermaid.render(mermaidContainerId.current, code);
            setMermaidSvg(svg);
          } catch (error) {
            console.error('Mermaid rendering error:', error);
          }
        };
        renderMermaid();
      }
    }, [code, isMermaid]);

    if (isMermaid) {
      return (
        <div 
          className="mermaid-diagram" 
          dangerouslySetInnerHTML={{ __html: mermaidSvg }} 
        />
      );
    }

    if (isMath || (typeof code === 'string' && /^\$\$(.*)\$\$/.test(code))) {
      const mathText = isMath ? code : code.replace(/^\$\$(.*)\$\$/, '$1');
      const html = katex.renderToString(mathText, { throwOnError: false });
      return (
        <code 
          dangerouslySetInnerHTML={{ __html: html }} 
          style={{ background: 'transparent', fontSize: isChoice ? '150%' : '125%' }} 
        />
      );
    }

    return inline ? (
      <code style={{ background: 'transparent', fontSize: isChoice ? '150%' : '125%' }}>
        {children}
      </code>
    ) : (
      <div className="overflow-auto">
        <code style={{ background: 'transparent', fontSize: isChoice ? '150%' : '125%' }}>
          {children}
        </code>
      </div>
    );
  };

  return (
    <MarkdownPreview 
      source={content}
      wrapperElement={{
        "data-color-mode": theme === "dark" ? "dark" : "light"
      }}
      style={{
        backgroundColor: 'transparent',
        fontSize: 'inherit'
      }}
      components={{
        code: CodeBlock
      }}
    />
  );
} 