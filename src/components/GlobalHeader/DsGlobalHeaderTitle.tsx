import type { ReactNode } from 'react';
import { DsIconChevronLeft } from '../../icons';

export interface DsGlobalHeaderTitleProps {
  /** Figma 4822:86376 — page heading */
  title: ReactNode;
  showBackButton?: boolean;
  showExternalLink?: boolean;
  externalLinkIcon?: ReactNode;
  showSubtitle?: boolean;
  subtitle?: ReactNode;
  showHelpGuideLink?: boolean;
  helpGuideLabel?: string;
  onBackClick?: () => void;
  onHelpGuideClick?: () => void;
  className?: string;
}

/** Figma Header-title 4822:86378 */
export function DsGlobalHeaderTitle({
  title,
  showBackButton = false,
  showExternalLink = false,
  externalLinkIcon,
  showSubtitle = false,
  subtitle = 'Subtitle',
  showHelpGuideLink = false,
  helpGuideLabel = 'View help guide',
  onBackClick,
  onHelpGuideClick,
  className,
}: DsGlobalHeaderTitleProps) {
  return (
    <div
      className={['ds-global-header-title', className].filter(Boolean).join(' ')}
    >
      {showBackButton ? (
        <button
          type="button"
          className="ds-global-header-title__back"
          aria-label="Go back"
          onClick={onBackClick}
        >
          <DsIconChevronLeft size={16} />
        </button>
      ) : null}

      <div className="ds-global-header-title__content">
        <div className="ds-global-header-title__row">
          <h1 className="ds-global-header-title__heading text-heading-3">
            {title}
          </h1>
          {showExternalLink ? (
            <span className="ds-global-header-title__external">
              {externalLinkIcon}
            </span>
          ) : null}
        </div>

        {showSubtitle ? (
          <p className="ds-global-header-title__subtitle text-sm-normal">
            {subtitle}
          </p>
        ) : null}

        {showHelpGuideLink ? (
          <button
            type="button"
            className="ds-global-header-title__help-link"
            onClick={onHelpGuideClick}
          >
            {helpGuideLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
