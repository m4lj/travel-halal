export default function ErrorBanner({ message }) {
  return (
    <div className="m-4 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-sm">
      ❌ <strong>Error:</strong> {message}
    </div>
  )
}
