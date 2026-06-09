import type { ReactNode } from 'react';
import { DsAvatar } from '../Avatar';
import '../Avatar/component.css';
import {
  createBreadcrumbEllipsisItem,
  DsBreadcrumb,
  type DsBreadcrumbItem,
} from '../Breadcrumb';
import '../Breadcrumb/component.css';
import { DsButton } from '../Button';
import '../Button/component.css';
import { DsInput } from '../Input/component';
import '../Input/component.css';
import { DsTabs, type DsTabItem } from '../Tab';
import '../Tab/component.css';
import {
  DsIconAnglesUp,
  DsIconBell,
  DsIconCircleQuestion,
} from '../../icons';
import { DsGlobalHeaderTitle } from './DsGlobalHeaderTitle';
import {
  DS_GLOBAL_HEADER_TYPES,
  type DsGlobalHeaderType,
} from './globalHeaderPanelMetrics';
import './component.css';

export { DS_GLOBAL_HEADER_PANEL } from './globalHeaderPanelMetrics';
export {
  DS_GLOBAL_HEADER_TYPES,
  type DsGlobalHeaderType,
} from './globalHeaderPanelMetrics';
export {
  DsGlobalHeaderTitle,
  type DsGlobalHeaderTitleProps,
} from './DsGlobalHeaderTitle';

export interface DsGlobalHeaderProps {
  /** Figma variant — Default · With Tabs · With Search */
  type?: DsGlobalHeaderType;
  /** Figma 4822:86376 — page title */
  title?: ReactNode;
  /** Breadcrumb trail — ellipsis path used for `with-search` when omitted */
  breadcrumbItems?: DsBreadcrumbItem[];
  showBreadcrumbs?: boolean;
  /** Data sync metadata — hidden for `with-search` */
  showDataSync?: boolean;
  dataSyncLabel?: string;
  dataSyncTimestamp?: string;
  /** Secondary CTA — Figma "View in Qlik" placeholder button */
  showPrimaryAction?: boolean;
  primaryActionLabel?: string;
  onPrimaryActionClick?: () => void;
  /** Icon-only collapse filters action */
  showCollapseFilters?: boolean;
  onCollapseFiltersClick?: () => void;
  /** With Tabs — line tab labels (Figma 512:65398) */
  tabItems?: DsTabItem[];
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  onTabChange?: (activeKey: string) => void;
  /** With Search — Figma Input/Search 515:41352 */
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchChange?: (value: string) => void;
  /** Utility actions — bell, help, avatar */
  showNotifications?: boolean;
  onNotificationsClick?: () => void;
  showHelp?: boolean;
  onHelpClick?: () => void;
  showAvatar?: boolean;
  avatarText?: string;
  className?: string;
}

const DEFAULT_BREADCRUMB_ITEMS: DsBreadcrumbItem[] = [
  { title: 'Home', href: '#' },
  { title: 'Breadcrumb Link', href: '#' },
  { title: 'Breadcrumb Link' },
];

const SEARCH_BREADCRUMB_ITEMS: DsBreadcrumbItem[] = [
  { title: 'Home', href: '#' },
  createBreadcrumbEllipsisItem([
    { key: '1', label: 'Breadcrumb 1' },
    { key: '2', label: 'Breadcrumb 2' },
    { key: '3', label: 'Breadcrumb 3' },
  ]),
  { title: 'Breadcrumb Link', href: '#' },
  { title: 'Breadcrumb Link' },
];

const DEFAULT_TAB_ITEMS: DsTabItem[] = Array.from({ length: 6 }, (_, index) => ({
  key: String(index + 1),
  label: 'Tab title',
}));

function IconActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="ds-global-header__icon-btn"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function UtilityActions({
  showNotifications,
  onNotificationsClick,
  showHelp,
  onHelpClick,
  showAvatar,
  avatarText,
}: Pick<
  DsGlobalHeaderProps,
  | 'showNotifications'
  | 'onNotificationsClick'
  | 'showHelp'
  | 'onHelpClick'
  | 'showAvatar'
  | 'avatarText'
>) {
  return (
    <div className="ds-global-header__actions">
      {showNotifications ? (
        <IconActionButton label="Notifications" onClick={onNotificationsClick}>
          <DsIconBell size={16} />
        </IconActionButton>
      ) : null}
      {showHelp ? (
        <IconActionButton label="Help center" onClick={onHelpClick}>
          <DsIconCircleQuestion size={16} variant="solid" />
        </IconActionButton>
      ) : null}
      {showAvatar ? (
        <DsAvatar type="text" size="small" text={avatarText} />
      ) : null}
    </div>
  );
}

