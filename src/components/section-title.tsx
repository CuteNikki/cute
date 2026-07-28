export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className='flex items-center gap-2 font-display text-2xl font-bold text-primary justify-center text-center lg:text-start lg:justify-start'>
      <span aria-hidden='true'>✿</span>
      {children}
    </h2>
  );
}
