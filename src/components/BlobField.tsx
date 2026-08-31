type BlobConfig = {
  color: string
  top?: string
  left?: string
  right?: string
  size: number
  anim: 'a' | 'b'
}

/**
 * Decorative floating gradient blobs that sit behind page content — the
 * signature background motif from the design. Purely presentational and
 * hidden from assistive tech; drifting is disabled under reduced-motion.
 */
export function BlobField({ blobs }: { blobs: BlobConfig[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={
            b.anim === 'a'
              ? 'animate-[blobFloatA_14s_ease-in-out_infinite]'
              : 'animate-[blobFloatB_16s_ease-in-out_infinite]'
          }
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            right: b.right,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      ))}
    </div>
  )
}

/** The standard three-blob arrangement used on most pages. */
export function DefaultBlobs() {
  return (
    <BlobField
      blobs={[
        { color: 'rgba(139,124,246,.35)', top: '-140px', left: '-100px', size: 480, anim: 'a' },
        { color: 'rgba(110,198,255,.32)', top: '200px', right: '-160px', size: 520, anim: 'b' },
        { color: 'rgba(255,158,196,.3)', top: '900px', left: '20%', size: 460, anim: 'a' },
      ]}
    />
  )
}
