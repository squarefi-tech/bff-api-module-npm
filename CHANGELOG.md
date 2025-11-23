# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.31] - 2025-11-19

### Changed

- Updated useFileUpload hook to require bucket and support folder structure for file uploads
- Removed useUserFiles hook

## [1.30.10] - 2025-11-19

### Added

- Added balance and total_balance fields to wallet API response

## [1.30.9] - 2025-11-17

### Changed

- Updated wallets API to accept query parameters and renamed type generation script in package.json

## [1.30.8] - 2025-11-14

### Changed

- Removed outdated HIFI transaction types and added new L2F transaction types for deposits and withdrawals
- Updated OrderType enum to include new deposit and withdrawal types for HIFI and L2F

## [1.30.7] - 2025-11-14

### Added

- Added HIFI_ACH_WITHDRAWAL and HIFI_ACH_DEPOSIT to OrderType enum
- Added check-types script to package.json

## [1.30.6] - 2025-11-14

### Changed

- Removed DepositInstruction interface and updated deposit_instructions type in VirtualAccountAccountDetails

## [1.30.5] - 2025-11-14

### Added

- Added from_crypto_address field to order request parameters in API types

## [1.30.4] - 2025-11-14

### Added

- Added OrderTypeKycRail type and updated OrderInfo interface to include order_types_kyc_rails and is_trusted fields

## [1.30.3] - 2025-11-14

### Added

- Added OrderPaymentMethod enum and updated OrderInfo interface to use it

## [1.30.2] - 2025-11-12

### Changed

- Removed unused OrderMetaExtended type and simplified OrderDetails type definition

## [1.30.1] - 2025-11-12

### Added

- Introduced new interfaces for simplified currency and wallet, renamed payment originator types, and extended order meta with additional fields

## [1.30.0] - 2025-11-10

### Added

- Added new endpoints for listing orders by wallet and retrieving order details by ID, along with corresponding request/response types

## [1.29.3] - 2025-11-07

### Added

- Extended DepositInstruction with CHAPS and FPS instruction types and added sort_code field

## [1.29.2] - 2025-11-07

### Added

- Added iban field to ACH interface in API types

## [1.29.1] - 2025-11-07

### Added

- Added SEPA_CT instruction type and corresponding SEPA interface to DepositInstruction

## [1.29.0] - 2025-10-29

### Added

- Introduced EXCHANGE_OMNI order type and updated related API request/response types
- Added Supabase Storage integration with user-level security and file management features

## [1.28.0] - 2025-10-27

### Added

- Added new order types for card withdrawals and updated API types accordingly

## [1.27.8] - 2025-10-24

### Fixed

- Corrected typo in WITHDRAWAL_CRYPTO request type by changing 'is_substract' to 'is_subsctract'

## [1.27.7] - 2025-10-24

### Fixed

- Corrected typo in WITHDRAWAL_CRYPTO request type by changing 'is_subtract' to 'is_substract'

## [1.27.6] - 2025-10-24

### Changed

- Enhanced tenant config type definition and removed deprecated endpoints for improved clarity and type safety

## [1.27.5] - 2025-10-23

### Fixed

- Made virtual_account_id optional in OrderWithVirtualAccountParams for improved flexibility

## [1.27.4] - 2025-10-23

### Changed

- Version bump for latest changes

## [1.27.3] - 2025-10-23

### Fixed

- Simplified SEGREGATED_CRYPTO_TRANSFER request type by using Omit to exclude to_currency_id for better type safety

## [1.27.2] - 2025-10-23

### Fixed

- Updated SEGREGATED_CRYPTO_TRANSFER request type to disallow to_currency_id for improved type safety

## [1.27.1] - 2025-10-23

### Added

- Added is_reverse flag to transfer order parameters and refined order type definitions for improved clarity

## [1.27.0] - 2025-10-23

### Changed

- Removed HIFI_CRYPTO_TRANSFER order type and consolidated order request/response structures for improved maintainability

### Added

- Added new off-ramp order types and corresponding request/response structures for ACH, Wire, SWIFT, and SEPA transactions
- Added Prettier for code formatting and enhanced OrderType enum with new onramp/offramp types

