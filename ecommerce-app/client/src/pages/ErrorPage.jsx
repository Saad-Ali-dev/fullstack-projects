export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">
          ⚠️ 404 Not Found
        </h2>
        <p className="text-center mb-4">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
