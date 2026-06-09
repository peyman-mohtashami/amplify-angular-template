import { WritableSignal } from '@angular/core';
import {Schema} from "../../../../amplify/data/resource";

export type Upload = Schema['Upload']['type'];
export type UploadRecord = Upload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export interface UploadDataItem {
  id: number;
  name: string;
  type: string;
  sha: string;
  status: string;//UploadStatus;
  uploadedAt: string;
  uploadedBy: string;
  validatedAt?: string;
  releaseVersion?: string;
  viewed?: boolean;
  checked: boolean;
  uploadProgress?: number;
  validationProgress?: number;
  // errors: DataUploadErrorWarning[];
  // warnings: DataUploadErrorWarning[];
  createdAt: string;
  updatedAt: string;
}

export interface AppUploadDataItem {
  id: string;
  name: string;
  type: string;
  sha: string;
  status: WritableSignal<UploadStatus>;
  uploadedAt: string;
  uploadedBy: string;
  validatedAt?: WritableSignal<string>;
  releaseVersion?: string;
  viewed?: boolean;
  checked: boolean;
  uploadProgress?: WritableSignal<number>;
  validationProgress?: WritableSignal<number>;
  errors: DataUploadErrorWarning[];
  warnings: DataUploadErrorWarning[];
}

export enum UploadStatus {
  Uploading,
  Validating,
  Valid,
  InvalidWithErrorWarning,
  FailedUpload,
  FailedValidation,
  WarningsResolved,
}

export interface ValidationResult {
  status: UploadStatus;
  errors: DataUploadErrorWarning[];
  warnings: DataUploadErrorWarning[];
}

export interface DataUploadErrorWarning {
  message: string;
  code: number;
  title: string;
  line: number | null;
  skipped?: boolean;
}

export interface UploadWarningSetting {
  code: number;
  skipped?: boolean;
  title: string;
  message: string;
  checked: boolean;
}

