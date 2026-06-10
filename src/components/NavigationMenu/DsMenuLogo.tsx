import menuLogo from '../../assets/menu-logo.png';
import { DS_NAVIGATION_MENU_PANEL } from './menuPanelMetrics';

export interface DsMenuLogoProps {
  label?: string;
  showLabel?: boolean;
  /** Override default brand mark — Figma 22506:8661 */
  logoSrc?: string;
  className?: string;
}

/** Figma Menu header / logo 22506:8661 */
export function DsMenuLogo({
  label = 'Fleet Management System',
  showLabel = true,
  logoSrc = menuLogo,
  className,
}: DsMenuLogoProps) {
  return (
    <div className={['ds-menu-logo', className].filter(Boolean).join(' ')}>
      <span
        className="ds-menu-logo__mark"
        style={{
          width: DS_NAVIGATION_MENU_PANEL.logoMarkWidthPx,
          height: DS_NAVIGATION_MENU_PANEL.logoMarkHeightPx,
        }}
      >
        <img
          src={logoSrc}
          alt=""
          className="ds-menu-logo__image"
          width={DS_NAVIGATION_MENU_PANEL.logoMarkWidthPx}
          height={DS_NAVIGATION_MENU_PANEL.logoMarkHeightPx}
        />
      </span>
      {showLabel ? <span className="ds-menu-logo__label">{label}</span> : null}
    </div>
  );
}
