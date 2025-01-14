export interface LeadsInfo {
  alias: string;
  user: {
    first_name: string;
    last_name: string;
    profile_image: string;
    nid: string;
    user_type: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
  role: string;
  designation: string;
  official_email: string;
  official_phone: string;
  permanent_address: string;
  present_address: string;
  dob: string;
  gender: string;
  joining_date: string;
  registration_number: string;
  degree: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
}

export interface FetchLeadsProps {
  setIsFetchedLead?: any;
  isFetchedLead?: any;
}
export interface AddLeadModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: () => void;
}
export interface UpdateLeadModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: (leadData: Partial<LeadsInfo>) => void;
  selectedLead: Partial<LeadsInfo>;
  fetchLeads?: any;
}
export interface DeleteLeadModalProps {
  isOpen: boolean;
  toggle: () => void;
  onDelete: () => void;
  leadName: string;
  isLoading?: any;
}
