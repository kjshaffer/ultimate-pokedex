export default function StatBar({
  label,
  value,
  max = 255,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const percent = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="capitalize">{label}</span>
        <span className="text-gray-500">
          {value} / {max}
        </span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