## [1.26.14] - 2025-10-22

### Fixed

- Made deposit_instructions optional in VirtualAccount and VirtualAccountDetailItem interfaces

## [1.26.13] - 2025-10-22

### Changed

- Enhanced DepositInstruction types with ACH, FEDWIRE, and SWIFT interfaces and restructured related account information

## [1.26.12] - 2025-10-03

### Changed

- Version bump for latest changes

## [1.26.11] - 2025-10-03

### Changed

- Version bump for latest changes

## [1.26.10] - 2025-10-03

### Changed

- Updated VirtualAccount types to include VirtualAccountDetailItem and renamed VirtualAccountListItem

## [1.26.9] - 2025-10-03

### Added

- Added VirtualAccountDetailItem type

### Changed

- Formatted type definitions for clarity and added is_enabled field to APIKey interface

## [1.26.8] - 2025-09-19

### Fixed

- Corrected type definition for bank data response and updated request field name for consistency

## [1.26.7] - 2025-09-18

### Changed

- Version bump for latest changes

## [1.26.6] - 2025-09-18

### Changed

- Updated bank data retrieval method to use GET with params for improved clarity and consistency

## [1.26.5] - 2025-09-18

### Fixed

- Changed bank data retrieval method from GET to POST for improved data handling

## [1.26.4] - 2025-09-18

### Added

- Integrated bank data module and defined TypeScript types for bank data retrieval

## [1.26.3] - 2025-09-16

### Added

- Added resume inquiry endpoint and corresponding TypeScript types for enhanced inquiry management

## [1.26.2] - 2025-09-16

### Changed

- Deprecated card_limit in favor of max_cards for improved clarity in card management

## [1.26.1] - 2025-09-11

### Fixed

- Enhanced unauthorized error handling by adding context check to bypass handler

## [1.26.0] - 2025-09-11

### Fixed

- Added context to authentication requests and updated TypeScript configuration to include type definitions

## [1.25.6] - 2025-09-10

### Added

- Added new sign-in and sign-up endpoints

## [1.25.5] - 2025-09-05

### Added

- Added TOTP status endpoint and response type for improved status tracking

## [1.25.4] - 2025-08-22

### Changed

- Updated wallet transaction filter types to use Partial for improved flexibility

## [1.25.3] - 2025-08-22

### Changed

- Streamlined wallet transaction filter types by utilizing shared schema for consistency
- Enhanced ExportCsv request type to include comprehensive filter options for wallet transactions

## [1.25.2] - 2025-08-20

### Fixed

- Updated channel initialization to use key prop if provided in subscription hooks

## [1.25.1] - 2025-08-20

### Changed

- Simplified useWalletTransactionsSubscription and enhanced useSupabaseSubscription with key prop

## [1.25.0] - 2025-08-19

### Added

- Real-time functionality with Supabase integration

## [1.24.35] - 2025-08-19

### Changed

- Updated CSV export functionality for wallet transactions to use apiClientV2 and enhanced request type

## [1.24.34] - 2025-08-14

### Changed

- Enhanced TransactionList request type by adding pagination and filtering options

## [1.24.33] - 2025-08-14

### Changed

- Updated response type for WalletsTransactionsController to include total and data fields

## [1.24.32] - 2025-08-14

### Changed

- Updated response type for WalletsTransactionsController to include JSON content structure

## [1.24.31] - 2025-08-14

### Changed

- Streamlined TransactionList request type by integrating existing operations and removing redundant fields

## [1.24.30] - 2025-08-14

### Changed

- Removed unused UserData types and enforced required fields for transaction list request

## [1.24.29] - 2025-08-11

### Added

- PURCHASE type to CardTransactionType enum

## [1.24.28] - 2025-08-11

### Fixed

- Enforced required fields for transaction list request parameters

## [1.24.27] - 2025-08-11

### Changed

- Updated transaction list API types and simplified transaction retrieval parameters

## [1.24.26] - 2025-08-08

### Added

- Terms confirmation endpoint and types for KYC process

## [1.24.25] - 2025-08-08

### Added

- PAYMENT type to CardTransactionType enum

## [1.24.24] - 2025-08-08

### Added

- DECLINED status to CardTransactionStatus enum

## [1.24.23] - 2025-08-08

### Added

- COMPLETED status to CardTransactionStatus enum

## [1.24.22] - 2025-08-06

### Fixed

- Updated tenant config endpoint and added optional limits property to API types

## [1.24.21] - 2025-08-01

### Changed

- Introduced ExtendedKey interface to enhance key management types in API

## [1.24.20] - 2025-08-01

### Added

- Integrated frontend module into API structure for enhanced functionality

## [1.24.19] - 2025-08-01

### Added

- Frontend access key management types for creating, listing, regenerating, and revoking API keys

## [1.24.18] - 2025-08-01

### Changed

- Made is_subtract and is_reverse fields mandatory in API types for consistency

## [1.24.17] - 2025-08-01

### Fixed

- Corrected spelling of is_subsctract to is_subtract in API types and updated related calculations in useCalc hook

## [1.24.16] - 2025-08-01

### Added

- Optional is_subsctract and is_reverse fields to various transaction types for improved flexibility

## [1.24.15] - 2025-07-31

### Added

- Extended account details with optional ACH, RTP, wire, and SWIFT structures for enhanced payment processing

## [1.24.14] - 2025-07-31

### Changed

- Enhanced issuing API methods to return ExtendedSubAccountResponse with sub_account_id

## [1.24.13] - 2025-07-30

### Changed

- Updated SubAccountResponse type and enhanced balance method to return sub_account_id

## [1.24.12] - 2025-07-29

### Added

- consent_text field to card details type for enhanced data handling

## [1.24.11] - 2025-07-28

### Added

- New wallet transaction record types for card transfers

## [1.24.10] - 2025-07-28

### Added

- RN_CARDS_OFFRAMP order type and corresponding API request/response structures

## [1.24.9] - 2025-07-23

### Changed

- Removed unnecessary console logs from apiClientFactory and tokensFactory for cleaner code

## [1.24.8] - 2025-07-23

### Changed

- Streamlined refreshTokens by removing miniApp logs and integrating initData restoration

## [1.24.7] - 2025-07-23

### Fixed

- Awaited miniApp.mount() in refreshTokens to ensure proper initialization of the SDK

## [1.24.6] - 2025-07-23

### Added

- Telegram SDK initialization in tokensFactory

## [1.24.4] - 2025-07-23

### Added

- Console logs in tokensFactory for enhanced debugging of initData and miniApp

## [1.24.3] - 2025-07-23

### Added

- Additional console logs in refreshTokens for improved debugging of token handling

## [1.24.2] - 2025-07-23

### Changed

- Improved error handling in refreshTokens function and added debug logs for better traceability

## [1.24.1] - 2025-07-23

### Added

- Console logs for token refresh handling and authentication flow insights

## [1.24.0] - 2025-07-23

### Changed

- Enhanced refresh token handling for Telegram sign-in methods in TMA
- Updated Telegram auth types to use request/response structures for improved type safety with optional refresh_token

### Added

- Improved Telegram authentication workflow with better token management

## [1.23.5] - 2025-07-22

### Added

- Additional optional fields to meta for enhanced transaction details

## [1.23.4] - 2025-07-22

### Changed

- Made account_number, routing_number, and swift_bic optional in ExternalBankingData for improved flexibility

## [1.23.3] - 2025-07-22

### Added

- Optional state field to address type for improved address detail accuracy

## [1.23.2] - 2025-07-22

### Added

- Added state_id to address type for enhanced address details

## [1.23.1] - 2025-07-22

### Added

- States API endpoint and related types for fetching states by country_id

## [1.23.0] - 2025-07-22

### Fixed

- Updated Counterparty and related DTOs to require email and phone fields for improved data integrity
- Added note to orderRequests

## [1.22.13] - 2025-07-21

### Fixed

- Corrected Confirm.Request type to reference changeEmailConfirm operation for accurate API request handling

## [1.22.12] - 2025-07-20

### Added

