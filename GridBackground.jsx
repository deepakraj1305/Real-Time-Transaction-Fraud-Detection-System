export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
