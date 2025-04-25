import * as React from "react";

function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-lg border border-[#0000000D] bg-white ${className}`}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={`p-5 ${className}`} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={`px-5 pb-5 ${className}`} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div className={`px-5 pb-4 ${className}`} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter };
