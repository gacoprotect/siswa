export interface FlashMessage {
  success: boolean;
  message: string;
  expires_at: Date | null;
}
