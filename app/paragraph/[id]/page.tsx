import ParagraphView from '@/components/paragraph-view';
import React from 'react';

export default async function ParagraphPage({
  params
}: {
  params: Promise<{id: string}>;
}
) {
  const { id } = await params;

  return (
    <ParagraphView id={id} />
  )
}