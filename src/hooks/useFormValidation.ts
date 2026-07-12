/**
 * Form validation hook for retirement calculator
 */

import { useState, useCallback } from 'react';
import { validateField, ValidationError } from '../calculations/validation';
import type { RetirementProfile } from '../types/profile';

export interface FormErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateInput = useCallback(
    (field: keyof RetirementProfile, value: any): boolean => {
      const error = validateField(field, value);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.message,
        }));
        return false;
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        });
        return true;
      }
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    validateInput,
    clearErrors,
    clearError,
    hasErrors,
  };
}
