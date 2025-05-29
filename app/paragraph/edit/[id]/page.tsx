import ParagraphEdit from '@/components/ParagraphEdit';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditParagraphPage({params}: { params: PageProps['params'] }) {
  const  { id }  = await params;

  return (
    <ParagraphEdit id={id} />
  );
}