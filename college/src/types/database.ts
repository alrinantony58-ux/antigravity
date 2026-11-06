/**
 * CAMPUSFIND: COLLEGE LOST & FOUND MANAGEMENT SYSTEM
 * Database TypeScript Interfaces & Types
 */

export type UserRole = 'student' | 'admin';
export type AccountStatus = 'active' | 'restricted';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  studentId: string;
  department: string;
  phoneNumber?: string;
  role: UserRole;
  status: AccountStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  createdAt: string;
}

export type LostItemStatus = 'open' | 'matched' | 'claimed' | 'returned' | 'archived';

export interface LostItem {
  id: string;
  reportCode: string; // e.g. LOST-2026-1042
  userId: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone?: string;
  reporterDept: string;
  itemName: string;
  category: string;
  brand?: string;
  primaryColor: string;
  description: string;
  imageUrl?: string;
  lastKnownLocation: string;
  building: string;
  specificArea?: string;
  dateLastSeen: string;
  timeLastSeen?: string;
  dateNoticedMissing: string;
  timeNoticedMissing?: string;
  uniqueIdentifyingMarks: string; // Confidential
  rewardAmount?: string;
  status: LostItemStatus;
  createdAt: string;
}

export type PossessionStatus = 
  | 'with_finder' 
  | 'submitted_to_college_office' 
  | 'stored_in_designated_location';

export type FoundItemStatus = 'available' | 'claim_pending' | 'reunited' | 'archived';

export interface FoundItem {
  id: string;
  reportCode: string; // e.g. FND-2026-8021
  finderId: string;
  finderName: string;
  finderEmail: string;
  itemName: string;
  category: string;
  brand?: string;
  primaryColor?: string;
  generalDescription: string;
  imageUrl?: string;
  foundLocation: string;
  building: string;
  specificArea?: string;
  dateFound: string;
  timeFound?: string;
  possessionStatus: PossessionStatus;
  custodyLocationDetails?: string;
  custodyOfficerName?: string;
  status: FoundItemStatus;
  createdAt: string;
}

export type ClaimStatus = 
  | 'pending' 
  | 'under_review' 
  | 'additional_proof_required' 
  | 'approved' 
  | 'rejected' 
  | 'returned';

export interface OwnershipClaim {
  id: string;
  claimCode: string; // e.g. CLM-2026-9014
  foundItemId: string;
  foundItemCode: string;
  foundItemName: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  claimantStudentId: string;
  claimantPhone?: string;
  
  // The 8 Mandated Ownership Verification Answers
  q1_unique_characteristics: string;
  q2_distinguishing_features: string;
  q3_last_had_location: string;
  q4_date_lost: string;
  q5_approx_time_lost: string;
  q6_identifying_marks_or_accessories: string;
  q7_purchase_receipt_or_document_info?: string;
  q8_additional_evidence?: string;
  
  evidenceAttachmentUrl?: string;
  status: ClaimStatus;
  adminReviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  proofRequestMessage?: string;
  createdAt: string;
}

export interface HandoverRecord {
  id: string;
  claimId: string;
  foundItemId: string;
  itemCode: string;
  itemName: string;
  claimantName: string;
  recipientStudentId: string;
  authorizedAdminName: string;
  handoverDate: string;
  handoverLocation: string;
  notes?: string;
}

export interface AdminActivityLog {
  id: string;
  adminName: string;
  actionType: string;
  targetId: string;
  details: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match_suggestion' | 'claim_submitted' | 'claim_status_change' | 'additional_proof_requested' | 'item_returned' | 'admin_alert';
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