- PROCESSING status to OrderStatuses enum for enhanced order tracking

## [1.22.11] - 2025-07-20

### Fixed

- Updated WithdrawCryptoRequest to include SEGREGATED_CRYPTO_TRANSFER in order_type for improved transaction handling

## [1.22.10] - 2025-07-20

### Added

- SEGREGATED_CRYPTO_TRANSFER to WalletTransactionRecordType enum for expanded transaction support

## [1.22.9] - 2025-07-20

### Added

- SEGREGATED_CRYPTO_TRANSFER order type and corresponding request/response types for enhanced order processing

## [1.22.8] - 2025-07-18

### Changed

- Streamlined user phone and email request types by leveraging OpenAPI operations for improved type safety and maintainability

## [1.22.7] - 2025-07-18

### Added

- wallet_id to pagination request in VirtualAccountPrograms Request
- wallet_id to issuing_programs request

## [1.22.6] - 2025-07-18

### Added

- Optional birth_date field to user types in API schema for enhanced user data handling

## [1.22.5] - 2025-07-18

### Changed

- Updated user and userData types to align with new API schema
- Enhanced type safety in user requests

## [1.22.4] - 2025-07-18

### Added

- New OrderTypeKycRail type and updated OrderInfo structure

### Changed

- Removed deprecated kyc_rails_id

## [1.22.3] - 2025-07-18

### Fixed

- Made limits property optional in card configuration for flexibility

## [1.22.2] - 2025-07-05

### Added

- Exported hooks from the hooks module for improved functionality

## [1.22.1] - 2025-07-04

### Added

- useCalc hook for enhanced calculation functionality

## [1.22.0] - 2025-07-04

### Fixed

- Renamed currency_id to from_currency_id in request parameters for clarity

## [1.21.9] - 2025-06-26

### Fixed

- Renamed currency parameters in Calc.CommonRequestParams to use IDs for improved clarity

## [1.21.8] - 2025-06-25

### Fixed

- Updated orderType request params to include to_currency

## [1.21.7] - 2025-06-24

### Added

- HIFI_CRYPTO_TRANSFER order type with request and response types for enhanced order processing

## [1.21.6] - 2025-06-24

### Added

- New wallet transaction record types for enhanced transaction handling

## [1.21.5] - 2025-06-24

### Added

- count property to TransactionsList interface for improved transaction data handling

## [1.21.4] - 2025-06-23

### Changed

- Refactored getAll method in issuing API to accept parameters as an object and updated types for improved flexibility

## [1.21.3] - 2025-06-23

### Added

- TBD_SWIFT_WITHDRAWAL order type with request and response types

## [1.21.2] - 2025-06-17

### Added

- Version bump for latest changes

## [1.21.1] - 2025-06-17

### Fixed

- Correct endpoint for OMNIBUS_CRYPTO_TRANSFER in orders API

## [1.21.0] - 2025-06-17

### Added

- Implemented v2 orders functionality with enhanced order management capabilities

## [1.19.4] - 2025-06-17

### Added

- Extended OTPVerificationChannelType to include 'TG_TEST' for enhanced testing capabilities

## [1.19.3] - 2025-06-17

### Fixed

- Updated OTP verification endpoint to include 'create' in the URL for accurate request handling

## [1.19.2] - 2025-06-17

### Added

- Added OTP request functionality with updated types to improve verification process

## [1.19.1] - 2025-06-12

### Changed

- Updated OrderType enum: removed deprecated values, added replacements, and aligned API request types accordingly for consistency

## [1.19.0] - 2025-06-12

### Added

- Integrated Time-based One-Time Password (TOTP) functionality with new types and API client methods

## [1.18.9] - 2025-05-24

### Added

- Added TBD_SWIFT_WITHDRAWAL to OrderType enum for future implementation

## [1.18.8] - 2025-05-24

### Added

- Restructured orderTypes to include a list method and defined OrderTypes namespace with detailed OrderInfo type

### Fixed

- Updated Response type to reflect VirtualAccount structure

## [1.18.7] - 2025-05-24

### Added

- Integrated virtual accounts into API structure for enhanced functionality

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
