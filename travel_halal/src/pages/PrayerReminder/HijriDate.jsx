export default function HijriDate({ hijri }) {
  return (
    <div className="text-center mb-6 p-4 bg-islamic-greenPale rounded-2xl">
      <p className="text-xl font-semibold text-islamic-green">
        {hijri.day} {hijri.month.en} {hijri.year} AH
      </p>
      <p className="text-sm text-gray-500 mt-0.5">{hijri.designation?.expanded}</p>
    </div>
  )
}
