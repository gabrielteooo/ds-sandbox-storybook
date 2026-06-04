import type { Dayjs } from 'dayjs';

export const TEXT_AREA_MAX = 2000;

export interface DefermentCounterRow {
  id: string;
  counter: string;
  due: string;
  current: string;
}

export interface CustomConfigurationFormState {
  serviceability: string;
  aircraftStatus: string;
  usDateTime: Dayjs | null;
  reportedBy: string;
  reportingUnit: string | undefined;
  problemDescription: string;
  foundDuring: string;
  maintenanceUnit: string | undefined;
  workCentre: string | undefined;
  trade: string;
  rectificationStart: Dayjs | null;
  rectificationEnd: Dayjs | null;
  defectEtr: Dayjs | null;
  etrExtensionReason: string;
  specifyReason: string;
  rectificationFlags: {
    fair: boolean;
    repeatRecur: boolean;
    srect: boolean;
  };
  rectificationRemarksPsg: string;
  transferToAdd: boolean;
  transferToFlyingLog: boolean;
  transferToSortieMonitoring: boolean;
  periodOfDeferment: Dayjs | null;
  demandNo: string;
  defermentCounters: DefermentCounterRow[];
  addRemarks: string;
  transferFlags: {
    projectRelated: boolean;
    incurLimitation: boolean;
    reportedInPsg: boolean;
  };
  limitation: string;
}

export interface CustomConfigurationPayload {
  aircraft: {
    serviceability: string;
    aircraftStatus: string;
    usDateTime: string | null;
  };
  job: {
    reportedBy: string;
    reportingUnit: string | undefined;
    problemDescription: string;
  };
  rectification: {
    foundDuring: string;
    maintenanceUnit: string | undefined;
    workCentre: string | undefined;
    trade: string;
    rectificationStart: string | null;
    rectificationEnd: string | null;
    defectEtr: string | null;
    etrExtensionReason: string;
    specifyReason: string;
    rectificationFlags: CustomConfigurationFormState['rectificationFlags'];
    rectificationRemarksPsg: string;
  };
  transfer: {
    transferToAdd: boolean;
    transferToFlyingLog: boolean;
    transferToSortieMonitoring: boolean;
    periodOfDeferment: string | null;
    demandNo: string;
    defermentCounters: DefermentCounterRow[];
    addRemarks: string;
    transferFlags: CustomConfigurationFormState['transferFlags'];
    limitation: string;
  };
}
