export const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span
        className="text-slate-900 animate-spinner dark:text-slate-100 overflow-hidden relative"
        style={{
          borderRadius: '50%',
          fontSize: '45px',
          height: '1em',
          textIndent: '-9999em',
          transform: 'translateZ(0)',
          width: '1em'
        }}
      />
    </div>
  );
};
