import React from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`section-py container-mx ${className}`}>
      {children}
    </section>
  );
}
