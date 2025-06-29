export interface FlashMessage {
  success: boolean;
  message: string;
  expires_at: Date | null;
}

export interface PageProps {
  flash?: FlashMessage;
  errors?: Record<string, string>;
  name?: string;
}