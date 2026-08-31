/** Small uppercase brand-colored label above section headings. */
export function Eyebrow({
  children,
  bracket = false,
  className = '',
}: {
  children: React.ReactNode
  bracket?: boolean
  className?: string
}) {
  return (
    <div className={`text-[13px] font-bold uppercase tracking-[0.06em] text-brand ${className}`}>
      {bracket ? <>[ {children} ]</> : children}
    </div>
  )
}
