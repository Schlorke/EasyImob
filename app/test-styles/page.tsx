export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Teste de Estilos Tailwind</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Card 1</h2>
            <p className="text-gray-600">Este é um card de teste com estilos Tailwind CSS.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Botão Teste
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Card 2</h2>
            <p className="text-gray-600">Testando cores e responsividade.</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Card 3</h2>
            <p className="text-gray-600">Flexbox e grid funcionando.</p>
            <div className="mt-4 flex space-x-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                Tag 1
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                Tag 2
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Teste de Classes Customizadas</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="h-20 bg-red-500 rounded"></div>
            <div className="h-20 bg-green-500 rounded"></div>
            <div className="h-20 bg-blue-500 rounded"></div>
            <div className="h-20 bg-yellow-500 rounded"></div>
            <div className="h-20 bg-purple-500 rounded"></div>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
