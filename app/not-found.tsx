export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Página não encontrada</p>
        <a
          href="/"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
