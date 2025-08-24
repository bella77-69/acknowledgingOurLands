export const GridLayout = ({ main, sidebar }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">{main}</div>
      <div className="space-y-6">{sidebar}</div>
    </div>
  );
};
