export default function PageTags({ tags }) {
  return (
    <div className="flex sm:flex-row flex-col items-center gap-3">
      <span className="font-bold text-nowrap">برچسب ها :</span>
      <div className="flex flex-wrap sm:justify-normal justify-center gap-2">
        {tags.split(",").map((e, i) => (
          <span
            key={i}
            className="bg-gray-200 px-4 sm:text-sm text-xs py-1 rounded-lg border-2 border-gray-500 text-gray-500 border-dashed"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
