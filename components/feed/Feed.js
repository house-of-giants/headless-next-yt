export const Feed = ({ cols = 3, gap = 4, children }) => (
  <div className={`grid lg:grid-cols-${cols} gap-${gap} pt-4`}>
    {children}
  </div>
);