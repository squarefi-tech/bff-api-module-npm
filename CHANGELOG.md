# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.18.6] - 2025-05-24

### Added

- Added virtual accounts functionality
- Enhanced KYC rail schema with WalletRailTermsAndConditions type

## [1.18.4] - 2025-05-23

### Changed

- Streamlined KYC rail types by replacing interfaces with schema-based types for improved consistency and maintainability

## [1.18.3] - 2025-05-22

### Added

- Added new fields for KYC and integration vendor IDs in API types

## [1.18.1] - 2025-05-20

### Fixed

- Added return type annotations for various methods across multiple API modules

## [1.18.0] - 2025-05-19

### Added

- Enhanced card creation functionality with prepaid and balance options for standalone cards

## [1.17.30] - 2025-05-18

### Fixed

- Corrected persona inquiries endpoint path for initialization
- Changed persona inquiries initialization method from GET to POST
- Updated endpoint paths for currencies and chains in the API client to support nonAuth users

## [1.17.27] - 2025-05-16

### Added

- Integrated persona module into API client for enhanced KYC and identity verification workflows

## [1.17.26] - 2025-05-15

### Fixed

- Updated address creation endpoint to use apiClientV2 for improved reliability and consistency

## [1.17.25] - 2025-05-14

### Added

- Added API types autogen for improved type coverage and automation

## [1.17.24] - 2025-05-14

### Added

- Persona inquiries initialization for advanced KYC workflows
- Rails and Forms namespaces with new types and methods for KYC integration (onboarding/compliance flows)

### Changed

- Removed ExtendedSubAccount type definitions to streamline API types (simplified and unified sub-account type management)

## [1.17.23] - 2025-05-12

### Changed

- Updated response types for issuing sub-accounts to include pagination support
  - Enhanced data retrieval capabilities
  - Improved handling of large datasets

## [1.17.22] - 2025-05-07

### Fixed

- Updated order_types_id type in IssuingProgramOrderType to support both OrderType and string values
  - Improved type flexibility
  - Better backward compatibility

## [1.17.21] - 2025-05-07

### Added

- Introduced IssuingProgramOrderType for enhanced order types definition in Cards
  - Better type safety for card operations
  - Improved order type management

## [1.17.20] - 2025-05-07

### Fixed

- Corrected order_types type definition in IssuingPrograms
  - Fixed type inconsistencies
  - Improved type safety

## [1.17.19] - 2025-05-07

### Added

- Added order_types to IssuingPrograms for better program type management

### Changed

- Deprecated payment_types in SubAccount in favor of new order_types system

## [1.17.18] - 2025-05-07

### Changed

- Deprecated old deposit fiat_types
- Introduced new issuing types for enhanced clarity and better type safety

## [1.17.17] - 2025-05-06

### Fixed

- Reverted wallet address creation method to use apiClientV1 (UTILA)
  - This change was necessary to maintain compatibility with the UTILA service
  - Ensures proper address generation and validation

## [1.17.16] - 2025-05-06

### Added

- Added SubAccountCryptoDetail type and integrated into SubAccount type
  - Enhanced crypto details management
  - Improved type safety for crypto-related operations
  - Better support for crypto account features

## [1.17.15] - 2025-04-29

### Fixed

- Updated address creation method to use apiClientV2 for improved functionality

## [1.17.14] - 2025-04-25

### Changed

- Updated package.json with repository information
- Enhanced README with additional documentation links

## [1.17.13] - 2025-04-24

### Changed

- Streamlined exchange module by dynamically generating order type methods

## [1.17.12] - 2025-04-23

### Fixed

- Enforced required fields in DestinationListItemExternalBankingData type address object

## [1.17.11] - 2025-04-23

### Changed

- Removed unused memo field from DestinationListItemExternalBankingData type

## [1.17.10] - 2025-04-23

### Changed

- Integrated location functionality into list module
- Updated README documentation to reflect module changes

## [1.17.9] - 2025-04-23

### Changed

- Updated Location.Countries.List.Response type to include total count and data array

## [1.17.8] - 2025-04-23

### Changed

- Removed the `location` module as its functionality has been integrated into the `list` module
- Updated the `list` module to include new endpoints for fetching countries
- Modified existing endpoints for currencies and chains to use the `/system` prefix

## [1.17.7] - 2025-04-23

### Added

- Expanded WithdrawCryptoRequest to include INTERNAL_TRANSFER order type

