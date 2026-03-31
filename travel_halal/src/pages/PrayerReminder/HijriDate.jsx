export default function HijriDate({ hijri }) {
  if (!hijri) return null
  return (
    <div className="text-center mb-6 p-4 bg-islamic-greenPale rounded-2xl">
      <p className="text-xl font-semibold text-islamic-green">
        {hijri.day} {hijri.month.en} {hijri.year} AH
      </p>
    </div>
  )
}
