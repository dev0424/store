export type ApplicationStatus = "PENDING" | "APPROVED" | "DECLINED";

export type AccountStatus = {
  application_status: ApplicationStatus;
  is_searchable: boolean;
};
