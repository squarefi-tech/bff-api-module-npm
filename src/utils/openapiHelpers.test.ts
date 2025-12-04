import { describe, it, expect } from 'vitest';
import {
  handleResponse,
  createTypedRequest,
  isSuccessResponse,
  isErrorResponse,
  getDataOrUndefined,
  getErrorOrUndefined,
} from './openapiHelpers';
import type { OpenApiResponse } from './openapiHelpers';

describe('openapiHelpers', () => {
  describe('handleResponse', () => {
    it('should return data when response is successful', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        data: { id: '123' },
        response: mockResponse,
      };

      const result = handleResponse(response);
      expect(result).toEqual({ id: '123' });
    });

    it('should throw error when response has error', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        error: new Error('Test error'),
        response: mockResponse,
      };

      expect(() => handleResponse(response)).toThrow('Test error');
    });

    it('should throw error when data is undefined', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        response: mockResponse,
      };

      expect(() => handleResponse(response)).toThrow('No data in response');
    });
  });

  describe('createTypedRequest', () => {
    it('should return data from successful request', async () => {
      const mockResponse = new Response();
      const mockRequestFn = async (): Promise<OpenApiResponse<{ id: string }>> => ({
        data: { id: '123' },
        response: mockResponse,
      });

      const result = await createTypedRequest(mockRequestFn);
      expect(result).toEqual({ id: '123' });
    });

    it('should throw error from failed request', async () => {
      const mockResponse = new Response();
      const mockRequestFn = async (): Promise<OpenApiResponse<{ id: string }>> => ({
        error: new Error('Request failed'),
        response: mockResponse,
      });

      await expect(createTypedRequest(mockRequestFn)).rejects.toThrow('Request failed');
    });
  });

  describe('isSuccessResponse', () => {
    it('should return true for successful response', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        data: { id: '123' },
        response: mockResponse,
      };

      expect(isSuccessResponse(response)).toBe(true);
    });

    it('should return false for error response', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        error: new Error('Test error'),
        response: mockResponse,
      };

      expect(isSuccessResponse(response)).toBe(false);
    });
  });

  describe('isErrorResponse', () => {
    it('should return true for error response', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        error: new Error('Test error'),
        response: mockResponse,
      };

      expect(isErrorResponse(response)).toBe(true);
    });

    it('should return false for successful response', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        data: { id: '123' },
        response: mockResponse,
      };

      expect(isErrorResponse(response)).toBe(false);
    });
  });

  describe('getDataOrUndefined', () => {
    it('should return data when response is successful', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        data: { id: '123' },
        response: mockResponse,
      };

      expect(getDataOrUndefined(response)).toEqual({ id: '123' });
    });

    it('should return undefined when response has error', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        error: new Error('Test error'),
        response: mockResponse,
      };

      expect(getDataOrUndefined(response)).toBeUndefined();
    });
  });

  describe('getErrorOrUndefined', () => {
    it('should return error when response has error', () => {
      const mockResponse = new Response();
      const error = new Error('Test error');
      const response: OpenApiResponse<{ id: string }> = {
        error,
        response: mockResponse,
      };

      expect(getErrorOrUndefined(response)).toBe(error);
    });

    it('should return undefined when response is successful', () => {
      const mockResponse = new Response();
      const response: OpenApiResponse<{ id: string }> = {
        data: { id: '123' },
        response: mockResponse,
      };

      expect(getErrorOrUndefined(response)).toBeUndefined();
    });
  });
});