## [1.17.6] - 2025-04-21

### Added

- Expanded order types and enhanced API request structures

## [1.17.5] - 2025-04-18

### Fixed

- Fixed transaction retrieval endpoints for sub accounts

## [1.17.4] - 2025-04-18

### Fixed

- Updated transaction retrieval to use sub_account_id and correct endpoint

## [1.17.3] - 2025-04-18

### Added

- Added new enums for calculation types and card transaction statuses

## [1.17.2] - 2025-04-18

### Changed

- Renamed fiat account references to sub account in API documentation and types

## [1.17.1] - 2025-04-18

### Changed

- Updated crypto addresses generation endpoints to support tenant-specific processing configuration

## [1.17.0] - 2025-04-18

### Changed

- Removed fiat_accounts API and integrated functionality into sub_accounts module

## [1.16.1] - 2025-04-16

### Changed

- Updated changelog documentation

## [1.16.0] - 2025-04-16

### Added

- Added support for fetching transactions by fiat account ID

## [1.15.1] - 2025-04-16

### Changed

- Simplified logout logic in API client

## [1.15.0] - 2025-04-14

### Added

- Added CSV export functionality for transactions

## [1.14.0] - 2025-04-11

### Added

- Added delete functionality for counterparties destinations

## [1.13.5] - 2025-04-11

### Fixed

- Added optional memo field to external crypto data type

## [1.13.4] - 2025-04-11

### Fixed

- Added optional memo field to external crypto data type

## [1.13.3] - 2025-04-10

### Fixed

- Moved search parameter to filter object in API types

## [1.13.2] - 2025-04-08

### Changed

- Refactored encryption logic for improved security and maintainability

## [1.13.1] - 2025-04-08

### Fixed

- Deprecated card sensitive data retrieval method
- Improved error handling in API responses
- Fixed decryption handling in issuing API

## [1.13.0] - 2025-04-08

### Changed

- Replaced JSEncrypt with NodeRSA for encryption implementation

## [1.12.1] - 2025-04-08

### Fixed

- Improved encryption implementation for card data

## [1.12.0] - 2025-04-08

### Added

- Implemented encryption for sensitive card data

## [1.11.3] - 2025-04-07

### Changed

- Updated Telegram sign-in method to use apiClientV2

## [1.11.2] - 2025-04-07

### Changed

- Updated Telegram sign-in path for versioning clarity

## [1.11.1] - 2025-04-07

### Changed

- Switched to apiClientV1 for Telegram sign-in

## [1.11.0] - 2025-04-07

### Changed

- Updated external_crypto_data type in Counterparty destination
- Simplified Response type for Counterparty destination

## [1.10.13] - 2025-04-07

### Changed

- Updated external_crypto_data type in Counterparty destination

## [1.10.12] - 2025-04-07

### Changed

- Simplified Response type for Counterparty destination

## [1.10.11] - 2025-04-05

### Fixed

- Formatted phone numbers for Supabase compatibility

## [1.10.10] - 2025-04-04

### Fixed

- Added search parameter to Counterparty request type

## [1.10.9] - 2025-04-04

### Fixed

- Updated Counterparty fields to allow null values

## [1.10.8] - 2025-04-04

### Fixed

- Added counterparty_account_id to Update request type for Counterparty

## [1.10.7] - 2025-04-04

### Fixed

- Added wallet_id to Create and Update request types for Counterparty

## [1.10.6] - 2025-04-04

### Fixed

- Made Counterparty fields optional in API types

## [1.10.5] - 2025-04-03

### Fixed

- Included additional parameters in wallet transaction request

## [1.10.4] - 2025-04-03

### Fixed

- Made wallet transaction filter fields optional

## [1.10.3] - 2025-04-03

### Added

- Added WalletTransactionStatus enum
- Updated API types with new status enum

## [1.10.2] - 2025-04-02

### Added

- Added IssuingProgramStatus enum
- Updated API types with new status enum

## [1.10.1] - 2025-04-02

### Fixed

- Made filter object optional in wallet transaction request

## [1.10.0] - 2025-04-02

### Fixed

- Simplified token refresh logic by removing TMA check

## [1.9.0] - 2025-03-31

### Added

- Added filter options to wallet transaction request

## [1.8.2] - 2025-03-26

### Changed

- Clarified LOGOUT_URL description in documentation

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

## [1.18.2] - 2025-05-21

### Added

- Added entity retrieval functionality to KYC module with new endpoint and types
