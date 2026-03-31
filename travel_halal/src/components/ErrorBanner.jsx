export default function ErrorBanner({ message }) {
  return (
    <div className="mx-4 my-6 p-5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm
                    flex items-start gap-3 shadow-sm">
      <span className="text-2xl shrink-0">⚠️</span>
      <div>
        <p className="font-semibold text-red-800 mb-0.5">Something went wrong</p>
        <p className="text-red-600">{message}</p>
        <p className="text-xs text-red-400 mt-2">Try refreshing the page or check your internet connection.</p>
      </div>
    </div>
  )
}