function MetaActions({
  showDataSync,
  dataSyncLabel,
  dataSyncTimestamp,
  showPrimaryAction,
  primaryActionLabel,
  onPrimaryActionClick,
  showCollapseFilters,
  onCollapseFiltersClick,
}: Pick<
  DsGlobalHeaderProps,
  | 'showDataSync'
  | 'dataSyncLabel'
  | 'dataSyncTimestamp'
  | 'showPrimaryAction'
  | 'primaryActionLabel'
  | 'onPrimaryActionClick'
  | 'showCollapseFilters'
  | 'onCollapseFiltersClick'
>) {
  if (!showDataSync) {
    return null;
  }

  return (
    <div className="ds-global-header__meta">
      <p className="ds-global-header__timestamp text-sm-normal">
        <span className="ds-global-header__timestamp-label">{dataSyncLabel}</span>{' '}
        <span className="ds-global-header__timestamp-value text-sm-strong">
          {dataSyncTimestamp}
        </span>
      </p>

      {showPrimaryAction || showCollapseFilters ? (
        <div className="ds-global-header__cta">
          {showPrimaryAction ? (
            <DsButton
              variant="secondary"
              size="small"
              label={primaryActionLabel}
              onClick={onPrimaryActionClick}
            />
          ) : null}
          {showCollapseFilters ? (
            <DsButton
              variant="secondary"
              size="small"
              iconOnly
              icon={<DsIconAnglesUp size={14} />}
              onClick={onCollapseFiltersClick}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Figma Global Header 700:84831 — Default · With Tabs · With Search. */
export function DsGlobalHeader({
  type = 'default',
  title = 'Current page title',
  breadcrumbItems,
  showBreadcrumbs = true,
  showDataSync = true,
  dataSyncLabel = 'Data last retrieved on',
  dataSyncTimestamp = '01 Oct 2024, 09:15 SGT',
  showPrimaryAction = true,
  primaryActionLabel = 'Button',
  onPrimaryActionClick,
  showCollapseFilters = true,
  onCollapseFiltersClick,
  tabItems = DEFAULT_TAB_ITEMS,
  activeTabKey,
  defaultActiveTabKey = '1',
  onTabChange,
  searchPlaceholder = 'Search for keywords',
  searchValue,
  defaultSearchValue,
  onSearchChange,
  showNotifications = true,
  onNotificationsClick,
  showHelp = true,
  onHelpClick,
  showAvatar = true,
  avatarText = 'JD',
  className,
}: DsGlobalHeaderProps) {
  const isWithTabs = type === 'with-tabs';
  const isWithSearch = type === 'with-search';

  const resolvedBreadcrumbItems =
    breadcrumbItems ??
    (isWithSearch ? SEARCH_BREADCRUMB_ITEMS : DEFAULT_BREADCRUMB_ITEMS);

  const showMeta = showDataSync && !isWithSearch;

  return (
    <header
      className={[
        'ds-global-header',
        isWithTabs ? 'ds-global-header--with-tabs' : '',
        isWithSearch ? 'ds-global-header--with-search' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ds-global-header__top">
        {showBreadcrumbs ? (
          <DsBreadcrumb items={resolvedBreadcrumbItems} showHomeIcon />
        ) : (
          <span />
        )}

        <UtilityActions
          showNotifications={showNotifications}
          onNotificationsClick={onNotificationsClick}
          showHelp={showHelp}
          onHelpClick={onHelpClick}
          showAvatar={showAvatar}
          avatarText={avatarText}
        />
      </div>

      {isWithTabs ? (
        <div className="ds-global-header__title-section">
          <div className="ds-global-header__bottom">
            <DsGlobalHeaderTitle title={title} />
            <MetaActions
              showDataSync={showMeta}
              dataSyncLabel={dataSyncLabel}
              dataSyncTimestamp={dataSyncTimestamp}
              showPrimaryAction={showPrimaryAction}
              primaryActionLabel={primaryActionLabel}
              onPrimaryActionClick={onPrimaryActionClick}
              showCollapseFilters={showCollapseFilters}
              onCollapseFiltersClick={onCollapseFiltersClick}
            />
          </div>

          <DsTabs
            className="ds-global-header__tabs"
            variant="basic"
            size="default"
            items={tabItems}
            activeKey={activeTabKey}
            defaultActiveKey={defaultActiveTabKey}
            onChange={onTabChange}
          />
        </div>
      ) : (
        <div className="ds-global-header__bottom">
          <DsGlobalHeaderTitle title={title} />

          {isWithSearch ? (
            <div className="ds-global-header__search">
              <DsInput
                kind="search"
                size="small"
                placeholder={searchPlaceholder}
                value={searchValue}
                defaultValue={defaultSearchValue}
                onChange={onSearchChange}
                searchButtonType="default"
              />
            </div>
          ) : (
            <MetaActions
              showDataSync={showMeta}
              dataSyncLabel={dataSyncLabel}
              dataSyncTimestamp={dataSyncTimestamp}
              showPrimaryAction={showPrimaryAction}
              primaryActionLabel={primaryActionLabel}
              onPrimaryActionClick={onPrimaryActionClick}
              showCollapseFilters={showCollapseFilters}
              onCollapseFiltersClick={onCollapseFiltersClick}
            />
          )}
        </div>
      )}
    </header>
  );
}

export default DsGlobalHeader;
