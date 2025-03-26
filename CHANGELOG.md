# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.17] - 2024-03-25

### Changed

- Updated type property in SubAccount for enhanced flexibility

## [1.5.16] - 2024-03-25

### Changed

- Refactored fiat_account type in IssuingCardDetailItem to use FiatAccounts.FiatAccount for better structure and consistency

## [1.5.15] - 2024-03-25

### Changed

- Refactored fiat_account type in IssuingCardListItem to use FiatAccounts.FiatAccount for improved structure and consistency

## [1.5.14] - 2024-03-25

### Changed

- Updated currency type in API types from Currencies.Currency to Currencies.FiatCurrency for enhanced clarity and specificity

## [1.5.13] - 2024-03-25

### Changed

- Updated currency type in API types from Currencies.Currency to Currencies.FiatCurrency for improved clarity

## [1.5.12] - 2024-03-25

### Added

- Added optional security_code property to CardSensitiveData interface in API types

## [1.5.11] - 2024-03-25

### Changed

- Refactored StandAloneRequest type to simplify structure by removing unnecessary properties while maintaining compatibility with CommonRequest

## [1.5.10] - 2024-03-25

### Changed

- Refactored API types to introduce a CommonRequest interface for shared properties in StandAloneRequest and FiatAccountRequest

## [1.5.9] - 2024-03-25

### Added

- Added card issuing and fee properties to API types

## [1.5.8] - 2024-03-25

### Changed

- Updated package dependencies to use caret versioning
- Made filter properties optional in API types

## [1.5.7] - 2024-03-25

### Changed

- Updated API list filtering from array to object

## [1.5.6] - 2024-03-25

### Changed

- Refactored logout handling in API client to use window.location.href for redirection instead of navigate function

## [1.5.5] - 2024-03-25

### Changed

- Refactored authentication API types to replace SupabaseGetSessionResponse with Tokens for sign-in and sign-up methods

## [1.5.4] - 2024-03-25

### Changed

- Updated authentication API endpoints to include '/email' suffix for sign-in and sign-up methods

## [1.5.3] - 2024-03-25

### Added

- Introduced new SortingDirection enum
- Updated types for issuing card details and limits

## [1.5.2] - 2024-03-25

### Changed

- Enhanced API types and wallet transactions structure
- Added DetailedTransaction interface
- Refactored transaction retrieval methods for improved clarity and functionality

## [1.5.1] - 2024-03-25

### Changed

- Updated README and API exports for squarefi_bff_api_client
- Enhanced documentation with installation, usage examples, environment variables, and security practices

## [1.5.0] - 2024-03-25

### Changed

- Removed react-icons dependency

## [1.4.0] - 2024-03-25

### Added

- Added tenants module to API

## [1.3.0] - 2024-03-25

### Changed

- Refactored API request methods to remove unnecessary promise chaining in exchange, issuing, list, orders, and wallets modules for improved readability and consistency

## [1.2.0] - 2024-03-25

### Changed

- Exported squarefiBffApiClient as a named export in the API module

## [1.1.0] - 2024-03-25

### Changed

- Refactored API client imports to use centralized apiClientFactory
- Updated import paths in auth, developer, exchange, fiat_accounts, issuing, kyc, list, orders, user, and wallets modules

## [1.0.2] - 2024-03-25

### Changed

- Initial release with core functionality
- Basic API client implementation
- Support for authentication
- Wallet management features
- Exchange operations
- Card issuing capabilities
