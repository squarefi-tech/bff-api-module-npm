# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.1] - 2025-03-26

### Added

- Enhanced card retrieval with fiat account data integration

## [1.8.0] - 2025-03-26

### Fixed

- Corrected default logout URL path in apiClientFactory

## [1.7.1] - 2025-03-26

### Added

- Location module integration in API index

## [1.7.0] - 2025-03-26

### Added

- Enhanced API client with logout URL functionality
- Updated API documentation

## [1.6.0] - 2025-03-26

### Added

- New counterparties module with full CRUD operations
- New location module with country information
- Updated API types structure

## [1.5.17] - 2025-03-25

### Added

- New counterparties module with full CRUD operations
  - Support for different counterparty types (INDIVIDUAL, BUSINESS)
  - Destination management with multiple types (DOMESTIC_WIRE, ACH, SWIFT, SEPA, CRYPTO)
  - Detailed counterparty information handling
- New location module
  - Countries list functionality
  - Detailed country information including currency, timezone, and region data
- Enhanced API types and interfaces
  - Reorganized types structure for better maintainability
  - Added new enums for counterparty types
  - Updated currency and wallet types

### Changed

- Updated README.md with new modules documentation
- Improved API documentation with detailed examples
- Enhanced type definitions for better TypeScript support
- Reorganized API types structure for better maintainability

### Fixed

- Improved type safety in API responses
- Enhanced error handling in API requests

## [1.5.16] - 2025-03-25

### Changed

- Updated API types and interfaces
- Improved documentation

## [1.5.15] - 2025-03-25

### Added

- Type property to SubAccount in API types for enhanced flexibility
- Refactored fiat_account type in IssuingCardDetailItem

## [1.5.14] - 2025-03-25

### Changed

- Refactored fiat_account type in IssuingCardListItem
- Updated currency type in API types from Currencies.Currency to Currencies.FiatCurrency

## [1.5.13] - 2025-03-25

### Changed

- Updated currency type in API types for improved clarity and specificity

## [1.5.12] - 2025-03-25

### Changed

- Updated currency type in API types for improved clarity

## [1.5.11] - 2025-03-25

### Added

- Optional security_code property to CardSensitiveData interface

## [1.5.10] - 2025-03-25

### Changed

- Refactored StandAloneRequest type to simplify structure
- Removed unnecessary properties while maintaining compatibility

## [1.5.9] - 2025-03-25

### Added

- CommonRequest interface for shared properties
- Enhanced API type structure

## [1.5.8] - 2025-03-25

### Added

- Card issuing and fee properties to API types

## [1.5.7] - 2025-03-25

### Changed

- Updated package dependencies to use caret versioning
- Made filter properties optional in API types

## [1.5.6] - 2025-03-25

### Changed

- Updated API list filtering from array to object

## [1.5.5] - 2025-03-25

### Changed

- Refactored logout handling to use window.location.href for redirection

## [1.5.4] - 2025-03-25

### Changed

- Refactored authentication API types
- Replaced SupabaseGetSessionResponse with Tokens for sign-in and sign-up methods

## [1.5.3] - 2025-03-25

### Changed

- Updated authentication API endpoints to include '/email' suffix

## [1.5.2] - 2025-03-25

### Added

- New SortingDirection enum
- Updated types for issuing card details and limits

## [1.5.1] - 2025-03-25

### Changed

- Enhanced API types and wallet transactions structure
- Added DetailedTransaction interface
- Refactored transaction retrieval methods

## [1.5.0] - 2025-03-25

### Changed

- Updated README and API exports
- Enhanced documentation with installation, usage examples, and security practices

## [1.4.0] - 2025-03-25

### Changed

- Removed react-icons dependency

## [1.3.0] - 2025-03-25

### Added

- Tenants module to API

## [1.2.0] - 2025-03-25

### Changed

- Refactored API request methods
- Removed unnecessary promise chaining in exchange, issuing, list, orders, and wallets modules

## [1.1.0] - 2025-03-25

### Changed

- Exported squarefiBffApiClient as a named export
- Refactored API client imports to use centralized apiClientFactory

## [1.0.2] - 2025-03-25

### Added

- Initial release
- Basic API client functionality
- TypeScript support
- Authentication methods
- Core API endpoints support
