// Offline Registration Form Configuration
// This can be modified by admin panel

export interface OfflineFormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'checkbox' | 'date';
  required: boolean;
  enabled: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  width?: 'full' | 'half' | 'third';
}

export interface OfflineFormSection {
  id: string;
  title: string;
  enabled: boolean;
  fields: OfflineFormField[];
}

export interface OfflineFeeSlab {
  id: string;
  label: string;
  dateRange: string;
}

export interface OfflineFeeCategory {
  id: string;
  name: string;
  fees: { [slabId: string]: number };
  enabled: boolean;
}

export interface OfflineFormConfig {
  seminarName: string;
  seminarDates: string;
  seminarVenue: string;
  bankDetails: string;
  conferenceInfo: string;
  sections: OfflineFormSection[];
  feeSlabs: OfflineFeeSlab[];
  feeCategories: OfflineFeeCategory[];
  consentText: string;
}

export const defaultOfflineFormConfig: OfflineFormConfig = {
  seminarName: 'BOA 2026, Siliguri',
  seminarDates: '15-18 February 2026',
  seminarVenue: 'Hotel Milestone, Sevok Road',
  bankDetails: 'Ophthalmic Association of Bihar',
  conferenceInfo: '26th Annual Conference in Siliguri',
  sections: [
    {
      id: 'personal',
      title: 'Personal Information',
      enabled: true,
      fields: [
        { id: 'surname', label: 'Surname', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'firstName', label: 'First Name', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'dob', label: 'Date of Birth (DD/MM/YYYY)', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'gender', label: 'Gender', type: 'select', required: true, enabled: true, width: 'half', options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]},
        { id: 'mobile', label: 'Mobile *', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'phone', label: 'Phone', type: 'text', required: false, enabled: true, width: 'half' },
        { id: 'email', label: 'Email', type: 'text', required: true, enabled: true, width: 'full' },
      ]
    },
    {
      id: 'address',
      title: 'Address',
      enabled: true,
      fields: [
        { id: 'house', label: 'House/Flat No.', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'street', label: 'Street/Locality', type: 'text', required: true, enabled: true, width: 'half' },
        { id: 'city', label: 'City', type: 'text', required: true, enabled: true, width: 'third' },
        { id: 'state', label: 'State', type: 'text', required: true, enabled: true, width: 'third' },
        { id: 'pinCode', label: 'Pin Code', type: 'text', required: true, enabled: true, width: 'third' },
        { id: 'country', label: 'Country', type: 'text', required: true, enabled: true, width: 'full' },
      ]
    },
    {
      id: 'registration',
      title: 'Registration Details',
      enabled: true,
      fields: [
        { id: 'delegateCategory', label: 'Delegate Category', type: 'select', required: true, enabled: true, width: 'full', options: [
          { value: 'boa-member', label: 'BOA Member' },
          { value: 'non-boa-member', label: 'Non-BOA Member' },
          { value: 'accompanying', label: 'Accompanying Person' }
        ]},
        { id: 'boaMembershipNo', label: 'BOA Membership No.', type: 'text', required: false, enabled: true, width: 'full', placeholder: '(Required for BOA Members)' },
      ]
    }
  ],
  feeSlabs: [
    { id: 'early', label: 'Early Saver', dateRange: 'Till 31 Dec' },
    { id: 'regular', label: '1 Jan - 30 Apr', dateRange: '1 Jan to 30 Apr' },
    { id: 'late', label: '1 May - 15 May', dateRange: '1 May to 15 May' },
    { id: 'spot', label: 'Spot Registration', dateRange: 'On-site' },
  ],
  feeCategories: [
    { id: '1', name: 'Life Members', fees: { early: 3000, regular: 4000, late: 4500, spot: 5000 }, enabled: true },
    { id: '2', name: 'Non Members', fees: { early: 4000, regular: 4500, late: 4800, spot: 5000 }, enabled: true },
    { id: '3', name: 'Student', fees: { early: 2500, regular: 3200, late: 3500, spot: 4000 }, enabled: true },
    { id: '4', name: 'Spouse', fees: { early: 2500, regular: 3000, late: 3200, spot: 3500 }, enabled: true },
    { id: '5', name: 'Trade', fees: { early: 2500, regular: 3000, late: 4000, spot: 5000 }, enabled: true },
  ],
  consentText: 'I hereby declare that the information provided above is true and correct. I agree to abide by the rules and regulations of Bihar Ophthalmic Association.'
};

// Helper function to get form config (in real app, this would fetch from backend)
export const getOfflineFormConfig = (): OfflineFormConfig => {
  const stored = localStorage.getItem('offlineFormConfig');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultOfflineFormConfig;
    }
  }
  return defaultOfflineFormConfig;
};

// Helper function to save form config (admin use)
export const saveOfflineFormConfig = (config: OfflineFormConfig): void => {
  localStorage.setItem('offlineFormConfig', JSON.stringify(config));
};
