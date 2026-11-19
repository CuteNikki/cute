export function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className='flex items-center justify-center gap-2 text-center font-display text-2xl font-bold text-primary lg:justify-start lg:text-start'
    >
      <span aria-hidden='true'>✿</span>
      {children}
    </h2>
  );
}
