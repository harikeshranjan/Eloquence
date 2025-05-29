import ParagraphEdit from '@/components/paragraph-edit';
import React from 'react';

export default async function EditParagraphPage({params}: { params: Promise<{id: string}> }) {
  const  { id }  = await params;

  return (
    <ParagraphEdit id={id} />
  );
}