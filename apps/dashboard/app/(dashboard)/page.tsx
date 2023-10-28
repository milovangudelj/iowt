export default async function Page(): Promise<JSX.Element> {
  return (
    <div>
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="flex gap-2">
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-50"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-100"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-200"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-300"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-400"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-500"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-600"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-700"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-800"></span>
        <span className="inline-block w-16 h-16 rounded-lg border-outline-primary bg-primary-900"></span>
      </div>
    </div>
  );
}
