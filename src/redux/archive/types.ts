export type ArchiveState = ArchivingProgress;

export interface CreateArchiveBody {
  files: Array<Blob>;
  format: string;
  password?: string;
}

export interface ArchivingProgress {
  status?: 'process' | 'success' | 'error';
  percentage?: number;
  errorMessage?: string;
}
