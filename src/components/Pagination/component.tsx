import { Input } from 'antd';
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { DsSelect } from '../Select';
import { DsIconChevronLeft, DsIconChevronRight } from '../../icons';
import '../Input/component.css';
import '../Select/component.css';
import './component.css';

export const DS_PAGINATION_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

export interface DsPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  pageSizeOptions?: readonly number[];
  className?: string;
  onChange?: (page: number, pageSize: number) => void;
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(1, page), totalPages);
}

function paginationClass(className?: string) {
  return ['ds-pagination', className].filter(Boolean).join(' ');
}

/** Figma 807:49160 — range label, page input, arrows, and page-size select. */
export function DsPagination({
  total,
  current,
  pageSize,
  pageSizeOptions = DS_PAGINATION_PAGE_SIZE_OPTIONS,
  className,
  onChange,
}: DsPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [pageInput, setPageInput] = useState(String(current));

  useEffect(() => {
    setPageInput(String(current));
  }, [current]);

  const rangeLabel = useMemo(() => {
    if (total === 0) {
      return `0 – 0 of 0`;
    }
    const from = (current - 1) * pageSize + 1;
    const to = Math.min(current * pageSize, total);
    return `${from} – ${to} of ${total}`;
  }, [current, pageSize, total]);

  const sizeOptions = useMemo(
    () =>
      pageSizeOptions.map((size) => ({
        value: size,
        label: `${size} / page`,
      })),
    [pageSizeOptions],
  );

  const commitPage = (raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(current));
      return;
    }
    const nextPage = clampPage(parsed, totalPages);
    setPageInput(String(nextPage));
    if (nextPage !== current) {
      onChange?.(nextPage, pageSize);
    }
  };

  const handlePageKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      commitPage(pageInput);
    }
  };

  const goToPage = (nextPage: number) => {
    const clamped = clampPage(nextPage, totalPages);
    setPageInput(String(clamped));
    if (clamped !== current) {
      onChange?.(clamped, pageSize);
    }
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    onChange?.(1, nextPageSize);
  };

  return (
    <div className={paginationClass(className)}>
      <p className="ds-pagination__range text-base-normal">{rangeLabel}</p>

      <div className="ds-pagination__controls">
        <button
          type="button"
          className="ds-pagination__arrow"
          aria-label="Previous page"
          disabled={current <= 1}
          onClick={() => goToPage(current - 1)}
        >
          <DsIconChevronLeft size={16} />
        </button>

        <div className="ds-input ds-input--basic ds-input--small ds-pagination__page-input">
          <Input
            size="middle"
            value={pageInput}
            className="ds-input__control"
            onChange={(event) => setPageInput(event.target.value)}
            onBlur={() => commitPage(pageInput)}
            onKeyDown={handlePageKeyDown}
          />
        </div>

        <span className="ds-pagination__separator" aria-hidden>
          /
        </span>
        <span className="ds-pagination__total-pages" aria-label={`${totalPages} pages`}>
          {totalPages}
        </span>

        <button
          type="button"
          className="ds-pagination__arrow"
          aria-label="Next page"
          disabled={current >= totalPages}
          onClick={() => goToPage(current + 1)}
        >
          <DsIconChevronRight size={16} />
        </button>
      </div>

      <DsSelect
        size="small"
        variant="basic"
        className="ds-pagination__size"
        value={pageSize}
        options={sizeOptions}
        onChange={(value) => handlePageSizeChange(Number(value))}
      />
    </div>
  );
}

export default DsPagination;
