import ParagraphView from '@/components/paragraph-view';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ParagraphPage({ params }: { params: PageProps['params'] }) {
  const { id } = await params;

  return (
    <ParagraphView id={id} />
  )
}