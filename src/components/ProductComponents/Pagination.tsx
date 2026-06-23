type Props = {
  page: number;
  hasNext: boolean;
  isFetching: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, hasNext, isFetching, onPrev, onNext }: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={page === 1 || isFetching}
        className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>
      <span className="text-sm text-gray-500">Page {page}</span>
      <button
        onClick={onNext}
        disabled={!hasNext || isFetching}
        className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}