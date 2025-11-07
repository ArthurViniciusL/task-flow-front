import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific card props here
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific CardContent props here
}

const CardContent: React.FC<CardContentProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific CardHeader props here
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Add any specific CardTitle props here
}

const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => {
  return (
    <p {...props}>
      {children}
    </p>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Add any specific CardDescription props here
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, ...props }) => {
  return (
    <p {...props}>
      {children}
    </p>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific CardFooter props here
}

const CardFooter: React.FC<CardFooterProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter };
