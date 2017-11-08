declare module DropboxTypes {
  interface DropboxOptions {
    // An access token for making authenticated requests.
    accessToken?: string;
    // The client id for your app. Used to create authentication URL.
    clientId?: string;
    // Select user is only used by team endpoints. It specifies which user the team access token should be acting as.
    selectUser?: string;
  }

  class DropboxBase {
    /**
     * Get the access token.
     */
    getAccessToken(): string;

    /**
     * Get a URL that can be used to authenticate users for the Dropbox API.
     * @param redirectUri A URL to redirect the user to after authenticating.
     *   This must be added to your app through the admin interface.
     * @param state State that will be returned in the redirect URL to help
     *   prevent cross site scripting attacks.
     */
    getAuthenticationUrl(redirectUri: string, state?: string): string;

    /**
     * Get the client id
     */
    getClientId(): string;

    /**
     * Set the access token used to authenticate requests to the API.
     * @param accessToken An access token.
     */
    setAccessToken(accessToken: string): void;

    /**
     * Set the client id, which is used to help gain an access token.
     * @param clientId Your app's client ID.
     */
    setClientId(clientId: string): void;
  }


  /**
   * An Error object returned from a route.
   */
  interface Error<T> {
    // Text summary of the error.
    error_summary: string;
    // The error object.
    error: T;
    // User-friendly error message.
    user_message: UserMessage;
  }
  
  /**
   * User-friendly error message.
   */
  interface UserMessage {
    // The message.
    text: string;
    // The locale of the message.
    locale: string;
  }
  
  
  type Timestamp = string;

  namespace async {
    /**
     * The job finished synchronously and successfully.
     */
    export interface LaunchEmptyResultComplete {
      '.tag': 'complete';
    }

    /**
     * Result returned by methods that may either launch an asynchronous job or
     * complete synchronously. Upon synchronous completion of the job, no
     * additional information is returned.
     */
    export type LaunchEmptyResult = LaunchResultBase | LaunchEmptyResultComplete;

    /**
     * This response indicates that the processing is asynchronous. The string
     * is an id that can be used to obtain the status of the asynchronous job.
     */
    export interface LaunchResultBaseAsyncJobId {
      '.tag': 'async_job_id';
      async_job_id: AsyncJobId;
    }

    /**
     * Result returned by methods that launch an asynchronous job. A method who
     * may either launch an asynchronous job, or complete the request
     * synchronously, can use this union by extending it, and adding a
     * 'complete' field with the type of the synchronous response. See
     * async.LaunchEmptyResult for an example.
     */
    export type LaunchResultBase = LaunchResultBaseAsyncJobId;

    /**
     * Arguments for methods that poll the status of an asynchronous job.
     */
    export interface PollArg {
      /**
       * Id of the asynchronous job. This is the value of a response returned
       * from the method that launched the job.
       */
      async_job_id: AsyncJobId;
    }

    /**
     * The asynchronous job has completed successfully.
     */
    export interface PollEmptyResultComplete {
      '.tag': 'complete';
    }

    /**
     * Result returned by methods that poll for the status of an asynchronous
     * job. Upon completion of the job, no additional information is returned.
     */
    export type PollEmptyResult = PollResultBase | PollEmptyResultComplete;

    /**
     * The job ID is invalid.
     */
    export interface PollErrorInvalidAsyncJobId {
      '.tag': 'invalid_async_job_id';
    }

    /**
     * Something went wrong with the job on Dropbox's end. You'll need to verify
     * that the action you were taking succeeded, and if not, try again. This
     * should happen very rarely.
     */
    export interface PollErrorInternalError {
      '.tag': 'internal_error';
    }

    export interface PollErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by methods for polling the status of asynchronous job.
     */
    export type PollError = PollErrorInvalidAsyncJobId | PollErrorInternalError | PollErrorOther;

    /**
     * The asynchronous job is still in progress.
     */
    export interface PollResultBaseInProgress {
      '.tag': 'in_progress';
    }

    /**
     * Result returned by methods that poll for the status of an asynchronous
     * job. Unions that extend this union should add a 'complete' field with a
     * type of the information returned upon job completion. See
     * async.PollEmptyResult for an example.
     */
    export type PollResultBase = PollResultBaseInProgress;

    export type AsyncJobId = string;

  }

  namespace auth {
    /**
     * Current account type cannot access the resource.
     */
    export interface AccessErrorInvalidAccountType {
      '.tag': 'invalid_account_type';
      invalid_account_type: InvalidAccountTypeError;
    }

    /**
     * Current account cannot access Paper.
     */
    export interface AccessErrorPaperAccessDenied {
      '.tag': 'paper_access_denied';
      paper_access_denied: PaperAccessError;
    }

    export interface AccessErrorOther {
      '.tag': 'other';
    }

    /**
     * Error occurred because the account doesn't have permission to access the
     * resource.
     */
    export type AccessError = AccessErrorInvalidAccountType | AccessErrorPaperAccessDenied | AccessErrorOther;

    /**
     * The access token is invalid.
     */
    export interface AuthErrorInvalidAccessToken {
      '.tag': 'invalid_access_token';
    }

    /**
     * The user specified in 'Dropbox-API-Select-User' is no longer on the team.
     */
    export interface AuthErrorInvalidSelectUser {
      '.tag': 'invalid_select_user';
    }

    /**
     * The user specified in 'Dropbox-API-Select-Admin' is not a Dropbox
     * Business team admin.
     */
    export interface AuthErrorInvalidSelectAdmin {
      '.tag': 'invalid_select_admin';
    }

    /**
     * The user has been suspended.
     */
    export interface AuthErrorUserSuspended {
      '.tag': 'user_suspended';
    }

    export interface AuthErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors occurred during authentication.
     */
    export type AuthError = AuthErrorInvalidAccessToken | AuthErrorInvalidSelectUser | AuthErrorInvalidSelectAdmin | AuthErrorUserSuspended | AuthErrorOther;

    /**
     * Current account type doesn't have permission to access this route
     * endpoint.
     */
    export interface InvalidAccountTypeErrorEndpoint {
      '.tag': 'endpoint';
    }

    /**
     * Current account type doesn't have permission to access this feature.
     */
    export interface InvalidAccountTypeErrorFeature {
      '.tag': 'feature';
    }

    export interface InvalidAccountTypeErrorOther {
      '.tag': 'other';
    }

    export type InvalidAccountTypeError = InvalidAccountTypeErrorEndpoint | InvalidAccountTypeErrorFeature | InvalidAccountTypeErrorOther;

    /**
     * Paper is disabled.
     */
    export interface PaperAccessErrorPaperDisabled {
      '.tag': 'paper_disabled';
    }

    /**
     * The provided user has not used Paper yet.
     */
    export interface PaperAccessErrorNotPaperUser {
      '.tag': 'not_paper_user';
    }

    export interface PaperAccessErrorOther {
      '.tag': 'other';
    }

    export type PaperAccessError = PaperAccessErrorPaperDisabled | PaperAccessErrorNotPaperUser | PaperAccessErrorOther;

    /**
     * Error occurred because the app is being rate limited.
     */
    export interface RateLimitError {
      /**
       * The reason why the app is being rate limited.
       */
      reason: RateLimitReason;
      /**
       * Defaults to 1.
       */
      retry_after?: number;
    }

    /**
     * You are making too many requests in the past few minutes.
     */
    export interface RateLimitReasonTooManyRequests {
      '.tag': 'too_many_requests';
    }

    /**
     * There are currently too many write operations happening in the user's
     * Dropbox.
     */
    export interface RateLimitReasonTooManyWriteOperations {
      '.tag': 'too_many_write_operations';
    }

    export interface RateLimitReasonOther {
      '.tag': 'other';
    }

    export type RateLimitReason = RateLimitReasonTooManyRequests | RateLimitReasonTooManyWriteOperations | RateLimitReasonOther;

    export interface TokenFromOAuth1Arg {
      /**
       * The supplied OAuth 1.0 access token.
       */
      oauth1_token: string;
      /**
       * The token secret associated with the supplied access token.
       */
      oauth1_token_secret: string;
    }

    /**
     * Part or all of the OAuth 1.0 access token info is invalid.
     */
    export interface TokenFromOAuth1ErrorInvalidOauth1TokenInfo {
      '.tag': 'invalid_oauth1_token_info';
    }

    /**
     * The authorized app does not match the app associated with the supplied
     * access token.
     */
    export interface TokenFromOAuth1ErrorAppIdMismatch {
      '.tag': 'app_id_mismatch';
    }

    export interface TokenFromOAuth1ErrorOther {
      '.tag': 'other';
    }

    export type TokenFromOAuth1Error = TokenFromOAuth1ErrorInvalidOauth1TokenInfo | TokenFromOAuth1ErrorAppIdMismatch | TokenFromOAuth1ErrorOther;

    export interface TokenFromOAuth1Result {
      /**
       * The OAuth 2.0 token generated from the supplied OAuth 1.0 token.
       */
      oauth2_token: string;
    }

  }

  namespace common {
    /**
     * Paths are relative to the authenticating user's home namespace, whether
     * or not that user belongs to a team.
     */
    export interface PathRootHome {
      '.tag': 'home';
    }

    /**
     * Paths are relative to the authenticating user's root namespace (This
     * results in PathRootError.invalid_root if the user's root namespace has
     * changed.).
     */
    export interface PathRootRoot {
      '.tag': 'root';
      root: NamespaceId;
    }

    /**
     * Paths are relative to given namespace id (This results in
     * PathRootError.no_permission if you don't have access to this namespace.).
     */
    export interface PathRootNamespaceId {
      '.tag': 'namespace_id';
      namespace_id: NamespaceId;
    }

    export interface PathRootOther {
      '.tag': 'other';
    }

    export type PathRoot = PathRootHome | PathRootRoot | PathRootNamespaceId | PathRootOther;

    /**
     * The root namespace id in Dropbox-API-Path-Root header is not valid. The
     * value of this error is use's latest root info.
     */
    export interface PathRootErrorInvalidRoot {
      '.tag': 'invalid_root';
      invalid_root: TeamRootInfoReference|UserRootInfoReference|RootInfoReference;
    }

    /**
     * You don't have permission to access the namespace id in
     * Dropbox-API-Path-Root  header.
     */
    export interface PathRootErrorNoPermission {
      '.tag': 'no_permission';
    }

    export interface PathRootErrorOther {
      '.tag': 'other';
    }

    export type PathRootError = PathRootErrorInvalidRoot | PathRootErrorNoPermission | PathRootErrorOther;

    /**
     * Information about current user's root.
     */
    export interface RootInfo {
      /**
       * The namespace id for user's root namespace. It will be the namespace id
       * of the shared team root if the user is member of a CDM team. Otherwise
       * it will be same as RootInfo.home_namespace_id.
       */
      root_namespace_id: NamespaceId;
      /**
       * The namespace id for user's home namespace.
       */
      home_namespace_id: NamespaceId;
    }

    /**
     * Reference to the RootInfo polymorphic type. Contains a .tag property to
     * let you discriminate between possible subtypes.
     */
    export interface RootInfoReference extends RootInfo {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "team"|"user";
    }

    /**
     * Root info when user is member of a CDM team.
     */
    export interface TeamRootInfo extends RootInfo {
      /**
       * The path for user's home directory under the shared team root.
       */
      home_path: string;
    }

    /**
     * Reference to the TeamRootInfo type, identified by the value of the .tag
     * property.
     */
    export interface TeamRootInfoReference extends TeamRootInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'team';
    }

    /**
     * Root info when user is not member of a CDM team.
     */
    export interface UserRootInfo extends RootInfo {
    }

    /**
     * Reference to the UserRootInfo type, identified by the value of the .tag
     * property.
     */
    export interface UserRootInfoReference extends UserRootInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'user';
    }

    export type Date = Timestamp;

    export type DisplayName = string;

    export type DisplayNameLegacy = string;

    export type DropboxTimestamp = Timestamp;

    export type EmailAddress = string;

    export type LanguageCode = string;

    export type NamePart = string;

    export type NamespaceId = string;

    export type OptionalNamePart = string;

    export type SessionId = string;

    export type SharedFolderId = NamespaceId;

  }

  /**
   * This namespace contains helpers for property and template metadata
   * endpoints.  These endpoints enable you to tag arbitrary key/value data to
   * Dropbox files.  The most basic unit in this namespace is the
   * file_properties.PropertyField. These fields encapsulate the actual
   * key/value data.  Fields are added to a Dropbox file using a
   * file_properties.PropertyGroup. Property groups contain a reference to a
   * Dropbox file and a file_properties.PropertyGroupTemplate. Property groups
   * are uniquely identified by the combination of their associated Dropbox file
   * and template.  The file_properties.PropertyGroupTemplate is a way of
   * restricting the possible key names and value types of the data within a
   * property group. The possible key names and value types are explicitly
   * enumerated using file_properties.PropertyFieldTemplate objects.  You can
   * think of a property group template as a class definition for a particular
   * key/value metadata object, and the property groups themselves as the
   * instantiations of these objects.  Templates are owned either by a user/app
   * pair or team/app pair. Templates and their associated properties can't be
   * accessed by any app other than the app that created them, and even then,
   * only when the app is linked with the owner of the template (either a user
   * or team).  User-owned templates are accessed via the user-auth
   * template/*_for_user endpoints, while team-owned templates are accessed via
   * the team-auth template/*_for_team endpoints. Properties associated with
   * either type of template can be accessed via the user-auth properties/*
   * endpoints.  Finally, properties can be accessed from a number of endpoints
   * that return metadata, including `files/get_metadata`, and
   * `files/list_folder`. Properties can also be added during upload, using
   * `files/upload`.
   */
  namespace file_properties {
    export interface AddPropertiesArg {
      /**
       * A unique identifier for the file or folder.
       */
      path: PathOrId;
      /**
       * The property groups which are to be added to a Dropbox file.
       */
      property_groups: Array<PropertyGroup>;
    }

    /**
     * A property group associated with this template and file already exists.
     */
    export interface AddPropertiesErrorPropertyGroupAlreadyExists {
      '.tag': 'property_group_already_exists';
    }

    export type AddPropertiesError = InvalidPropertyGroupError | AddPropertiesErrorPropertyGroupAlreadyExists;

    export interface AddTemplateArg extends PropertyGroupTemplate {
    }

    export interface AddTemplateResult {
      /**
       * An identifier for template added by  See templatesAddForUser() or
       * templatesAddForTeam().
       */
      template_id: TemplateId;
    }

    export interface GetTemplateArg {
      /**
       * An identifier for template added by route  See templatesAddForUser() or
       * templatesAddForTeam().
       */
      template_id: TemplateId;
    }

    export interface GetTemplateResult extends PropertyGroupTemplate {
    }

    /**
     * One or more of the supplied property field values is too large.
     */
    export interface InvalidPropertyGroupErrorPropertyFieldTooLarge {
      '.tag': 'property_field_too_large';
    }

    /**
     * One or more of the supplied property fields does not conform to the
     * template specifications.
     */
    export interface InvalidPropertyGroupErrorDoesNotFitTemplate {
      '.tag': 'does_not_fit_template';
    }

    export type InvalidPropertyGroupError = PropertiesError | InvalidPropertyGroupErrorPropertyFieldTooLarge | InvalidPropertyGroupErrorDoesNotFitTemplate;

    export interface ListTemplateResult {
      /**
       * List of identifiers for templates added by  See templatesAddForUser()
       * or templatesAddForTeam().
       */
      template_ids: Array<TemplateId>;
    }

    /**
     * Append a query with an "or" operator.
     */
    export interface LogicalOperatorOrOperator {
      '.tag': 'or_operator';
    }

    export interface LogicalOperatorOther {
      '.tag': 'other';
    }

    /**
     * Logical operator to join search queries together.
     */
    export type LogicalOperator = LogicalOperatorOrOperator | LogicalOperatorOther;

    /**
     * No property group was found.
     */
    export interface LookUpPropertiesErrorPropertyGroupNotFound {
      '.tag': 'property_group_not_found';
    }

    export interface LookUpPropertiesErrorOther {
      '.tag': 'other';
    }

    export type LookUpPropertiesError = LookUpPropertiesErrorPropertyGroupNotFound | LookUpPropertiesErrorOther;

    export interface LookupErrorMalformedPath {
      '.tag': 'malformed_path';
      malformed_path: string;
    }

    /**
     * There is nothing at the given path.
     */
    export interface LookupErrorNotFound {
      '.tag': 'not_found';
    }

    /**
     * We were expecting a file, but the given path refers to something that
     * isn't a file.
     */
    export interface LookupErrorNotFile {
      '.tag': 'not_file';
    }

    /**
     * We were expecting a folder, but the given path refers to something that
     * isn't a folder.
     */
    export interface LookupErrorNotFolder {
      '.tag': 'not_folder';
    }

    /**
     * The file cannot be transferred because the content is restricted.  For
     * example, sometimes there are legal restrictions due to copyright claims.
     */
    export interface LookupErrorRestrictedContent {
      '.tag': 'restricted_content';
    }

    export interface LookupErrorOther {
      '.tag': 'other';
    }

    export type LookupError = LookupErrorMalformedPath | LookupErrorNotFound | LookupErrorNotFile | LookupErrorNotFolder | LookupErrorRestrictedContent | LookupErrorOther;

    /**
     * A property field key with that name already exists in the template.
     */
    export interface ModifyTemplateErrorConflictingPropertyNames {
      '.tag': 'conflicting_property_names';
    }

    /**
     * There are too many properties in the changed template. The maximum number
     * of properties per template is 32.
     */
    export interface ModifyTemplateErrorTooManyProperties {
      '.tag': 'too_many_properties';
    }

    /**
     * There are too many templates for the team.
     */
    export interface ModifyTemplateErrorTooManyTemplates {
      '.tag': 'too_many_templates';
    }

    /**
     * The template name, description or one or more of the property field keys
     * is too large.
     */
    export interface ModifyTemplateErrorTemplateAttributeTooLarge {
      '.tag': 'template_attribute_too_large';
    }

    export type ModifyTemplateError = TemplateError | ModifyTemplateErrorConflictingPropertyNames | ModifyTemplateErrorTooManyProperties | ModifyTemplateErrorTooManyTemplates | ModifyTemplateErrorTemplateAttributeTooLarge;

    export interface OverwritePropertyGroupArg {
      /**
       * A unique identifier for the file or folder.
       */
      path: PathOrId;
      /**
       * The property groups "snapshot" updates to force apply.
       */
      property_groups: Array<PropertyGroup>;
    }

    export interface PropertiesErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    /**
     * This folder cannot be tagged. Tagging folders is not supported for
     * team-owned templates.
     */
    export interface PropertiesErrorUnsupportedFolder {
      '.tag': 'unsupported_folder';
    }

    export type PropertiesError = TemplateError | PropertiesErrorPath | PropertiesErrorUnsupportedFolder;

    export interface PropertiesSearchArg {
      /**
       * Queries to search.
       */
      queries: Array<PropertiesSearchQuery>;
      /**
       * Defaults to TagRef(Union(u'TemplateFilter', [UnionField(u'filter_none',
       * Void, False, None)]), u'filter_none').
       */
      template_filter?: TemplateFilter;
    }

    export interface PropertiesSearchContinueArg {
      /**
       * The cursor returned by your last call to propertiesSearch() or
       * propertiesSearchContinue().
       */
      cursor: PropertiesSearchCursor;
    }

    /**
     * Indicates that the cursor has been invalidated. Call propertiesSearch()
     * to obtain a new cursor.
     */
    export interface PropertiesSearchContinueErrorReset {
      '.tag': 'reset';
    }

    export interface PropertiesSearchContinueErrorOther {
      '.tag': 'other';
    }

    export type PropertiesSearchContinueError = PropertiesSearchContinueErrorReset | PropertiesSearchContinueErrorOther;

    export interface PropertiesSearchErrorPropertyGroupLookup {
      '.tag': 'property_group_lookup';
      property_group_lookup: LookUpPropertiesError;
    }

    export interface PropertiesSearchErrorOther {
      '.tag': 'other';
    }

    export type PropertiesSearchError = PropertiesSearchErrorPropertyGroupLookup | PropertiesSearchErrorOther;

    export interface PropertiesSearchMatch {
      /**
       * The ID for the matched file or folder.
       */
      id: Id;
      /**
       * The path for the matched file or folder.
       */
      path: string;
      /**
       * Whether the file or folder is deleted.
       */
      is_deleted: boolean;
      /**
       * List of custom property groups associated with the file.
       */
      property_groups: Array<PropertyGroup>;
    }

    /**
     * Search for a value associated with this field name.
     */
    export interface PropertiesSearchModeFieldName {
      '.tag': 'field_name';
      field_name: string;
    }

    export interface PropertiesSearchModeOther {
      '.tag': 'other';
    }

    export type PropertiesSearchMode = PropertiesSearchModeFieldName | PropertiesSearchModeOther;

    export interface PropertiesSearchQuery {
      /**
       * The property field value for which to search across templates.
       */
      query: string;
      /**
       * The mode with which to perform the search.
       */
      mode: PropertiesSearchMode;
      /**
       * Defaults to TagRef(Union(u'LogicalOperator',
       * [UnionField(u'or_operator', Void, False, None), UnionField(u'other',
       * Void, True, None)]), u'or_operator').
       */
      logical_operator?: LogicalOperator;
    }

    export interface PropertiesSearchResult {
      /**
       * A list (possibly empty) of matches for the query.
       */
      matches: Array<PropertiesSearchMatch>;
      /**
       * Pass the cursor into propertiesSearchContinue() to continue to receive
       * search results. Cursor will be null when there are no more results.
       */
      cursor?: PropertiesSearchCursor;
    }

    /**
     * Raw key/value data to be associated with a Dropbox file. Property fields
     * are added to Dropbox files as a file_properties.PropertyGroup.
     */
    export interface PropertyField {
      /**
       * Key of the property field associated with a file and template. Keys can
       * be up to 256 bytes.
       */
      name: string;
      /**
       * Value of the property field associated with a file and template. Values
       * can be up to 1024 bytes.
       */
      value: string;
    }

    /**
     * Defines how a single property field may be structured. Used exclusively
     * by file_properties.PropertyGroupTemplate.
     */
    export interface PropertyFieldTemplate {
      /**
       * Key of the property field being described. Property field keys can be
       * up to 256 bytes.
       */
      name: string;
      /**
       * Description of the property field. Property field descriptions can be
       * up to 1024 bytes.
       */
      description: string;
      /**
       * Data type of the value of this property field. This type will be
       * enforced upon property creation and modifications.
       */
      type: PropertyType;
    }

    /**
     * A subset of the property fields described by the corresponding
     * file_properties.PropertyGroupTemplate. Properties are always added to a
     * Dropbox file as a file_properties.PropertyGroup. The possible key names
     * and value types in this group are defined by the corresponding
     * file_properties.PropertyGroupTemplate.
     */
    export interface PropertyGroup {
      /**
       * A unique identifier for the associated template.
       */
      template_id: TemplateId;
      /**
       * The actual properties associated with the template. There can be up to
       * 32 property types per template.
       */
      fields: Array<PropertyField>;
    }

    /**
     * Defines how a property group may be structured.
     */
    export interface PropertyGroupTemplate {
      /**
       * Display name for the template. Template names can be up to 256 bytes.
       */
      name: string;
      /**
       * Description for the template. Template descriptions can be up to 1024
       * bytes.
       */
      description: string;
      /**
       * Definitions of the property fields associated with this template. There
       * can be up to 32 properties in a single template.
       */
      fields: Array<PropertyFieldTemplate>;
    }

    export interface PropertyGroupUpdate {
      /**
       * A unique identifier for a property template.
       */
      template_id: TemplateId;
      /**
       * Property fields to update. If the property field already exists, it is
       * updated. If the property field doesn't exist, the property group is
       * added.
       */
      add_or_update_fields?: Array<PropertyField>;
      /**
       * Property fields to remove (by name), provided they exist.
       */
      remove_fields?: Array<string>;
    }

    /**
     * The associated property field will be of type string. Unicode is
     * supported.
     */
    export interface PropertyTypeString {
      '.tag': 'string';
    }

    export interface PropertyTypeOther {
      '.tag': 'other';
    }

    /**
     * Data type of the given property field added.
     */
    export type PropertyType = PropertyTypeString | PropertyTypeOther;

    export interface RemovePropertiesArg {
      /**
       * A unique identifier for the file or folder.
       */
      path: PathOrId;
      /**
       * A list of identifiers for a template created by templatesAddForUser()
       * or templatesAddForTeam().
       */
      property_template_ids: Array<TemplateId>;
    }

    export interface RemovePropertiesErrorPropertyGroupLookup {
      '.tag': 'property_group_lookup';
      property_group_lookup: LookUpPropertiesError;
    }

    export type RemovePropertiesError = PropertiesError | RemovePropertiesErrorPropertyGroupLookup;

    export interface RemoveTemplateArg {
      /**
       * An identifier for a template created by templatesAddForUser() or
       * templatesAddForTeam().
       */
      template_id: TemplateId;
    }

    /**
     * Template does not exist for the given identifier.
     */
    export interface TemplateErrorTemplateNotFound {
      '.tag': 'template_not_found';
      template_not_found: TemplateId;
    }

    /**
     * You do not have permission to modify this template.
     */
    export interface TemplateErrorRestrictedContent {
      '.tag': 'restricted_content';
    }

    export interface TemplateErrorOther {
      '.tag': 'other';
    }

    export type TemplateError = TemplateErrorTemplateNotFound | TemplateErrorRestrictedContent | TemplateErrorOther;

    /**
     * No templates will be filtered from the result (all templates will be
     * returned).
     */
    export interface TemplateFilterFilterNone {
      '.tag': 'filter_none';
    }

    export type TemplateFilter = TemplateFilterBase | TemplateFilterFilterNone;

    /**
     * Only templates with an ID in the supplied list will be returned (a subset
     * of templates will be returned).
     */
    export interface TemplateFilterBaseFilterSome {
      '.tag': 'filter_some';
      filter_some: Array<TemplateId>;
    }

    export interface TemplateFilterBaseOther {
      '.tag': 'other';
    }

    export type TemplateFilterBase = TemplateFilterBaseFilterSome | TemplateFilterBaseOther;

    /**
     * Template will be associated with a user.
     */
    export interface TemplateOwnerTypeUser {
      '.tag': 'user';
    }

    /**
     * Template will be associated with a team.
     */
    export interface TemplateOwnerTypeTeam {
      '.tag': 'team';
    }

    export interface TemplateOwnerTypeOther {
      '.tag': 'other';
    }

    export type TemplateOwnerType = TemplateOwnerTypeUser | TemplateOwnerTypeTeam | TemplateOwnerTypeOther;

    export interface UpdatePropertiesArg {
      /**
       * A unique identifier for the file or folder.
       */
      path: PathOrId;
      /**
       * The property groups "delta" updates to apply.
       */
      update_property_groups: Array<PropertyGroupUpdate>;
    }

    export interface UpdatePropertiesErrorPropertyGroupLookup {
      '.tag': 'property_group_lookup';
      property_group_lookup: LookUpPropertiesError;
    }

    export type UpdatePropertiesError = InvalidPropertyGroupError | UpdatePropertiesErrorPropertyGroupLookup;

    export interface UpdateTemplateArg {
      /**
       * An identifier for template added by  See templatesAddForUser() or
       * templatesAddForTeam().
       */
      template_id: TemplateId;
      /**
       * A display name for the template. template names can be up to 256 bytes.
       */
      name?: string;
      /**
       * Description for the new template. Template descriptions can be up to
       * 1024 bytes.
       */
      description?: string;
      /**
       * Property field templates to be added to the group template. There can
       * be up to 32 properties in a single template.
       */
      add_fields?: Array<PropertyFieldTemplate>;
    }

    export interface UpdateTemplateResult {
      /**
       * An identifier for template added by route  See templatesAddForUser() or
       * templatesAddForTeam().
       */
      template_id: TemplateId;
    }

    export type Id = string;

    export type PathOrId = string;

    export type PropertiesSearchCursor = string;

    export type TemplateId = string;

  }

  /**
   * This namespace contains endpoints and data types for file request
   * operations.
   */
  namespace file_requests {
    /**
     * Arguments for create().
     */
    export interface CreateFileRequestArgs {
      /**
       * The title of the file request. Must not be empty.
       */
      title: string;
      /**
       * The path of the folder in the Dropbox where uploaded files will be
       * sent. For apps with the app folder permission, this will be relative to
       * the app folder.
       */
      destination: files.Path;
      /**
       * The deadline for the file request. Deadlines can only be set by Pro and
       * Business accounts.
       */
      deadline?: FileRequestDeadline;
      /**
       * Defaults to True.
       */
      open?: boolean;
    }

    /**
     * File requests are not available on the specified folder.
     */
    export interface CreateFileRequestErrorInvalidLocation {
      '.tag': 'invalid_location';
    }

    /**
     * The user has reached the rate limit for creating file requests. The limit
     * is currently 100 file requests per day.
     */
    export interface CreateFileRequestErrorRateLimit {
      '.tag': 'rate_limit';
    }

    /**
     * There was an error creating the file request.
     */
    export type CreateFileRequestError = FileRequestError | CreateFileRequestErrorInvalidLocation | CreateFileRequestErrorRateLimit;

    /**
     * A [file request]{@link https://www.dropbox.com/help/9090} for receiving
     * files into the user's Dropbox account.
     */
    export interface FileRequest {
      /**
       * The ID of the file request.
       */
      id: FileRequestId;
      /**
       * The URL of the file request.
       */
      url: string;
      /**
       * The title of the file request.
       */
      title: string;
      /**
       * The path of the folder in the Dropbox where uploaded files will be
       * sent. This can be null if the destination was removed. For apps with
       * the app folder permission, this will be relative to the app folder.
       */
      destination?: files.Path;
      /**
       * When this file request was created.
       */
      created: common.DropboxTimestamp;
      /**
       * The deadline for this file request. Only set if the request has a
       * deadline.
       */
      deadline?: FileRequestDeadline;
      /**
       * Whether or not the file request is open. If the file request is closed,
       * it will not accept any more file submissions.
       */
      is_open: boolean;
      /**
       * The number of files this file request has received.
       */
      file_count: number;
    }

    export interface FileRequestDeadline {
      /**
       * The deadline for this file request.
       */
      deadline: common.DropboxTimestamp;
      /**
       * If set, allow uploads after the deadline has passed. These uploads will
       * be marked overdue.
       */
      allow_late_uploads?: GracePeriod;
    }

    /**
     * This file request ID was not found.
     */
    export interface FileRequestErrorNotFound {
      '.tag': 'not_found';
    }

    /**
     * The specified path is not a folder.
     */
    export interface FileRequestErrorNotAFolder {
      '.tag': 'not_a_folder';
    }

    /**
     * This file request is not accessible to this app. Apps with the app folder
     * permission can only access file requests in their app folder.
     */
    export interface FileRequestErrorAppLacksAccess {
      '.tag': 'app_lacks_access';
    }

    /**
     * This user doesn't have permission to access or modify this file request.
     */
    export interface FileRequestErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * This user's email address is not verified. File requests are only
     * available on accounts with a verified email address. Users can verify
     * their email address [here]{@link https://www.dropbox.com/help/317}.
     */
    export interface FileRequestErrorEmailUnverified {
      '.tag': 'email_unverified';
    }

    /**
     * There was an error validating the request. For example, the title was
     * invalid, or there were disallowed characters in the destination path.
     */
    export interface FileRequestErrorValidationError {
      '.tag': 'validation_error';
    }

    /**
     * There is an error with the file request.
     */
    export type FileRequestError = GeneralFileRequestsError | FileRequestErrorNotFound | FileRequestErrorNotAFolder | FileRequestErrorAppLacksAccess | FileRequestErrorNoPermission | FileRequestErrorEmailUnverified | FileRequestErrorValidationError;

    /**
     * This user's Dropbox Business team doesn't allow file requests.
     */
    export interface GeneralFileRequestsErrorDisabledForTeam {
      '.tag': 'disabled_for_team';
    }

    export interface GeneralFileRequestsErrorOther {
      '.tag': 'other';
    }

    /**
     * There is an error accessing the file requests functionality.
     */
    export type GeneralFileRequestsError = GeneralFileRequestsErrorDisabledForTeam | GeneralFileRequestsErrorOther;

    /**
     * Arguments for get().
     */
    export interface GetFileRequestArgs {
      /**
       * The ID of the file request to retrieve.
       */
      id: FileRequestId;
    }

    /**
     * There was an error retrieving the specified file request.
     */
    export type GetFileRequestError = FileRequestError;

    export interface GracePeriodOneDay {
      '.tag': 'one_day';
    }

    export interface GracePeriodTwoDays {
      '.tag': 'two_days';
    }

    export interface GracePeriodSevenDays {
      '.tag': 'seven_days';
    }

    export interface GracePeriodThirtyDays {
      '.tag': 'thirty_days';
    }

    export interface GracePeriodAlways {
      '.tag': 'always';
    }

    export interface GracePeriodOther {
      '.tag': 'other';
    }

    export type GracePeriod = GracePeriodOneDay | GracePeriodTwoDays | GracePeriodSevenDays | GracePeriodThirtyDays | GracePeriodAlways | GracePeriodOther;

    /**
     * There was an error retrieving the file requests.
     */
    export type ListFileRequestsError = GeneralFileRequestsError;

    /**
     * Result for list().
     */
    export interface ListFileRequestsResult {
      /**
       * The file requests owned by this user. Apps with the app folder
       * permission will only see file requests in their app folder.
       */
      file_requests: Array<FileRequest>;
    }

    /**
     * Arguments for update().
     */
    export interface UpdateFileRequestArgs {
      /**
       * The ID of the file request to update.
       */
      id: FileRequestId;
      /**
       * The new title of the file request. Must not be empty.
       */
      title?: string;
      /**
       * The new path of the folder in the Dropbox where uploaded files will be
       * sent. For apps with the app folder permission, this will be relative to
       * the app folder.
       */
      destination?: files.Path;
      /**
       * Defaults to TagRef(Union(u'UpdateFileRequestDeadline',
       * [UnionField(u'no_update', Void, False, None), UnionField(u'update',
       * Nullable, False, None), UnionField(u'other', Void, True, None)]),
       * u'no_update').
       */
      deadline?: UpdateFileRequestDeadline;
      /**
       * Whether to set this file request as open or closed.
       */
      open?: boolean;
    }

    /**
     * Do not change the file request's deadline.
     */
    export interface UpdateFileRequestDeadlineNoUpdate {
      '.tag': 'no_update';
    }

    /**
     * If null, the file request's deadline is cleared.
     */
    export interface UpdateFileRequestDeadlineUpdate {
      '.tag': 'update';
      update: Object;
    }

    export interface UpdateFileRequestDeadlineOther {
      '.tag': 'other';
    }

    export type UpdateFileRequestDeadline = UpdateFileRequestDeadlineNoUpdate | UpdateFileRequestDeadlineUpdate | UpdateFileRequestDeadlineOther;

    /**
     * There is an error updating the file request.
     */
    export type UpdateFileRequestError = FileRequestError;

    export type FileRequestId = string;

    export type FileRequestValidationError = Object;

  }

  /**
   * This namespace contains endpoints and data types for basic file operations.
   */
  namespace files {
    export interface AlphaGetMetadataArg extends GetMetadataArg {
      /**
       * If set to a valid list of template IDs, FileMetadata.property_groups is
       * set for files with custom properties.
       */
      include_property_templates?: Array<file_properties.TemplateId>;
    }

    export interface AlphaGetMetadataErrorPropertiesError {
      '.tag': 'properties_error';
      properties_error: file_properties.LookUpPropertiesError;
    }

    export type AlphaGetMetadataError = GetMetadataError | AlphaGetMetadataErrorPropertiesError;

    export interface CommitInfo {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * Path in the user's Dropbox to save the file.
       */
      path: WritePathOrId;
      /**
       * Defaults to TagRef(Union(u'WriteMode', [UnionField(u'add', Void, False,
       * None), UnionField(u'overwrite', Void, False, None),
       * UnionField(u'update', Alias(u'Rev', String), False, None)]), u'add').
       */
      mode?: WriteMode;
      /**
       * Defaults to False.
       */
      autorename?: boolean;
      /**
       * The value to store as the client_modified timestamp. Dropbox
       * automatically records the time at which the file was written to the
       * Dropbox servers. It can also record an additional timestamp, provided
       * by Dropbox desktop clients, mobile clients, and API apps of when the
       * file was actually created or modified.
       */
      client_modified?: common.DropboxTimestamp;
      /**
       * Defaults to False.
       */
      mute?: boolean;
      /**
       * List of custom properties to add to file.
       */
      property_groups?: Array<file_properties.PropertyGroup>;
    }

    export interface CommitInfoWithProperties extends CommitInfo {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
    }

    export interface CreateFolderArg {
      /**
       * Path in the user's Dropbox to create.
       */
      path: WritePath;
      /**
       * Defaults to False.
       */
      autorename?: boolean;
    }

    export interface CreateFolderErrorPath {
      '.tag': 'path';
      path: WriteError;
    }

    export type CreateFolderError = CreateFolderErrorPath;

    export interface CreateFolderResult extends FileOpsResult {
      /**
       * Metadata of the created folder.
       */
      metadata: FolderMetadata;
    }

    export interface DeleteArg {
      /**
       * Path in the user's Dropbox to delete.
       */
      path: WritePathOrId;
    }

    export interface DeleteBatchArg {
      entries: Array<DeleteArg>;
    }

    /**
     * Use DeleteError.too_many_write_operations. deleteBatch() now provides
     * smaller granularity about which entry has failed because of this.
     */
    export interface DeleteBatchErrorTooManyWriteOperations {
      '.tag': 'too_many_write_operations';
    }

    export interface DeleteBatchErrorOther {
      '.tag': 'other';
    }

    export type DeleteBatchError = DeleteBatchErrorTooManyWriteOperations | DeleteBatchErrorOther;

    /**
     * The batch delete has finished.
     */
    export interface DeleteBatchJobStatusComplete {
      '.tag': 'complete';
      complete: DeleteBatchResult;
    }

    /**
     * The batch delete has failed.
     */
    export interface DeleteBatchJobStatusFailed {
      '.tag': 'failed';
      failed: DeleteBatchError;
    }

    export interface DeleteBatchJobStatusOther {
      '.tag': 'other';
    }

    export type DeleteBatchJobStatus = async.PollResultBase | DeleteBatchJobStatusComplete | DeleteBatchJobStatusFailed | DeleteBatchJobStatusOther;

    export interface DeleteBatchLaunchComplete {
      '.tag': 'complete';
      complete: DeleteBatchResult;
    }

    export interface DeleteBatchLaunchOther {
      '.tag': 'other';
    }

    /**
     * Result returned by deleteBatch() that may either launch an asynchronous
     * job or complete synchronously.
     */
    export type DeleteBatchLaunch = async.LaunchResultBase | DeleteBatchLaunchComplete | DeleteBatchLaunchOther;

    export interface DeleteBatchResult extends FileOpsResult {
      entries: Array<DeleteBatchResultEntry>;
    }

    export interface DeleteBatchResultData {
      /**
       * Metadata of the deleted object.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    export interface DeleteBatchResultEntrySuccess {
      '.tag': 'success';
      success: DeleteBatchResultData;
    }

    export interface DeleteBatchResultEntryFailure {
      '.tag': 'failure';
      failure: DeleteError;
    }

    export type DeleteBatchResultEntry = DeleteBatchResultEntrySuccess | DeleteBatchResultEntryFailure;

    export interface DeleteErrorPathLookup {
      '.tag': 'path_lookup';
      path_lookup: LookupError;
    }

    export interface DeleteErrorPathWrite {
      '.tag': 'path_write';
      path_write: WriteError;
    }

    /**
     * There are too many write operations in user's Dropbox. Please retry this
     * request.
     */
    export interface DeleteErrorTooManyWriteOperations {
      '.tag': 'too_many_write_operations';
    }

    /**
     * There are too many files in one request. Please retry with fewer files.
     */
    export interface DeleteErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    export interface DeleteErrorOther {
      '.tag': 'other';
    }

    export type DeleteError = DeleteErrorPathLookup | DeleteErrorPathWrite | DeleteErrorTooManyWriteOperations | DeleteErrorTooManyFiles | DeleteErrorOther;

    export interface DeleteResult extends FileOpsResult {
      /**
       * Metadata of the deleted object.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    /**
     * Indicates that there used to be a file or folder at this path, but it no
     * longer exists.
     */
    export interface DeletedMetadata extends Metadata {
    }

    /**
     * Reference to the DeletedMetadata type, identified by the value of the
     * .tag property.
     */
    export interface DeletedMetadataReference extends DeletedMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'deleted';
    }

    /**
     * Dimensions for a photo or video.
     */
    export interface Dimensions {
      /**
       * Height of the photo/video.
       */
      height: number;
      /**
       * Width of the photo/video.
       */
      width: number;
    }

    export interface DownloadArg {
      /**
       * The path of the file to download.
       */
      path: ReadPath;
      /**
       * Please specify revision in path instead.
       */
      rev?: Rev;
    }

    export interface DownloadErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface DownloadErrorOther {
      '.tag': 'other';
    }

    export type DownloadError = DownloadErrorPath | DownloadErrorOther;

    export interface FileMetadata extends Metadata {
      /**
       * A unique identifier for the file.
       */
      id: Id;
      /**
       * For files, this is the modification time set by the desktop client when
       * the file was added to Dropbox. Since this time is not verified (the
       * Dropbox server stores whatever the desktop client sends up), this
       * should only be used for display purposes (such as sorting) and not, for
       * example, to determine if a file has changed or not.
       */
      client_modified: common.DropboxTimestamp;
      /**
       * The last time the file was modified on Dropbox.
       */
      server_modified: common.DropboxTimestamp;
      /**
       * A unique identifier for the current revision of a file. This field is
       * the same rev as elsewhere in the API and can be used to detect changes
       * and avoid conflicts.
       */
      rev: Rev;
      /**
       * The file size in bytes.
       */
      size: number;
      /**
       * Additional information if the file is a photo or video.
       */
      media_info?: MediaInfo;
      /**
       * Set if this file is contained in a shared folder.
       */
      sharing_info?: FileSharingInfo;
      /**
       * Additional information if the file has custom properties with the
       * property template specified.
       */
      property_groups?: Array<file_properties.PropertyGroup>;
      /**
       * This flag will only be present if include_has_explicit_shared_members
       * is true in listFolder() or getMetadata(). If this  flag is present, it
       * will be true if this file has any explicit shared  members. This is
       * different from sharing_info in that this could be true  in the case
       * where a file has explicit members but is not contained within  a shared
       * folder.
       */
      has_explicit_shared_members?: boolean;
      /**
       * A hash of the file content. This field can be used to verify data
       * integrity. For more information see our [Content hash]{@link
       * /developers/reference/content-hash} page.
       */
      content_hash?: Sha256HexHash;
    }

    /**
     * Reference to the FileMetadata type, identified by the value of the .tag
     * property.
     */
    export interface FileMetadataReference extends FileMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'file';
    }

    export interface FileOpsResult {
    }

    /**
     * Sharing info for a file which is contained by a shared folder.
     */
    export interface FileSharingInfo extends SharingInfo {
      /**
       * ID of shared folder that holds this file.
       */
      parent_shared_folder_id: common.SharedFolderId;
      /**
       * The last user who modified the file. This field will be null if the
       * user's account has been deleted.
       */
      modified_by?: users_common.AccountId;
    }

    export interface FolderMetadata extends Metadata {
      /**
       * A unique identifier for the folder.
       */
      id: Id;
      /**
       * Please use sharing_info instead.
       */
      shared_folder_id?: common.SharedFolderId;
      /**
       * Set if the folder is contained in a shared folder or is a shared folder
       * mount point.
       */
      sharing_info?: FolderSharingInfo;
      /**
       * Additional information if the file has custom properties with the
       * property template specified. Note that only properties associated with
       * user-owned templates, not team-owned templates, can be attached to
       * folders.
       */
      property_groups?: Array<file_properties.PropertyGroup>;
    }

    /**
     * Reference to the FolderMetadata type, identified by the value of the .tag
     * property.
     */
    export interface FolderMetadataReference extends FolderMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'folder';
    }

    /**
     * Sharing info for a folder which is contained in a shared folder or is a
     * shared folder mount point.
     */
    export interface FolderSharingInfo extends SharingInfo {
      /**
       * Set if the folder is contained by a shared folder.
       */
      parent_shared_folder_id?: common.SharedFolderId;
      /**
       * If this folder is a shared folder mount point, the ID of the shared
       * folder mounted at this location.
       */
      shared_folder_id?: common.SharedFolderId;
      /**
       * Defaults to False.
       */
      traverse_only?: boolean;
      /**
       * Defaults to False.
       */
      no_access?: boolean;
    }

    export interface GetCopyReferenceArg {
      /**
       * The path to the file or folder you want to get a copy reference to.
       */
      path: ReadPath;
    }

    export interface GetCopyReferenceErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface GetCopyReferenceErrorOther {
      '.tag': 'other';
    }

    export type GetCopyReferenceError = GetCopyReferenceErrorPath | GetCopyReferenceErrorOther;

    export interface GetCopyReferenceResult {
      /**
       * Metadata of the file or folder.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
      /**
       * A copy reference to the file or folder.
       */
      copy_reference: string;
      /**
       * The expiration date of the copy reference. This value is currently set
       * to be far enough in the future so that expiration is effectively not an
       * issue.
       */
      expires: common.DropboxTimestamp;
    }

    export interface GetMetadataArg {
      /**
       * The path of a file or folder on Dropbox.
       */
      path: ReadPath;
      /**
       * Defaults to False.
       */
      include_media_info?: boolean;
      /**
       * Defaults to False.
       */
      include_deleted?: boolean;
      /**
       * Defaults to False.
       */
      include_has_explicit_shared_members?: boolean;
      /**
       * If set to a valid list of template IDs, FileMetadata.property_groups is
       * set if there exists property data associated with the file and each of
       * the listed templates.
       */
      include_property_groups?: file_properties.TemplateFilterBase;
    }

    export interface GetMetadataErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export type GetMetadataError = GetMetadataErrorPath;

    export interface GetTemporaryLinkArg {
      /**
       * The path to the file you want a temporary link to.
       */
      path: ReadPath;
    }

    export interface GetTemporaryLinkErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface GetTemporaryLinkErrorOther {
      '.tag': 'other';
    }

    export type GetTemporaryLinkError = GetTemporaryLinkErrorPath | GetTemporaryLinkErrorOther;

    export interface GetTemporaryLinkResult {
      /**
       * Metadata of the file.
       */
      metadata: FileMetadata;
      /**
       * The temporary link which can be used to stream content the file.
       */
      link: string;
    }

    /**
     * Arguments for getThumbnailBatch().
     */
    export interface GetThumbnailBatchArg {
      /**
       * List of files to get thumbnails.
       */
      entries: Array<ThumbnailArg>;
    }

    /**
     * The operation involves more than 25 files.
     */
    export interface GetThumbnailBatchErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    export interface GetThumbnailBatchErrorOther {
      '.tag': 'other';
    }

    export type GetThumbnailBatchError = GetThumbnailBatchErrorTooManyFiles | GetThumbnailBatchErrorOther;

    export interface GetThumbnailBatchResult {
      /**
       * List of files and their thumbnails.
       */
      entries: Array<GetThumbnailBatchResultEntry>;
    }

    export interface GetThumbnailBatchResultData {
      metadata: FileMetadata;
      thumbnail: string;
    }

    export interface GetThumbnailBatchResultEntrySuccess {
      '.tag': 'success';
      success: GetThumbnailBatchResultData;
    }

    /**
     * The result for this file if it was an error.
     */
    export interface GetThumbnailBatchResultEntryFailure {
      '.tag': 'failure';
      failure: ThumbnailError;
    }

    export interface GetThumbnailBatchResultEntryOther {
      '.tag': 'other';
    }

    export type GetThumbnailBatchResultEntry = GetThumbnailBatchResultEntrySuccess | GetThumbnailBatchResultEntryFailure | GetThumbnailBatchResultEntryOther;

    /**
     * GPS coordinates for a photo or video.
     */
    export interface GpsCoordinates {
      /**
       * Latitude of the GPS coordinates.
       */
      latitude: number;
      /**
       * Longitude of the GPS coordinates.
       */
      longitude: number;
    }

    export interface ListFolderArg {
      /**
       * A unique identifier for the file.
       */
      path: PathROrId;
      /**
       * Defaults to False.
       */
      recursive?: boolean;
      /**
       * Defaults to False.
       */
      include_media_info?: boolean;
      /**
       * Defaults to False.
       */
      include_deleted?: boolean;
      /**
       * Defaults to False.
       */
      include_has_explicit_shared_members?: boolean;
      /**
       * Defaults to True.
       */
      include_mounted_folders?: boolean;
      /**
       * The maximum number of results to return per request. Note: This is an
       * approximate number and there can be slightly more entries returned in
       * some cases.
       */
      limit?: number;
      /**
       * A shared link to list the contents of. If the link is
       * password-protected, the password must be provided. If this field is
       * present, ListFolderArg.path will be relative to root of the shared
       * link. Only non-recursive mode is supported for shared link.
       */
      shared_link?: SharedLink;
      /**
       * If set to a valid list of template IDs, FileMetadata.property_groups is
       * set if there exists property data associated with the file and each of
       * the listed templates.
       */
      include_property_groups?: file_properties.TemplateFilterBase;
    }

    export interface ListFolderContinueArg {
      /**
       * The cursor returned by your last call to listFolder() or
       * listFolderContinue().
       */
      cursor: ListFolderCursor;
    }

    export interface ListFolderContinueErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    /**
     * Indicates that the cursor has been invalidated. Call listFolder() to
     * obtain a new cursor.
     */
    export interface ListFolderContinueErrorReset {
      '.tag': 'reset';
    }

    export interface ListFolderContinueErrorOther {
      '.tag': 'other';
    }

    export type ListFolderContinueError = ListFolderContinueErrorPath | ListFolderContinueErrorReset | ListFolderContinueErrorOther;

    export interface ListFolderErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface ListFolderErrorOther {
      '.tag': 'other';
    }

    export type ListFolderError = ListFolderErrorPath | ListFolderErrorOther;

    export interface ListFolderGetLatestCursorResult {
      /**
       * Pass the cursor into listFolderContinue() to see what's changed in the
       * folder since your previous query.
       */
      cursor: ListFolderCursor;
    }

    export interface ListFolderLongpollArg {
      /**
       * A cursor as returned by listFolder() or listFolderContinue(). Cursors
       * retrieved by setting ListFolderArg.include_media_info to true are not
       * supported.
       */
      cursor: ListFolderCursor;
      /**
       * Defaults to 30.
       */
      timeout?: number;
    }

    /**
     * Indicates that the cursor has been invalidated. Call listFolder() to
     * obtain a new cursor.
     */
    export interface ListFolderLongpollErrorReset {
      '.tag': 'reset';
    }

    export interface ListFolderLongpollErrorOther {
      '.tag': 'other';
    }

    export type ListFolderLongpollError = ListFolderLongpollErrorReset | ListFolderLongpollErrorOther;

    export interface ListFolderLongpollResult {
      /**
       * Indicates whether new changes are available. If true, call
       * listFolderContinue() to retrieve the changes.
       */
      changes: boolean;
      /**
       * If present, backoff for at least this many seconds before calling
       * listFolderLongpoll() again.
       */
      backoff?: number;
    }

    export interface ListFolderResult {
      /**
       * The files and (direct) subfolders in the folder.
       */
      entries: Array<FileMetadataReference|FolderMetadataReference|DeletedMetadataReference>;
      /**
       * Pass the cursor into listFolderContinue() to see what's changed in the
       * folder since your previous query.
       */
      cursor: ListFolderCursor;
      /**
       * If true, then there are more entries available. Pass the cursor to
       * listFolderContinue() to retrieve the rest.
       */
      has_more: boolean;
    }

    export interface ListRevisionsArg {
      /**
       * The path to the file you want to see the revisions of.
       */
      path: PathOrId;
      /**
       * Defaults to TagRef(Union(u'ListRevisionsMode', [UnionField(u'path',
       * Void, False, None), UnionField(u'id', Void, False, None),
       * UnionField(u'other', Void, True, None)]), u'path').
       */
      mode?: ListRevisionsMode;
      /**
       * Defaults to 10.
       */
      limit?: number;
    }

    export interface ListRevisionsErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface ListRevisionsErrorOther {
      '.tag': 'other';
    }

    export type ListRevisionsError = ListRevisionsErrorPath | ListRevisionsErrorOther;

    /**
     * Returns revisions with the same file path as identified by the latest
     * file entry at the given file path or id.
     */
    export interface ListRevisionsModePath {
      '.tag': 'path';
    }

    /**
     * Returns revisions with the same file id as identified by the latest file
     * entry at the given file path or id.
     */
    export interface ListRevisionsModeId {
      '.tag': 'id';
    }

    export interface ListRevisionsModeOther {
      '.tag': 'other';
    }

    export type ListRevisionsMode = ListRevisionsModePath | ListRevisionsModeId | ListRevisionsModeOther;

    export interface ListRevisionsResult {
      /**
       * If the file identified by the latest revision in the response is either
       * deleted or moved.
       */
      is_deleted: boolean;
      /**
       * The time of deletion if the file was deleted.
       */
      server_deleted?: common.DropboxTimestamp;
      /**
       * The revisions for the file. Only revisions that are not deleted will
       * show up here.
       */
      entries: Array<FileMetadata>;
    }

    export interface LookupErrorMalformedPath {
      '.tag': 'malformed_path';
      malformed_path: MalformedPathError;
    }

    /**
     * There is nothing at the given path.
     */
    export interface LookupErrorNotFound {
      '.tag': 'not_found';
    }

    /**
     * We were expecting a file, but the given path refers to something that
     * isn't a file.
     */
    export interface LookupErrorNotFile {
      '.tag': 'not_file';
    }

    /**
     * We were expecting a folder, but the given path refers to something that
     * isn't a folder.
     */
    export interface LookupErrorNotFolder {
      '.tag': 'not_folder';
    }

    /**
     * The file cannot be transferred because the content is restricted.  For
     * example, sometimes there are legal restrictions due to copyright claims.
     */
    export interface LookupErrorRestrictedContent {
      '.tag': 'restricted_content';
    }

    export interface LookupErrorOther {
      '.tag': 'other';
    }

    export type LookupError = LookupErrorMalformedPath | LookupErrorNotFound | LookupErrorNotFile | LookupErrorNotFolder | LookupErrorRestrictedContent | LookupErrorOther;

    /**
     * Indicate the photo/video is still under processing and metadata is not
     * available yet.
     */
    export interface MediaInfoPending {
      '.tag': 'pending';
    }

    /**
     * The metadata for the photo/video.
     */
    export interface MediaInfoMetadata {
      '.tag': 'metadata';
      metadata: PhotoMetadataReference|VideoMetadataReference;
    }

    export type MediaInfo = MediaInfoPending | MediaInfoMetadata;

    /**
     * Metadata for a photo or video.
     */
    export interface MediaMetadata {
      /**
       * Dimension of the photo/video.
       */
      dimensions?: Dimensions;
      /**
       * The GPS coordinate of the photo/video.
       */
      location?: GpsCoordinates;
      /**
       * The timestamp when the photo/video is taken.
       */
      time_taken?: common.DropboxTimestamp;
    }

    /**
     * Reference to the MediaMetadata polymorphic type. Contains a .tag property
     * to let you discriminate between possible subtypes.
     */
    export interface MediaMetadataReference extends MediaMetadata {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "photo"|"video";
    }

    /**
     * Metadata for a file or folder.
     */
    export interface Metadata {
      /**
       * The last component of the path (including extension). This never
       * contains a slash.
       */
      name: string;
      /**
       * The lowercased full path in the user's Dropbox. This always starts with
       * a slash. This field will be null if the file or folder is not mounted.
       */
      path_lower?: string;
      /**
       * The cased path to be used for display purposes only. In rare instances
       * the casing will not correctly match the user's filesystem, but this
       * behavior will match the path provided in the Core API v1, and at least
       * the last path component will have the correct casing. Changes to only
       * the casing of paths won't be returned by listFolderContinue(). This
       * field will be null if the file or folder is not mounted.
       */
      path_display?: string;
      /**
       * Please use FileSharingInfo.parent_shared_folder_id or
       * FolderSharingInfo.parent_shared_folder_id instead.
       */
      parent_shared_folder_id?: common.SharedFolderId;
    }

    /**
     * Reference to the Metadata polymorphic type. Contains a .tag property to
     * let you discriminate between possible subtypes.
     */
    export interface MetadataReference extends Metadata {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "file"|"folder"|"deleted";
    }

    /**
     * Metadata for a photo.
     */
    export interface PhotoMetadata extends MediaMetadata {
    }

    /**
     * Reference to the PhotoMetadata type, identified by the value of the .tag
     * property.
     */
    export interface PhotoMetadataReference extends PhotoMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'photo';
    }

    export interface PreviewArg {
      /**
       * The path of the file to preview.
       */
      path: ReadPath;
      /**
       * Please specify revision in path instead.
       */
      rev?: Rev;
    }

    /**
     * An error occurs when downloading metadata for the file.
     */
    export interface PreviewErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    /**
     * This preview generation is still in progress and the file is not ready
     * for preview yet.
     */
    export interface PreviewErrorInProgress {
      '.tag': 'in_progress';
    }

    /**
     * The file extension is not supported preview generation.
     */
    export interface PreviewErrorUnsupportedExtension {
      '.tag': 'unsupported_extension';
    }

    /**
     * The file content is not supported for preview generation.
     */
    export interface PreviewErrorUnsupportedContent {
      '.tag': 'unsupported_content';
    }

    export type PreviewError = PreviewErrorPath | PreviewErrorInProgress | PreviewErrorUnsupportedExtension | PreviewErrorUnsupportedContent;

    export interface RelocationArg extends RelocationPath {
      /**
       * Defaults to False.
       */
      allow_shared_folder?: boolean;
      /**
       * Defaults to False.
       */
      autorename?: boolean;
      /**
       * Defaults to False.
       */
      allow_ownership_transfer?: boolean;
    }

    export interface RelocationBatchArg {
      /**
       * List of entries to be moved or copied. Each entry is
       * files.RelocationPath.
       */
      entries: Array<RelocationPath>;
      /**
       * Defaults to False.
       */
      allow_shared_folder?: boolean;
      /**
       * Defaults to False.
       */
      autorename?: boolean;
      /**
       * Defaults to False.
       */
      allow_ownership_transfer?: boolean;
    }

    /**
     * There are too many write operations in user's Dropbox. Please retry this
     * request.
     */
    export interface RelocationBatchErrorTooManyWriteOperations {
      '.tag': 'too_many_write_operations';
    }

    export type RelocationBatchError = RelocationError | RelocationBatchErrorTooManyWriteOperations;

    /**
     * The copy or move batch job has finished.
     */
    export interface RelocationBatchJobStatusComplete {
      '.tag': 'complete';
      complete: RelocationBatchResult;
    }

    /**
     * The copy or move batch job has failed with exception.
     */
    export interface RelocationBatchJobStatusFailed {
      '.tag': 'failed';
      failed: RelocationBatchError;
    }

    export type RelocationBatchJobStatus = async.PollResultBase | RelocationBatchJobStatusComplete | RelocationBatchJobStatusFailed;

    export interface RelocationBatchLaunchComplete {
      '.tag': 'complete';
      complete: RelocationBatchResult;
    }

    export interface RelocationBatchLaunchOther {
      '.tag': 'other';
    }

    /**
     * Result returned by copyBatch() or moveBatch() that may either launch an
     * asynchronous job or complete synchronously.
     */
    export type RelocationBatchLaunch = async.LaunchResultBase | RelocationBatchLaunchComplete | RelocationBatchLaunchOther;

    export interface RelocationBatchResult extends FileOpsResult {
      entries: Array<RelocationBatchResultData>;
    }

    export interface RelocationBatchResultData {
      /**
       * Metadata of the relocated object.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    export interface RelocationErrorFromLookup {
      '.tag': 'from_lookup';
      from_lookup: LookupError;
    }

    export interface RelocationErrorFromWrite {
      '.tag': 'from_write';
      from_write: WriteError;
    }

    export interface RelocationErrorTo {
      '.tag': 'to';
      to: WriteError;
    }

    /**
     * Shared folders can't be copied.
     */
    export interface RelocationErrorCantCopySharedFolder {
      '.tag': 'cant_copy_shared_folder';
    }

    /**
     * Your move operation would result in nested shared folders.  This is not
     * allowed.
     */
    export interface RelocationErrorCantNestSharedFolder {
      '.tag': 'cant_nest_shared_folder';
    }

    /**
     * You cannot move a folder into itself.
     */
    export interface RelocationErrorCantMoveFolderIntoItself {
      '.tag': 'cant_move_folder_into_itself';
    }

    /**
     * The operation would involve more than 10,000 files and folders.
     */
    export interface RelocationErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    /**
     * There are duplicated/nested paths among RelocationArg.from_path and
     * RelocationArg.to_path.
     */
    export interface RelocationErrorDuplicatedOrNestedPaths {
      '.tag': 'duplicated_or_nested_paths';
    }

    /**
     * Your move operation would result in an ownership transfer. You may
     * reissue the request with the field RelocationArg.allow_ownership_transfer
     * to true.
     */
    export interface RelocationErrorCantTransferOwnership {
      '.tag': 'cant_transfer_ownership';
    }

    /**
     * The current user does not have enough space to move or copy the files.
     */
    export interface RelocationErrorInsufficientQuota {
      '.tag': 'insufficient_quota';
    }

    export interface RelocationErrorOther {
      '.tag': 'other';
    }

    export type RelocationError = RelocationErrorFromLookup | RelocationErrorFromWrite | RelocationErrorTo | RelocationErrorCantCopySharedFolder | RelocationErrorCantNestSharedFolder | RelocationErrorCantMoveFolderIntoItself | RelocationErrorTooManyFiles | RelocationErrorDuplicatedOrNestedPaths | RelocationErrorCantTransferOwnership | RelocationErrorInsufficientQuota | RelocationErrorOther;

    export interface RelocationPath {
      /**
       * Path in the user's Dropbox to be copied or moved.
       */
      from_path: WritePathOrId;
      /**
       * Path in the user's Dropbox that is the destination.
       */
      to_path: WritePathOrId;
    }

    export interface RelocationResult extends FileOpsResult {
      /**
       * Metadata of the relocated object.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    export interface RestoreArg {
      /**
       * The path to the file you want to restore.
       */
      path: WritePath;
      /**
       * The revision to restore for the file.
       */
      rev: Rev;
    }

    /**
     * An error occurs when downloading metadata for the file.
     */
    export interface RestoreErrorPathLookup {
      '.tag': 'path_lookup';
      path_lookup: LookupError;
    }

    /**
     * An error occurs when trying to restore the file to that path.
     */
    export interface RestoreErrorPathWrite {
      '.tag': 'path_write';
      path_write: WriteError;
    }

    /**
     * The revision is invalid. It may point to a different file.
     */
    export interface RestoreErrorInvalidRevision {
      '.tag': 'invalid_revision';
    }

    export interface RestoreErrorOther {
      '.tag': 'other';
    }

    export type RestoreError = RestoreErrorPathLookup | RestoreErrorPathWrite | RestoreErrorInvalidRevision | RestoreErrorOther;

    export interface SaveCopyReferenceArg {
      /**
       * A copy reference returned by copyReferenceGet().
       */
      copy_reference: string;
      /**
       * Path in the user's Dropbox that is the destination.
       */
      path: Path;
    }

    export interface SaveCopyReferenceErrorPath {
      '.tag': 'path';
      path: WriteError;
    }

    /**
     * The copy reference is invalid.
     */
    export interface SaveCopyReferenceErrorInvalidCopyReference {
      '.tag': 'invalid_copy_reference';
    }

    /**
     * You don't have permission to save the given copy reference. Please make
     * sure this app is same app which created the copy reference and the source
     * user is still linked to the app.
     */
    export interface SaveCopyReferenceErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * The file referenced by the copy reference cannot be found.
     */
    export interface SaveCopyReferenceErrorNotFound {
      '.tag': 'not_found';
    }

    /**
     * The operation would involve more than 10,000 files and folders.
     */
    export interface SaveCopyReferenceErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    export interface SaveCopyReferenceErrorOther {
      '.tag': 'other';
    }

    export type SaveCopyReferenceError = SaveCopyReferenceErrorPath | SaveCopyReferenceErrorInvalidCopyReference | SaveCopyReferenceErrorNoPermission | SaveCopyReferenceErrorNotFound | SaveCopyReferenceErrorTooManyFiles | SaveCopyReferenceErrorOther;

    export interface SaveCopyReferenceResult {
      /**
       * The metadata of the saved file or folder in the user's Dropbox.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    export interface SaveUrlArg {
      /**
       * The path in Dropbox where the URL will be saved to.
       */
      path: Path;
      /**
       * The URL to be saved.
       */
      url: string;
    }

    export interface SaveUrlErrorPath {
      '.tag': 'path';
      path: WriteError;
    }

    /**
     * Failed downloading the given URL.
     */
    export interface SaveUrlErrorDownloadFailed {
      '.tag': 'download_failed';
    }

    /**
     * The given URL is invalid.
     */
    export interface SaveUrlErrorInvalidUrl {
      '.tag': 'invalid_url';
    }

    /**
     * The file where the URL is saved to no longer exists.
     */
    export interface SaveUrlErrorNotFound {
      '.tag': 'not_found';
    }

    export interface SaveUrlErrorOther {
      '.tag': 'other';
    }

    export type SaveUrlError = SaveUrlErrorPath | SaveUrlErrorDownloadFailed | SaveUrlErrorInvalidUrl | SaveUrlErrorNotFound | SaveUrlErrorOther;

    /**
     * Metadata of the file where the URL is saved to.
     */
    export interface SaveUrlJobStatusComplete {
      '.tag': 'complete';
      complete: FileMetadata;
    }

    export interface SaveUrlJobStatusFailed {
      '.tag': 'failed';
      failed: SaveUrlError;
    }

    export type SaveUrlJobStatus = async.PollResultBase | SaveUrlJobStatusComplete | SaveUrlJobStatusFailed;

    /**
     * Metadata of the file where the URL is saved to.
     */
    export interface SaveUrlResultComplete {
      '.tag': 'complete';
      complete: FileMetadata;
    }

    export type SaveUrlResult = async.LaunchResultBase | SaveUrlResultComplete;

    export interface SearchArg {
      /**
       * The path in the user's Dropbox to search. Should probably be a folder.
       */
      path: PathROrId;
      /**
       * The string to search for. The search string is split on spaces into
       * multiple tokens. For file name searching, the last token is used for
       * prefix matching (i.e. "bat c" matches "bat cave" but not "batman car").
       */
      query: string;
      /**
       * Defaults to 0.
       */
      start?: number;
      /**
       * Defaults to 100.
       */
      max_results?: number;
      /**
       * Defaults to TagRef(Union(u'SearchMode', [UnionField(u'filename', Void,
       * False, None), UnionField(u'filename_and_content', Void, False, None),
       * UnionField(u'deleted_filename', Void, False, None)]), u'filename').
       */
      mode?: SearchMode;
    }

    export interface SearchErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    export interface SearchErrorOther {
      '.tag': 'other';
    }

    export type SearchError = SearchErrorPath | SearchErrorOther;

    export interface SearchMatch {
      /**
       * The type of the match.
       */
      match_type: SearchMatchType;
      /**
       * The metadata for the matched file or folder.
       */
      metadata: FileMetadataReference|FolderMetadataReference|DeletedMetadataReference;
    }

    /**
     * This item was matched on its file or folder name.
     */
    export interface SearchMatchTypeFilename {
      '.tag': 'filename';
    }

    /**
     * This item was matched based on its file contents.
     */
    export interface SearchMatchTypeContent {
      '.tag': 'content';
    }

    /**
     * This item was matched based on both its contents and its file name.
     */
    export interface SearchMatchTypeBoth {
      '.tag': 'both';
    }

    /**
     * Indicates what type of match was found for a given item.
     */
    export type SearchMatchType = SearchMatchTypeFilename | SearchMatchTypeContent | SearchMatchTypeBoth;

    /**
     * Search file and folder names.
     */
    export interface SearchModeFilename {
      '.tag': 'filename';
    }

    /**
     * Search file and folder names as well as file contents.
     */
    export interface SearchModeFilenameAndContent {
      '.tag': 'filename_and_content';
    }

    /**
     * Search for deleted file and folder names.
     */
    export interface SearchModeDeletedFilename {
      '.tag': 'deleted_filename';
    }

    export type SearchMode = SearchModeFilename | SearchModeFilenameAndContent | SearchModeDeletedFilename;

    export interface SearchResult {
      /**
       * A list (possibly empty) of matches for the query.
       */
      matches: Array<SearchMatch>;
      /**
       * Used for paging. If true, indicates there is another page of results
       * available that can be fetched by calling search() again.
       */
      more: boolean;
      /**
       * Used for paging. Value to set the start argument to when calling
       * search() to fetch the next page of results.
       */
      start: number;
    }

    export interface SharedLink {
      /**
       * Shared link url.
       */
      url: SharedLinkUrl;
      /**
       * Password for the shared link.
       */
      password?: string;
    }

    /**
     * Sharing info for a file or folder.
     */
    export interface SharingInfo {
      /**
       * True if the file or folder is inside a read-only shared folder.
       */
      read_only: boolean;
    }

    export interface ThumbnailArg {
      /**
       * The path to the image file you want to thumbnail.
       */
      path: ReadPath;
      /**
       * Defaults to TagRef(Union(u'ThumbnailFormat', [UnionField(u'jpeg', Void,
       * False, None), UnionField(u'png', Void, False, None)]), u'jpeg').
       */
      format?: ThumbnailFormat;
      /**
       * Defaults to TagRef(Union(u'ThumbnailSize', [UnionField(u'w32h32', Void,
       * False, None), UnionField(u'w64h64', Void, False, None),
       * UnionField(u'w128h128', Void, False, None), UnionField(u'w640h480',
       * Void, False, None), UnionField(u'w1024h768', Void, False, None)]),
       * u'w64h64').
       */
      size?: ThumbnailSize;
    }

    /**
     * An error occurs when downloading metadata for the image.
     */
    export interface ThumbnailErrorPath {
      '.tag': 'path';
      path: LookupError;
    }

    /**
     * The file extension doesn't allow conversion to a thumbnail.
     */
    export interface ThumbnailErrorUnsupportedExtension {
      '.tag': 'unsupported_extension';
    }

    /**
     * The image cannot be converted to a thumbnail.
     */
    export interface ThumbnailErrorUnsupportedImage {
      '.tag': 'unsupported_image';
    }

    /**
     * An error occurs during thumbnail conversion.
     */
    export interface ThumbnailErrorConversionError {
      '.tag': 'conversion_error';
    }

    export type ThumbnailError = ThumbnailErrorPath | ThumbnailErrorUnsupportedExtension | ThumbnailErrorUnsupportedImage | ThumbnailErrorConversionError;

    export interface ThumbnailFormatJpeg {
      '.tag': 'jpeg';
    }

    export interface ThumbnailFormatPng {
      '.tag': 'png';
    }

    export type ThumbnailFormat = ThumbnailFormatJpeg | ThumbnailFormatPng;

    /**
     * 32 by 32 px.
     */
    export interface ThumbnailSizeW32h32 {
      '.tag': 'w32h32';
    }

    /**
     * 64 by 64 px.
     */
    export interface ThumbnailSizeW64h64 {
      '.tag': 'w64h64';
    }

    /**
     * 128 by 128 px.
     */
    export interface ThumbnailSizeW128h128 {
      '.tag': 'w128h128';
    }

    /**
     * 640 by 480 px.
     */
    export interface ThumbnailSizeW640h480 {
      '.tag': 'w640h480';
    }

    /**
     * 1024 by 768.
     */
    export interface ThumbnailSizeW1024h768 {
      '.tag': 'w1024h768';
    }

    export type ThumbnailSize = ThumbnailSizeW32h32 | ThumbnailSizeW64h64 | ThumbnailSizeW128h128 | ThumbnailSizeW640h480 | ThumbnailSizeW1024h768;

    /**
     * Unable to save the uploaded contents to a file.
     */
    export interface UploadErrorPath {
      '.tag': 'path';
      path: UploadWriteFailed;
    }

    export interface UploadErrorOther {
      '.tag': 'other';
    }

    export type UploadError = UploadErrorPath | UploadErrorOther;

    export interface UploadErrorWithPropertiesPropertiesError {
      '.tag': 'properties_error';
      properties_error: file_properties.InvalidPropertyGroupError;
    }

    export type UploadErrorWithProperties = UploadError | UploadErrorWithPropertiesPropertiesError;

    export interface UploadSessionAppendArg {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * Contains the upload session ID and the offset.
       */
      cursor: UploadSessionCursor;
      /**
       * Defaults to False.
       */
      close?: boolean;
    }

    export interface UploadSessionCursor {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * The upload session ID (returned by uploadSessionStart()).
       */
      session_id: string;
      /**
       * The amount of data that has been uploaded so far. We use this to make
       * sure upload data isn't lost or duplicated in the event of a network
       * error.
       */
      offset: number;
    }

    export interface UploadSessionFinishArg {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * Contains the upload session ID and the offset.
       */
      cursor: UploadSessionCursor;
      /**
       * Contains the path and other optional modifiers for the commit.
       */
      commit: CommitInfo;
    }

    export interface UploadSessionFinishBatchArg {
      /**
       * Commit information for each file in the batch.
       */
      entries: Array<UploadSessionFinishArg>;
    }

    /**
     * The uploadSessionFinishBatch() has finished.
     */
    export interface UploadSessionFinishBatchJobStatusComplete {
      '.tag': 'complete';
      complete: UploadSessionFinishBatchResult;
    }

    export type UploadSessionFinishBatchJobStatus = async.PollResultBase | UploadSessionFinishBatchJobStatusComplete;

    export interface UploadSessionFinishBatchLaunchComplete {
      '.tag': 'complete';
      complete: UploadSessionFinishBatchResult;
    }

    export interface UploadSessionFinishBatchLaunchOther {
      '.tag': 'other';
    }

    /**
     * Result returned by uploadSessionFinishBatch() that may either launch an
     * asynchronous job or complete synchronously.
     */
    export type UploadSessionFinishBatchLaunch = async.LaunchResultBase | UploadSessionFinishBatchLaunchComplete | UploadSessionFinishBatchLaunchOther;

    export interface UploadSessionFinishBatchResult {
      /**
       * Commit result for each file in the batch.
       */
      entries: Array<UploadSessionFinishBatchResultEntry>;
    }

    export interface UploadSessionFinishBatchResultEntrySuccess {
      '.tag': 'success';
      success: FileMetadata;
    }

    export interface UploadSessionFinishBatchResultEntryFailure {
      '.tag': 'failure';
      failure: UploadSessionFinishError;
    }

    export type UploadSessionFinishBatchResultEntry = UploadSessionFinishBatchResultEntrySuccess | UploadSessionFinishBatchResultEntryFailure;

    /**
     * The session arguments are incorrect; the value explains the reason.
     */
    export interface UploadSessionFinishErrorLookupFailed {
      '.tag': 'lookup_failed';
      lookup_failed: UploadSessionLookupError;
    }

    /**
     * Unable to save the uploaded contents to a file.
     */
    export interface UploadSessionFinishErrorPath {
      '.tag': 'path';
      path: WriteError;
    }

    /**
     * The batch request commits files into too many different shared folders.
     * Please limit your batch request to files contained in a single shared
     * folder.
     */
    export interface UploadSessionFinishErrorTooManySharedFolderTargets {
      '.tag': 'too_many_shared_folder_targets';
    }

    /**
     * There are too many write operations happening in the user's Dropbox. You
     * should retry uploading this file.
     */
    export interface UploadSessionFinishErrorTooManyWriteOperations {
      '.tag': 'too_many_write_operations';
    }

    export interface UploadSessionFinishErrorOther {
      '.tag': 'other';
    }

    export type UploadSessionFinishError = UploadSessionFinishErrorLookupFailed | UploadSessionFinishErrorPath | UploadSessionFinishErrorTooManySharedFolderTargets | UploadSessionFinishErrorTooManyWriteOperations | UploadSessionFinishErrorOther;

    /**
     * The upload session ID was not found or has expired. Upload sessions are
     * valid for 48 hours.
     */
    export interface UploadSessionLookupErrorNotFound {
      '.tag': 'not_found';
    }

    /**
     * The specified offset was incorrect. See the value for the correct offset.
     * This error may occur when a previous request was received and processed
     * successfully but the client did not receive the response, e.g. due to a
     * network error.
     */
    export interface UploadSessionLookupErrorIncorrectOffset {
      '.tag': 'incorrect_offset';
      incorrect_offset: UploadSessionOffsetError;
    }

    /**
     * You are attempting to append data to an upload session that has alread
     * been closed (i.e. committed).
     */
    export interface UploadSessionLookupErrorClosed {
      '.tag': 'closed';
    }

    /**
     * The session must be closed before calling upload_session/finish_batch.
     */
    export interface UploadSessionLookupErrorNotClosed {
      '.tag': 'not_closed';
    }

    export interface UploadSessionLookupErrorOther {
      '.tag': 'other';
    }

    export type UploadSessionLookupError = UploadSessionLookupErrorNotFound | UploadSessionLookupErrorIncorrectOffset | UploadSessionLookupErrorClosed | UploadSessionLookupErrorNotClosed | UploadSessionLookupErrorOther;

    export interface UploadSessionOffsetError {
      /**
       * The offset up to which data has been collected.
       */
      correct_offset: number;
    }

    export interface UploadSessionStartArg {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * Defaults to False.
       */
      close?: boolean;
    }

    export interface UploadSessionStartResult {
      /**
       * A unique identifier for the upload session. Pass this to
       * uploadSessionAppendV2() and uploadSessionFinish().
       */
      session_id: string;
    }

    export interface UploadWriteFailed {
      /**
       * The reason why the file couldn't be saved.
       */
      reason: WriteError;
      /**
       * The upload session ID; this may be used to retry the commit.
       */
      upload_session_id: string;
    }

    /**
     * Metadata for a video.
     */
    export interface VideoMetadata extends MediaMetadata {
      /**
       * The duration of the video in milliseconds.
       */
      duration?: number;
    }

    /**
     * Reference to the VideoMetadata type, identified by the value of the .tag
     * property.
     */
    export interface VideoMetadataReference extends VideoMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'video';
    }

    /**
     * There's a file in the way.
     */
    export interface WriteConflictErrorFile {
      '.tag': 'file';
    }

    /**
     * There's a folder in the way.
     */
    export interface WriteConflictErrorFolder {
      '.tag': 'folder';
    }

    /**
     * There's a file at an ancestor path, so we couldn't create the required
     * parent folders.
     */
    export interface WriteConflictErrorFileAncestor {
      '.tag': 'file_ancestor';
    }

    export interface WriteConflictErrorOther {
      '.tag': 'other';
    }

    export type WriteConflictError = WriteConflictErrorFile | WriteConflictErrorFolder | WriteConflictErrorFileAncestor | WriteConflictErrorOther;

    export interface WriteErrorMalformedPath {
      '.tag': 'malformed_path';
      malformed_path: MalformedPathError;
    }

    /**
     * Couldn't write to the target path because there was something in the way.
     */
    export interface WriteErrorConflict {
      '.tag': 'conflict';
      conflict: WriteConflictError;
    }

    /**
     * The user doesn't have permissions to write to the target location.
     */
    export interface WriteErrorNoWritePermission {
      '.tag': 'no_write_permission';
    }

    /**
     * The user doesn't have enough available space (bytes) to write more data.
     */
    export interface WriteErrorInsufficientSpace {
      '.tag': 'insufficient_space';
    }

    /**
     * Dropbox will not save the file or folder because of its name.
     */
    export interface WriteErrorDisallowedName {
      '.tag': 'disallowed_name';
    }

    /**
     * This endpoint cannot move or delete team folders.
     */
    export interface WriteErrorTeamFolder {
      '.tag': 'team_folder';
    }

    export interface WriteErrorOther {
      '.tag': 'other';
    }

    export type WriteError = WriteErrorMalformedPath | WriteErrorConflict | WriteErrorNoWritePermission | WriteErrorInsufficientSpace | WriteErrorDisallowedName | WriteErrorTeamFolder | WriteErrorOther;

    /**
     * Do not overwrite an existing file if there is a conflict. The autorename
     * strategy is to append a number to the file name. For example,
     * "document.txt" might become "document (2).txt".
     */
    export interface WriteModeAdd {
      '.tag': 'add';
    }

    /**
     * Always overwrite the existing file. The autorename strategy is the same
     * as it is for add.
     */
    export interface WriteModeOverwrite {
      '.tag': 'overwrite';
    }

    /**
     * Overwrite if the given "rev" matches the existing file's "rev". The
     * autorename strategy is to append the string "conflicted copy" to the file
     * name. For example, "document.txt" might become "document (conflicted
     * copy).txt" or "document (Panda's conflicted copy).txt".
     */
    export interface WriteModeUpdate {
      '.tag': 'update';
      update: Rev;
    }

    /**
     * Your intent when writing a file to some path. This is used to determine
     * what constitutes a conflict and what the autorename strategy is. In some
     * situations, the conflict behavior is identical: (a) If the target path
     * doesn't refer to anything, the file is always written; no conflict. (b)
     * If the target path refers to a folder, it's always a conflict. (c) If the
     * target path refers to a file with identical contents, nothing gets
     * written; no conflict. The conflict checking differs in the case where
     * there's a file at the target path with contents different from the
     * contents you're trying to write.
     */
    export type WriteMode = WriteModeAdd | WriteModeOverwrite | WriteModeUpdate;

    export type Id = string;

    export type ListFolderCursor = string;

    export type MalformedPathError = Object;

    export type Path = string;

    export type PathOrId = string;

    export type PathR = string;

    export type PathROrId = string;

    export type ReadPath = string;

    export type Rev = string;

    export type Sha256HexHash = string;

    export type SharedLinkUrl = string;

    export type WritePath = string;

    export type WritePathOrId = string;

  }

  /**
   * This namespace contains endpoints and data types for managing docs and
   * folders in Dropbox Paper.
   */
  namespace paper {
    export interface AddMember {
      /**
       * Defaults to TagRef(Union(u'PaperDocPermissionLevel',
       * [UnionField(u'edit', Void, False, None),
       * UnionField(u'view_and_comment', Void, False, None),
       * UnionField(u'other', Void, True, None)]), u'edit').
       */
      permission_level?: PaperDocPermissionLevel;
      /**
       * User which should be added to the Paper doc. Specify only email address
       * or Dropbox account ID.
       */
      member: sharing.MemberSelector;
    }

    export interface AddPaperDocUser extends RefPaperDoc {
      /**
       * User which should be added to the Paper doc. Specify only email address
       * or Dropbox account ID.
       */
      members: Array<AddMember>;
      /**
       * A personal message that will be emailed to each successfully added
       * member.
       */
      custom_message?: string;
      /**
       * Defaults to False.
       */
      quiet?: boolean;
    }

    /**
     * Per-member result for docsUsersAdd().
     */
    export interface AddPaperDocUserMemberResult {
      /**
       * One of specified input members.
       */
      member: sharing.MemberSelector;
      /**
       * The outcome of the action on this member.
       */
      result: AddPaperDocUserResult;
    }

    /**
     * User was successfully added to the Paper doc.
     */
    export interface AddPaperDocUserResultSuccess {
      '.tag': 'success';
    }

    /**
     * Something unexpected happened when trying to add the user to the Paper
     * doc.
     */
    export interface AddPaperDocUserResultUnknownError {
      '.tag': 'unknown_error';
    }

    /**
     * The Paper doc can be shared only with team members.
     */
    export interface AddPaperDocUserResultSharingOutsideTeamDisabled {
      '.tag': 'sharing_outside_team_disabled';
    }

    /**
     * The daily limit of how many users can be added to the Paper doc was
     * reached.
     */
    export interface AddPaperDocUserResultDailyLimitReached {
      '.tag': 'daily_limit_reached';
    }

    /**
     * Owner's permissions cannot be changed.
     */
    export interface AddPaperDocUserResultUserIsOwner {
      '.tag': 'user_is_owner';
    }

    /**
     * User data could not be retrieved. Clients should retry.
     */
    export interface AddPaperDocUserResultFailedUserDataRetrieval {
      '.tag': 'failed_user_data_retrieval';
    }

    /**
     * This user already has the correct permission to the Paper doc.
     */
    export interface AddPaperDocUserResultPermissionAlreadyGranted {
      '.tag': 'permission_already_granted';
    }

    export interface AddPaperDocUserResultOther {
      '.tag': 'other';
    }

    export type AddPaperDocUserResult = AddPaperDocUserResultSuccess | AddPaperDocUserResultUnknownError | AddPaperDocUserResultSharingOutsideTeamDisabled | AddPaperDocUserResultDailyLimitReached | AddPaperDocUserResultUserIsOwner | AddPaperDocUserResultFailedUserDataRetrieval | AddPaperDocUserResultPermissionAlreadyGranted | AddPaperDocUserResultOther;

    export interface Cursor {
      /**
       * The actual cursor value.
       */
      value: string;
      /**
       * Expiration time of value. Some cursors might have expiration time
       * assigned. This is a UTC value after which the cursor is no longer valid
       * and the API starts returning an error. If cursor expires a new one
       * needs to be obtained and pagination needs to be restarted. Some cursors
       * might be short-lived some cursors might be long-lived. This really
       * depends on the sorting type and order, e.g.: 1. on one hand, listing
       * docs created by the user, sorted by the created time ascending will
       * have undefinite expiration because the results cannot change while the
       * iteration is happening. This cursor would be suitable for long term
       * polling. 2. on the other hand, listing docs sorted by the last modified
       * time will have a very short expiration as docs do get modified very
       * often and the modified time can be changed while the iteration is
       * happening thus altering the results.
       */
      expiration?: common.DropboxTimestamp;
    }

    /**
     * The required doc was not found.
     */
    export interface DocLookupErrorDocNotFound {
      '.tag': 'doc_not_found';
    }

    export type DocLookupError = PaperApiBaseError | DocLookupErrorDocNotFound;

    /**
     * No change email messages unless you're the creator.
     */
    export interface DocSubscriptionLevelDefault {
      '.tag': 'default';
    }

    /**
     * Ignored: Not shown in pad lists or activity and no email message is sent.
     */
    export interface DocSubscriptionLevelIgnore {
      '.tag': 'ignore';
    }

    /**
     * Subscribed: Shown in pad lists and activity and change email messages are
     * sent.
     */
    export interface DocSubscriptionLevelEvery {
      '.tag': 'every';
    }

    /**
     * Unsubscribed: Shown in pad lists, but not in activity and no change email
     * messages are sent.
     */
    export interface DocSubscriptionLevelNoEmail {
      '.tag': 'no_email';
    }

    /**
     * The subscription level of a Paper doc.
     */
    export type DocSubscriptionLevel = DocSubscriptionLevelDefault | DocSubscriptionLevelIgnore | DocSubscriptionLevelEvery | DocSubscriptionLevelNoEmail;

    /**
     * The HTML export format.
     */
    export interface ExportFormatHtml {
      '.tag': 'html';
    }

    /**
     * The markdown export format.
     */
    export interface ExportFormatMarkdown {
      '.tag': 'markdown';
    }

    export interface ExportFormatOther {
      '.tag': 'other';
    }

    /**
     * The desired export format of the Paper doc.
     */
    export type ExportFormat = ExportFormatHtml | ExportFormatMarkdown | ExportFormatOther;

    /**
     * Data structure representing a Paper folder.
     */
    export interface Folder {
      /**
       * Paper folder ID. This ID uniquely identifies the folder.
       */
      id: string;
      /**
       * Paper folder name.
       */
      name: string;
    }

    /**
     * Everyone in your team and anyone directly invited can access this folder.
     */
    export interface FolderSharingPolicyTypeTeam {
      '.tag': 'team';
    }

    /**
     * Only people directly invited can access this folder.
     */
    export interface FolderSharingPolicyTypeInviteOnly {
      '.tag': 'invite_only';
    }

    /**
     * The sharing policy of a Paper folder.  Note: The sharing policy of
     * subfolders is inherited from the root folder.
     */
    export type FolderSharingPolicyType = FolderSharingPolicyTypeTeam | FolderSharingPolicyTypeInviteOnly;

    /**
     * Not shown in activity, no email messages.
     */
    export interface FolderSubscriptionLevelNone {
      '.tag': 'none';
    }

    /**
     * Shown in activity, no email messages.
     */
    export interface FolderSubscriptionLevelActivityOnly {
      '.tag': 'activity_only';
    }

    /**
     * Shown in activity, daily email messages.
     */
    export interface FolderSubscriptionLevelDailyEmails {
      '.tag': 'daily_emails';
    }

    /**
     * Shown in activity, weekly email messages.
     */
    export interface FolderSubscriptionLevelWeeklyEmails {
      '.tag': 'weekly_emails';
    }

    /**
     * The subscription level of a Paper folder.
     */
    export type FolderSubscriptionLevel = FolderSubscriptionLevelNone | FolderSubscriptionLevelActivityOnly | FolderSubscriptionLevelDailyEmails | FolderSubscriptionLevelWeeklyEmails;

    /**
     * Metadata about Paper folders containing the specififed Paper doc.
     */
    export interface FoldersContainingPaperDoc {
      /**
       * The sharing policy of the folder containing the Paper doc.
       */
      folder_sharing_policy_type?: FolderSharingPolicyType;
      /**
       * The folder path. If present the first folder is the root folder.
       */
      folders?: Array<Folder>;
    }

    /**
     * The provided data is interpreted as standard HTML.
     */
    export interface ImportFormatHtml {
      '.tag': 'html';
    }

    /**
     * The provided data is interpreted as markdown. Note: The first line of the
     * provided document will be used as the doc title.
     */
    export interface ImportFormatMarkdown {
      '.tag': 'markdown';
    }

    /**
     * The provided data is interpreted as plain text. Note: The first line of
     * the provided document will be used as the doc title.
     */
    export interface ImportFormatPlainText {
      '.tag': 'plain_text';
    }

    export interface ImportFormatOther {
      '.tag': 'other';
    }

    /**
     * The import format of the incoming data.
     */
    export type ImportFormat = ImportFormatHtml | ImportFormatMarkdown | ImportFormatPlainText | ImportFormatOther;

    export interface InviteeInfoWithPermissionLevel {
      /**
       * Email address invited to the Paper doc.
       */
      invitee: sharing.InviteeInfo;
      /**
       * Permission level for the invitee.
       */
      permission_level: PaperDocPermissionLevel;
    }

    export interface ListDocsCursorErrorCursorError {
      '.tag': 'cursor_error';
      cursor_error: PaperApiCursorError;
    }

    export interface ListDocsCursorErrorOther {
      '.tag': 'other';
    }

    export type ListDocsCursorError = ListDocsCursorErrorCursorError | ListDocsCursorErrorOther;

    export interface ListPaperDocsArgs {
      /**
       * Defaults to TagRef(Union(u'ListPaperDocsFilterBy',
       * [UnionField(u'docs_accessed', Void, False, None),
       * UnionField(u'docs_created', Void, False, None), UnionField(u'other',
       * Void, True, None)]), u'docs_accessed').
       */
      filter_by?: ListPaperDocsFilterBy;
      /**
       * Defaults to TagRef(Union(u'ListPaperDocsSortBy',
       * [UnionField(u'accessed', Void, False, None), UnionField(u'modified',
       * Void, False, None), UnionField(u'created', Void, False, None),
       * UnionField(u'other', Void, True, None)]), u'accessed').
       */
      sort_by?: ListPaperDocsSortBy;
      /**
       * Defaults to TagRef(Union(u'ListPaperDocsSortOrder',
       * [UnionField(u'ascending', Void, False, None), UnionField(u'descending',
       * Void, False, None), UnionField(u'other', Void, True, None)]),
       * u'ascending').
       */
      sort_order?: ListPaperDocsSortOrder;
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface ListPaperDocsContinueArgs {
      /**
       * The cursor obtained from docsList() or docsListContinue(). Allows for
       * pagination.
       */
      cursor: string;
    }

    /**
     * Fetches all Paper doc IDs that the user has ever accessed.
     */
    export interface ListPaperDocsFilterByDocsAccessed {
      '.tag': 'docs_accessed';
    }

    /**
     * Fetches only the Paper doc IDs that the user has created.
     */
    export interface ListPaperDocsFilterByDocsCreated {
      '.tag': 'docs_created';
    }

    export interface ListPaperDocsFilterByOther {
      '.tag': 'other';
    }

    export type ListPaperDocsFilterBy = ListPaperDocsFilterByDocsAccessed | ListPaperDocsFilterByDocsCreated | ListPaperDocsFilterByOther;

    export interface ListPaperDocsResponse {
      /**
       * The list of Paper doc IDs that can be used to access the given Paper
       * docs or supplied to other API methods. The list is sorted in the order
       * specified by the initial call to docsList().
       */
      doc_ids: Array<string>;
      /**
       * Pass the cursor into docsListContinue() to paginate through all files.
       * The cursor preserves all properties as specified in the original call
       * to docsList().
       */
      cursor: Cursor;
      /**
       * Will be set to True if a subsequent call with the provided cursor to
       * docsListContinue() returns immediately with some results. If set to
       * False please allow some delay before making another call to
       * docsListContinue().
       */
      has_more: boolean;
    }

    /**
     * Sorts the Paper docs by the time they were last accessed.
     */
    export interface ListPaperDocsSortByAccessed {
      '.tag': 'accessed';
    }

    /**
     * Sorts the Paper docs by the time they were last modified.
     */
    export interface ListPaperDocsSortByModified {
      '.tag': 'modified';
    }

    /**
     * Sorts the Paper docs by the creation time.
     */
    export interface ListPaperDocsSortByCreated {
      '.tag': 'created';
    }

    export interface ListPaperDocsSortByOther {
      '.tag': 'other';
    }

    export type ListPaperDocsSortBy = ListPaperDocsSortByAccessed | ListPaperDocsSortByModified | ListPaperDocsSortByCreated | ListPaperDocsSortByOther;

    /**
     * Sorts the search result in ascending order.
     */
    export interface ListPaperDocsSortOrderAscending {
      '.tag': 'ascending';
    }

    /**
     * Sorts the search result in descending order.
     */
    export interface ListPaperDocsSortOrderDescending {
      '.tag': 'descending';
    }

    export interface ListPaperDocsSortOrderOther {
      '.tag': 'other';
    }

    export type ListPaperDocsSortOrder = ListPaperDocsSortOrderAscending | ListPaperDocsSortOrderDescending | ListPaperDocsSortOrderOther;

    /**
     * The required doc was not found.
     */
    export interface ListUsersCursorErrorDocNotFound {
      '.tag': 'doc_not_found';
    }

    export interface ListUsersCursorErrorCursorError {
      '.tag': 'cursor_error';
      cursor_error: PaperApiCursorError;
    }

    export type ListUsersCursorError = PaperApiBaseError | ListUsersCursorErrorDocNotFound | ListUsersCursorErrorCursorError;

    export interface ListUsersOnFolderArgs extends RefPaperDoc {
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface ListUsersOnFolderContinueArgs extends RefPaperDoc {
      /**
       * The cursor obtained from docsFolderUsersList() or
       * docsFolderUsersListContinue(). Allows for pagination.
       */
      cursor: string;
    }

    export interface ListUsersOnFolderResponse {
      /**
       * List of email addresses that are invited on the Paper folder.
       */
      invitees: Array<sharing.InviteeInfo>;
      /**
       * List of users that are invited on the Paper folder.
       */
      users: Array<sharing.UserInfo>;
      /**
       * Pass the cursor into docsFolderUsersListContinue() to paginate through
       * all users. The cursor preserves all properties as specified in the
       * original call to docsFolderUsersList().
       */
      cursor: Cursor;
      /**
       * Will be set to True if a subsequent call with the provided cursor to
       * docsFolderUsersListContinue() returns immediately with some results. If
       * set to False please allow some delay before making another call to
       * docsFolderUsersListContinue().
       */
      has_more: boolean;
    }

    export interface ListUsersOnPaperDocArgs extends RefPaperDoc {
      /**
       * Defaults to 1000.
       */
      limit?: number;
      /**
       * Defaults to TagRef(Union(u'UserOnPaperDocFilter',
       * [UnionField(u'visited', Void, False, None), UnionField(u'shared', Void,
       * False, None), UnionField(u'other', Void, True, None)]), u'shared').
       */
      filter_by?: UserOnPaperDocFilter;
    }

    export interface ListUsersOnPaperDocContinueArgs extends RefPaperDoc {
      /**
       * The cursor obtained from docsUsersList() or docsUsersListContinue().
       * Allows for pagination.
       */
      cursor: string;
    }

    export interface ListUsersOnPaperDocResponse {
      /**
       * List of email addresses with their respective permission levels that
       * are invited on the Paper doc.
       */
      invitees: Array<InviteeInfoWithPermissionLevel>;
      /**
       * List of users with their respective permission levels that are invited
       * on the Paper folder.
       */
      users: Array<UserInfoWithPermissionLevel>;
      /**
       * The Paper doc owner. This field is populated on every single response.
       */
      doc_owner: sharing.UserInfo;
      /**
       * Pass the cursor into docsUsersListContinue() to paginate through all
       * users. The cursor preserves all properties as specified in the original
       * call to docsUsersList().
       */
      cursor: Cursor;
      /**
       * Will be set to True if a subsequent call with the provided cursor to
       * docsUsersListContinue() returns immediately with some results. If set
       * to False please allow some delay before making another call to
       * docsUsersListContinue().
       */
      has_more: boolean;
    }

    /**
     * Your account does not have permissions to perform this action.
     */
    export interface PaperApiBaseErrorInsufficientPermissions {
      '.tag': 'insufficient_permissions';
    }

    export interface PaperApiBaseErrorOther {
      '.tag': 'other';
    }

    export type PaperApiBaseError = PaperApiBaseErrorInsufficientPermissions | PaperApiBaseErrorOther;

    /**
     * The provided cursor is expired.
     */
    export interface PaperApiCursorErrorExpiredCursor {
      '.tag': 'expired_cursor';
    }

    /**
     * The provided cursor is invalid.
     */
    export interface PaperApiCursorErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    /**
     * The provided cursor contains invalid user.
     */
    export interface PaperApiCursorErrorWrongUserInCursor {
      '.tag': 'wrong_user_in_cursor';
    }

    /**
     * Indicates that the cursor has been invalidated. Call the corresponding
     * non-continue endpoint to obtain a new cursor.
     */
    export interface PaperApiCursorErrorReset {
      '.tag': 'reset';
    }

    export interface PaperApiCursorErrorOther {
      '.tag': 'other';
    }

    export type PaperApiCursorError = PaperApiCursorErrorExpiredCursor | PaperApiCursorErrorInvalidCursor | PaperApiCursorErrorWrongUserInCursor | PaperApiCursorErrorReset | PaperApiCursorErrorOther;

    export interface PaperDocCreateArgs {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * The Paper folder ID where the Paper document should be created. The API
       * user has to have write access to this folder or error is thrown.
       */
      parent_folder_id?: string;
      /**
       * The format of provided data.
       */
      import_format: ImportFormat;
    }

    /**
     * The provided content was malformed and cannot be imported to Paper.
     */
    export interface PaperDocCreateErrorContentMalformed {
      '.tag': 'content_malformed';
    }

    /**
     * The specified Paper folder is cannot be found.
     */
    export interface PaperDocCreateErrorFolderNotFound {
      '.tag': 'folder_not_found';
    }

    /**
     * The newly created Paper doc would be too large. Please split the content
     * into multiple docs.
     */
    export interface PaperDocCreateErrorDocLengthExceeded {
      '.tag': 'doc_length_exceeded';
    }

    /**
     * The imported document contains an image that is too large. The current
     * limit is 1MB. Note: This only applies to HTML with data uri.
     */
    export interface PaperDocCreateErrorImageSizeExceeded {
      '.tag': 'image_size_exceeded';
    }

    export type PaperDocCreateError = PaperApiBaseError | PaperDocCreateErrorContentMalformed | PaperDocCreateErrorFolderNotFound | PaperDocCreateErrorDocLengthExceeded | PaperDocCreateErrorImageSizeExceeded;

    export interface PaperDocCreateUpdateResult {
      /**
       * Doc ID of the newly created doc.
       */
      doc_id: string;
      /**
       * The Paper doc revision. Simply an ever increasing number.
       */
      revision: number;
      /**
       * The Paper doc title.
       */
      title: string;
    }

    export interface PaperDocExport extends RefPaperDoc {
      export_format: ExportFormat;
    }

    export interface PaperDocExportResult {
      /**
       * The Paper doc owner's email address.
       */
      owner: string;
      /**
       * The Paper doc title.
       */
      title: string;
      /**
       * The Paper doc revision. Simply an ever increasing number.
       */
      revision: number;
      /**
       * MIME type of the export. This corresponds to paper.ExportFormat
       * specified in the request.
       */
      mime_type: string;
    }

    /**
     * User will be granted edit permissions.
     */
    export interface PaperDocPermissionLevelEdit {
      '.tag': 'edit';
    }

    /**
     * User will be granted view and comment permissions.
     */
    export interface PaperDocPermissionLevelViewAndComment {
      '.tag': 'view_and_comment';
    }

    export interface PaperDocPermissionLevelOther {
      '.tag': 'other';
    }

    export type PaperDocPermissionLevel = PaperDocPermissionLevelEdit | PaperDocPermissionLevelViewAndComment | PaperDocPermissionLevelOther;

    export interface PaperDocSharingPolicy extends RefPaperDoc {
      /**
       * The default sharing policy to be set for the Paper doc.
       */
      sharing_policy: SharingPolicy;
    }

    export interface PaperDocUpdateArgs extends RefPaperDoc {
      /**
       * The file contents to be uploaded.
       */
      contents: Object;
      /**
       * The policy used for the current update call.
       */
      doc_update_policy: PaperDocUpdatePolicy;
      /**
       * The latest doc revision. This value must match the head revision or an
       * error code will be returned. This is to prevent colliding writes.
       */
      revision: number;
      /**
       * The format of provided data.
       */
      import_format: ImportFormat;
    }

    /**
     * The provided content was malformed and cannot be imported to Paper.
     */
    export interface PaperDocUpdateErrorContentMalformed {
      '.tag': 'content_malformed';
    }

    /**
     * The provided revision does not match the document head.
     */
    export interface PaperDocUpdateErrorRevisionMismatch {
      '.tag': 'revision_mismatch';
    }

    /**
     * The newly created Paper doc would be too large, split the content into
     * multiple docs.
     */
    export interface PaperDocUpdateErrorDocLengthExceeded {
      '.tag': 'doc_length_exceeded';
    }

    /**
     * The imported document contains an image that is too large. The current
     * limit is 1MB. Note: This only applies to HTML with data uri.
     */
    export interface PaperDocUpdateErrorImageSizeExceeded {
      '.tag': 'image_size_exceeded';
    }

    /**
     * This operation is not allowed on archived Paper docs.
     */
    export interface PaperDocUpdateErrorDocArchived {
      '.tag': 'doc_archived';
    }

    /**
     * This operation is not allowed on deleted Paper docs.
     */
    export interface PaperDocUpdateErrorDocDeleted {
      '.tag': 'doc_deleted';
    }

    export type PaperDocUpdateError = DocLookupError | PaperDocUpdateErrorContentMalformed | PaperDocUpdateErrorRevisionMismatch | PaperDocUpdateErrorDocLengthExceeded | PaperDocUpdateErrorImageSizeExceeded | PaperDocUpdateErrorDocArchived | PaperDocUpdateErrorDocDeleted;

    /**
     * The content will be appended to the doc.
     */
    export interface PaperDocUpdatePolicyAppend {
      '.tag': 'append';
    }

    /**
     * The content will be prepended to the doc. Note: the doc title will not be
     * affected.
     */
    export interface PaperDocUpdatePolicyPrepend {
      '.tag': 'prepend';
    }

    /**
     * The document will be overwitten at the head with the provided content.
     */
    export interface PaperDocUpdatePolicyOverwriteAll {
      '.tag': 'overwrite_all';
    }

    export interface PaperDocUpdatePolicyOther {
      '.tag': 'other';
    }

    export type PaperDocUpdatePolicy = PaperDocUpdatePolicyAppend | PaperDocUpdatePolicyPrepend | PaperDocUpdatePolicyOverwriteAll | PaperDocUpdatePolicyOther;

    export interface RefPaperDoc {
      /**
       * The Paper doc ID.
       */
      doc_id: PaperDocId;
    }

    export interface RemovePaperDocUser extends RefPaperDoc {
      /**
       * User which should be removed from the Paper doc. Specify only email
       * address or Dropbox account ID.
       */
      member: sharing.MemberSelector;
    }

    /**
     * Sharing policy of Paper doc.
     */
    export interface SharingPolicy {
      /**
       * This value applies to the non-team members.
       */
      public_sharing_policy?: SharingPublicPolicyType;
      /**
       * This value applies to the team members only. The value is null for all
       * personal accounts.
       */
      team_sharing_policy?: SharingTeamPolicyType;
    }

    /**
     * Value used to indicate that doc sharing is enabled only within team.
     */
    export interface SharingPublicPolicyTypeDisabled {
      '.tag': 'disabled';
    }

    export type SharingPublicPolicyType = SharingTeamPolicyType | SharingPublicPolicyTypeDisabled;

    /**
     * Users who have a link to this doc can edit it.
     */
    export interface SharingTeamPolicyTypePeopleWithLinkCanEdit {
      '.tag': 'people_with_link_can_edit';
    }

    /**
     * Users who have a link to this doc can view and comment on it.
     */
    export interface SharingTeamPolicyTypePeopleWithLinkCanViewAndComment {
      '.tag': 'people_with_link_can_view_and_comment';
    }

    /**
     * Users must be explicitly invited to this doc.
     */
    export interface SharingTeamPolicyTypeInviteOnly {
      '.tag': 'invite_only';
    }

    /**
     * The sharing policy type of the Paper doc.
     */
    export type SharingTeamPolicyType = SharingTeamPolicyTypePeopleWithLinkCanEdit | SharingTeamPolicyTypePeopleWithLinkCanViewAndComment | SharingTeamPolicyTypeInviteOnly;

    export interface UserInfoWithPermissionLevel {
      /**
       * User shared on the Paper doc.
       */
      user: sharing.UserInfo;
      /**
       * Permission level for the user.
       */
      permission_level: PaperDocPermissionLevel;
    }

    /**
     * all users who have visited the Paper doc.
     */
    export interface UserOnPaperDocFilterVisited {
      '.tag': 'visited';
    }

    /**
     * All uses who are shared on the Paper doc. This includes all users who
     * have visited the Paper doc as well as those who have not.
     */
    export interface UserOnPaperDocFilterShared {
      '.tag': 'shared';
    }

    export interface UserOnPaperDocFilterOther {
      '.tag': 'other';
    }

    export type UserOnPaperDocFilter = UserOnPaperDocFilterVisited | UserOnPaperDocFilterShared | UserOnPaperDocFilterOther;

    export type PaperDocId = string;

  }

  /**
   * This namespace contains endpoints and data types for creating and managing
   * shared links and shared folders.
   */
  namespace sharing {
    /**
     * The collaborator is the owner of the shared folder. Owners can view and
     * edit the shared folder as well as set the folder's policies using
     * updateFolderPolicy().
     */
    export interface AccessLevelOwner {
      '.tag': 'owner';
    }

    /**
     * The collaborator can both view and edit the shared folder.
     */
    export interface AccessLevelEditor {
      '.tag': 'editor';
    }

    /**
     * The collaborator can only view the shared folder.
     */
    export interface AccessLevelViewer {
      '.tag': 'viewer';
    }

    /**
     * The collaborator can only view the shared folder and does not have any
     * access to comments.
     */
    export interface AccessLevelViewerNoComment {
      '.tag': 'viewer_no_comment';
    }

    export interface AccessLevelOther {
      '.tag': 'other';
    }

    /**
     * Defines the access levels for collaborators.
     */
    export type AccessLevel = AccessLevelOwner | AccessLevelEditor | AccessLevelViewer | AccessLevelViewerNoComment | AccessLevelOther;

    /**
     * Only the owner can update the ACL.
     */
    export interface AclUpdatePolicyOwner {
      '.tag': 'owner';
    }

    /**
     * Any editor can update the ACL. This may be further restricted to editors
     * on the same team.
     */
    export interface AclUpdatePolicyEditors {
      '.tag': 'editors';
    }

    export interface AclUpdatePolicyOther {
      '.tag': 'other';
    }

    /**
     * Who can change a shared folder's access control list (ACL). In other
     * words, who can add, remove, or change the privileges of members.
     */
    export type AclUpdatePolicy = AclUpdatePolicyOwner | AclUpdatePolicyEditors | AclUpdatePolicyOther;

    /**
     * Arguments for addFileMember().
     */
    export interface AddFileMemberArgs {
      /**
       * File to which to add members.
       */
      file: PathOrId;
      /**
       * Members to add. Note that even an email address is given, this may
       * result in a user being directy added to the membership if that email is
       * the user's main account email.
       */
      members: Array<MemberSelector>;
      /**
       * Message to send to added members in their invitation.
       */
      custom_message?: string;
      /**
       * Defaults to False.
       */
      quiet?: boolean;
      /**
       * Defaults to TagRef(Union(u'AccessLevel', [UnionField(u'owner', Void,
       * False, None), UnionField(u'editor', Void, False, None),
       * UnionField(u'viewer', Void, False, None),
       * UnionField(u'viewer_no_comment', Void, False, None),
       * UnionField(u'other', Void, True, None)]), u'viewer').
       */
      access_level?: AccessLevel;
      /**
       * Defaults to False.
       */
      add_message_as_comment?: boolean;
    }

    export interface AddFileMemberErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface AddFileMemberErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    /**
     * The user has reached the rate limit for invitations.
     */
    export interface AddFileMemberErrorRateLimit {
      '.tag': 'rate_limit';
    }

    /**
     * The custom message did not pass comment permissions checks.
     */
    export interface AddFileMemberErrorInvalidComment {
      '.tag': 'invalid_comment';
    }

    export interface AddFileMemberErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors for addFileMember().
     */
    export type AddFileMemberError = AddFileMemberErrorUserError | AddFileMemberErrorAccessError | AddFileMemberErrorRateLimit | AddFileMemberErrorInvalidComment | AddFileMemberErrorOther;

    export interface AddFolderMemberArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * The intended list of members to add.  Added members will receive
       * invites to join the shared folder.
       */
      members: Array<AddMember>;
      /**
       * Defaults to False.
       */
      quiet?: boolean;
      /**
       * Optional message to display to added members in their invitation.
       */
      custom_message?: string;
    }

    /**
     * Unable to access shared folder.
     */
    export interface AddFolderMemberErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * The current user's e-mail address is unverified.
     */
    export interface AddFolderMemberErrorEmailUnverified {
      '.tag': 'email_unverified';
    }

    /**
     * AddFolderMemberArg.members contains a bad invitation recipient.
     */
    export interface AddFolderMemberErrorBadMember {
      '.tag': 'bad_member';
      bad_member: AddMemberSelectorError;
    }

    /**
     * Your team policy does not allow sharing outside of the team.
     */
    export interface AddFolderMemberErrorCantShareOutsideTeam {
      '.tag': 'cant_share_outside_team';
    }

    /**
     * The value is the member limit that was reached.
     */
    export interface AddFolderMemberErrorTooManyMembers {
      '.tag': 'too_many_members';
      too_many_members: number;
    }

    /**
     * The value is the pending invite limit that was reached.
     */
    export interface AddFolderMemberErrorTooManyPendingInvites {
      '.tag': 'too_many_pending_invites';
      too_many_pending_invites: number;
    }

    /**
     * The current user has hit the limit of invites they can send per day. Try
     * again in 24 hours.
     */
    export interface AddFolderMemberErrorRateLimit {
      '.tag': 'rate_limit';
    }

    /**
     * The current user is trying to share with too many people at once.
     */
    export interface AddFolderMemberErrorTooManyInvitees {
      '.tag': 'too_many_invitees';
    }

    /**
     * The current user's account doesn't support this action. An example of
     * this is when adding a read-only member. This action can only be performed
     * by users that have upgraded to a Pro or Business plan.
     */
    export interface AddFolderMemberErrorInsufficientPlan {
      '.tag': 'insufficient_plan';
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface AddFolderMemberErrorTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface AddFolderMemberErrorNoPermission {
      '.tag': 'no_permission';
    }

    export interface AddFolderMemberErrorOther {
      '.tag': 'other';
    }

    export type AddFolderMemberError = AddFolderMemberErrorAccessError | AddFolderMemberErrorEmailUnverified | AddFolderMemberErrorBadMember | AddFolderMemberErrorCantShareOutsideTeam | AddFolderMemberErrorTooManyMembers | AddFolderMemberErrorTooManyPendingInvites | AddFolderMemberErrorRateLimit | AddFolderMemberErrorTooManyInvitees | AddFolderMemberErrorInsufficientPlan | AddFolderMemberErrorTeamFolder | AddFolderMemberErrorNoPermission | AddFolderMemberErrorOther;

    /**
     * The member and type of access the member should have when added to a
     * shared folder.
     */
    export interface AddMember {
      /**
       * The member to add to the shared folder.
       */
      member: MemberSelector;
      /**
       * Defaults to TagRef(Union(u'AccessLevel', [UnionField(u'owner', Void,
       * False, None), UnionField(u'editor', Void, False, None),
       * UnionField(u'viewer', Void, False, None),
       * UnionField(u'viewer_no_comment', Void, False, None),
       * UnionField(u'other', Void, True, None)]), u'viewer').
       */
      access_level?: AccessLevel;
    }

    /**
     * Automatically created groups can only be added to team folders.
     */
    export interface AddMemberSelectorErrorAutomaticGroup {
      '.tag': 'automatic_group';
    }

    /**
     * The value is the ID that could not be identified.
     */
    export interface AddMemberSelectorErrorInvalidDropboxId {
      '.tag': 'invalid_dropbox_id';
      invalid_dropbox_id: DropboxId;
    }

    /**
     * The value is the e-email address that is malformed.
     */
    export interface AddMemberSelectorErrorInvalidEmail {
      '.tag': 'invalid_email';
      invalid_email: common.EmailAddress;
    }

    /**
     * The value is the ID of the Dropbox user with an unverified e-mail
     * address.  Invite unverified users by e-mail address instead of by their
     * Dropbox ID.
     */
    export interface AddMemberSelectorErrorUnverifiedDropboxId {
      '.tag': 'unverified_dropbox_id';
      unverified_dropbox_id: DropboxId;
    }

    /**
     * At least one of the specified groups in AddFolderMemberArg.members is
     * deleted.
     */
    export interface AddMemberSelectorErrorGroupDeleted {
      '.tag': 'group_deleted';
    }

    /**
     * Sharing to a group that is not on the current user's team.
     */
    export interface AddMemberSelectorErrorGroupNotOnTeam {
      '.tag': 'group_not_on_team';
    }

    export interface AddMemberSelectorErrorOther {
      '.tag': 'other';
    }

    export type AddMemberSelectorError = AddMemberSelectorErrorAutomaticGroup | AddMemberSelectorErrorInvalidDropboxId | AddMemberSelectorErrorInvalidEmail | AddMemberSelectorErrorUnverifiedDropboxId | AddMemberSelectorErrorGroupDeleted | AddMemberSelectorErrorGroupNotOnTeam | AddMemberSelectorErrorOther;

    /**
     * Information about the content that has a link audience different than
     * that of this folder.
     */
    export interface AudienceExceptionContentInfo {
      /**
       * The name of the content, which is either a file or a folder.
       */
      name: string;
    }

    /**
     * The total count and truncated list of information of content inside this
     * folder that has a different audience than the link on this folder. This
     * is only returned for folders.
     */
    export interface AudienceExceptions {
      count: number;
      /**
       * A truncated list of some of the content that is an exception. The
       * length of this list could be smaller than the count since it is only a
       * sample but will not be empty as long as count is not 0.
       */
      exceptions: Array<AudienceExceptionContentInfo>;
    }

    /**
     * Information about the shared folder that prevents the link audience for
     * this link from being more restrictive.
     */
    export interface AudienceRestrictingSharedFolder {
      /**
       * The ID of the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * The name of the shared folder.
       */
      name: string;
      /**
       * The link audience of the shared folder.
       */
      audience: LinkAudience;
    }

    /**
     * Arguments for changeFileMemberAccess().
     */
    export interface ChangeFileMemberAccessArgs {
      /**
       * File for which we are changing a member's access.
       */
      file: PathOrId;
      /**
       * The member whose access we are changing.
       */
      member: MemberSelector;
      /**
       * The new access level for the member.
       */
      access_level: AccessLevel;
    }

    /**
     * Metadata for a collection-based shared link.
     */
    export interface CollectionLinkMetadata extends LinkMetadata {
    }

    /**
     * Reference to the CollectionLinkMetadata type, identified by the value of
     * the .tag property.
     */
    export interface CollectionLinkMetadataReference extends CollectionLinkMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'collection';
    }

    export interface CreateSharedLinkArg {
      /**
       * The path to share.
       */
      path: string;
      /**
       * Defaults to False.
       */
      short_url?: boolean;
      /**
       * If it's okay to share a path that does not yet exist, set this to
       * either PendingUploadMode.file or PendingUploadMode.folder to indicate
       * whether to assume it's a file or folder.
       */
      pending_upload?: PendingUploadMode;
    }

    export interface CreateSharedLinkErrorPath {
      '.tag': 'path';
      path: files.LookupError;
    }

    export interface CreateSharedLinkErrorOther {
      '.tag': 'other';
    }

    export type CreateSharedLinkError = CreateSharedLinkErrorPath | CreateSharedLinkErrorOther;

    export interface CreateSharedLinkWithSettingsArg {
      /**
       * The path to be shared by the shared link.
       */
      path: ReadPath;
      /**
       * The requested settings for the newly created shared link.
       */
      settings?: SharedLinkSettings;
    }

    export interface CreateSharedLinkWithSettingsErrorPath {
      '.tag': 'path';
      path: files.LookupError;
    }

    /**
     * User's email should be verified.
     */
    export interface CreateSharedLinkWithSettingsErrorEmailNotVerified {
      '.tag': 'email_not_verified';
    }

    /**
     * The shared link already exists. You can call listSharedLinks() to get the
     * existing link.
     */
    export interface CreateSharedLinkWithSettingsErrorSharedLinkAlreadyExists {
      '.tag': 'shared_link_already_exists';
    }

    /**
     * There is an error with the given settings.
     */
    export interface CreateSharedLinkWithSettingsErrorSettingsError {
      '.tag': 'settings_error';
      settings_error: SharedLinkSettingsError;
    }

    /**
     * Access to the requested path is forbidden.
     */
    export interface CreateSharedLinkWithSettingsErrorAccessDenied {
      '.tag': 'access_denied';
    }

    export type CreateSharedLinkWithSettingsError = CreateSharedLinkWithSettingsErrorPath | CreateSharedLinkWithSettingsErrorEmailNotVerified | CreateSharedLinkWithSettingsErrorSharedLinkAlreadyExists | CreateSharedLinkWithSettingsErrorSettingsError | CreateSharedLinkWithSettingsErrorAccessDenied;

    /**
     * The expected metadata of a shared link for a file or folder when a link
     * is first created for the content. Absent if the link already exists.
     */
    export interface ExpectedSharedContentLinkMetadata extends SharedContentLinkMetadataBase {
    }

    /**
     * Disable viewer information on the file.
     */
    export interface FileActionDisableViewerInfo {
      '.tag': 'disable_viewer_info';
    }

    /**
     * Change or edit contents of the file.
     */
    export interface FileActionEditContents {
      '.tag': 'edit_contents';
    }

    /**
     * Enable viewer information on the file.
     */
    export interface FileActionEnableViewerInfo {
      '.tag': 'enable_viewer_info';
    }

    /**
     * Add a member with view permissions.
     */
    export interface FileActionInviteViewer {
      '.tag': 'invite_viewer';
    }

    /**
     * Add a member with view permissions but no comment permissions.
     */
    export interface FileActionInviteViewerNoComment {
      '.tag': 'invite_viewer_no_comment';
    }

    /**
     * Stop sharing this file.
     */
    export interface FileActionUnshare {
      '.tag': 'unshare';
    }

    /**
     * Relinquish one's own membership to the file.
     */
    export interface FileActionRelinquishMembership {
      '.tag': 'relinquish_membership';
    }

    /**
     * Use create_link instead.
     */
    export interface FileActionShareLink {
      '.tag': 'share_link';
    }

    /**
     * Create a shared link to the file.
     */
    export interface FileActionCreateLink {
      '.tag': 'create_link';
    }

    export interface FileActionOther {
      '.tag': 'other';
    }

    /**
     * Sharing actions that may be taken on files.
     */
    export type FileAction = FileActionDisableViewerInfo | FileActionEditContents | FileActionEnableViewerInfo | FileActionInviteViewer | FileActionInviteViewerNoComment | FileActionUnshare | FileActionRelinquishMembership | FileActionShareLink | FileActionCreateLink | FileActionOther;

    /**
     * File specified by id was not found.
     */
    export interface FileErrorResultFileNotFoundError {
      '.tag': 'file_not_found_error';
      file_not_found_error: files.Id;
    }

    /**
     * User does not have permission to take the specified action on the file.
     */
    export interface FileErrorResultInvalidFileActionError {
      '.tag': 'invalid_file_action_error';
      invalid_file_action_error: files.Id;
    }

    /**
     * User does not have permission to access file specified by file.Id.
     */
    export interface FileErrorResultPermissionDeniedError {
      '.tag': 'permission_denied_error';
      permission_denied_error: files.Id;
    }

    export interface FileErrorResultOther {
      '.tag': 'other';
    }

    export type FileErrorResult = FileErrorResultFileNotFoundError | FileErrorResultInvalidFileActionError | FileErrorResultPermissionDeniedError | FileErrorResultOther;

    /**
     * The metadata of a file shared link.
     */
    export interface FileLinkMetadata extends SharedLinkMetadata {
      /**
       * The modification time set by the desktop client when the file was added
       * to Dropbox. Since this time is not verified (the Dropbox server stores
       * whatever the desktop client sends up), this should only be used for
       * display purposes (such as sorting) and not, for example, to determine
       * if a file has changed or not.
       */
      client_modified: common.DropboxTimestamp;
      /**
       * The last time the file was modified on Dropbox.
       */
      server_modified: common.DropboxTimestamp;
      /**
       * A unique identifier for the current revision of a file. This field is
       * the same rev as elsewhere in the API and can be used to detect changes
       * and avoid conflicts.
       */
      rev: Rev;
      /**
       * The file size in bytes.
       */
      size: number;
    }

    /**
     * Reference to the FileLinkMetadata type, identified by the value of the
     * .tag property.
     */
    export interface FileLinkMetadataReference extends FileLinkMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'file';
    }

    /**
     * Specified member was not found.
     */
    export interface FileMemberActionErrorInvalidMember {
      '.tag': 'invalid_member';
    }

    /**
     * User does not have permission to perform this action on this member.
     */
    export interface FileMemberActionErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * Specified file was invalid or user does not have access.
     */
    export interface FileMemberActionErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    /**
     * The action cannot be completed because the target member does not have
     * explicit access to the file. The return value is the access that the
     * member has to the file from a parent folder.
     */
    export interface FileMemberActionErrorNoExplicitAccess {
      '.tag': 'no_explicit_access';
      no_explicit_access: MemberAccessLevelResult;
    }

    export interface FileMemberActionErrorOther {
      '.tag': 'other';
    }

    export type FileMemberActionError = FileMemberActionErrorInvalidMember | FileMemberActionErrorNoPermission | FileMemberActionErrorAccessError | FileMemberActionErrorNoExplicitAccess | FileMemberActionErrorOther;

    /**
     * Member was successfully removed from this file. If AccessLevel is given,
     * the member still has access via a parent shared folder.
     */
    export interface FileMemberActionIndividualResultSuccess {
      '.tag': 'success';
      success: Object;
    }

    /**
     * User was not able to perform this action.
     */
    export interface FileMemberActionIndividualResultMemberError {
      '.tag': 'member_error';
      member_error: FileMemberActionError;
    }

    export type FileMemberActionIndividualResult = FileMemberActionIndividualResultSuccess | FileMemberActionIndividualResultMemberError;

    /**
     * Per-member result for addFileMember() or changeFileMemberAccess().
     */
    export interface FileMemberActionResult {
      /**
       * One of specified input members.
       */
      member: MemberSelector;
      /**
       * The outcome of the action on this member.
       */
      result: FileMemberActionIndividualResult;
    }

    /**
     * Member was successfully removed from this file.
     */
    export interface FileMemberRemoveActionResultSuccess {
      '.tag': 'success';
      success: MemberAccessLevelResult;
    }

    /**
     * User was not able to remove this member.
     */
    export interface FileMemberRemoveActionResultMemberError {
      '.tag': 'member_error';
      member_error: FileMemberActionError;
    }

    export interface FileMemberRemoveActionResultOther {
      '.tag': 'other';
    }

    export type FileMemberRemoveActionResult = FileMemberRemoveActionResultSuccess | FileMemberRemoveActionResultMemberError | FileMemberRemoveActionResultOther;

    /**
     * Whether the user is allowed to take the sharing action on the file.
     */
    export interface FilePermission {
      /**
       * The action that the user may wish to take on the file.
       */
      action: FileAction;
      /**
       * True if the user is allowed to take the action.
       */
      allow: boolean;
      /**
       * The reason why the user is denied the permission. Not present if the
       * action is allowed.
       */
      reason?: PermissionDeniedReason;
    }

    /**
     * Change folder options, such as who can be invited to join the folder.
     */
    export interface FolderActionChangeOptions {
      '.tag': 'change_options';
    }

    /**
     * Disable viewer information for this folder.
     */
    export interface FolderActionDisableViewerInfo {
      '.tag': 'disable_viewer_info';
    }

    /**
     * Change or edit contents of the folder.
     */
    export interface FolderActionEditContents {
      '.tag': 'edit_contents';
    }

    /**
     * Enable viewer information on the folder.
     */
    export interface FolderActionEnableViewerInfo {
      '.tag': 'enable_viewer_info';
    }

    /**
     * Invite a user or group to join the folder with read and write permission.
     */
    export interface FolderActionInviteEditor {
      '.tag': 'invite_editor';
    }

    /**
     * Invite a user or group to join the folder with read permission.
     */
    export interface FolderActionInviteViewer {
      '.tag': 'invite_viewer';
    }

    /**
     * Invite a user or group to join the folder with read permission but no
     * comment permissions.
     */
    export interface FolderActionInviteViewerNoComment {
      '.tag': 'invite_viewer_no_comment';
    }

    /**
     * Relinquish one's own membership in the folder.
     */
    export interface FolderActionRelinquishMembership {
      '.tag': 'relinquish_membership';
    }

    /**
     * Unmount the folder.
     */
    export interface FolderActionUnmount {
      '.tag': 'unmount';
    }

    /**
     * Stop sharing this folder.
     */
    export interface FolderActionUnshare {
      '.tag': 'unshare';
    }

    /**
     * Keep a copy of the contents upon leaving or being kicked from the folder.
     */
    export interface FolderActionLeaveACopy {
      '.tag': 'leave_a_copy';
    }

    /**
     * Use create_link instead.
     */
    export interface FolderActionShareLink {
      '.tag': 'share_link';
    }

    /**
     * Create a shared link for folder.
     */
    export interface FolderActionCreateLink {
      '.tag': 'create_link';
    }

    export interface FolderActionOther {
      '.tag': 'other';
    }

    /**
     * Actions that may be taken on shared folders.
     */
    export type FolderAction = FolderActionChangeOptions | FolderActionDisableViewerInfo | FolderActionEditContents | FolderActionEnableViewerInfo | FolderActionInviteEditor | FolderActionInviteViewer | FolderActionInviteViewerNoComment | FolderActionRelinquishMembership | FolderActionUnmount | FolderActionUnshare | FolderActionLeaveACopy | FolderActionShareLink | FolderActionCreateLink | FolderActionOther;

    /**
     * The metadata of a folder shared link.
     */
    export interface FolderLinkMetadata extends SharedLinkMetadata {
    }

    /**
     * Reference to the FolderLinkMetadata type, identified by the value of the
     * .tag property.
     */
    export interface FolderLinkMetadataReference extends FolderLinkMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'folder';
    }

    /**
     * Whether the user is allowed to take the action on the shared folder.
     */
    export interface FolderPermission {
      /**
       * The action that the user may wish to take on the folder.
       */
      action: FolderAction;
      /**
       * True if the user is allowed to take the action.
       */
      allow: boolean;
      /**
       * The reason why the user is denied the permission. Not present if the
       * action is allowed, or if no reason is available.
       */
      reason?: PermissionDeniedReason;
    }

    /**
     * A set of policies governing membership and privileges for a shared
     * folder.
     */
    export interface FolderPolicy {
      /**
       * Who can be a member of this shared folder, as set on the folder itself.
       * The effective policy may differ from this value if the team-wide policy
       * is more restrictive. Present only if the folder is owned by a team.
       */
      member_policy?: MemberPolicy;
      /**
       * Who can be a member of this shared folder, taking into account both the
       * folder and the team-wide policy. This value may differ from that of
       * member_policy if the team-wide policy is more restrictive than the
       * folder policy. Present only if the folder is owned by a team.
       */
      resolved_member_policy?: MemberPolicy;
      /**
       * Who can add and remove members from this shared folder.
       */
      acl_update_policy: AclUpdatePolicy;
      /**
       * Who links can be shared with.
       */
      shared_link_policy: SharedLinkPolicy;
      /**
       * Who can enable/disable viewer info for this shared folder.
       */
      viewer_info_policy?: ViewerInfoPolicy;
    }

    /**
     * Arguments of getFileMetadata().
     */
    export interface GetFileMetadataArg {
      /**
       * The file to query.
       */
      file: PathOrId;
      /**
       * A list of `FileAction`s corresponding to `FilePermission`s that should
       * appear in the  response's SharedFileMetadata.permissions field
       * describing the actions the  authenticated user can perform on the file.
       */
      actions?: Array<FileAction>;
    }

    /**
     * Arguments of getFileMetadataBatch().
     */
    export interface GetFileMetadataBatchArg {
      /**
       * The files to query.
       */
      files: Array<PathOrId>;
      /**
       * A list of `FileAction`s corresponding to `FilePermission`s that should
       * appear in the  response's SharedFileMetadata.permissions field
       * describing the actions the  authenticated user can perform on the file.
       */
      actions?: Array<FileAction>;
    }

    /**
     * Per file results of getFileMetadataBatch().
     */
    export interface GetFileMetadataBatchResult {
      /**
       * This is the input file identifier corresponding to one of
       * GetFileMetadataBatchArg.files.
       */
      file: PathOrId;
      /**
       * The result for this particular file.
       */
      result: GetFileMetadataIndividualResult;
    }

    export interface GetFileMetadataErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface GetFileMetadataErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    export interface GetFileMetadataErrorOther {
      '.tag': 'other';
    }

    /**
     * Error result for getFileMetadata().
     */
    export type GetFileMetadataError = GetFileMetadataErrorUserError | GetFileMetadataErrorAccessError | GetFileMetadataErrorOther;

    /**
     * The result for this file if it was successful.
     */
    export interface GetFileMetadataIndividualResultMetadata {
      '.tag': 'metadata';
      metadata: SharedFileMetadata;
    }

    /**
     * The result for this file if it was an error.
     */
    export interface GetFileMetadataIndividualResultAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    export interface GetFileMetadataIndividualResultOther {
      '.tag': 'other';
    }

    export type GetFileMetadataIndividualResult = GetFileMetadataIndividualResultMetadata | GetFileMetadataIndividualResultAccessError | GetFileMetadataIndividualResultOther;

    export interface GetMetadataArgs {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * A list of `FolderAction`s corresponding to `FolderPermission`s that
       * should appear in the  response's SharedFolderMetadata.permissions field
       * describing the actions the  authenticated user can perform on the
       * folder.
       */
      actions?: Array<FolderAction>;
    }

    /**
     * Directories cannot be retrieved by this endpoint.
     */
    export interface GetSharedLinkFileErrorSharedLinkIsDirectory {
      '.tag': 'shared_link_is_directory';
    }

    export type GetSharedLinkFileError = SharedLinkError | GetSharedLinkFileErrorSharedLinkIsDirectory;

    export interface GetSharedLinkMetadataArg {
      /**
       * URL of the shared link.
       */
      url: string;
      /**
       * If the shared link is to a folder, this parameter can be used to
       * retrieve the metadata for a specific file or sub-folder in this folder.
       * A relative path should be used.
       */
      path?: Path;
      /**
       * If the shared link has a password, this parameter can be used.
       */
      link_password?: string;
    }

    export interface GetSharedLinksArg {
      /**
       * See getSharedLinks() description.
       */
      path?: string;
    }

    export interface GetSharedLinksErrorPath {
      '.tag': 'path';
      path: files.MalformedPathError;
    }

    export interface GetSharedLinksErrorOther {
      '.tag': 'other';
    }

    export type GetSharedLinksError = GetSharedLinksErrorPath | GetSharedLinksErrorOther;

    export interface GetSharedLinksResult {
      /**
       * Shared links applicable to the path argument.
       */
      links: Array<PathLinkMetadataReference|CollectionLinkMetadataReference|LinkMetadataReference>;
    }

    /**
     * The information about a group. Groups is a way to manage a list of users
     * who need same access permission to the shared folder.
     */
    export interface GroupInfo extends team_common.GroupSummary {
      /**
       * The type of group.
       */
      group_type: team_common.GroupType;
      /**
       * If the current user is a member of the group.
       */
      is_member: boolean;
      /**
       * If the current user is an owner of the group.
       */
      is_owner: boolean;
      /**
       * If the group is owned by the current user's team.
       */
      same_team: boolean;
    }

    /**
     * The information about a group member of the shared content.
     */
    export interface GroupMembershipInfo extends MembershipInfo {
      /**
       * The information about the membership group.
       */
      group: GroupInfo;
    }

    export interface InsufficientPlan {
      /**
       * A message to tell the user to upgrade in order to support expected
       * action.
       */
      message: string;
      /**
       * A URL to send the user to in order to obtain the account type they
       * need, e.g. upgrading. Absent if there is no action the user can take to
       * upgrade.
       */
      upsell_url?: string;
    }

    export interface InsufficientQuotaAmounts {
      /**
       * The amount of space needed to add the item (the size of the item).
       */
      space_needed: number;
      /**
       * The amount of extra space needed to add the item.
       */
      space_shortage: number;
      /**
       * The amount of space left in the user's Dropbox, less than space_needed.
       */
      space_left: number;
    }

    /**
     * E-mail address of invited user.
     */
    export interface InviteeInfoEmail {
      '.tag': 'email';
      email: common.EmailAddress;
    }

    export interface InviteeInfoOther {
      '.tag': 'other';
    }

    /**
     * Information about the recipient of a shared content invitation.
     */
    export type InviteeInfo = InviteeInfoEmail | InviteeInfoOther;

    /**
     * Information about an invited member of a shared content.
     */
    export interface InviteeMembershipInfo extends MembershipInfo {
      /**
       * Recipient of the invitation.
       */
      invitee: InviteeInfo;
      /**
       * The user this invitation is tied to, if available.
       */
      user?: UserInfo;
    }

    /**
     * Error occurred while performing unshareFolder() action.
     */
    export interface JobErrorUnshareFolderError {
      '.tag': 'unshare_folder_error';
      unshare_folder_error: UnshareFolderError;
    }

    /**
     * Error occurred while performing removeFolderMember() action.
     */
    export interface JobErrorRemoveFolderMemberError {
      '.tag': 'remove_folder_member_error';
      remove_folder_member_error: RemoveFolderMemberError;
    }

    /**
     * Error occurred while performing relinquishFolderMembership() action.
     */
    export interface JobErrorRelinquishFolderMembershipError {
      '.tag': 'relinquish_folder_membership_error';
      relinquish_folder_membership_error: RelinquishFolderMembershipError;
    }

    export interface JobErrorOther {
      '.tag': 'other';
    }

    /**
     * Error occurred while performing an asynchronous job from unshareFolder()
     * or removeFolderMember().
     */
    export type JobError = JobErrorUnshareFolderError | JobErrorRemoveFolderMemberError | JobErrorRelinquishFolderMembershipError | JobErrorOther;

    /**
     * The asynchronous job has finished.
     */
    export interface JobStatusComplete {
      '.tag': 'complete';
    }

    /**
     * The asynchronous job returned an error.
     */
    export interface JobStatusFailed {
      '.tag': 'failed';
      failed: JobError;
    }

    export type JobStatus = async.PollResultBase | JobStatusComplete | JobStatusFailed;

    /**
     * Change the access level of the link.
     */
    export interface LinkActionChangeAccessLevel {
      '.tag': 'change_access_level';
    }

    /**
     * Change the audience of the link.
     */
    export interface LinkActionChangeAudience {
      '.tag': 'change_audience';
    }

    /**
     * Remove the expiry date of the link.
     */
    export interface LinkActionRemoveExpiry {
      '.tag': 'remove_expiry';
    }

    /**
     * Remove the password of the link.
     */
    export interface LinkActionRemovePassword {
      '.tag': 'remove_password';
    }

    /**
     * Create or modify the expiry date of the link.
     */
    export interface LinkActionSetExpiry {
      '.tag': 'set_expiry';
    }

    /**
     * Create or modify the password of the link.
     */
    export interface LinkActionSetPassword {
      '.tag': 'set_password';
    }

    export interface LinkActionOther {
      '.tag': 'other';
    }

    /**
     * Actions that can be performed on a link.
     */
    export type LinkAction = LinkActionChangeAccessLevel | LinkActionChangeAudience | LinkActionRemoveExpiry | LinkActionRemovePassword | LinkActionSetExpiry | LinkActionSetPassword | LinkActionOther;

    /**
     * Link is accessible by anyone.
     */
    export interface LinkAudiencePublic {
      '.tag': 'public';
    }

    /**
     * Link is accessible only by team members.
     */
    export interface LinkAudienceTeam {
      '.tag': 'team';
    }

    /**
     * Link is accessible only by members of the content.
     */
    export interface LinkAudienceMembers {
      '.tag': 'members';
    }

    export interface LinkAudienceOther {
      '.tag': 'other';
    }

    export type LinkAudience = LinkAudiencePublic | LinkAudienceTeam | LinkAudienceMembers | LinkAudienceOther;

    /**
     * Remove the currently set expiry for the link.
     */
    export interface LinkExpiryRemoveExpiry {
      '.tag': 'remove_expiry';
    }

    /**
     * Set a new expiry or change an existing expiry.
     */
    export interface LinkExpirySetExpiry {
      '.tag': 'set_expiry';
      set_expiry: common.DropboxTimestamp;
    }

    export interface LinkExpiryOther {
      '.tag': 'other';
    }

    export type LinkExpiry = LinkExpiryRemoveExpiry | LinkExpirySetExpiry | LinkExpiryOther;

    /**
     * Metadata for a shared link. This can be either a sharing.PathLinkMetadata
     * or sharing.CollectionLinkMetadata.
     */
    export interface LinkMetadata {
      /**
       * URL of the shared link.
       */
      url: string;
      /**
       * Who can access the link.
       */
      visibility: Visibility;
      /**
       * Expiration time, if set. By default the link won't expire.
       */
      expires?: common.DropboxTimestamp;
    }

    /**
     * Reference to the LinkMetadata polymorphic type. Contains a .tag property
     * to let you discriminate between possible subtypes.
     */
    export interface LinkMetadataReference extends LinkMetadata {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "path"|"collection";
    }

    /**
     * Remove the currently set password for the link.
     */
    export interface LinkPasswordRemovePassword {
      '.tag': 'remove_password';
    }

    /**
     * Set a new password or change an existing password.
     */
    export interface LinkPasswordSetPassword {
      '.tag': 'set_password';
      set_password: string;
    }

    export interface LinkPasswordOther {
      '.tag': 'other';
    }

    export type LinkPassword = LinkPasswordRemovePassword | LinkPasswordSetPassword | LinkPasswordOther;

    /**
     * Permissions for actions that can be performed on a link.
     */
    export interface LinkPermission {
      action: LinkAction;
      allow: boolean;
      reason?: PermissionDeniedReason;
    }

    export interface LinkPermissions {
      /**
       * The current visibility of the link after considering the shared links
       * policies of the the team (in case the link's owner is part of a team)
       * and the shared folder (in case the linked file is part of a shared
       * folder). This field is shown only if the caller has access to this info
       * (the link's owner always has access to this data).
       */
      resolved_visibility?: ResolvedVisibility;
      /**
       * The shared link's requested visibility. This can be overridden by the
       * team and shared folder policies. The final visibility, after
       * considering these policies, can be found in resolved_visibility. This
       * is shown only if the caller is the link's owner.
       */
      requested_visibility?: RequestedVisibility;
      /**
       * Whether the caller can revoke the shared link.
       */
      can_revoke: boolean;
      /**
       * The failure reason for revoking the link. This field will only be
       * present if the can_revoke is false.
       */
      revoke_failure_reason?: SharedLinkAccessFailureReason;
    }

    /**
     * Settings that apply to a link.
     */
    export interface LinkSettings {
      /**
       * The access level on the link for this file. Currently, it only accepts
       * 'viewer' and 'viewer_no_comment'.
       */
      access_level?: AccessLevel;
      /**
       * The type of audience on the link for this file.
       */
      audience?: LinkAudience;
      /**
       * An expiry timestamp to set on a link.
       */
      expiry?: LinkExpiry;
      /**
       * The password for the link.
       */
      password?: LinkPassword;
    }

    /**
     * Arguments for listFileMembers().
     */
    export interface ListFileMembersArg {
      /**
       * The file for which you want to see members.
       */
      file: PathOrId;
      /**
       * The actions for which to return permissions on a member.
       */
      actions?: Array<MemberAction>;
      /**
       * Defaults to True.
       */
      include_inherited?: boolean;
      /**
       * Defaults to 100.
       */
      limit?: number;
    }

    /**
     * Arguments for listFileMembersBatch().
     */
    export interface ListFileMembersBatchArg {
      /**
       * Files for which to return members.
       */
      files: Array<PathOrId>;
      /**
       * Defaults to 10.
       */
      limit?: number;
    }

    /**
     * Per-file result for listFileMembersBatch().
     */
    export interface ListFileMembersBatchResult {
      /**
       * This is the input file identifier, whether an ID or a path.
       */
      file: PathOrId;
      /**
       * The result for this particular file.
       */
      result: ListFileMembersIndividualResult;
    }

    /**
     * Arguments for listFileMembersContinue().
     */
    export interface ListFileMembersContinueArg {
      /**
       * The cursor returned by your last call to listFileMembers(),
       * listFileMembersContinue(), or listFileMembersBatch().
       */
      cursor: string;
    }

    export interface ListFileMembersContinueErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface ListFileMembersContinueErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    /**
     * ListFileMembersContinueArg.cursor is invalid.
     */
    export interface ListFileMembersContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface ListFileMembersContinueErrorOther {
      '.tag': 'other';
    }

    /**
     * Error for listFileMembersContinue().
     */
    export type ListFileMembersContinueError = ListFileMembersContinueErrorUserError | ListFileMembersContinueErrorAccessError | ListFileMembersContinueErrorInvalidCursor | ListFileMembersContinueErrorOther;

    export interface ListFileMembersCountResult {
      /**
       * A list of members on this file.
       */
      members: SharedFileMembers;
      /**
       * The number of members on this file. This does not include inherited
       * members.
       */
      member_count: number;
    }

    export interface ListFileMembersErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface ListFileMembersErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    export interface ListFileMembersErrorOther {
      '.tag': 'other';
    }

    /**
     * Error for listFileMembers().
     */
    export type ListFileMembersError = ListFileMembersErrorUserError | ListFileMembersErrorAccessError | ListFileMembersErrorOther;

    /**
     * The results of the query for this file if it was successful.
     */
    export interface ListFileMembersIndividualResultResult {
      '.tag': 'result';
      result: ListFileMembersCountResult;
    }

    /**
     * The result of the query for this file if it was an error.
     */
    export interface ListFileMembersIndividualResultAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    export interface ListFileMembersIndividualResultOther {
      '.tag': 'other';
    }

    export type ListFileMembersIndividualResult = ListFileMembersIndividualResultResult | ListFileMembersIndividualResultAccessError | ListFileMembersIndividualResultOther;

    /**
     * Arguments for listReceivedFiles().
     */
    export interface ListFilesArg {
      /**
       * Defaults to 100.
       */
      limit?: number;
      /**
       * A list of `FileAction`s corresponding to `FilePermission`s that should
       * appear in the  response's SharedFileMetadata.permissions field
       * describing the actions the  authenticated user can perform on the file.
       */
      actions?: Array<FileAction>;
    }

    /**
     * Arguments for listReceivedFilesContinue().
     */
    export interface ListFilesContinueArg {
      /**
       * Cursor in ListFilesResult.cursor.
       */
      cursor: string;
    }

    /**
     * User account had a problem.
     */
    export interface ListFilesContinueErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    /**
     * ListFilesContinueArg.cursor is invalid.
     */
    export interface ListFilesContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface ListFilesContinueErrorOther {
      '.tag': 'other';
    }

    /**
     * Error results for listReceivedFilesContinue().
     */
    export type ListFilesContinueError = ListFilesContinueErrorUserError | ListFilesContinueErrorInvalidCursor | ListFilesContinueErrorOther;

    /**
     * Success results for listReceivedFiles().
     */
    export interface ListFilesResult {
      /**
       * Information about the files shared with current user.
       */
      entries: Array<SharedFileMetadata>;
      /**
       * Cursor used to obtain additional shared files.
       */
      cursor?: string;
    }

    export interface ListFolderMembersArgs extends ListFolderMembersCursorArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
    }

    export interface ListFolderMembersContinueArg {
      /**
       * The cursor returned by your last call to listFolderMembers() or
       * listFolderMembersContinue().
       */
      cursor: string;
    }

    export interface ListFolderMembersContinueErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * ListFolderMembersContinueArg.cursor is invalid.
     */
    export interface ListFolderMembersContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface ListFolderMembersContinueErrorOther {
      '.tag': 'other';
    }

    export type ListFolderMembersContinueError = ListFolderMembersContinueErrorAccessError | ListFolderMembersContinueErrorInvalidCursor | ListFolderMembersContinueErrorOther;

    export interface ListFolderMembersCursorArg {
      /**
       * This is a list indicating whether each returned member will include a
       * boolean value MemberPermission.allow that describes whether the current
       * user can perform the MemberAction on the member.
       */
      actions?: Array<MemberAction>;
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface ListFoldersArgs {
      /**
       * Defaults to 1000.
       */
      limit?: number;
      /**
       * A list of `FolderAction`s corresponding to `FolderPermission`s that
       * should appear in the  response's SharedFolderMetadata.permissions field
       * describing the actions the  authenticated user can perform on the
       * folder.
       */
      actions?: Array<FolderAction>;
    }

    export interface ListFoldersContinueArg {
      /**
       * The cursor returned by the previous API call specified in the endpoint
       * description.
       */
      cursor: string;
    }

    /**
     * ListFoldersContinueArg.cursor is invalid.
     */
    export interface ListFoldersContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface ListFoldersContinueErrorOther {
      '.tag': 'other';
    }

    export type ListFoldersContinueError = ListFoldersContinueErrorInvalidCursor | ListFoldersContinueErrorOther;

    /**
     * Result for listFolders() or listMountableFolders(), depending on which
     * endpoint was requested. Unmounted shared folders can be identified by the
     * absence of SharedFolderMetadata.path_lower.
     */
    export interface ListFoldersResult {
      /**
       * List of all shared folders the authenticated user has access to.
       */
      entries: Array<SharedFolderMetadata>;
      /**
       * Present if there are additional shared folders that have not been
       * returned yet. Pass the cursor into the corresponding continue endpoint
       * (either listFoldersContinue() or listMountableFoldersContinue()) to
       * list additional folders.
       */
      cursor?: string;
    }

    export interface ListSharedLinksArg {
      /**
       * See listSharedLinks() description.
       */
      path?: ReadPath;
      /**
       * The cursor returned by your last call to listSharedLinks().
       */
      cursor?: string;
      /**
       * See listSharedLinks() description.
       */
      direct_only?: boolean;
    }

    export interface ListSharedLinksErrorPath {
      '.tag': 'path';
      path: files.LookupError;
    }

    /**
     * Indicates that the cursor has been invalidated. Call listSharedLinks() to
     * obtain a new cursor.
     */
    export interface ListSharedLinksErrorReset {
      '.tag': 'reset';
    }

    export interface ListSharedLinksErrorOther {
      '.tag': 'other';
    }

    export type ListSharedLinksError = ListSharedLinksErrorPath | ListSharedLinksErrorReset | ListSharedLinksErrorOther;

    export interface ListSharedLinksResult {
      /**
       * Shared links applicable to the path argument.
       */
      links: Array<FileLinkMetadataReference|FolderLinkMetadataReference|SharedLinkMetadataReference>;
      /**
       * Is true if there are additional shared links that have not been
       * returned yet. Pass the cursor into listSharedLinks() to retrieve them.
       */
      has_more: boolean;
      /**
       * Pass the cursor into listSharedLinks() to obtain the additional links.
       * Cursor is returned only if no path is given.
       */
      cursor?: string;
    }

    /**
     * Contains information about a member's access level to content after an
     * operation.
     */
    export interface MemberAccessLevelResult {
      /**
       * The member still has this level of access to the content through a
       * parent folder.
       */
      access_level?: AccessLevel;
      /**
       * A localized string with additional information about why the user has
       * this access level to the content.
       */
      warning?: string;
      /**
       * The parent folders that a member has access to. The field is present if
       * the user has access to the first parent folder where the member gains
       * access.
       */
      access_details?: Array<ParentFolderAccessInfo>;
    }

    /**
     * Allow the member to keep a copy of the folder when removing.
     */
    export interface MemberActionLeaveACopy {
      '.tag': 'leave_a_copy';
    }

    /**
     * Make the member an editor of the folder.
     */
    export interface MemberActionMakeEditor {
      '.tag': 'make_editor';
    }

    /**
     * Make the member an owner of the folder.
     */
    export interface MemberActionMakeOwner {
      '.tag': 'make_owner';
    }

    /**
     * Make the member a viewer of the folder.
     */
    export interface MemberActionMakeViewer {
      '.tag': 'make_viewer';
    }

    /**
     * Make the member a viewer of the folder without commenting permissions.
     */
    export interface MemberActionMakeViewerNoComment {
      '.tag': 'make_viewer_no_comment';
    }

    /**
     * Remove the member from the folder.
     */
    export interface MemberActionRemove {
      '.tag': 'remove';
    }

    export interface MemberActionOther {
      '.tag': 'other';
    }

    /**
     * Actions that may be taken on members of a shared folder.
     */
    export type MemberAction = MemberActionLeaveACopy | MemberActionMakeEditor | MemberActionMakeOwner | MemberActionMakeViewer | MemberActionMakeViewerNoComment | MemberActionRemove | MemberActionOther;

    /**
     * Whether the user is allowed to take the action on the associated member.
     */
    export interface MemberPermission {
      /**
       * The action that the user may wish to take on the member.
       */
      action: MemberAction;
      /**
       * True if the user is allowed to take the action.
       */
      allow: boolean;
      /**
       * The reason why the user is denied the permission. Not present if the
       * action is allowed.
       */
      reason?: PermissionDeniedReason;
    }

    /**
     * Only a teammate can become a member.
     */
    export interface MemberPolicyTeam {
      '.tag': 'team';
    }

    /**
     * Anyone can become a member.
     */
    export interface MemberPolicyAnyone {
      '.tag': 'anyone';
    }

    export interface MemberPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy governing who can be a member of a shared folder. Only applicable
     * to folders owned by a user on a team.
     */
    export type MemberPolicy = MemberPolicyTeam | MemberPolicyAnyone | MemberPolicyOther;

    /**
     * Dropbox account, team member, or group ID of member.
     */
    export interface MemberSelectorDropboxId {
      '.tag': 'dropbox_id';
      dropbox_id: DropboxId;
    }

    /**
     * E-mail address of member.
     */
    export interface MemberSelectorEmail {
      '.tag': 'email';
      email: common.EmailAddress;
    }

    export interface MemberSelectorOther {
      '.tag': 'other';
    }

    /**
     * Includes different ways to identify a member of a shared folder.
     */
    export type MemberSelector = MemberSelectorDropboxId | MemberSelectorEmail | MemberSelectorOther;

    /**
     * The information about a member of the shared content.
     */
    export interface MembershipInfo {
      /**
       * The access type for this member.
       */
      access_type: AccessLevel;
      /**
       * The permissions that requesting user has on this member. The set of
       * permissions corresponds to the MemberActions in the request.
       */
      permissions?: Array<MemberPermission>;
      /**
       * Suggested name initials for a member.
       */
      initials?: string;
      /**
       * Defaults to False.
       */
      is_inherited?: boolean;
    }

    export interface ModifySharedLinkSettingsArgs {
      /**
       * URL of the shared link to change its settings.
       */
      url: string;
      /**
       * Set of settings for the shared link.
       */
      settings: SharedLinkSettings;
      /**
       * Defaults to False.
       */
      remove_expiration?: boolean;
    }

    /**
     * There is an error with the given settings.
     */
    export interface ModifySharedLinkSettingsErrorSettingsError {
      '.tag': 'settings_error';
      settings_error: SharedLinkSettingsError;
    }

    /**
     * The caller's email should be verified.
     */
    export interface ModifySharedLinkSettingsErrorEmailNotVerified {
      '.tag': 'email_not_verified';
    }

    export type ModifySharedLinkSettingsError = SharedLinkError | ModifySharedLinkSettingsErrorSettingsError | ModifySharedLinkSettingsErrorEmailNotVerified;

    export interface MountFolderArg {
      /**
       * The ID of the shared folder to mount.
       */
      shared_folder_id: common.SharedFolderId;
    }

    export interface MountFolderErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * Mounting would cause a shared folder to be inside another, which is
     * disallowed.
     */
    export interface MountFolderErrorInsideSharedFolder {
      '.tag': 'inside_shared_folder';
    }

    /**
     * The current user does not have enough space to mount the shared folder.
     */
    export interface MountFolderErrorInsufficientQuota {
      '.tag': 'insufficient_quota';
      insufficient_quota: InsufficientQuotaAmounts;
    }

    /**
     * The shared folder is already mounted.
     */
    export interface MountFolderErrorAlreadyMounted {
      '.tag': 'already_mounted';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface MountFolderErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * The shared folder is not mountable. One example where this can occur is
     * when the shared folder belongs within a team folder in the user's
     * Dropbox.
     */
    export interface MountFolderErrorNotMountable {
      '.tag': 'not_mountable';
    }

    export interface MountFolderErrorOther {
      '.tag': 'other';
    }

    export type MountFolderError = MountFolderErrorAccessError | MountFolderErrorInsideSharedFolder | MountFolderErrorInsufficientQuota | MountFolderErrorAlreadyMounted | MountFolderErrorNoPermission | MountFolderErrorNotMountable | MountFolderErrorOther;

    /**
     * Contains information about a parent folder that a member has access to.
     */
    export interface ParentFolderAccessInfo {
      /**
       * Display name for the folder.
       */
      folder_name: string;
      /**
       * The identifier of the parent shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * The user's permissions for the parent shared folder.
       */
      permissions: Array<MemberPermission>;
      /**
       * The full path to the parent shared folder relative to the acting user's
       * root.
       */
      path: string;
    }

    /**
     * Metadata for a path-based shared link.
     */
    export interface PathLinkMetadata extends LinkMetadata {
      /**
       * Path in user's Dropbox.
       */
      path: string;
    }

    /**
     * Reference to the PathLinkMetadata type, identified by the value of the
     * .tag property.
     */
    export interface PathLinkMetadataReference extends PathLinkMetadata {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'path';
    }

    /**
     * Assume pending uploads are files.
     */
    export interface PendingUploadModeFile {
      '.tag': 'file';
    }

    /**
     * Assume pending uploads are folders.
     */
    export interface PendingUploadModeFolder {
      '.tag': 'folder';
    }

    /**
     * Flag to indicate pending upload default (for linking to not-yet-existing
     * paths).
     */
    export type PendingUploadMode = PendingUploadModeFile | PendingUploadModeFolder;

    /**
     * User is not on the same team as the folder owner.
     */
    export interface PermissionDeniedReasonUserNotSameTeamAsOwner {
      '.tag': 'user_not_same_team_as_owner';
    }

    /**
     * User is prohibited by the owner from taking the action.
     */
    export interface PermissionDeniedReasonUserNotAllowedByOwner {
      '.tag': 'user_not_allowed_by_owner';
    }

    /**
     * Target is indirectly a member of the folder, for example by being part of
     * a group.
     */
    export interface PermissionDeniedReasonTargetIsIndirectMember {
      '.tag': 'target_is_indirect_member';
    }

    /**
     * Target is the owner of the folder.
     */
    export interface PermissionDeniedReasonTargetIsOwner {
      '.tag': 'target_is_owner';
    }

    /**
     * Target is the user itself.
     */
    export interface PermissionDeniedReasonTargetIsSelf {
      '.tag': 'target_is_self';
    }

    /**
     * Target is not an active member of the team.
     */
    export interface PermissionDeniedReasonTargetNotActive {
      '.tag': 'target_not_active';
    }

    /**
     * Folder is team folder for a limited team.
     */
    export interface PermissionDeniedReasonFolderIsLimitedTeamFolder {
      '.tag': 'folder_is_limited_team_folder';
    }

    /**
     * The content owner needs to be on a Dropbox team to perform this action.
     */
    export interface PermissionDeniedReasonOwnerNotOnTeam {
      '.tag': 'owner_not_on_team';
    }

    /**
     * The user does not have permission to perform this action on the link.
     */
    export interface PermissionDeniedReasonPermissionDenied {
      '.tag': 'permission_denied';
    }

    /**
     * The user's team policy prevents performing this action on the link.
     */
    export interface PermissionDeniedReasonRestrictedByTeam {
      '.tag': 'restricted_by_team';
    }

    /**
     * The user's account type does not support this action.
     */
    export interface PermissionDeniedReasonUserAccountType {
      '.tag': 'user_account_type';
    }

    /**
     * The user needs to be on a Dropbox team to perform this action.
     */
    export interface PermissionDeniedReasonUserNotOnTeam {
      '.tag': 'user_not_on_team';
    }

    /**
     * Folder is inside of another shared folder.
     */
    export interface PermissionDeniedReasonFolderIsInsideSharedFolder {
      '.tag': 'folder_is_inside_shared_folder';
    }

    /**
     * Policy cannot be changed due to restrictions from parent folder.
     */
    export interface PermissionDeniedReasonRestrictedByParentFolder {
      '.tag': 'restricted_by_parent_folder';
    }

    export interface PermissionDeniedReasonInsufficientPlan {
      '.tag': 'insufficient_plan';
      insufficient_plan: InsufficientPlan;
    }

    export interface PermissionDeniedReasonOther {
      '.tag': 'other';
    }

    /**
     * Possible reasons the user is denied a permission.
     */
    export type PermissionDeniedReason = PermissionDeniedReasonUserNotSameTeamAsOwner | PermissionDeniedReasonUserNotAllowedByOwner | PermissionDeniedReasonTargetIsIndirectMember | PermissionDeniedReasonTargetIsOwner | PermissionDeniedReasonTargetIsSelf | PermissionDeniedReasonTargetNotActive | PermissionDeniedReasonFolderIsLimitedTeamFolder | PermissionDeniedReasonOwnerNotOnTeam | PermissionDeniedReasonPermissionDenied | PermissionDeniedReasonRestrictedByTeam | PermissionDeniedReasonUserAccountType | PermissionDeniedReasonUserNotOnTeam | PermissionDeniedReasonFolderIsInsideSharedFolder | PermissionDeniedReasonRestrictedByParentFolder | PermissionDeniedReasonInsufficientPlan | PermissionDeniedReasonOther;

    export interface RelinquishFileMembershipArg {
      /**
       * The path or id for the file.
       */
      file: PathOrId;
    }

    export interface RelinquishFileMembershipErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    /**
     * The current user has access to the shared file via a group.  You can't
     * relinquish membership to a file shared via groups.
     */
    export interface RelinquishFileMembershipErrorGroupAccess {
      '.tag': 'group_access';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface RelinquishFileMembershipErrorNoPermission {
      '.tag': 'no_permission';
    }

    export interface RelinquishFileMembershipErrorOther {
      '.tag': 'other';
    }

    export type RelinquishFileMembershipError = RelinquishFileMembershipErrorAccessError | RelinquishFileMembershipErrorGroupAccess | RelinquishFileMembershipErrorNoPermission | RelinquishFileMembershipErrorOther;

    export interface RelinquishFolderMembershipArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * Defaults to False.
       */
      leave_a_copy?: boolean;
    }

    export interface RelinquishFolderMembershipErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * The current user is the owner of the shared folder. Owners cannot
     * relinquish membership to their own folders. Try unsharing or transferring
     * ownership first.
     */
    export interface RelinquishFolderMembershipErrorFolderOwner {
      '.tag': 'folder_owner';
    }

    /**
     * The shared folder is currently mounted.  Unmount the shared folder before
     * relinquishing membership.
     */
    export interface RelinquishFolderMembershipErrorMounted {
      '.tag': 'mounted';
    }

    /**
     * The current user has access to the shared folder via a group.  You can't
     * relinquish membership to folders shared via groups.
     */
    export interface RelinquishFolderMembershipErrorGroupAccess {
      '.tag': 'group_access';
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface RelinquishFolderMembershipErrorTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface RelinquishFolderMembershipErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * The current user only has inherited access to the shared folder.  You
     * can't relinquish inherited membership to folders.
     */
    export interface RelinquishFolderMembershipErrorNoExplicitAccess {
      '.tag': 'no_explicit_access';
    }

    export interface RelinquishFolderMembershipErrorOther {
      '.tag': 'other';
    }

    export type RelinquishFolderMembershipError = RelinquishFolderMembershipErrorAccessError | RelinquishFolderMembershipErrorFolderOwner | RelinquishFolderMembershipErrorMounted | RelinquishFolderMembershipErrorGroupAccess | RelinquishFolderMembershipErrorTeamFolder | RelinquishFolderMembershipErrorNoPermission | RelinquishFolderMembershipErrorNoExplicitAccess | RelinquishFolderMembershipErrorOther;

    /**
     * Arguments for removeFileMember2().
     */
    export interface RemoveFileMemberArg {
      /**
       * File from which to remove members.
       */
      file: PathOrId;
      /**
       * Member to remove from this file. Note that even if an email is
       * specified, it may result in the removal of a user (not an invitee) if
       * the user's main account corresponds to that email address.
       */
      member: MemberSelector;
    }

    export interface RemoveFileMemberErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface RemoveFileMemberErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    /**
     * This member does not have explicit access to the file and therefore
     * cannot be removed. The return value is the access that a user might have
     * to the file from a parent folder.
     */
    export interface RemoveFileMemberErrorNoExplicitAccess {
      '.tag': 'no_explicit_access';
      no_explicit_access: MemberAccessLevelResult;
    }

    export interface RemoveFileMemberErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors for removeFileMember2().
     */
    export type RemoveFileMemberError = RemoveFileMemberErrorUserError | RemoveFileMemberErrorAccessError | RemoveFileMemberErrorNoExplicitAccess | RemoveFileMemberErrorOther;

    export interface RemoveFolderMemberArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * The member to remove from the folder.
       */
      member: MemberSelector;
      /**
       * If true, the removed user will keep their copy of the folder after it's
       * unshared, assuming it was mounted. Otherwise, it will be removed from
       * their Dropbox. Also, this must be set to false when kicking a group.
       */
      leave_a_copy: boolean;
    }

    export interface RemoveFolderMemberErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    export interface RemoveFolderMemberErrorMemberError {
      '.tag': 'member_error';
      member_error: SharedFolderMemberError;
    }

    /**
     * The target user is the owner of the shared folder. You can't remove this
     * user until ownership has been transferred to another member.
     */
    export interface RemoveFolderMemberErrorFolderOwner {
      '.tag': 'folder_owner';
    }

    /**
     * The target user has access to the shared folder via a group.
     */
    export interface RemoveFolderMemberErrorGroupAccess {
      '.tag': 'group_access';
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface RemoveFolderMemberErrorTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface RemoveFolderMemberErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * This shared folder has too many files for leaving a copy. You can still
     * remove this user without leaving a copy.
     */
    export interface RemoveFolderMemberErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    export interface RemoveFolderMemberErrorOther {
      '.tag': 'other';
    }

    export type RemoveFolderMemberError = RemoveFolderMemberErrorAccessError | RemoveFolderMemberErrorMemberError | RemoveFolderMemberErrorFolderOwner | RemoveFolderMemberErrorGroupAccess | RemoveFolderMemberErrorTeamFolder | RemoveFolderMemberErrorNoPermission | RemoveFolderMemberErrorTooManyFiles | RemoveFolderMemberErrorOther;

    /**
     * Removing the folder member has finished. The value is information about
     * whether the member has another form of access.
     */
    export interface RemoveMemberJobStatusComplete {
      '.tag': 'complete';
      complete: MemberAccessLevelResult;
    }

    export interface RemoveMemberJobStatusFailed {
      '.tag': 'failed';
      failed: RemoveFolderMemberError;
    }

    export type RemoveMemberJobStatus = async.PollResultBase | RemoveMemberJobStatusComplete | RemoveMemberJobStatusFailed;

    /**
     * Anyone who has received the link can access it. No login required.
     */
    export interface RequestedVisibilityPublic {
      '.tag': 'public';
    }

    /**
     * Only members of the same team can access the link. Login is required.
     */
    export interface RequestedVisibilityTeamOnly {
      '.tag': 'team_only';
    }

    /**
     * A link-specific password is required to access the link. Login is not
     * required.
     */
    export interface RequestedVisibilityPassword {
      '.tag': 'password';
    }

    /**
     * The access permission that can be requested by the caller for the shared
     * link. Note that the final resolved visibility of the shared link takes
     * into account other aspects, such as team and shared folder settings.
     * Check the sharing.ResolvedVisibility for more info on the possible
     * resolved visibility values of shared links.
     */
    export type RequestedVisibility = RequestedVisibilityPublic | RequestedVisibilityTeamOnly | RequestedVisibilityPassword;

    /**
     * Only members of the same team who have the link-specific password can
     * access the link. Login is required.
     */
    export interface ResolvedVisibilityTeamAndPassword {
      '.tag': 'team_and_password';
    }

    /**
     * Only members of the shared folder containing the linked file can access
     * the link. Login is required.
     */
    export interface ResolvedVisibilitySharedFolderOnly {
      '.tag': 'shared_folder_only';
    }

    export interface ResolvedVisibilityOther {
      '.tag': 'other';
    }

    /**
     * The actual access permissions values of shared links after taking into
     * account user preferences and the team and shared folder settings. Check
     * the sharing.RequestedVisibility for more info on the possible visibility
     * values that can be set by the shared link's owner.
     */
    export type ResolvedVisibility = RequestedVisibility | ResolvedVisibilityTeamAndPassword | ResolvedVisibilitySharedFolderOnly | ResolvedVisibilityOther;

    export interface RevokeSharedLinkArg {
      /**
       * URL of the shared link.
       */
      url: string;
    }

    /**
     * Shared link is malformed.
     */
    export interface RevokeSharedLinkErrorSharedLinkMalformed {
      '.tag': 'shared_link_malformed';
    }

    export type RevokeSharedLinkError = SharedLinkError | RevokeSharedLinkErrorSharedLinkMalformed;

    export interface ShareFolderArg extends ShareFolderArgBase {
      /**
       * A list of `FolderAction`s corresponding to `FolderPermission`s that
       * should appear in the  response's SharedFolderMetadata.permissions field
       * describing the actions the  authenticated user can perform on the
       * folder.
       */
      actions?: Array<FolderAction>;
      /**
       * Settings on the link for this folder.
       */
      link_settings?: LinkSettings;
    }

    export interface ShareFolderArgBase {
      /**
       * Who can add and remove members of this shared folder.
       */
      acl_update_policy?: AclUpdatePolicy;
      /**
       * Defaults to False.
       */
      force_async?: boolean;
      /**
       * Who can be a member of this shared folder. Only applicable if the
       * current user is on a team.
       */
      member_policy?: MemberPolicy;
      /**
       * The path to the folder to share. If it does not exist, then a new one
       * is created.
       */
      path: files.WritePath;
      /**
       * The policy to apply to shared links created for content inside this
       * shared folder.  The current user must be on a team to set this policy
       * to SharedLinkPolicy.members.
       */
      shared_link_policy?: SharedLinkPolicy;
      /**
       * Who can enable/disable viewer info for this shared folder.
       */
      viewer_info_policy?: ViewerInfoPolicy;
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface ShareFolderErrorNoPermission {
      '.tag': 'no_permission';
    }

    export type ShareFolderError = ShareFolderErrorBase | ShareFolderErrorNoPermission;

    /**
     * The current user's e-mail address is unverified.
     */
    export interface ShareFolderErrorBaseEmailUnverified {
      '.tag': 'email_unverified';
    }

    /**
     * ShareFolderArg.path is invalid.
     */
    export interface ShareFolderErrorBaseBadPath {
      '.tag': 'bad_path';
      bad_path: SharePathError;
    }

    /**
     * Team policy is more restrictive than ShareFolderArg.member_policy.
     */
    export interface ShareFolderErrorBaseTeamPolicyDisallowsMemberPolicy {
      '.tag': 'team_policy_disallows_member_policy';
    }

    /**
     * The current user's account is not allowed to select the specified
     * ShareFolderArg.shared_link_policy.
     */
    export interface ShareFolderErrorBaseDisallowedSharedLinkPolicy {
      '.tag': 'disallowed_shared_link_policy';
    }

    export interface ShareFolderErrorBaseOther {
      '.tag': 'other';
    }

    export type ShareFolderErrorBase = ShareFolderErrorBaseEmailUnverified | ShareFolderErrorBaseBadPath | ShareFolderErrorBaseTeamPolicyDisallowsMemberPolicy | ShareFolderErrorBaseDisallowedSharedLinkPolicy | ShareFolderErrorBaseOther;

    /**
     * The share job has finished. The value is the metadata for the folder.
     */
    export interface ShareFolderJobStatusComplete {
      '.tag': 'complete';
      complete: SharedFolderMetadata;
    }

    export interface ShareFolderJobStatusFailed {
      '.tag': 'failed';
      failed: ShareFolderError;
    }

    export type ShareFolderJobStatus = async.PollResultBase | ShareFolderJobStatusComplete | ShareFolderJobStatusFailed;

    export interface ShareFolderLaunchComplete {
      '.tag': 'complete';
      complete: SharedFolderMetadata;
    }

    export type ShareFolderLaunch = async.LaunchResultBase | ShareFolderLaunchComplete;

    /**
     * A file is at the specified path.
     */
    export interface SharePathErrorIsFile {
      '.tag': 'is_file';
    }

    /**
     * We do not support sharing a folder inside a shared folder.
     */
    export interface SharePathErrorInsideSharedFolder {
      '.tag': 'inside_shared_folder';
    }

    /**
     * We do not support shared folders that contain shared folders.
     */
    export interface SharePathErrorContainsSharedFolder {
      '.tag': 'contains_shared_folder';
    }

    /**
     * We do not support shared folders that contain app folders.
     */
    export interface SharePathErrorContainsAppFolder {
      '.tag': 'contains_app_folder';
    }

    /**
     * We do not support shared folders that contain team folders.
     */
    export interface SharePathErrorContainsTeamFolder {
      '.tag': 'contains_team_folder';
    }

    /**
     * We do not support sharing an app folder.
     */
    export interface SharePathErrorIsAppFolder {
      '.tag': 'is_app_folder';
    }

    /**
     * We do not support sharing a folder inside an app folder.
     */
    export interface SharePathErrorInsideAppFolder {
      '.tag': 'inside_app_folder';
    }

    /**
     * A public folder can't be shared this way. Use a public link instead.
     */
    export interface SharePathErrorIsPublicFolder {
      '.tag': 'is_public_folder';
    }

    /**
     * A folder inside a public folder can't be shared this way. Use a public
     * link instead.
     */
    export interface SharePathErrorInsidePublicFolder {
      '.tag': 'inside_public_folder';
    }

    /**
     * Folder is already shared. Contains metadata about the existing shared
     * folder.
     */
    export interface SharePathErrorAlreadyShared {
      '.tag': 'already_shared';
      already_shared: SharedFolderMetadata;
    }

    /**
     * Path is not valid.
     */
    export interface SharePathErrorInvalidPath {
      '.tag': 'invalid_path';
    }

    /**
     * We do not support sharing a Mac OS X package.
     */
    export interface SharePathErrorIsOsxPackage {
      '.tag': 'is_osx_package';
    }

    /**
     * We do not support sharing a folder inside a Mac OS X package.
     */
    export interface SharePathErrorInsideOsxPackage {
      '.tag': 'inside_osx_package';
    }

    export interface SharePathErrorOther {
      '.tag': 'other';
    }

    export type SharePathError = SharePathErrorIsFile | SharePathErrorInsideSharedFolder | SharePathErrorContainsSharedFolder | SharePathErrorContainsAppFolder | SharePathErrorContainsTeamFolder | SharePathErrorIsAppFolder | SharePathErrorInsideAppFolder | SharePathErrorIsPublicFolder | SharePathErrorInsidePublicFolder | SharePathErrorAlreadyShared | SharePathErrorInvalidPath | SharePathErrorIsOsxPackage | SharePathErrorInsideOsxPackage | SharePathErrorOther;

    /**
     * Metadata of a shared link for a file or folder.
     */
    export interface SharedContentLinkMetadata extends SharedContentLinkMetadataBase {
      /**
       * The content inside this folder with link audience different than this
       * folder's. This is only returned when an endpoint that returns metadata
       * for a single shared folder is called, e.g. /get_folder_metadata.
       */
      audience_exceptions?: AudienceExceptions;
      /**
       * The URL of the link.
       */
      url: string;
    }

    export interface SharedContentLinkMetadataBase {
      /**
       * The access level on the link for this file.
       */
      access_level?: AccessLevel;
      /**
       * The audience options that are available for the content. Some audience
       * options may be unavailable. For example, team_only may be unavailable
       * if the content is not owned by a user on a team. The 'default' audience
       * option is always available if the user can modify link settings.
       */
      audience_options: Array<LinkAudience>;
      /**
       * The shared folder that prevents the link audience for this link from
       * being more restrictive.
       */
      audience_restricting_shared_folder?: AudienceRestrictingSharedFolder;
      /**
       * The current audience of the link.
       */
      current_audience: LinkAudience;
      /**
       * Whether the link has an expiry set on it. A link with an expiry will
       * have its  audience changed to members when the expiry is reached.
       */
      expiry?: common.DropboxTimestamp;
      /**
       * A list of permissions for actions you can perform on the link.
       */
      link_permissions: Array<LinkPermission>;
      /**
       * Whether the link is protected by a password.
       */
      password_protected: boolean;
    }

    /**
     * Shared file user, group, and invitee membership. Used for the results of
     * listFileMembers() and listFileMembersContinue(), and used as part of the
     * results for listFileMembersBatch().
     */
    export interface SharedFileMembers {
      /**
       * The list of user members of the shared file.
       */
      users: Array<UserFileMembershipInfo>;
      /**
       * The list of group members of the shared file.
       */
      groups: Array<GroupMembershipInfo>;
      /**
       * The list of invited members of a file, but have not logged in and
       * claimed this.
       */
      invitees: Array<InviteeMembershipInfo>;
      /**
       * Present if there are additional shared file members that have not been
       * returned yet. Pass the cursor into listFileMembersContinue() to list
       * additional members.
       */
      cursor?: string;
    }

    /**
     * Properties of the shared file.
     */
    export interface SharedFileMetadata {
      /**
       * The current user's access level for this shared file.
       */
      access_type?: AccessLevel;
      /**
       * The ID of the file.
       */
      id: FileId;
      /**
       * The expected metadata of the link associated for the file when it is
       * first shared. Absent if the link already exists. This is for an
       * unreleased feature so it may not be returned yet.
       */
      expected_link_metadata?: ExpectedSharedContentLinkMetadata;
      /**
       * The metadata of the link associated for the file. This is for an
       * unreleased feature so it may not be returned yet.
       */
      link_metadata?: SharedContentLinkMetadata;
      /**
       * The name of this file.
       */
      name: string;
      /**
       * The display names of the users that own the file. If the file is part
       * of a team folder, the display names of the team admins are also
       * included. Absent if the owner display names cannot be fetched.
       */
      owner_display_names?: Array<string>;
      /**
       * The team that owns the file. This field is not present if the file is
       * not owned by a team.
       */
      owner_team?: users.Team;
      /**
       * The ID of the parent shared folder. This field is present only if the
       * file is contained within a shared folder.
       */
      parent_shared_folder_id?: common.SharedFolderId;
      /**
       * The cased path to be used for display purposes only. In rare instances
       * the casing will not correctly match the user's filesystem, but this
       * behavior will match the path provided in the Core API v1. Absent for
       * unmounted files.
       */
      path_display?: string;
      /**
       * The lower-case full path of this file. Absent for unmounted files.
       */
      path_lower?: string;
      /**
       * The sharing permissions that requesting user has on this file. This
       * corresponds to the entries given in GetFileMetadataBatchArg.actions or
       * GetFileMetadataArg.actions.
       */
      permissions?: Array<FilePermission>;
      /**
       * Policies governing this shared file.
       */
      policy: FolderPolicy;
      /**
       * URL for displaying a web preview of the shared file.
       */
      preview_url: string;
      /**
       * Timestamp indicating when the current user was invited to this shared
       * file. If the user was not invited to the shared file, the timestamp
       * will indicate when the user was invited to the parent shared folder.
       * This value may be absent.
       */
      time_invited?: common.DropboxTimestamp;
    }

    /**
     * This shared folder ID is invalid.
     */
    export interface SharedFolderAccessErrorInvalidId {
      '.tag': 'invalid_id';
    }

    /**
     * The user is not a member of the shared folder thus cannot access it.
     */
    export interface SharedFolderAccessErrorNotAMember {
      '.tag': 'not_a_member';
    }

    /**
     * The current user's e-mail address is unverified.
     */
    export interface SharedFolderAccessErrorEmailUnverified {
      '.tag': 'email_unverified';
    }

    /**
     * The shared folder is unmounted.
     */
    export interface SharedFolderAccessErrorUnmounted {
      '.tag': 'unmounted';
    }

    export interface SharedFolderAccessErrorOther {
      '.tag': 'other';
    }

    /**
     * There is an error accessing the shared folder.
     */
    export type SharedFolderAccessError = SharedFolderAccessErrorInvalidId | SharedFolderAccessErrorNotAMember | SharedFolderAccessErrorEmailUnverified | SharedFolderAccessErrorUnmounted | SharedFolderAccessErrorOther;

    /**
     * The target dropbox_id is invalid.
     */
    export interface SharedFolderMemberErrorInvalidDropboxId {
      '.tag': 'invalid_dropbox_id';
    }

    /**
     * The target dropbox_id is not a member of the shared folder.
     */
    export interface SharedFolderMemberErrorNotAMember {
      '.tag': 'not_a_member';
    }

    /**
     * The target member only has inherited access to the shared folder.
     */
    export interface SharedFolderMemberErrorNoExplicitAccess {
      '.tag': 'no_explicit_access';
      no_explicit_access: MemberAccessLevelResult;
    }

    export interface SharedFolderMemberErrorOther {
      '.tag': 'other';
    }

    export type SharedFolderMemberError = SharedFolderMemberErrorInvalidDropboxId | SharedFolderMemberErrorNotAMember | SharedFolderMemberErrorNoExplicitAccess | SharedFolderMemberErrorOther;

    /**
     * Shared folder user and group membership.
     */
    export interface SharedFolderMembers {
      /**
       * The list of user members of the shared folder.
       */
      users: Array<UserMembershipInfo>;
      /**
       * The list of group members of the shared folder.
       */
      groups: Array<GroupMembershipInfo>;
      /**
       * The list of invitees to the shared folder.
       */
      invitees: Array<InviteeMembershipInfo>;
      /**
       * Present if there are additional shared folder members that have not
       * been returned yet. Pass the cursor into listFolderMembersContinue() to
       * list additional members.
       */
      cursor?: string;
    }

    /**
     * The metadata which includes basic information about the shared folder.
     */
    export interface SharedFolderMetadata extends SharedFolderMetadataBase {
      /**
       * The metadata of the shared content link to this shared folder. Absent
       * if there is no link on the folder. This is for an unreleased feature so
       * it may not be returned yet.
       */
      link_metadata?: SharedContentLinkMetadata;
      /**
       * The name of the this shared folder.
       */
      name: string;
      /**
       * Actions the current user may perform on the folder and its contents.
       * The set of permissions corresponds to the FolderActions in the request.
       */
      permissions?: Array<FolderPermission>;
      /**
       * Policies governing this shared folder.
       */
      policy: FolderPolicy;
      /**
       * URL for displaying a web preview of the shared folder.
       */
      preview_url: string;
      /**
       * The ID of the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * Timestamp indicating when the current user was invited to this shared
       * folder.
       */
      time_invited: common.DropboxTimestamp;
    }

    /**
     * Properties of the shared folder.
     */
    export interface SharedFolderMetadataBase {
      /**
       * The current user's access level for this shared folder.
       */
      access_type: AccessLevel;
      /**
       * Whether this folder is inside of a team folder.
       */
      is_inside_team_folder: boolean;
      /**
       * Whether this folder is a [team folder]{@link
       * https://www.dropbox.com/en/help/986}.
       */
      is_team_folder: boolean;
      /**
       * The display names of the users that own the folder. If the folder is
       * part of a team folder, the display names of the team admins are also
       * included. Absent if the owner display names cannot be fetched.
       */
      owner_display_names?: Array<string>;
      /**
       * The team that owns the folder. This field is not present if the folder
       * is not owned by a team.
       */
      owner_team?: users.Team;
      /**
       * The ID of the parent shared folder. This field is present only if the
       * folder is contained within another shared folder.
       */
      parent_shared_folder_id?: common.SharedFolderId;
      /**
       * The lower-cased full path of this shared folder. Absent for unmounted
       * folders.
       */
      path_lower?: string;
    }

    /**
     * User is not logged in.
     */
    export interface SharedLinkAccessFailureReasonLoginRequired {
      '.tag': 'login_required';
    }

    /**
     * User's email is not verified.
     */
    export interface SharedLinkAccessFailureReasonEmailVerifyRequired {
      '.tag': 'email_verify_required';
    }

    /**
     * The link is password protected.
     */
    export interface SharedLinkAccessFailureReasonPasswordRequired {
      '.tag': 'password_required';
    }

    /**
     * Access is allowed for team members only.
     */
    export interface SharedLinkAccessFailureReasonTeamOnly {
      '.tag': 'team_only';
    }

    /**
     * Access is allowed for the shared link's owner only.
     */
    export interface SharedLinkAccessFailureReasonOwnerOnly {
      '.tag': 'owner_only';
    }

    export interface SharedLinkAccessFailureReasonOther {
      '.tag': 'other';
    }

    export type SharedLinkAccessFailureReason = SharedLinkAccessFailureReasonLoginRequired | SharedLinkAccessFailureReasonEmailVerifyRequired | SharedLinkAccessFailureReasonPasswordRequired | SharedLinkAccessFailureReasonTeamOnly | SharedLinkAccessFailureReasonOwnerOnly | SharedLinkAccessFailureReasonOther;

    /**
     * The shared link wasn't found.
     */
    export interface SharedLinkErrorSharedLinkNotFound {
      '.tag': 'shared_link_not_found';
    }

    /**
     * The caller is not allowed to access this shared link.
     */
    export interface SharedLinkErrorSharedLinkAccessDenied {
      '.tag': 'shared_link_access_denied';
    }

    /**
     * This type of link is not supported.
     */
    export interface SharedLinkErrorUnsupportedLinkType {
      '.tag': 'unsupported_link_type';
    }

    export interface SharedLinkErrorOther {
      '.tag': 'other';
    }

    export type SharedLinkError = SharedLinkErrorSharedLinkNotFound | SharedLinkErrorSharedLinkAccessDenied | SharedLinkErrorUnsupportedLinkType | SharedLinkErrorOther;

    /**
     * The metadata of a shared link.
     */
    export interface SharedLinkMetadata {
      /**
       * URL of the shared link.
       */
      url: string;
      /**
       * A unique identifier for the linked file.
       */
      id?: Id;
      /**
       * The linked file name (including extension). This never contains a
       * slash.
       */
      name: string;
      /**
       * Expiration time, if set. By default the link won't expire.
       */
      expires?: common.DropboxTimestamp;
      /**
       * The lowercased full path in the user's Dropbox. This always starts with
       * a slash. This field will only be present only if the linked file is in
       * the authenticated user's  dropbox.
       */
      path_lower?: string;
      /**
       * The link's access permissions.
       */
      link_permissions: LinkPermissions;
      /**
       * The team membership information of the link's owner.  This field will
       * only be present  if the link's owner is a team member.
       */
      team_member_info?: TeamMemberInfo;
      /**
       * The team information of the content's owner. This field will only be
       * present if the content's owner is a team member and the content's owner
       * team is different from the link's owner team.
       */
      content_owner_team_info?: TeamInfo;
    }

    /**
     * Reference to the SharedLinkMetadata polymorphic type. Contains a .tag
     * property to let you discriminate between possible subtypes.
     */
    export interface SharedLinkMetadataReference extends SharedLinkMetadata {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "file"|"folder";
    }

    /**
     * Links can be shared with anyone.
     */
    export interface SharedLinkPolicyAnyone {
      '.tag': 'anyone';
    }

    /**
     * Links can be shared with anyone on the same team as the owner.
     */
    export interface SharedLinkPolicyTeam {
      '.tag': 'team';
    }

    /**
     * Links can only be shared among members of the shared folder.
     */
    export interface SharedLinkPolicyMembers {
      '.tag': 'members';
    }

    export interface SharedLinkPolicyOther {
      '.tag': 'other';
    }

    /**
     * Who can view shared links in this folder.
     */
    export type SharedLinkPolicy = SharedLinkPolicyAnyone | SharedLinkPolicyTeam | SharedLinkPolicyMembers | SharedLinkPolicyOther;

    export interface SharedLinkSettings {
      /**
       * The requested access for this shared link.
       */
      requested_visibility?: RequestedVisibility;
      /**
       * If requested_visibility is RequestedVisibility.password this is needed
       * to specify the password to access the link.
       */
      link_password?: string;
      /**
       * Expiration time of the shared link. By default the link won't expire.
       */
      expires?: common.DropboxTimestamp;
    }

    /**
     * The given settings are invalid (for example, all attributes of the
     * sharing.SharedLinkSettings are empty, the requested visibility is
     * RequestedVisibility.password but the SharedLinkSettings.link_password is
     * missing, SharedLinkSettings.expires is set to the past, etc.).
     */
    export interface SharedLinkSettingsErrorInvalidSettings {
      '.tag': 'invalid_settings';
    }

    /**
     * User is not allowed to modify the settings of this link. Note that basic
     * users can only set RequestedVisibility.public as the
     * SharedLinkSettings.requested_visibility and cannot set
     * SharedLinkSettings.expires.
     */
    export interface SharedLinkSettingsErrorNotAuthorized {
      '.tag': 'not_authorized';
    }

    export type SharedLinkSettingsError = SharedLinkSettingsErrorInvalidSettings | SharedLinkSettingsErrorNotAuthorized;

    /**
     * Current user does not have sufficient privileges to perform the desired
     * action.
     */
    export interface SharingFileAccessErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * File specified was not found.
     */
    export interface SharingFileAccessErrorInvalidFile {
      '.tag': 'invalid_file';
    }

    /**
     * A folder can't be shared this way. Use folder sharing or a shared link
     * instead.
     */
    export interface SharingFileAccessErrorIsFolder {
      '.tag': 'is_folder';
    }

    /**
     * A file inside a public folder can't be shared this way. Use a public link
     * instead.
     */
    export interface SharingFileAccessErrorInsidePublicFolder {
      '.tag': 'inside_public_folder';
    }

    /**
     * A Mac OS X package can't be shared this way. Use a shared link instead.
     */
    export interface SharingFileAccessErrorInsideOsxPackage {
      '.tag': 'inside_osx_package';
    }

    export interface SharingFileAccessErrorOther {
      '.tag': 'other';
    }

    /**
     * User could not access this file.
     */
    export type SharingFileAccessError = SharingFileAccessErrorNoPermission | SharingFileAccessErrorInvalidFile | SharingFileAccessErrorIsFolder | SharingFileAccessErrorInsidePublicFolder | SharingFileAccessErrorInsideOsxPackage | SharingFileAccessErrorOther;

    /**
     * The current user must verify the account e-mail address before performing
     * this action.
     */
    export interface SharingUserErrorEmailUnverified {
      '.tag': 'email_unverified';
    }

    export interface SharingUserErrorOther {
      '.tag': 'other';
    }

    /**
     * User account had a problem preventing this action.
     */
    export type SharingUserError = SharingUserErrorEmailUnverified | SharingUserErrorOther;

    /**
     * Information about a team member.
     */
    export interface TeamMemberInfo {
      /**
       * Information about the member's team.
       */
      team_info: TeamInfo;
      /**
       * The display name of the user.
       */
      display_name: string;
      /**
       * ID of user as a member of a team. This field will only be present if
       * the member is in the same team as current user.
       */
      member_id?: string;
    }

    export interface TransferFolderArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * A account or team member ID to transfer ownership to.
       */
      to_dropbox_id: DropboxId;
    }

    export interface TransferFolderErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * TransferFolderArg.to_dropbox_id is invalid.
     */
    export interface TransferFolderErrorInvalidDropboxId {
      '.tag': 'invalid_dropbox_id';
    }

    /**
     * The new designated owner is not currently a member of the shared folder.
     */
    export interface TransferFolderErrorNewOwnerNotAMember {
      '.tag': 'new_owner_not_a_member';
    }

    /**
     * The new designated owner has not added the folder to their Dropbox.
     */
    export interface TransferFolderErrorNewOwnerUnmounted {
      '.tag': 'new_owner_unmounted';
    }

    /**
     * The new designated owner's e-mail address is unverified.
     */
    export interface TransferFolderErrorNewOwnerEmailUnverified {
      '.tag': 'new_owner_email_unverified';
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface TransferFolderErrorTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface TransferFolderErrorNoPermission {
      '.tag': 'no_permission';
    }

    export interface TransferFolderErrorOther {
      '.tag': 'other';
    }

    export type TransferFolderError = TransferFolderErrorAccessError | TransferFolderErrorInvalidDropboxId | TransferFolderErrorNewOwnerNotAMember | TransferFolderErrorNewOwnerUnmounted | TransferFolderErrorNewOwnerEmailUnverified | TransferFolderErrorTeamFolder | TransferFolderErrorNoPermission | TransferFolderErrorOther;

    export interface UnmountFolderArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
    }

    export interface UnmountFolderErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface UnmountFolderErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * The shared folder can't be unmounted. One example where this can occur is
     * when the shared folder's parent folder is also a shared folder that
     * resides in the current user's Dropbox.
     */
    export interface UnmountFolderErrorNotUnmountable {
      '.tag': 'not_unmountable';
    }

    export interface UnmountFolderErrorOther {
      '.tag': 'other';
    }

    export type UnmountFolderError = UnmountFolderErrorAccessError | UnmountFolderErrorNoPermission | UnmountFolderErrorNotUnmountable | UnmountFolderErrorOther;

    /**
     * Arguments for unshareFile().
     */
    export interface UnshareFileArg {
      /**
       * The file to unshare.
       */
      file: PathOrId;
    }

    export interface UnshareFileErrorUserError {
      '.tag': 'user_error';
      user_error: SharingUserError;
    }

    export interface UnshareFileErrorAccessError {
      '.tag': 'access_error';
      access_error: SharingFileAccessError;
    }

    export interface UnshareFileErrorOther {
      '.tag': 'other';
    }

    /**
     * Error result for unshareFile().
     */
    export type UnshareFileError = UnshareFileErrorUserError | UnshareFileErrorAccessError | UnshareFileErrorOther;

    export interface UnshareFolderArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * Defaults to False.
       */
      leave_a_copy?: boolean;
    }

    export interface UnshareFolderErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface UnshareFolderErrorTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface UnshareFolderErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * This shared folder has too many files to be unshared.
     */
    export interface UnshareFolderErrorTooManyFiles {
      '.tag': 'too_many_files';
    }

    export interface UnshareFolderErrorOther {
      '.tag': 'other';
    }

    export type UnshareFolderError = UnshareFolderErrorAccessError | UnshareFolderErrorTeamFolder | UnshareFolderErrorNoPermission | UnshareFolderErrorTooManyFiles | UnshareFolderErrorOther;

    /**
     * Arguments for updateFileMember().
     */
    export interface UpdateFileMemberArgs extends ChangeFileMemberAccessArgs {
    }

    export interface UpdateFolderMemberArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * The member of the shared folder to update.  Only the
       * MemberSelector.dropbox_id may be set at this time.
       */
      member: MemberSelector;
      /**
       * The new access level for member. AccessLevel.owner is disallowed.
       */
      access_level: AccessLevel;
    }

    export interface UpdateFolderMemberErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    export interface UpdateFolderMemberErrorMemberError {
      '.tag': 'member_error';
      member_error: SharedFolderMemberError;
    }

    /**
     * If updating the access type required the member to be added to the shared
     * folder and there was an error when adding the member.
     */
    export interface UpdateFolderMemberErrorNoExplicitAccess {
      '.tag': 'no_explicit_access';
      no_explicit_access: AddFolderMemberError;
    }

    /**
     * The current user's account doesn't support this action. An example of
     * this is when downgrading a member from editor to viewer. This action can
     * only be performed by users that have upgraded to a Pro or Business plan.
     */
    export interface UpdateFolderMemberErrorInsufficientPlan {
      '.tag': 'insufficient_plan';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface UpdateFolderMemberErrorNoPermission {
      '.tag': 'no_permission';
    }

    export interface UpdateFolderMemberErrorOther {
      '.tag': 'other';
    }

    export type UpdateFolderMemberError = UpdateFolderMemberErrorAccessError | UpdateFolderMemberErrorMemberError | UpdateFolderMemberErrorNoExplicitAccess | UpdateFolderMemberErrorInsufficientPlan | UpdateFolderMemberErrorNoPermission | UpdateFolderMemberErrorOther;

    /**
     * If any of the policies are unset, then they retain their current setting.
     */
    export interface UpdateFolderPolicyArg {
      /**
       * The ID for the shared folder.
       */
      shared_folder_id: common.SharedFolderId;
      /**
       * Who can be a member of this shared folder. Only applicable if the
       * current user is on a team.
       */
      member_policy?: MemberPolicy;
      /**
       * Who can add and remove members of this shared folder.
       */
      acl_update_policy?: AclUpdatePolicy;
      /**
       * Who can enable/disable viewer info for this shared folder.
       */
      viewer_info_policy?: ViewerInfoPolicy;
      /**
       * The policy to apply to shared links created for content inside this
       * shared folder. The current user must be on a team to set this policy to
       * SharedLinkPolicy.members.
       */
      shared_link_policy?: SharedLinkPolicy;
      /**
       * Settings on the link for this folder.
       */
      link_settings?: LinkSettings;
      /**
       * A list of `FolderAction`s corresponding to `FolderPermission`s that
       * should appear in the  response's SharedFolderMetadata.permissions field
       * describing the actions the  authenticated user can perform on the
       * folder.
       */
      actions?: Array<FolderAction>;
    }

    export interface UpdateFolderPolicyErrorAccessError {
      '.tag': 'access_error';
      access_error: SharedFolderAccessError;
    }

    /**
     * UpdateFolderPolicyArg.member_policy was set even though user is not on a
     * team.
     */
    export interface UpdateFolderPolicyErrorNotOnTeam {
      '.tag': 'not_on_team';
    }

    /**
     * Team policy is more restrictive than ShareFolderArg.member_policy.
     */
    export interface UpdateFolderPolicyErrorTeamPolicyDisallowsMemberPolicy {
      '.tag': 'team_policy_disallows_member_policy';
    }

    /**
     * The current account is not allowed to select the specified
     * ShareFolderArg.shared_link_policy.
     */
    export interface UpdateFolderPolicyErrorDisallowedSharedLinkPolicy {
      '.tag': 'disallowed_shared_link_policy';
    }

    /**
     * The current user does not have permission to perform this action.
     */
    export interface UpdateFolderPolicyErrorNoPermission {
      '.tag': 'no_permission';
    }

    /**
     * This action cannot be performed on a team shared folder.
     */
    export interface UpdateFolderPolicyErrorTeamFolder {
      '.tag': 'team_folder';
    }

    export interface UpdateFolderPolicyErrorOther {
      '.tag': 'other';
    }

    export type UpdateFolderPolicyError = UpdateFolderPolicyErrorAccessError | UpdateFolderPolicyErrorNotOnTeam | UpdateFolderPolicyErrorTeamPolicyDisallowsMemberPolicy | UpdateFolderPolicyErrorDisallowedSharedLinkPolicy | UpdateFolderPolicyErrorNoPermission | UpdateFolderPolicyErrorTeamFolder | UpdateFolderPolicyErrorOther;

    /**
     * The information about a user member of the shared content with an
     * appended last seen timestamp.
     */
    export interface UserFileMembershipInfo extends UserMembershipInfo {
      /**
       * The UTC timestamp of when the user has last seen the content, if they
       * have.
       */
      time_last_seen?: common.DropboxTimestamp;
    }

    /**
     * Basic information about a user. Use usersAccount() and
     * usersAccountBatch() to obtain more detailed information.
     */
    export interface UserInfo {
      /**
       * The account ID of the user.
       */
      account_id: users_common.AccountId;
      /**
       * If the user is in the same team as current user.
       */
      same_team: boolean;
      /**
       * The team member ID of the shared folder member. Only present if
       * same_team is true.
       */
      team_member_id?: string;
    }

    /**
     * The information about a user member of the shared content.
     */
    export interface UserMembershipInfo extends MembershipInfo {
      /**
       * The account information for the membership user.
       */
      user: UserInfo;
    }

    /**
     * Viewer information is available on this file.
     */
    export interface ViewerInfoPolicyEnabled {
      '.tag': 'enabled';
    }

    /**
     * Viewer information is disabled on this file.
     */
    export interface ViewerInfoPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface ViewerInfoPolicyOther {
      '.tag': 'other';
    }

    export type ViewerInfoPolicy = ViewerInfoPolicyEnabled | ViewerInfoPolicyDisabled | ViewerInfoPolicyOther;

    /**
     * Anyone who has received the link can access it. No login required.
     */
    export interface VisibilityPublic {
      '.tag': 'public';
    }

    /**
     * Only members of the same team can access the link. Login is required.
     */
    export interface VisibilityTeamOnly {
      '.tag': 'team_only';
    }

    /**
     * A link-specific password is required to access the link. Login is not
     * required.
     */
    export interface VisibilityPassword {
      '.tag': 'password';
    }

    /**
     * Only members of the same team who have the link-specific password can
     * access the link.
     */
    export interface VisibilityTeamAndPassword {
      '.tag': 'team_and_password';
    }

    /**
     * Only members of the shared folder containing the linked file can access
     * the link. Login is required.
     */
    export interface VisibilitySharedFolderOnly {
      '.tag': 'shared_folder_only';
    }

    export interface VisibilityOther {
      '.tag': 'other';
    }

    /**
     * Who can access a shared link. The most open visibility is public. The
     * default depends on many aspects, such as team and user preferences and
     * shared folder settings.
     */
    export type Visibility = VisibilityPublic | VisibilityTeamOnly | VisibilityPassword | VisibilityTeamAndPassword | VisibilitySharedFolderOnly | VisibilityOther;

    export type DropboxId = string;

    export type FileId = string;

    export type GetSharedLinkFileArg = GetSharedLinkMetadataArg;

    export type Id = files.Id;

    export type Path = files.Path;

    export type PathOrId = string;

    export type ReadPath = files.ReadPath;

    export type Rev = files.Rev;

    export type TeamInfo = users.Team;

  }

  namespace team {
    /**
     * Information on active web sessions.
     */
    export interface ActiveWebSession extends DeviceSession {
      /**
       * Information on the hosting device.
       */
      user_agent: string;
      /**
       * Information on the hosting operating system.
       */
      os: string;
      /**
       * Information on the browser used for this web session.
       */
      browser: string;
      /**
       * The time this session expires.
       */
      expires?: common.DropboxTimestamp;
    }

    /**
     * User is an administrator of the team - has all permissions.
     */
    export interface AdminTierTeamAdmin {
      '.tag': 'team_admin';
    }

    /**
     * User can do most user provisioning, de-provisioning and management.
     */
    export interface AdminTierUserManagementAdmin {
      '.tag': 'user_management_admin';
    }

    /**
     * User can do a limited set of common support tasks for existing users.
     */
    export interface AdminTierSupportAdmin {
      '.tag': 'support_admin';
    }

    /**
     * User is not an admin of the team.
     */
    export interface AdminTierMemberOnly {
      '.tag': 'member_only';
    }

    /**
     * Describes which team-related admin permissions a user has.
     */
    export type AdminTier = AdminTierTeamAdmin | AdminTierUserManagementAdmin | AdminTierSupportAdmin | AdminTierMemberOnly;

    /**
     * Information on linked third party applications.
     */
    export interface ApiApp {
      /**
       * The application unique id.
       */
      app_id: string;
      /**
       * The application name.
       */
      app_name: string;
      /**
       * The application publisher name.
       */
      publisher?: string;
      /**
       * The publisher's URL.
       */
      publisher_url?: string;
      /**
       * The time this application was linked.
       */
      linked?: common.DropboxTimestamp;
      /**
       * Whether the linked application uses a dedicated folder.
       */
      is_app_folder: boolean;
    }

    /**
     * Base report structure.
     */
    export interface BaseDfbReport {
      /**
       * First date present in the results as 'YYYY-MM-DD' or None.
       */
      start_date: string;
    }

    export interface BaseTeamFolderErrorAccessError {
      '.tag': 'access_error';
      access_error: TeamFolderAccessError;
    }

    export interface BaseTeamFolderErrorStatusError {
      '.tag': 'status_error';
      status_error: TeamFolderInvalidStatusError;
    }

    export interface BaseTeamFolderErrorTeamSharedDropboxError {
      '.tag': 'team_shared_dropbox_error';
      team_shared_dropbox_error: TeamFolderTeamSharedDropboxError;
    }

    export interface BaseTeamFolderErrorOther {
      '.tag': 'other';
    }

    /**
     * Base error that all errors for existing team folders should extend.
     */
    export type BaseTeamFolderError = BaseTeamFolderErrorAccessError | BaseTeamFolderErrorStatusError | BaseTeamFolderErrorTeamSharedDropboxError | BaseTeamFolderErrorOther;

    /**
     * A maximum of 1000 users can be set for a single call.
     */
    export interface CustomQuotaErrorTooManyUsers {
      '.tag': 'too_many_users';
    }

    export interface CustomQuotaErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned when getting member custom quota.
     */
    export type CustomQuotaError = CustomQuotaErrorTooManyUsers | CustomQuotaErrorOther;

    /**
     * User's custom quota.
     */
    export interface CustomQuotaResultSuccess {
      '.tag': 'success';
      success: UserCustomQuotaResult;
    }

    /**
     * Invalid user (not in team).
     */
    export interface CustomQuotaResultInvalidUser {
      '.tag': 'invalid_user';
      invalid_user: UserSelectorArg;
    }

    export interface CustomQuotaResultOther {
      '.tag': 'other';
    }

    /**
     * User custom quota.
     */
    export type CustomQuotaResult = CustomQuotaResultSuccess | CustomQuotaResultInvalidUser | CustomQuotaResultOther;

    export interface CustomQuotaUsersArg {
      /**
       * List of users.
       */
      users: Array<UserSelectorArg>;
    }

    /**
     * Input arguments that can be provided for most reports.
     */
    export interface DateRange {
      /**
       * Optional starting date (inclusive).
       */
      start_date?: common.Date;
      /**
       * Optional ending date (exclusive).
       */
      end_date?: common.Date;
    }

    export interface DateRangeErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors that can originate from problems in input arguments to reports.
     */
    export type DateRangeError = DateRangeErrorOther;

    /**
     * Information about linked Dropbox desktop client sessions.
     */
    export interface DesktopClientSession extends DeviceSession {
      /**
       * Name of the hosting desktop.
       */
      host_name: string;
      /**
       * The Dropbox desktop client type.
       */
      client_type: DesktopPlatform;
      /**
       * The Dropbox client version.
       */
      client_version: string;
      /**
       * Information on the hosting platform.
       */
      platform: string;
      /**
       * Whether it's possible to delete all of the account files upon
       * unlinking.
       */
      is_delete_on_unlink_supported: boolean;
    }

    /**
     * Official Windows Dropbox desktop client.
     */
    export interface DesktopPlatformWindows {
      '.tag': 'windows';
    }

    /**
     * Official Mac Dropbox desktop client.
     */
    export interface DesktopPlatformMac {
      '.tag': 'mac';
    }

    /**
     * Official Linux Dropbox desktop client.
     */
    export interface DesktopPlatformLinux {
      '.tag': 'linux';
    }

    export interface DesktopPlatformOther {
      '.tag': 'other';
    }

    export type DesktopPlatform = DesktopPlatformWindows | DesktopPlatformMac | DesktopPlatformLinux | DesktopPlatformOther;

    export interface DeviceSession {
      /**
       * The session id.
       */
      session_id: string;
      /**
       * The IP address of the last activity from this session.
       */
      ip_address?: string;
      /**
       * The country from which the last activity from this session was made.
       */
      country?: string;
      /**
       * The time this session was created.
       */
      created?: common.DropboxTimestamp;
      /**
       * The time of the last activity from this session.
       */
      updated?: common.DropboxTimestamp;
    }

    export interface DeviceSessionArg {
      /**
       * The session id.
       */
      session_id: string;
      /**
       * The unique id of the member owning the device.
       */
      team_member_id: string;
    }

    /**
     * Each of the items is an array of values, one value per day. The value is
     * the number of devices active within a time window, ending with that day.
     * If there is no data for a day, then the value will be None.
     */
    export interface DevicesActive {
      /**
       * Array of number of linked windows (desktop) clients with activity.
       */
      windows: NumberPerDay;
      /**
       * Array of number of linked mac (desktop) clients with activity.
       */
      macos: NumberPerDay;
      /**
       * Array of number of linked linus (desktop) clients with activity.
       */
      linux: NumberPerDay;
      /**
       * Array of number of linked ios devices with activity.
       */
      ios: NumberPerDay;
      /**
       * Array of number of linked android devices with activity.
       */
      android: NumberPerDay;
      /**
       * Array of number of other linked devices (blackberry, windows phone,
       * etc)  with activity.
       */
      other: NumberPerDay;
      /**
       * Array of total number of linked clients with activity.
       */
      total: NumberPerDay;
    }

    /**
     * Excluded users list argument.
     */
    export interface ExcludedUsersListArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    /**
     * Excluded users list continue argument.
     */
    export interface ExcludedUsersListContinueArg {
      /**
       * Indicates from what point to get the next set of users.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface ExcludedUsersListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface ExcludedUsersListContinueErrorOther {
      '.tag': 'other';
    }

    /**
     * Excluded users list continue error.
     */
    export type ExcludedUsersListContinueError = ExcludedUsersListContinueErrorInvalidCursor | ExcludedUsersListContinueErrorOther;

    /**
     * An error occurred.
     */
    export interface ExcludedUsersListErrorListError {
      '.tag': 'list_error';
    }

    export interface ExcludedUsersListErrorOther {
      '.tag': 'other';
    }

    /**
     * Excluded users list error.
     */
    export type ExcludedUsersListError = ExcludedUsersListErrorListError | ExcludedUsersListErrorOther;

    /**
     * Excluded users list result.
     */
    export interface ExcludedUsersListResult {
      users: Array<MemberProfile>;
      /**
       * Pass the cursor into memberSpaceLimitsExcludedUsersListContinue() to
       * obtain additional excluded users.
       */
      cursor?: string;
      /**
       * Is true if there are additional excluded users that have not been
       * returned yet. An additional call to
       * memberSpaceLimitsExcludedUsersListContinue() can retrieve them.
       */
      has_more: boolean;
    }

    /**
     * Argument of excluded users update operation. Should include a list of
     * users to add/remove (according to endpoint), Maximum size of the list is
     * 1000 users.
     */
    export interface ExcludedUsersUpdateArg {
      /**
       * List of users to be added/removed.
       */
      users?: Array<UserSelectorArg>;
    }

    /**
     * At least one of the users is not part of your team.
     */
    export interface ExcludedUsersUpdateErrorUsersNotInTeam {
      '.tag': 'users_not_in_team';
    }

    /**
     * A maximum of 1000 users for each of addition/removal can be supplied.
     */
    export interface ExcludedUsersUpdateErrorTooManyUsers {
      '.tag': 'too_many_users';
    }

    export interface ExcludedUsersUpdateErrorOther {
      '.tag': 'other';
    }

    /**
     * Excluded users update error.
     */
    export type ExcludedUsersUpdateError = ExcludedUsersUpdateErrorUsersNotInTeam | ExcludedUsersUpdateErrorTooManyUsers | ExcludedUsersUpdateErrorOther;

    /**
     * Excluded users update result.
     */
    export interface ExcludedUsersUpdateResult {
      /**
       * Update status.
       */
      status: ExcludedUsersUpdateStatus;
    }

    /**
     * Update successful.
     */
    export interface ExcludedUsersUpdateStatusSuccess {
      '.tag': 'success';
    }

    export interface ExcludedUsersUpdateStatusOther {
      '.tag': 'other';
    }

    /**
     * Excluded users update operation status.
     */
    export type ExcludedUsersUpdateStatus = ExcludedUsersUpdateStatusSuccess | ExcludedUsersUpdateStatusOther;

    /**
     * The number of upload API calls allowed per month.
     */
    export interface FeatureUploadApiRateLimit {
      '.tag': 'upload_api_rate_limit';
    }

    /**
     * Does this team have a have a company shared dropbox.
     */
    export interface FeatureHasTeamSharedDropbox {
      '.tag': 'has_team_shared_dropbox';
    }

    /**
     * Does this team have file events.
     */
    export interface FeatureHasTeamFileEvents {
      '.tag': 'has_team_file_events';
    }

    export interface FeatureOther {
      '.tag': 'other';
    }

    /**
     * A set of features that Dropbox for Business account support.
     */
    export type Feature = FeatureUploadApiRateLimit | FeatureHasTeamSharedDropbox | FeatureHasTeamFileEvents | FeatureOther;

    export interface FeatureValueUploadApiRateLimit {
      '.tag': 'upload_api_rate_limit';
      upload_api_rate_limit: UploadApiRateLimitValue;
    }

    export interface FeatureValueHasTeamSharedDropbox {
      '.tag': 'has_team_shared_dropbox';
      has_team_shared_dropbox: HasTeamSharedDropboxValue;
    }

    export interface FeatureValueHasTeamFileEvents {
      '.tag': 'has_team_file_events';
      has_team_file_events: HasTeamFileEventsValue;
    }

    export interface FeatureValueOther {
      '.tag': 'other';
    }

    /**
     * The values correspond to entries in team.Feature. You may get different
     * value according to your Dropbox for Business plan.
     */
    export type FeatureValue = FeatureValueUploadApiRateLimit | FeatureValueHasTeamSharedDropbox | FeatureValueHasTeamFileEvents | FeatureValueOther;

    export interface FeaturesGetValuesBatchArg {
      /**
       * A list of features in team.Feature. If the list is empty, this route
       * will return team.FeaturesGetValuesBatchError.
       */
      features: Array<Feature>;
    }

    /**
     * At least one team.Feature must be included in the
     * team.FeaturesGetValuesBatchArg.features list.
     */
    export interface FeaturesGetValuesBatchErrorEmptyFeaturesList {
      '.tag': 'empty_features_list';
    }

    export interface FeaturesGetValuesBatchErrorOther {
      '.tag': 'other';
    }

    export type FeaturesGetValuesBatchError = FeaturesGetValuesBatchErrorEmptyFeaturesList | FeaturesGetValuesBatchErrorOther;

    export interface FeaturesGetValuesBatchResult {
      values: Array<FeatureValue>;
    }

    /**
     * Activity Report Result. Each of the items in the storage report is an
     * array of values, one value per day. If there is no data for a day, then
     * the value will be None.
     */
    export interface GetActivityReport extends BaseDfbReport {
      /**
       * Array of total number of adds by team members.
       */
      adds: NumberPerDay;
      /**
       * Array of number of edits by team members. If the same user edits the
       * same file multiple times this is counted as a single edit.
       */
      edits: NumberPerDay;
      /**
       * Array of total number of deletes by team members.
       */
      deletes: NumberPerDay;
      /**
       * Array of the number of users who have been active in the last 28 days.
       */
      active_users_28_day: NumberPerDay;
      /**
       * Array of the number of users who have been active in the last week.
       */
      active_users_7_day: NumberPerDay;
      /**
       * Array of the number of users who have been active in the last day.
       */
      active_users_1_day: NumberPerDay;
      /**
       * Array of the number of shared folders with some activity in the last 28
       * days.
       */
      active_shared_folders_28_day: NumberPerDay;
      /**
       * Array of the number of shared folders with some activity in the last
       * week.
       */
      active_shared_folders_7_day: NumberPerDay;
      /**
       * Array of the number of shared folders with some activity in the last
       * day.
       */
      active_shared_folders_1_day: NumberPerDay;
      /**
       * Array of the number of shared links created.
       */
      shared_links_created: NumberPerDay;
      /**
       * Array of the number of views by team users to shared links created by
       * the team.
       */
      shared_links_viewed_by_team: NumberPerDay;
      /**
       * Array of the number of views by users outside of the team to shared
       * links created by the team.
       */
      shared_links_viewed_by_outside_user: NumberPerDay;
      /**
       * Array of the number of views by non-logged-in users to shared links
       * created by the team.
       */
      shared_links_viewed_by_not_logged_in: NumberPerDay;
      /**
       * Array of the total number of views to shared links created by the team.
       */
      shared_links_viewed_total: NumberPerDay;
    }

    /**
     * Devices Report Result. Contains subsections for different time ranges of
     * activity. Each of the items in each subsection of the storage report is
     * an array of values, one value per day. If there is no data for a day,
     * then the value will be None.
     */
    export interface GetDevicesReport extends BaseDfbReport {
      /**
       * Report of the number of devices active in the last day.
       */
      active_1_day: DevicesActive;
      /**
       * Report of the number of devices active in the last 7 days.
       */
      active_7_day: DevicesActive;
      /**
       * Report of the number of devices active in the last 28 days.
       */
      active_28_day: DevicesActive;
    }

    /**
     * Membership Report Result. Each of the items in the storage report is an
     * array of values, one value per day. If there is no data for a day, then
     * the value will be None.
     */
    export interface GetMembershipReport extends BaseDfbReport {
      /**
       * Team size, for each day.
       */
      team_size: NumberPerDay;
      /**
       * The number of pending invites to the team, for each day.
       */
      pending_invites: NumberPerDay;
      /**
       * The number of members that joined the team, for each day.
       */
      members_joined: NumberPerDay;
      /**
       * The number of suspended team members, for each day.
       */
      suspended_members: NumberPerDay;
      /**
       * The total number of licenses the team has, for each day.
       */
      licenses: NumberPerDay;
    }

    /**
     * Storage Report Result. Each of the items in the storage report is an
     * array of values, one value per day. If there is no data for a day, then
     * the value will be None.
     */
    export interface GetStorageReport extends BaseDfbReport {
      /**
       * Sum of the shared, unshared, and datastore usages, for each day.
       */
      total_usage: NumberPerDay;
      /**
       * Array of the combined size (bytes) of team members' shared folders, for
       * each day.
       */
      shared_usage: NumberPerDay;
      /**
       * Array of the combined size (bytes) of team members' root namespaces,
       * for each day.
       */
      unshared_usage: NumberPerDay;
      /**
       * Array of the number of shared folders owned by team members, for each
       * day.
       */
      shared_folders: NumberPerDay;
      /**
       * Array of storage summaries of team members' account sizes. Each storage
       * summary is an array of key, value pairs, where each pair describes a
       * storage bucket. The key indicates the upper bound of the bucket and the
       * value is the number of users in that bucket. There is one such summary
       * per day. If there is no data for a day, the storage summary will be
       * empty.
       */
      member_storage_map: Array<Array<StorageBucket>>;
    }

    /**
     * User is a member of the group, but has no special permissions.
     */
    export interface GroupAccessTypeMember {
      '.tag': 'member';
    }

    /**
     * User can rename the group, and add/remove members.
     */
    export interface GroupAccessTypeOwner {
      '.tag': 'owner';
    }

    /**
     * Role of a user in group.
     */
    export type GroupAccessType = GroupAccessTypeMember | GroupAccessTypeOwner;

    export interface GroupCreateArg {
      /**
       * Group name.
       */
      group_name: string;
      /**
       * The creator of a team can associate an arbitrary external ID to the
       * group.
       */
      group_external_id?: team_common.GroupExternalId;
      /**
       * Whether the team can be managed by selected users, or only by team
       * admins.
       */
      group_management_type?: team_common.GroupManagementType;
    }

    /**
     * The requested group name is already being used by another group.
     */
    export interface GroupCreateErrorGroupNameAlreadyUsed {
      '.tag': 'group_name_already_used';
    }

    /**
     * Group name is empty or has invalid characters.
     */
    export interface GroupCreateErrorGroupNameInvalid {
      '.tag': 'group_name_invalid';
    }

    /**
     * The requested external ID is already being used by another group.
     */
    export interface GroupCreateErrorExternalIdAlreadyInUse {
      '.tag': 'external_id_already_in_use';
    }

    /**
     * System-managed group cannot be manually created.
     */
    export interface GroupCreateErrorSystemManagedGroupDisallowed {
      '.tag': 'system_managed_group_disallowed';
    }

    export interface GroupCreateErrorOther {
      '.tag': 'other';
    }

    export type GroupCreateError = GroupCreateErrorGroupNameAlreadyUsed | GroupCreateErrorGroupNameInvalid | GroupCreateErrorExternalIdAlreadyInUse | GroupCreateErrorSystemManagedGroupDisallowed | GroupCreateErrorOther;

    /**
     * This group has already been deleted.
     */
    export interface GroupDeleteErrorGroupAlreadyDeleted {
      '.tag': 'group_already_deleted';
    }

    export type GroupDeleteError = GroupSelectorWithTeamGroupError | GroupDeleteErrorGroupAlreadyDeleted;

    /**
     * Full description of a group.
     */
    export interface GroupFullInfo extends team_common.GroupSummary {
      /**
       * List of group members.
       */
      members?: Array<GroupMemberInfo>;
      /**
       * The group creation time as a UTC timestamp in milliseconds since the
       * Unix epoch.
       */
      created: number;
    }

    /**
     * Profile of group member, and role in group.
     */
    export interface GroupMemberInfo {
      /**
       * Profile of group member.
       */
      profile: MemberProfile;
      /**
       * The role that the user has in the group.
       */
      access_type: GroupAccessType;
    }

    /**
     * Argument for selecting a group and a single user.
     */
    export interface GroupMemberSelector {
      /**
       * Specify a group.
       */
      group: GroupSelector;
      /**
       * Identity of a user that is a member of group.
       */
      user: UserSelectorArg;
    }

    /**
     * The specified user is not a member of this group.
     */
    export interface GroupMemberSelectorErrorMemberNotInGroup {
      '.tag': 'member_not_in_group';
    }

    /**
     * Error that can be raised when team.GroupMemberSelector is used, and the
     * user is required to be a member of the specified group.
     */
    export type GroupMemberSelectorError = GroupSelectorWithTeamGroupError | GroupMemberSelectorErrorMemberNotInGroup;

    /**
     * A company managed group cannot be managed by a user.
     */
    export interface GroupMemberSetAccessTypeErrorUserCannotBeManagerOfCompanyManagedGroup {
      '.tag': 'user_cannot_be_manager_of_company_managed_group';
    }

    export type GroupMemberSetAccessTypeError = GroupMemberSelectorError | GroupMemberSetAccessTypeErrorUserCannotBeManagerOfCompanyManagedGroup;

    export interface GroupMembersAddArg extends IncludeMembersArg {
      /**
       * Group to which users will be added.
       */
      group: GroupSelector;
      /**
       * List of users to be added to the group.
       */
      members: Array<MemberAccess>;
    }

    /**
     * You cannot add duplicate users. One or more of the members you are trying
     * to add is already a member of the group.
     */
    export interface GroupMembersAddErrorDuplicateUser {
      '.tag': 'duplicate_user';
    }

    /**
     * Group is not in this team. You cannot add members to a group that is
     * outside of your team.
     */
    export interface GroupMembersAddErrorGroupNotInTeam {
      '.tag': 'group_not_in_team';
    }

    /**
     * These members are not part of your team. Currently, you cannot add
     * members to a group if they are not part of your team, though this may
     * change in a subsequent version. To add new members to your Dropbox
     * Business team, use the membersAdd() endpoint.
     */
    export interface GroupMembersAddErrorMembersNotInTeam {
      '.tag': 'members_not_in_team';
      members_not_in_team: Array<string>;
    }

    /**
     * These users were not found in Dropbox.
     */
    export interface GroupMembersAddErrorUsersNotFound {
      '.tag': 'users_not_found';
      users_not_found: Array<string>;
    }

    /**
     * A suspended user cannot be added to a group as GroupAccessType.owner.
     */
    export interface GroupMembersAddErrorUserMustBeActiveToBeOwner {
      '.tag': 'user_must_be_active_to_be_owner';
    }

    /**
     * A company-managed group cannot be managed by a user.
     */
    export interface GroupMembersAddErrorUserCannotBeManagerOfCompanyManagedGroup {
      '.tag': 'user_cannot_be_manager_of_company_managed_group';
      user_cannot_be_manager_of_company_managed_group: Array<string>;
    }

    export type GroupMembersAddError = GroupSelectorWithTeamGroupError | GroupMembersAddErrorDuplicateUser | GroupMembersAddErrorGroupNotInTeam | GroupMembersAddErrorMembersNotInTeam | GroupMembersAddErrorUsersNotFound | GroupMembersAddErrorUserMustBeActiveToBeOwner | GroupMembersAddErrorUserCannotBeManagerOfCompanyManagedGroup;

    /**
     * Result returned by groupsMembersAdd() and groupsMembersRemove().
     */
    export interface GroupMembersChangeResult {
      /**
       * The group info after member change operation has been performed.
       */
      group_info: GroupFullInfo;
      /**
       * An ID that can be used to obtain the status of granting/revoking
       * group-owned resources.
       */
      async_job_id: async.AsyncJobId;
    }

    export interface GroupMembersRemoveArg extends IncludeMembersArg {
      /**
       * Group from which users will be removed.
       */
      group: GroupSelector;
      /**
       * List of users to be removed from the group.
       */
      users: Array<UserSelectorArg>;
    }

    /**
     * Group is not in this team. You cannot remove members from a group that is
     * outside of your team.
     */
    export interface GroupMembersRemoveErrorGroupNotInTeam {
      '.tag': 'group_not_in_team';
    }

    /**
     * These members are not part of your team.
     */
    export interface GroupMembersRemoveErrorMembersNotInTeam {
      '.tag': 'members_not_in_team';
      members_not_in_team: Array<string>;
    }

    /**
     * These users were not found in Dropbox.
     */
    export interface GroupMembersRemoveErrorUsersNotFound {
      '.tag': 'users_not_found';
      users_not_found: Array<string>;
    }

    export type GroupMembersRemoveError = GroupMembersSelectorError | GroupMembersRemoveErrorGroupNotInTeam | GroupMembersRemoveErrorMembersNotInTeam | GroupMembersRemoveErrorUsersNotFound;

    /**
     * Argument for selecting a group and a list of users.
     */
    export interface GroupMembersSelector {
      /**
       * Specify a group.
       */
      group: GroupSelector;
      /**
       * A list of users that are members of group.
       */
      users: UsersSelectorArg;
    }

    /**
     * At least one of the specified users is not a member of the group.
     */
    export interface GroupMembersSelectorErrorMemberNotInGroup {
      '.tag': 'member_not_in_group';
    }

    /**
     * Error that can be raised when team.GroupMembersSelector is used, and the
     * users are required to be members of the specified group.
     */
    export type GroupMembersSelectorError = GroupSelectorWithTeamGroupError | GroupMembersSelectorErrorMemberNotInGroup;

    export interface GroupMembersSetAccessTypeArg extends GroupMemberSelector {
      /**
       * New group access type the user will have.
       */
      access_type: GroupAccessType;
      /**
       * Defaults to True.
       */
      return_members?: boolean;
    }

    /**
     * Group ID.
     */
    export interface GroupSelectorGroupId {
      '.tag': 'group_id';
      group_id: team_common.GroupId;
    }

    /**
     * External ID of the group.
     */
    export interface GroupSelectorGroupExternalId {
      '.tag': 'group_external_id';
      group_external_id: team_common.GroupExternalId;
    }

    /**
     * Argument for selecting a single group, either by group_id or by external
     * group ID.
     */
    export type GroupSelector = GroupSelectorGroupId | GroupSelectorGroupExternalId;

    /**
     * No matching group found. No groups match the specified group ID.
     */
    export interface GroupSelectorErrorGroupNotFound {
      '.tag': 'group_not_found';
    }

    export interface GroupSelectorErrorOther {
      '.tag': 'other';
    }

    /**
     * Error that can be raised when team.GroupSelector is used.
     */
    export type GroupSelectorError = GroupSelectorErrorGroupNotFound | GroupSelectorErrorOther;

    /**
     * This operation is not supported on system-managed groups.
     */
    export interface GroupSelectorWithTeamGroupErrorSystemManagedGroupDisallowed {
      '.tag': 'system_managed_group_disallowed';
    }

    /**
     * Error that can be raised when team.GroupSelector is used and team groups
     * are disallowed from being used.
     */
    export type GroupSelectorWithTeamGroupError = GroupSelectorError | GroupSelectorWithTeamGroupErrorSystemManagedGroupDisallowed;

    export interface GroupUpdateArgs extends IncludeMembersArg {
      /**
       * Specify a group.
       */
      group: GroupSelector;
      /**
       * Optional argument. Set group name to this if provided.
       */
      new_group_name?: string;
      /**
       * Optional argument. New group external ID. If the argument is None, the
       * group's external_id won't be updated. If the argument is empty string,
       * the group's external id will be cleared.
       */
      new_group_external_id?: team_common.GroupExternalId;
      /**
       * Set new group management type, if provided.
       */
      new_group_management_type?: team_common.GroupManagementType;
    }

    /**
     * The requested group name is already being used by another group.
     */
    export interface GroupUpdateErrorGroupNameAlreadyUsed {
      '.tag': 'group_name_already_used';
    }

    /**
     * Group name is empty or has invalid characters.
     */
    export interface GroupUpdateErrorGroupNameInvalid {
      '.tag': 'group_name_invalid';
    }

    /**
     * The requested external ID is already being used by another group.
     */
    export interface GroupUpdateErrorExternalIdAlreadyInUse {
      '.tag': 'external_id_already_in_use';
    }

    export type GroupUpdateError = GroupSelectorWithTeamGroupError | GroupUpdateErrorGroupNameAlreadyUsed | GroupUpdateErrorGroupNameInvalid | GroupUpdateErrorExternalIdAlreadyInUse;

    /**
     * The group is not on your team.
     */
    export interface GroupsGetInfoErrorGroupNotOnTeam {
      '.tag': 'group_not_on_team';
    }

    export interface GroupsGetInfoErrorOther {
      '.tag': 'other';
    }

    export type GroupsGetInfoError = GroupsGetInfoErrorGroupNotOnTeam | GroupsGetInfoErrorOther;

    /**
     * An ID that was provided as a parameter to groupsGetInfo(), and did not
     * match a corresponding group. The ID can be a group ID, or an external ID,
     * depending on how the method was called.
     */
    export interface GroupsGetInfoItemIdNotFound {
      '.tag': 'id_not_found';
      id_not_found: string;
    }

    /**
     * Info about a group.
     */
    export interface GroupsGetInfoItemGroupInfo {
      '.tag': 'group_info';
      group_info: GroupFullInfo;
    }

    export type GroupsGetInfoItem = GroupsGetInfoItemIdNotFound | GroupsGetInfoItemGroupInfo;

    export interface GroupsListArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface GroupsListContinueArg {
      /**
       * Indicates from what point to get the next set of groups.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface GroupsListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface GroupsListContinueErrorOther {
      '.tag': 'other';
    }

    export type GroupsListContinueError = GroupsListContinueErrorInvalidCursor | GroupsListContinueErrorOther;

    export interface GroupsListResult {
      groups: Array<team_common.GroupSummary>;
      /**
       * Pass the cursor into groupsListContinue() to obtain the additional
       * groups.
       */
      cursor: string;
      /**
       * Is true if there are additional groups that have not been returned yet.
       * An additional call to groupsListContinue() can retrieve them.
       */
      has_more: boolean;
    }

    export interface GroupsMembersListArg {
      /**
       * The group whose members are to be listed.
       */
      group: GroupSelector;
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface GroupsMembersListContinueArg {
      /**
       * Indicates from what point to get the next set of groups.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface GroupsMembersListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface GroupsMembersListContinueErrorOther {
      '.tag': 'other';
    }

    export type GroupsMembersListContinueError = GroupsMembersListContinueErrorInvalidCursor | GroupsMembersListContinueErrorOther;

    export interface GroupsMembersListResult {
      members: Array<GroupMemberInfo>;
      /**
       * Pass the cursor into groupsMembersListContinue() to obtain additional
       * group members.
       */
      cursor: string;
      /**
       * Is true if there are additional group members that have not been
       * returned yet. An additional call to groupsMembersListContinue() can
       * retrieve them.
       */
      has_more: boolean;
    }

    /**
     * You are not allowed to poll this job.
     */
    export interface GroupsPollErrorAccessDenied {
      '.tag': 'access_denied';
    }

    export type GroupsPollError = async.PollError | GroupsPollErrorAccessDenied;

    /**
     * List of group IDs.
     */
    export interface GroupsSelectorGroupIds {
      '.tag': 'group_ids';
      group_ids: Array<team_common.GroupId>;
    }

    /**
     * List of external IDs of groups.
     */
    export interface GroupsSelectorGroupExternalIds {
      '.tag': 'group_external_ids';
      group_external_ids: Array<string>;
    }

    /**
     * Argument for selecting a list of groups, either by group_ids, or external
     * group IDs.
     */
    export type GroupsSelector = GroupsSelectorGroupIds | GroupsSelectorGroupExternalIds;

    /**
     * Does this team have file events.
     */
    export interface HasTeamFileEventsValueEnabled {
      '.tag': 'enabled';
      enabled: boolean;
    }

    export interface HasTeamFileEventsValueOther {
      '.tag': 'other';
    }

    /**
     * The value for Feature.has_team_file_events.
     */
    export type HasTeamFileEventsValue = HasTeamFileEventsValueEnabled | HasTeamFileEventsValueOther;

    /**
     * Does this team have a team shared dropbox.
     */
    export interface HasTeamSharedDropboxValueHasTeamSharedDropbox {
      '.tag': 'has_team_shared_dropbox';
      has_team_shared_dropbox: boolean;
    }

    export interface HasTeamSharedDropboxValueOther {
      '.tag': 'other';
    }

    /**
     * The value for Feature.has_team_shared_dropbox.
     */
    export type HasTeamSharedDropboxValue = HasTeamSharedDropboxValueHasTeamSharedDropbox | HasTeamSharedDropboxValueOther;

    export interface IncludeMembersArg {
      /**
       * Defaults to True.
       */
      return_members?: boolean;
    }

    export interface ListMemberAppsArg {
      /**
       * The team member id.
       */
      team_member_id: string;
    }

    /**
     * Member not found.
     */
    export interface ListMemberAppsErrorMemberNotFound {
      '.tag': 'member_not_found';
    }

    export interface ListMemberAppsErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by linkedAppsListMemberLinkedApps().
     */
    export type ListMemberAppsError = ListMemberAppsErrorMemberNotFound | ListMemberAppsErrorOther;

    export interface ListMemberAppsResult {
      /**
       * List of third party applications linked by this team member.
       */
      linked_api_apps: Array<ApiApp>;
    }

    export interface ListMemberDevicesArg {
      /**
       * The team's member id.
       */
      team_member_id: string;
      /**
       * Defaults to True.
       */
      include_web_sessions?: boolean;
      /**
       * Defaults to True.
       */
      include_desktop_clients?: boolean;
      /**
       * Defaults to True.
       */
      include_mobile_clients?: boolean;
    }

    /**
     * Member not found.
     */
    export interface ListMemberDevicesErrorMemberNotFound {
      '.tag': 'member_not_found';
    }

    export interface ListMemberDevicesErrorOther {
      '.tag': 'other';
    }

    export type ListMemberDevicesError = ListMemberDevicesErrorMemberNotFound | ListMemberDevicesErrorOther;

    export interface ListMemberDevicesResult {
      /**
       * List of web sessions made by this team member.
       */
      active_web_sessions?: Array<ActiveWebSession>;
      /**
       * List of desktop clients used by this team member.
       */
      desktop_client_sessions?: Array<DesktopClientSession>;
      /**
       * List of mobile client used by this team member.
       */
      mobile_client_sessions?: Array<MobileClientSession>;
    }

    /**
     * Arguments for linkedAppsListMembersLinkedApps().
     */
    export interface ListMembersAppsArg {
      /**
       * At the first call to the linkedAppsListMembersLinkedApps() the cursor
       * shouldn't be passed. Then, if the result of the call includes a cursor,
       * the following requests should include the received cursors in order to
       * receive the next sub list of the team applications.
       */
      cursor?: string;
    }

    /**
     * Indicates that the cursor has been invalidated. Call
     * linkedAppsListMembersLinkedApps() again with an empty cursor to obtain a
     * new cursor.
     */
    export interface ListMembersAppsErrorReset {
      '.tag': 'reset';
    }

    export interface ListMembersAppsErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by linkedAppsListMembersLinkedApps().
     */
    export type ListMembersAppsError = ListMembersAppsErrorReset | ListMembersAppsErrorOther;

    /**
     * Information returned by linkedAppsListMembersLinkedApps().
     */
    export interface ListMembersAppsResult {
      /**
       * The linked applications of each member of the team.
       */
      apps: Array<MemberLinkedApps>;
      /**
       * If true, then there are more apps available. Pass the cursor to
       * linkedAppsListMembersLinkedApps() to retrieve the rest.
       */
      has_more: boolean;
      /**
       * Pass the cursor into linkedAppsListMembersLinkedApps() to receive the
       * next sub list of team's applications.
       */
      cursor?: string;
    }

    export interface ListMembersDevicesArg {
      /**
       * At the first call to the devicesListMembersDevices() the cursor
       * shouldn't be passed. Then, if the result of the call includes a cursor,
       * the following requests should include the received cursors in order to
       * receive the next sub list of team devices.
       */
      cursor?: string;
      /**
       * Defaults to True.
       */
      include_web_sessions?: boolean;
      /**
       * Defaults to True.
       */
      include_desktop_clients?: boolean;
      /**
       * Defaults to True.
       */
      include_mobile_clients?: boolean;
    }

    /**
     * Indicates that the cursor has been invalidated. Call
     * devicesListMembersDevices() again with an empty cursor to obtain a new
     * cursor.
     */
    export interface ListMembersDevicesErrorReset {
      '.tag': 'reset';
    }

    export interface ListMembersDevicesErrorOther {
      '.tag': 'other';
    }

    export type ListMembersDevicesError = ListMembersDevicesErrorReset | ListMembersDevicesErrorOther;

    export interface ListMembersDevicesResult {
      /**
       * The devices of each member of the team.
       */
      devices: Array<MemberDevices>;
      /**
       * If true, then there are more devices available. Pass the cursor to
       * devicesListMembersDevices() to retrieve the rest.
       */
      has_more: boolean;
      /**
       * Pass the cursor into devicesListMembersDevices() to receive the next
       * sub list of team's devices.
       */
      cursor?: string;
    }

    /**
     * Arguments for linkedAppsListTeamLinkedApps().
     */
    export interface ListTeamAppsArg {
      /**
       * At the first call to the linkedAppsListTeamLinkedApps() the cursor
       * shouldn't be passed. Then, if the result of the call includes a cursor,
       * the following requests should include the received cursors in order to
       * receive the next sub list of the team applications.
       */
      cursor?: string;
    }

    /**
     * Indicates that the cursor has been invalidated. Call
     * linkedAppsListTeamLinkedApps() again with an empty cursor to obtain a new
     * cursor.
     */
    export interface ListTeamAppsErrorReset {
      '.tag': 'reset';
    }

    export interface ListTeamAppsErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by linkedAppsListTeamLinkedApps().
     */
    export type ListTeamAppsError = ListTeamAppsErrorReset | ListTeamAppsErrorOther;

    /**
     * Information returned by linkedAppsListTeamLinkedApps().
     */
    export interface ListTeamAppsResult {
      /**
       * The linked applications of each member of the team.
       */
      apps: Array<MemberLinkedApps>;
      /**
       * If true, then there are more apps available. Pass the cursor to
       * linkedAppsListTeamLinkedApps() to retrieve the rest.
       */
      has_more: boolean;
      /**
       * Pass the cursor into linkedAppsListTeamLinkedApps() to receive the next
       * sub list of team's applications.
       */
      cursor?: string;
    }

    export interface ListTeamDevicesArg {
      /**
       * At the first call to the devicesListTeamDevices() the cursor shouldn't
       * be passed. Then, if the result of the call includes a cursor, the
       * following requests should include the received cursors in order to
       * receive the next sub list of team devices.
       */
      cursor?: string;
      /**
       * Defaults to True.
       */
      include_web_sessions?: boolean;
      /**
       * Defaults to True.
       */
      include_desktop_clients?: boolean;
      /**
       * Defaults to True.
       */
      include_mobile_clients?: boolean;
    }

    /**
     * Indicates that the cursor has been invalidated. Call
     * devicesListTeamDevices() again with an empty cursor to obtain a new
     * cursor.
     */
    export interface ListTeamDevicesErrorReset {
      '.tag': 'reset';
    }

    export interface ListTeamDevicesErrorOther {
      '.tag': 'other';
    }

    export type ListTeamDevicesError = ListTeamDevicesErrorReset | ListTeamDevicesErrorOther;

    export interface ListTeamDevicesResult {
      /**
       * The devices of each member of the team.
       */
      devices: Array<MemberDevices>;
      /**
       * If true, then there are more devices available. Pass the cursor to
       * devicesListTeamDevices() to retrieve the rest.
       */
      has_more: boolean;
      /**
       * Pass the cursor into devicesListTeamDevices() to receive the next sub
       * list of team's devices.
       */
      cursor?: string;
    }

    /**
     * Specify access type a member should have when joined to a group.
     */
    export interface MemberAccess {
      /**
       * Identity of a user.
       */
      user: UserSelectorArg;
      /**
       * Access type.
       */
      access_type: GroupAccessType;
    }

    export interface MemberAddArg {
      member_email: common.EmailAddress;
      /**
       * Member's first name.
       */
      member_given_name?: common.OptionalNamePart;
      /**
       * Member's last name.
       */
      member_surname?: common.OptionalNamePart;
      /**
       * External ID for member.
       */
      member_external_id?: team_common.MemberExternalId;
      /**
       * Persistent ID for member. This field is only available to teams using
       * persistent ID SAML configuration.
       */
      member_persistent_id?: string;
      /**
       * Defaults to True.
       */
      send_welcome_email?: boolean;
      /**
       * Defaults to TagRef(Union(u'AdminTier', [UnionField(u'team_admin', Void,
       * False, None), UnionField(u'user_management_admin', Void, False, None),
       * UnionField(u'support_admin', Void, False, None),
       * UnionField(u'member_only', Void, False, None)]), u'member_only').
       */
      role?: AdminTier;
    }

    /**
     * Describes a user that was successfully added to the team.
     */
    export interface MemberAddResultSuccess {
      '.tag': 'success';
      success: TeamMemberInfo;
    }

    /**
     * Team is already full. The organization has no available licenses.
     */
    export interface MemberAddResultTeamLicenseLimit {
      '.tag': 'team_license_limit';
      team_license_limit: common.EmailAddress;
    }

    /**
     * Team is already full. The free team member limit has been reached.
     */
    export interface MemberAddResultFreeTeamMemberLimitReached {
      '.tag': 'free_team_member_limit_reached';
      free_team_member_limit_reached: common.EmailAddress;
    }

    /**
     * User is already on this team. The provided email address is associated
     * with a user who is already a member of (including in recoverable state)
     * or invited to the team.
     */
    export interface MemberAddResultUserAlreadyOnTeam {
      '.tag': 'user_already_on_team';
      user_already_on_team: common.EmailAddress;
    }

    /**
     * User is already on another team. The provided email address is associated
     * with a user that is already a member or invited to another team.
     */
    export interface MemberAddResultUserOnAnotherTeam {
      '.tag': 'user_on_another_team';
      user_on_another_team: common.EmailAddress;
    }

    /**
     * User is already paired.
     */
    export interface MemberAddResultUserAlreadyPaired {
      '.tag': 'user_already_paired';
      user_already_paired: common.EmailAddress;
    }

    /**
     * User migration has failed.
     */
    export interface MemberAddResultUserMigrationFailed {
      '.tag': 'user_migration_failed';
      user_migration_failed: common.EmailAddress;
    }

    /**
     * A user with the given external member ID already exists on the team
     * (including in recoverable state).
     */
    export interface MemberAddResultDuplicateExternalMemberId {
      '.tag': 'duplicate_external_member_id';
      duplicate_external_member_id: common.EmailAddress;
    }

    /**
     * A user with the given persistent ID already exists on the team (including
     * in recoverable state).
     */
    export interface MemberAddResultDuplicateMemberPersistentId {
      '.tag': 'duplicate_member_persistent_id';
      duplicate_member_persistent_id: common.EmailAddress;
    }

    /**
     * Persistent ID is only available to teams with persistent ID SAML
     * configuration. Please contact Dropbox for more information.
     */
    export interface MemberAddResultPersistentIdDisabled {
      '.tag': 'persistent_id_disabled';
      persistent_id_disabled: common.EmailAddress;
    }

    /**
     * User creation has failed.
     */
    export interface MemberAddResultUserCreationFailed {
      '.tag': 'user_creation_failed';
      user_creation_failed: common.EmailAddress;
    }

    /**
     * Describes the result of attempting to add a single user to the team.
     * 'success' is the only value indicating that a user was indeed added to
     * the team - the other values explain the type of failure that occurred,
     * and include the email of the user for which the operation has failed.
     */
    export type MemberAddResult = MemberAddResultSuccess | MemberAddResultTeamLicenseLimit | MemberAddResultFreeTeamMemberLimitReached | MemberAddResultUserAlreadyOnTeam | MemberAddResultUserOnAnotherTeam | MemberAddResultUserAlreadyPaired | MemberAddResultUserMigrationFailed | MemberAddResultDuplicateExternalMemberId | MemberAddResultDuplicateMemberPersistentId | MemberAddResultPersistentIdDisabled | MemberAddResultUserCreationFailed;

    /**
     * Information on devices of a team's member.
     */
    export interface MemberDevices {
      /**
       * The member unique Id.
       */
      team_member_id: string;
      /**
       * List of web sessions made by this team member.
       */
      web_sessions?: Array<ActiveWebSession>;
      /**
       * List of desktop clients by this team member.
       */
      desktop_clients?: Array<DesktopClientSession>;
      /**
       * List of mobile clients by this team member.
       */
      mobile_clients?: Array<MobileClientSession>;
    }

    /**
     * Information on linked applications of a team member.
     */
    export interface MemberLinkedApps {
      /**
       * The member unique Id.
       */
      team_member_id: string;
      /**
       * List of third party applications linked by this team member.
       */
      linked_api_apps: Array<ApiApp>;
    }

    /**
     * Basic member profile.
     */
    export interface MemberProfile {
      /**
       * ID of user as a member of a team.
       */
      team_member_id: team_common.TeamMemberId;
      /**
       * External ID that a team can attach to the user. An application using
       * the API may find it easier to use their own IDs instead of Dropbox IDs
       * like account_id or team_member_id.
       */
      external_id?: string;
      /**
       * A user's account identifier.
       */
      account_id?: users_common.AccountId;
      /**
       * Email address of user.
       */
      email: string;
      /**
       * Is true if the user's email is verified to be owned by the user.
       */
      email_verified: boolean;
      /**
       * The user's status as a member of a specific team.
       */
      status: TeamMemberStatus;
      /**
       * Representations for a person's name.
       */
      name: users.Name;
      /**
       * The user's membership type: full (normal team member) vs limited (does
       * not use a license; no access to the team's shared quota).
       */
      membership_type: TeamMembershipType;
      /**
       * The date and time the user joined as a member of a specific team.
       */
      joined_on?: common.DropboxTimestamp;
      /**
       * Persistent ID that a team can attach to the user. The persistent ID is
       * unique ID to be used for SAML authentication.
       */
      persistent_id?: string;
    }

    /**
     * The user is not a member of the team.
     */
    export interface MemberSelectorErrorUserNotInTeam {
      '.tag': 'user_not_in_team';
    }

    export type MemberSelectorError = UserSelectorError | MemberSelectorErrorUserNotInTeam;

    export interface MembersAddArg {
      /**
       * Details of new members to be added to the team.
       */
      new_members: Array<MemberAddArg>;
      /**
       * Defaults to False.
       */
      force_async?: boolean;
    }

    /**
     * The asynchronous job has finished. For each member that was specified in
     * the parameter team.MembersAddArg that was provided to membersAdd(), a
     * corresponding item is returned in this list.
     */
    export interface MembersAddJobStatusComplete {
      '.tag': 'complete';
      complete: Array<MemberAddResult>;
    }

    /**
     * The asynchronous job returned an error. The string contains an error
     * message.
     */
    export interface MembersAddJobStatusFailed {
      '.tag': 'failed';
      failed: string;
    }

    export type MembersAddJobStatus = async.PollResultBase | MembersAddJobStatusComplete | MembersAddJobStatusFailed;

    export interface MembersAddLaunchComplete {
      '.tag': 'complete';
      complete: Array<MemberAddResult>;
    }

    export type MembersAddLaunch = async.LaunchResultBase | MembersAddLaunchComplete;

    /**
     * Exactly one of team_member_id, email, or external_id must be provided to
     * identify the user account.
     */
    export interface MembersDeactivateArg {
      /**
       * Identity of user to remove/suspend.
       */
      user: UserSelectorArg;
      /**
       * Defaults to True.
       */
      wipe_data?: boolean;
    }

    /**
     * The user is not a member of the team.
     */
    export interface MembersDeactivateErrorUserNotInTeam {
      '.tag': 'user_not_in_team';
    }

    export interface MembersDeactivateErrorOther {
      '.tag': 'other';
    }

    export type MembersDeactivateError = UserSelectorError | MembersDeactivateErrorUserNotInTeam | MembersDeactivateErrorOther;

    export interface MembersGetInfoArgs {
      /**
       * List of team members.
       */
      members: Array<UserSelectorArg>;
    }

    export interface MembersGetInfoErrorOther {
      '.tag': 'other';
    }

    export type MembersGetInfoError = MembersGetInfoErrorOther;

    /**
     * An ID that was provided as a parameter to membersGetInfo(), and did not
     * match a corresponding user. This might be a team_member_id, an email, or
     * an external ID, depending on how the method was called.
     */
    export interface MembersGetInfoItemIdNotFound {
      '.tag': 'id_not_found';
      id_not_found: string;
    }

    /**
     * Info about a team member.
     */
    export interface MembersGetInfoItemMemberInfo {
      '.tag': 'member_info';
      member_info: TeamMemberInfo;
    }

    /**
     * Describes a result obtained for a single user whose id was specified in
     * the parameter of membersGetInfo().
     */
    export type MembersGetInfoItem = MembersGetInfoItemIdNotFound | MembersGetInfoItemMemberInfo;

    export interface MembersListArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
      /**
       * Defaults to False.
       */
      include_removed?: boolean;
    }

    export interface MembersListContinueArg {
      /**
       * Indicates from what point to get the next set of members.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface MembersListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface MembersListContinueErrorOther {
      '.tag': 'other';
    }

    export type MembersListContinueError = MembersListContinueErrorInvalidCursor | MembersListContinueErrorOther;

    export interface MembersListErrorOther {
      '.tag': 'other';
    }

    export type MembersListError = MembersListErrorOther;

    export interface MembersListResult {
      /**
       * List of team members.
       */
      members: Array<TeamMemberInfo>;
      /**
       * Pass the cursor into membersListContinue() to obtain the additional
       * members.
       */
      cursor: string;
      /**
       * Is true if there are additional team members that have not been
       * returned yet. An additional call to membersListContinue() can retrieve
       * them.
       */
      has_more: boolean;
    }

    /**
     * Exactly one of team_member_id, email, or external_id must be provided to
     * identify the user account.
     */
    export interface MembersRecoverArg {
      /**
       * Identity of user to recover.
       */
      user: UserSelectorArg;
    }

    /**
     * The user is not recoverable.
     */
    export interface MembersRecoverErrorUserUnrecoverable {
      '.tag': 'user_unrecoverable';
    }

    /**
     * The user is not a member of the team.
     */
    export interface MembersRecoverErrorUserNotInTeam {
      '.tag': 'user_not_in_team';
    }

    /**
     * Team is full. The organization has no available licenses.
     */
    export interface MembersRecoverErrorTeamLicenseLimit {
      '.tag': 'team_license_limit';
    }

    export interface MembersRecoverErrorOther {
      '.tag': 'other';
    }

    export type MembersRecoverError = UserSelectorError | MembersRecoverErrorUserUnrecoverable | MembersRecoverErrorUserNotInTeam | MembersRecoverErrorTeamLicenseLimit | MembersRecoverErrorOther;

    export interface MembersRemoveArg extends MembersDeactivateArg {
      /**
       * If provided, files from the deleted member account will be transferred
       * to this user.
       */
      transfer_dest_id?: UserSelectorArg;
      /**
       * If provided, errors during the transfer process will be sent via email
       * to this user. If the transfer_dest_id argument was provided, then this
       * argument must be provided as well.
       */
      transfer_admin_id?: UserSelectorArg;
      /**
       * Defaults to False.
       */
      keep_account?: boolean;
    }

    /**
     * The user is the last admin of the team, so it cannot be removed from it.
     */
    export interface MembersRemoveErrorRemoveLastAdmin {
      '.tag': 'remove_last_admin';
    }

    /**
     * Expected removed user and transfer_dest user to be different.
     */
    export interface MembersRemoveErrorRemovedAndTransferDestShouldDiffer {
      '.tag': 'removed_and_transfer_dest_should_differ';
    }

    /**
     * Expected removed user and transfer_admin user to be different.
     */
    export interface MembersRemoveErrorRemovedAndTransferAdminShouldDiffer {
      '.tag': 'removed_and_transfer_admin_should_differ';
    }

    /**
     * No matching user found for the argument transfer_dest_id.
     */
    export interface MembersRemoveErrorTransferDestUserNotFound {
      '.tag': 'transfer_dest_user_not_found';
    }

    /**
     * The provided transfer_dest_id does not exist on this team.
     */
    export interface MembersRemoveErrorTransferDestUserNotInTeam {
      '.tag': 'transfer_dest_user_not_in_team';
    }

    /**
     * No matching user found for the argument transfer_admin_id.
     */
    export interface MembersRemoveErrorTransferAdminUserNotFound {
      '.tag': 'transfer_admin_user_not_found';
    }

    /**
     * The provided transfer_admin_id does not exist on this team.
     */
    export interface MembersRemoveErrorTransferAdminUserNotInTeam {
      '.tag': 'transfer_admin_user_not_in_team';
    }

    /**
     * The transfer_admin_id argument must be provided when file transfer is
     * requested.
     */
    export interface MembersRemoveErrorUnspecifiedTransferAdminId {
      '.tag': 'unspecified_transfer_admin_id';
    }

    /**
     * Specified transfer_admin user is not a team admin.
     */
    export interface MembersRemoveErrorTransferAdminIsNotAdmin {
      '.tag': 'transfer_admin_is_not_admin';
    }

    /**
     * Cannot keep account and transfer the data to another user at the same
     * time.
     */
    export interface MembersRemoveErrorCannotKeepAccountAndTransfer {
      '.tag': 'cannot_keep_account_and_transfer';
    }

    /**
     * Cannot keep account and delete the data at the same time. To keep the
     * account the argument wipe_data should be set to False.
     */
    export interface MembersRemoveErrorCannotKeepAccountAndDeleteData {
      '.tag': 'cannot_keep_account_and_delete_data';
    }

    /**
     * The email address of the user is too long to be disabled.
     */
    export interface MembersRemoveErrorEmailAddressTooLongToBeDisabled {
      '.tag': 'email_address_too_long_to_be_disabled';
    }

    export type MembersRemoveError = MembersDeactivateError | MembersRemoveErrorRemoveLastAdmin | MembersRemoveErrorRemovedAndTransferDestShouldDiffer | MembersRemoveErrorRemovedAndTransferAdminShouldDiffer | MembersRemoveErrorTransferDestUserNotFound | MembersRemoveErrorTransferDestUserNotInTeam | MembersRemoveErrorTransferAdminUserNotFound | MembersRemoveErrorTransferAdminUserNotInTeam | MembersRemoveErrorUnspecifiedTransferAdminId | MembersRemoveErrorTransferAdminIsNotAdmin | MembersRemoveErrorCannotKeepAccountAndTransfer | MembersRemoveErrorCannotKeepAccountAndDeleteData | MembersRemoveErrorEmailAddressTooLongToBeDisabled;

    export interface MembersSendWelcomeErrorOther {
      '.tag': 'other';
    }

    export type MembersSendWelcomeError = MemberSelectorError | MembersSendWelcomeErrorOther;

    /**
     * Exactly one of team_member_id, email, or external_id must be provided to
     * identify the user account.
     */
    export interface MembersSetPermissionsArg {
      /**
       * Identity of user whose role will be set.
       */
      user: UserSelectorArg;
      /**
       * The new role of the member.
       */
      new_role: AdminTier;
    }

    /**
     * Cannot remove the admin setting of the last admin.
     */
    export interface MembersSetPermissionsErrorLastAdmin {
      '.tag': 'last_admin';
    }

    /**
     * The user is not a member of the team.
     */
    export interface MembersSetPermissionsErrorUserNotInTeam {
      '.tag': 'user_not_in_team';
    }

    /**
     * Cannot remove/grant permissions.
     */
    export interface MembersSetPermissionsErrorCannotSetPermissions {
      '.tag': 'cannot_set_permissions';
    }

    /**
     * Team is full. The organization has no available licenses.
     */
    export interface MembersSetPermissionsErrorTeamLicenseLimit {
      '.tag': 'team_license_limit';
    }

    export interface MembersSetPermissionsErrorOther {
      '.tag': 'other';
    }

    export type MembersSetPermissionsError = UserSelectorError | MembersSetPermissionsErrorLastAdmin | MembersSetPermissionsErrorUserNotInTeam | MembersSetPermissionsErrorCannotSetPermissions | MembersSetPermissionsErrorTeamLicenseLimit | MembersSetPermissionsErrorOther;

    export interface MembersSetPermissionsResult {
      /**
       * The member ID of the user to which the change was applied.
       */
      team_member_id: team_common.TeamMemberId;
      /**
       * The role after the change.
       */
      role: AdminTier;
    }

    /**
     * Exactly one of team_member_id, email, or external_id must be provided to
     * identify the user account. At least one of new_email, new_external_id,
     * new_given_name, and/or new_surname must be provided.
     */
    export interface MembersSetProfileArg {
      /**
       * Identity of user whose profile will be set.
       */
      user: UserSelectorArg;
      /**
       * New email for member.
       */
      new_email?: common.EmailAddress;
      /**
       * New external ID for member.
       */
      new_external_id?: team_common.MemberExternalId;
      /**
       * New given name for member.
       */
      new_given_name?: common.OptionalNamePart;
      /**
       * New surname for member.
       */
      new_surname?: common.OptionalNamePart;
      /**
       * New persistent ID. This field only available to teams using persistent
       * ID SAML configuration.
       */
      new_persistent_id?: string;
    }

    /**
     * It is unsafe to use both external_id and new_external_id.
     */
    export interface MembersSetProfileErrorExternalIdAndNewExternalIdUnsafe {
      '.tag': 'external_id_and_new_external_id_unsafe';
    }

    /**
     * None of new_email, new_given_name, new_surname, or new_external_id are
     * specified.
     */
    export interface MembersSetProfileErrorNoNewDataSpecified {
      '.tag': 'no_new_data_specified';
    }

    /**
     * Email is already reserved for another user.
     */
    export interface MembersSetProfileErrorEmailReservedForOtherUser {
      '.tag': 'email_reserved_for_other_user';
    }

    /**
     * The external ID is already in use by another team member.
     */
    export interface MembersSetProfileErrorExternalIdUsedByOtherUser {
      '.tag': 'external_id_used_by_other_user';
    }

    /**
     * Modifying deleted users is not allowed.
     */
    export interface MembersSetProfileErrorSetProfileDisallowed {
      '.tag': 'set_profile_disallowed';
    }

    /**
     * Parameter new_email cannot be empty.
     */
    export interface MembersSetProfileErrorParamCannotBeEmpty {
      '.tag': 'param_cannot_be_empty';
    }

    /**
     * Persistent ID is only available to teams with persistent ID SAML
     * configuration. Please contact Dropbox for more information.
     */
    export interface MembersSetProfileErrorPersistentIdDisabled {
      '.tag': 'persistent_id_disabled';
    }

    /**
     * The persistent ID is already in use by another team member.
     */
    export interface MembersSetProfileErrorPersistentIdUsedByOtherUser {
      '.tag': 'persistent_id_used_by_other_user';
    }

    export interface MembersSetProfileErrorOther {
      '.tag': 'other';
    }

    export type MembersSetProfileError = MemberSelectorError | MembersSetProfileErrorExternalIdAndNewExternalIdUnsafe | MembersSetProfileErrorNoNewDataSpecified | MembersSetProfileErrorEmailReservedForOtherUser | MembersSetProfileErrorExternalIdUsedByOtherUser | MembersSetProfileErrorSetProfileDisallowed | MembersSetProfileErrorParamCannotBeEmpty | MembersSetProfileErrorPersistentIdDisabled | MembersSetProfileErrorPersistentIdUsedByOtherUser | MembersSetProfileErrorOther;

    /**
     * The user is not active, so it cannot be suspended.
     */
    export interface MembersSuspendErrorSuspendInactiveUser {
      '.tag': 'suspend_inactive_user';
    }

    /**
     * The user is the last admin of the team, so it cannot be suspended.
     */
    export interface MembersSuspendErrorSuspendLastAdmin {
      '.tag': 'suspend_last_admin';
    }

    /**
     * Team is full. The organization has no available licenses.
     */
    export interface MembersSuspendErrorTeamLicenseLimit {
      '.tag': 'team_license_limit';
    }

    export type MembersSuspendError = MembersDeactivateError | MembersSuspendErrorSuspendInactiveUser | MembersSuspendErrorSuspendLastAdmin | MembersSuspendErrorTeamLicenseLimit;

    /**
     * Exactly one of team_member_id, email, or external_id must be provided to
     * identify the user account.
     */
    export interface MembersUnsuspendArg {
      /**
       * Identity of user to unsuspend.
       */
      user: UserSelectorArg;
    }

    /**
     * The user is unsuspended, so it cannot be unsuspended again.
     */
    export interface MembersUnsuspendErrorUnsuspendNonSuspendedMember {
      '.tag': 'unsuspend_non_suspended_member';
    }

    /**
     * Team is full. The organization has no available licenses.
     */
    export interface MembersUnsuspendErrorTeamLicenseLimit {
      '.tag': 'team_license_limit';
    }

    export type MembersUnsuspendError = MembersDeactivateError | MembersUnsuspendErrorUnsuspendNonSuspendedMember | MembersUnsuspendErrorTeamLicenseLimit;

    /**
     * Official Dropbox iPhone client.
     */
    export interface MobileClientPlatformIphone {
      '.tag': 'iphone';
    }

    /**
     * Official Dropbox iPad client.
     */
    export interface MobileClientPlatformIpad {
      '.tag': 'ipad';
    }

    /**
     * Official Dropbox Android client.
     */
    export interface MobileClientPlatformAndroid {
      '.tag': 'android';
    }

    /**
     * Official Dropbox Windows phone client.
     */
    export interface MobileClientPlatformWindowsPhone {
      '.tag': 'windows_phone';
    }

    /**
     * Official Dropbox Blackberry client.
     */
    export interface MobileClientPlatformBlackberry {
      '.tag': 'blackberry';
    }

    export interface MobileClientPlatformOther {
      '.tag': 'other';
    }

    export type MobileClientPlatform = MobileClientPlatformIphone | MobileClientPlatformIpad | MobileClientPlatformAndroid | MobileClientPlatformWindowsPhone | MobileClientPlatformBlackberry | MobileClientPlatformOther;

    /**
     * Information about linked Dropbox mobile client sessions.
     */
    export interface MobileClientSession extends DeviceSession {
      /**
       * The device name.
       */
      device_name: string;
      /**
       * The mobile application type.
       */
      client_type: MobileClientPlatform;
      /**
       * The dropbox client version.
       */
      client_version?: string;
      /**
       * The hosting OS version.
       */
      os_version?: string;
      /**
       * last carrier used by the device.
       */
      last_carrier?: string;
    }

    /**
     * Properties of a namespace.
     */
    export interface NamespaceMetadata {
      /**
       * The name of this namespace.
       */
      name: string;
      /**
       * The ID of this namespace.
       */
      namespace_id: common.SharedFolderId;
      /**
       * The type of this namespace.
       */
      namespace_type: NamespaceType;
      /**
       * If this is a team member folder, the ID of the team member. Otherwise,
       * this field is not present.
       */
      team_member_id?: team_common.TeamMemberId;
    }

    /**
     * App sandbox folder.
     */
    export interface NamespaceTypeAppFolder {
      '.tag': 'app_folder';
    }

    /**
     * Shared folder.
     */
    export interface NamespaceTypeSharedFolder {
      '.tag': 'shared_folder';
    }

    /**
     * Top-level team-owned folder.
     */
    export interface NamespaceTypeTeamFolder {
      '.tag': 'team_folder';
    }

    /**
     * Team member's home folder.
     */
    export interface NamespaceTypeTeamMemberFolder {
      '.tag': 'team_member_folder';
    }

    export interface NamespaceTypeOther {
      '.tag': 'other';
    }

    export type NamespaceType = NamespaceTypeAppFolder | NamespaceTypeSharedFolder | NamespaceTypeTeamFolder | NamespaceTypeTeamMemberFolder | NamespaceTypeOther;

    /**
     * Successfully removed user.
     */
    export interface RemoveCustomQuotaResultSuccess {
      '.tag': 'success';
      success: UserSelectorArg;
    }

    /**
     * Invalid user (not in team).
     */
    export interface RemoveCustomQuotaResultInvalidUser {
      '.tag': 'invalid_user';
      invalid_user: UserSelectorArg;
    }

    export interface RemoveCustomQuotaResultOther {
      '.tag': 'other';
    }

    /**
     * User result for setting member custom quota.
     */
    export type RemoveCustomQuotaResult = RemoveCustomQuotaResultSuccess | RemoveCustomQuotaResultInvalidUser | RemoveCustomQuotaResultOther;

    export interface RemovedStatus {
      /**
       * True if the removed team member is recoverable.
       */
      is_recoverable: boolean;
    }

    export interface RevokeDesktopClientArg extends DeviceSessionArg {
      /**
       * Defaults to False.
       */
      delete_on_unlink?: boolean;
    }

    /**
     * End an active session.
     */
    export interface RevokeDeviceSessionArgWebSession {
      '.tag': 'web_session';
      web_session: DeviceSessionArg;
    }

    /**
     * Unlink a linked desktop device.
     */
    export interface RevokeDeviceSessionArgDesktopClient {
      '.tag': 'desktop_client';
      desktop_client: RevokeDesktopClientArg;
    }

    /**
     * Unlink a linked mobile device.
     */
    export interface RevokeDeviceSessionArgMobileClient {
      '.tag': 'mobile_client';
      mobile_client: DeviceSessionArg;
    }

    export type RevokeDeviceSessionArg = RevokeDeviceSessionArgWebSession | RevokeDeviceSessionArgDesktopClient | RevokeDeviceSessionArgMobileClient;

    export interface RevokeDeviceSessionBatchArg {
      revoke_devices: Array<RevokeDeviceSessionArg>;
    }

    export interface RevokeDeviceSessionBatchErrorOther {
      '.tag': 'other';
    }

    export type RevokeDeviceSessionBatchError = RevokeDeviceSessionBatchErrorOther;

    export interface RevokeDeviceSessionBatchResult {
      revoke_devices_status: Array<RevokeDeviceSessionStatus>;
    }

    /**
     * Device session not found.
     */
    export interface RevokeDeviceSessionErrorDeviceSessionNotFound {
      '.tag': 'device_session_not_found';
    }

    /**
     * Member not found.
     */
    export interface RevokeDeviceSessionErrorMemberNotFound {
      '.tag': 'member_not_found';
    }

    export interface RevokeDeviceSessionErrorOther {
      '.tag': 'other';
    }

    export type RevokeDeviceSessionError = RevokeDeviceSessionErrorDeviceSessionNotFound | RevokeDeviceSessionErrorMemberNotFound | RevokeDeviceSessionErrorOther;

    export interface RevokeDeviceSessionStatus {
      /**
       * Result of the revoking request.
       */
      success: boolean;
      /**
       * The error cause in case of a failure.
       */
      error_type?: RevokeDeviceSessionError;
    }

    export interface RevokeLinkedApiAppArg {
      /**
       * The application's unique id.
       */
      app_id: string;
      /**
       * The unique id of the member owning the device.
       */
      team_member_id: string;
      /**
       * Defaults to True.
       */
      keep_app_folder?: boolean;
    }

    export interface RevokeLinkedApiAppBatchArg {
      revoke_linked_app: Array<RevokeLinkedApiAppArg>;
    }

    export interface RevokeLinkedAppBatchErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by linkedAppsRevokeLinkedAppBatch().
     */
    export type RevokeLinkedAppBatchError = RevokeLinkedAppBatchErrorOther;

    export interface RevokeLinkedAppBatchResult {
      revoke_linked_app_status: Array<RevokeLinkedAppStatus>;
    }

    /**
     * Application not found.
     */
    export interface RevokeLinkedAppErrorAppNotFound {
      '.tag': 'app_not_found';
    }

    /**
     * Member not found.
     */
    export interface RevokeLinkedAppErrorMemberNotFound {
      '.tag': 'member_not_found';
    }

    export interface RevokeLinkedAppErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by linkedAppsRevokeLinkedApp().
     */
    export type RevokeLinkedAppError = RevokeLinkedAppErrorAppNotFound | RevokeLinkedAppErrorMemberNotFound | RevokeLinkedAppErrorOther;

    export interface RevokeLinkedAppStatus {
      /**
       * Result of the revoking request.
       */
      success: boolean;
      /**
       * The error cause in case of a failure.
       */
      error_type?: RevokeLinkedAppError;
    }

    export interface SetCustomQuotaArg {
      /**
       * List of users and their custom quotas.
       */
      users_and_quotas: Array<UserCustomQuotaArg>;
    }

    /**
     * Some of the users are on the excluded users list and can't have custom
     * quota set.
     */
    export interface SetCustomQuotaErrorSomeUsersAreExcluded {
      '.tag': 'some_users_are_excluded';
    }

    /**
     * Error returned when setting member custom quota.
     */
    export type SetCustomQuotaError = CustomQuotaError | SetCustomQuotaErrorSomeUsersAreExcluded;

    /**
     * Describes the number of users in a specific storage bucket.
     */
    export interface StorageBucket {
      /**
       * The name of the storage bucket. For example, '1G' is a bucket of users
       * with storage size up to 1 Giga.
       */
      bucket: string;
      /**
       * The number of people whose storage is in the range of this storage
       * bucket.
       */
      users: number;
    }

    /**
     * The team folder ID is invalid.
     */
    export interface TeamFolderAccessErrorInvalidTeamFolderId {
      '.tag': 'invalid_team_folder_id';
    }

    /**
     * The authenticated app does not have permission to manage that team
     * folder.
     */
    export interface TeamFolderAccessErrorNoAccess {
      '.tag': 'no_access';
    }

    export interface TeamFolderAccessErrorOther {
      '.tag': 'other';
    }

    export type TeamFolderAccessError = TeamFolderAccessErrorInvalidTeamFolderId | TeamFolderAccessErrorNoAccess | TeamFolderAccessErrorOther;

    export type TeamFolderActivateError = BaseTeamFolderError;

    export interface TeamFolderArchiveArg extends TeamFolderIdArg {
      /**
       * Defaults to False.
       */
      force_async_off?: boolean;
    }

    export type TeamFolderArchiveError = BaseTeamFolderError;

    /**
     * The archive job has finished. The value is the metadata for the resulting
     * team folder.
     */
    export interface TeamFolderArchiveJobStatusComplete {
      '.tag': 'complete';
      complete: TeamFolderMetadata;
    }

    /**
     * Error occurred while performing an asynchronous job from
     * teamFolderArchive().
     */
    export interface TeamFolderArchiveJobStatusFailed {
      '.tag': 'failed';
      failed: TeamFolderArchiveError;
    }

    export type TeamFolderArchiveJobStatus = async.PollResultBase | TeamFolderArchiveJobStatusComplete | TeamFolderArchiveJobStatusFailed;

    export interface TeamFolderArchiveLaunchComplete {
      '.tag': 'complete';
      complete: TeamFolderMetadata;
    }

    export type TeamFolderArchiveLaunch = async.LaunchResultBase | TeamFolderArchiveLaunchComplete;

    export interface TeamFolderCreateArg {
      /**
       * Name for the new team folder.
       */
      name: string;
    }

    /**
     * The provided name cannot be used.
     */
    export interface TeamFolderCreateErrorInvalidFolderName {
      '.tag': 'invalid_folder_name';
    }

    /**
     * There is already a team folder with the provided name.
     */
    export interface TeamFolderCreateErrorFolderNameAlreadyUsed {
      '.tag': 'folder_name_already_used';
    }

    /**
     * The provided name cannot be used because it is reserved.
     */
    export interface TeamFolderCreateErrorFolderNameReserved {
      '.tag': 'folder_name_reserved';
    }

    export interface TeamFolderCreateErrorOther {
      '.tag': 'other';
    }

    export type TeamFolderCreateError = TeamFolderCreateErrorInvalidFolderName | TeamFolderCreateErrorFolderNameAlreadyUsed | TeamFolderCreateErrorFolderNameReserved | TeamFolderCreateErrorOther;

    /**
     * An ID that was provided as a parameter to teamFolderGetInfo() did not
     * match any of the team's team folders.
     */
    export interface TeamFolderGetInfoItemIdNotFound {
      '.tag': 'id_not_found';
      id_not_found: string;
    }

    /**
     * Properties of a team folder.
     */
    export interface TeamFolderGetInfoItemTeamFolderMetadata {
      '.tag': 'team_folder_metadata';
      team_folder_metadata: TeamFolderMetadata;
    }

    export type TeamFolderGetInfoItem = TeamFolderGetInfoItemIdNotFound | TeamFolderGetInfoItemTeamFolderMetadata;

    export interface TeamFolderIdArg {
      /**
       * The ID of the team folder.
       */
      team_folder_id: common.SharedFolderId;
    }

    export interface TeamFolderIdListArg {
      /**
       * The list of team folder IDs.
       */
      team_folder_ids: Array<common.SharedFolderId>;
    }

    /**
     * The folder is active and the operation did not succeed.
     */
    export interface TeamFolderInvalidStatusErrorActive {
      '.tag': 'active';
    }

    /**
     * The folder is archived and the operation did not succeed.
     */
    export interface TeamFolderInvalidStatusErrorArchived {
      '.tag': 'archived';
    }

    /**
     * The folder is being archived and the operation did not succeed.
     */
    export interface TeamFolderInvalidStatusErrorArchiveInProgress {
      '.tag': 'archive_in_progress';
    }

    export interface TeamFolderInvalidStatusErrorOther {
      '.tag': 'other';
    }

    export type TeamFolderInvalidStatusError = TeamFolderInvalidStatusErrorActive | TeamFolderInvalidStatusErrorArchived | TeamFolderInvalidStatusErrorArchiveInProgress | TeamFolderInvalidStatusErrorOther;

    export interface TeamFolderListArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface TeamFolderListContinueArg {
      /**
       * Indicates from what point to get the next set of team folders.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface TeamFolderListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface TeamFolderListContinueErrorOther {
      '.tag': 'other';
    }

    export type TeamFolderListContinueError = TeamFolderListContinueErrorInvalidCursor | TeamFolderListContinueErrorOther;

    export interface TeamFolderListError {
      access_error: TeamFolderAccessError;
    }

    /**
     * Result for teamFolderList() and teamFolderListContinue().
     */
    export interface TeamFolderListResult {
      /**
       * List of all team folders in the authenticated team.
       */
      team_folders: Array<TeamFolderMetadata>;
      /**
       * Pass the cursor into teamFolderListContinue() to obtain additional team
       * folders.
       */
      cursor: string;
      /**
       * Is true if there are additional team folders that have not been
       * returned yet. An additional call to teamFolderListContinue() can
       * retrieve them.
       */
      has_more: boolean;
    }

    /**
     * Properties of a team folder.
     */
    export interface TeamFolderMetadata {
      /**
       * The ID of the team folder.
       */
      team_folder_id: common.SharedFolderId;
      /**
       * The name of the team folder.
       */
      name: string;
      /**
       * The status of the team folder.
       */
      status: TeamFolderStatus;
      /**
       * True if this team folder is the team shared dropbox.
       */
      is_team_shared_dropbox: boolean;
    }

    export type TeamFolderPermanentlyDeleteError = BaseTeamFolderError;

    export interface TeamFolderRenameArg extends TeamFolderIdArg {
      /**
       * New team folder name.
       */
      name: string;
    }

    /**
     * The provided folder name cannot be used.
     */
    export interface TeamFolderRenameErrorInvalidFolderName {
      '.tag': 'invalid_folder_name';
    }

    /**
     * There is already a team folder with the same name.
     */
    export interface TeamFolderRenameErrorFolderNameAlreadyUsed {
      '.tag': 'folder_name_already_used';
    }

    /**
     * The provided name cannot be used because it is reserved.
     */
    export interface TeamFolderRenameErrorFolderNameReserved {
      '.tag': 'folder_name_reserved';
    }

    export type TeamFolderRenameError = BaseTeamFolderError | TeamFolderRenameErrorInvalidFolderName | TeamFolderRenameErrorFolderNameAlreadyUsed | TeamFolderRenameErrorFolderNameReserved;

    /**
     * The team folder and sub-folders are available to all members.
     */
    export interface TeamFolderStatusActive {
      '.tag': 'active';
    }

    /**
     * The team folder is not accessible outside of the team folder manager.
     */
    export interface TeamFolderStatusArchived {
      '.tag': 'archived';
    }

    /**
     * The team folder is not accessible outside of the team folder manager.
     */
    export interface TeamFolderStatusArchiveInProgress {
      '.tag': 'archive_in_progress';
    }

    export interface TeamFolderStatusOther {
      '.tag': 'other';
    }

    export type TeamFolderStatus = TeamFolderStatusActive | TeamFolderStatusArchived | TeamFolderStatusArchiveInProgress | TeamFolderStatusOther;

    /**
     * This action is not allowed for a team shared dropbox.
     */
    export interface TeamFolderTeamSharedDropboxErrorDisallowed {
      '.tag': 'disallowed';
    }

    export interface TeamFolderTeamSharedDropboxErrorOther {
      '.tag': 'other';
    }

    export type TeamFolderTeamSharedDropboxError = TeamFolderTeamSharedDropboxErrorDisallowed | TeamFolderTeamSharedDropboxErrorOther;

    export interface TeamGetInfoResult {
      /**
       * The name of the team.
       */
      name: string;
      /**
       * The ID of the team.
       */
      team_id: string;
      /**
       * The number of licenses available to the team.
       */
      num_licensed_users: number;
      /**
       * The number of accounts that have been invited or are already active
       * members of the team.
       */
      num_provisioned_users: number;
      policies: team_policies.TeamMemberPolicies;
    }

    /**
     * Information about a team member.
     */
    export interface TeamMemberInfo {
      /**
       * Profile of a user as a member of a team.
       */
      profile: TeamMemberProfile;
      /**
       * The user's role in the team.
       */
      role: AdminTier;
    }

    /**
     * Profile of a user as a member of a team.
     */
    export interface TeamMemberProfile extends MemberProfile {
      /**
       * List of group IDs of groups that the user belongs to.
       */
      groups: Array<team_common.GroupId>;
      /**
       * The namespace id of the user's root folder.
       */
      member_folder_id: common.NamespaceId;
    }

    /**
     * User has successfully joined the team.
     */
    export interface TeamMemberStatusActive {
      '.tag': 'active';
    }

    /**
     * User has been invited to a team, but has not joined the team yet.
     */
    export interface TeamMemberStatusInvited {
      '.tag': 'invited';
    }

    /**
     * User is no longer a member of the team, but the account can be
     * un-suspended, re-establishing the user as a team member.
     */
    export interface TeamMemberStatusSuspended {
      '.tag': 'suspended';
    }

    /**
     * User is no longer a member of the team. Removed users are only listed
     * when include_removed is true in members/list.
     */
    export interface TeamMemberStatusRemoved {
      '.tag': 'removed';
      removed: RemovedStatus;
    }

    /**
     * The user's status as a member of a specific team.
     */
    export type TeamMemberStatus = TeamMemberStatusActive | TeamMemberStatusInvited | TeamMemberStatusSuspended | TeamMemberStatusRemoved;

    /**
     * User uses a license and has full access to team resources like the shared
     * quota.
     */
    export interface TeamMembershipTypeFull {
      '.tag': 'full';
    }

    /**
     * User does not have access to the shared quota and team admins have
     * restricted administrative control.
     */
    export interface TeamMembershipTypeLimited {
      '.tag': 'limited';
    }

    export type TeamMembershipType = TeamMembershipTypeFull | TeamMembershipTypeLimited;

    export interface TeamNamespacesListArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
    }

    export interface TeamNamespacesListContinueArg {
      /**
       * Indicates from what point to get the next set of team-accessible
       * namespaces.
       */
      cursor: string;
    }

    /**
     * The cursor is invalid.
     */
    export interface TeamNamespacesListContinueErrorInvalidCursor {
      '.tag': 'invalid_cursor';
    }

    export interface TeamNamespacesListContinueErrorOther {
      '.tag': 'other';
    }

    export type TeamNamespacesListContinueError = TeamNamespacesListContinueErrorInvalidCursor | TeamNamespacesListContinueErrorOther;

    /**
     * Result for namespacesList().
     */
    export interface TeamNamespacesListResult {
      /**
       * List of all namespaces the team can access.
       */
      namespaces: Array<NamespaceMetadata>;
      /**
       * Pass the cursor into namespacesListContinue() to obtain additional
       * namespaces. Note that duplicate namespaces may be returned.
       */
      cursor: string;
      /**
       * Is true if there are additional namespaces that have not been returned
       * yet.
       */
      has_more: boolean;
    }

    /**
     * The current token is not associated with a team admin, because mappings
     * were not recorded when the token was created. Consider re-authorizing a
     * new access token to record its authenticating admin.
     */
    export interface TokenGetAuthenticatedAdminErrorMappingNotFound {
      '.tag': 'mapping_not_found';
    }

    /**
     * Either the team admin that authorized this token is no longer an active
     * member of the team or no longer a team admin.
     */
    export interface TokenGetAuthenticatedAdminErrorAdminNotActive {
      '.tag': 'admin_not_active';
    }

    export interface TokenGetAuthenticatedAdminErrorOther {
      '.tag': 'other';
    }

    /**
     * Error returned by tokenGetAuthenticatedAdmin().
     */
    export type TokenGetAuthenticatedAdminError = TokenGetAuthenticatedAdminErrorMappingNotFound | TokenGetAuthenticatedAdminErrorAdminNotActive | TokenGetAuthenticatedAdminErrorOther;

    /**
     * Results for tokenGetAuthenticatedAdmin().
     */
    export interface TokenGetAuthenticatedAdminResult {
      /**
       * The admin who authorized the token.
       */
      admin_profile: TeamMemberProfile;
    }

    /**
     * This team has unlimited upload API quota. So far both server version
     * account and legacy  account type have unlimited monthly upload api quota.
     */
    export interface UploadApiRateLimitValueUnlimited {
      '.tag': 'unlimited';
    }

    /**
     * The number of upload API calls allowed per month.
     */
    export interface UploadApiRateLimitValueLimit {
      '.tag': 'limit';
      limit: number;
    }

    export interface UploadApiRateLimitValueOther {
      '.tag': 'other';
    }

    /**
     * The value for Feature.upload_api_rate_limit.
     */
    export type UploadApiRateLimitValue = UploadApiRateLimitValueUnlimited | UploadApiRateLimitValueLimit | UploadApiRateLimitValueOther;

    /**
     * User and their required custom quota in GB (1 TB = 1024 GB).
     */
    export interface UserCustomQuotaArg {
      user: UserSelectorArg;
      quota_gb: UserQuota;
    }

    /**
     * User and their custom quota in GB (1 TB = 1024 GB).  No quota returns if
     * the user has no custom quota set.
     */
    export interface UserCustomQuotaResult {
      user: UserSelectorArg;
      quota_gb?: UserQuota;
    }

    export interface UserSelectorArgTeamMemberId {
      '.tag': 'team_member_id';
      team_member_id: team_common.TeamMemberId;
    }

    export interface UserSelectorArgExternalId {
      '.tag': 'external_id';
      external_id: team_common.MemberExternalId;
    }

    export interface UserSelectorArgEmail {
      '.tag': 'email';
      email: common.EmailAddress;
    }

    /**
     * Argument for selecting a single user, either by team_member_id,
     * external_id or email.
     */
    export type UserSelectorArg = UserSelectorArgTeamMemberId | UserSelectorArgExternalId | UserSelectorArgEmail;

    /**
     * No matching user found. The provided team_member_id, email, or
     * external_id does not exist on this team.
     */
    export interface UserSelectorErrorUserNotFound {
      '.tag': 'user_not_found';
    }

    /**
     * Error that can be returned whenever a struct derived from
     * team.UserSelectorArg is used.
     */
    export type UserSelectorError = UserSelectorErrorUserNotFound;

    /**
     * List of member IDs.
     */
    export interface UsersSelectorArgTeamMemberIds {
      '.tag': 'team_member_ids';
      team_member_ids: Array<team_common.TeamMemberId>;
    }

    /**
     * List of external user IDs.
     */
    export interface UsersSelectorArgExternalIds {
      '.tag': 'external_ids';
      external_ids: Array<team_common.MemberExternalId>;
    }

    /**
     * List of email addresses.
     */
    export interface UsersSelectorArgEmails {
      '.tag': 'emails';
      emails: Array<common.EmailAddress>;
    }

    /**
     * Argument for selecting a list of users, either by team_member_ids,
     * external_ids or emails.
     */
    export type UsersSelectorArg = UsersSelectorArgTeamMemberIds | UsersSelectorArgExternalIds | UsersSelectorArgEmails;

    export type GroupsGetInfoResult = Array<GroupsGetInfoItem>;

    export type MembersGetInfoResult = Array<MembersGetInfoItem>;

    export type NumberPerDay = Array<Object>;

    export type UserQuota = number;

  }

  namespace team_common {
    /**
     * A group which is managed by selected users.
     */
    export interface GroupManagementTypeUserManaged {
      '.tag': 'user_managed';
    }

    /**
     * A group which is managed by team admins only.
     */
    export interface GroupManagementTypeCompanyManaged {
      '.tag': 'company_managed';
    }

    /**
     * A group which is managed automatically by Dropbox.
     */
    export interface GroupManagementTypeSystemManaged {
      '.tag': 'system_managed';
    }

    export interface GroupManagementTypeOther {
      '.tag': 'other';
    }

    /**
     * The group type determines how a group is managed.
     */
    export type GroupManagementType = GroupManagementTypeUserManaged | GroupManagementTypeCompanyManaged | GroupManagementTypeSystemManaged | GroupManagementTypeOther;

    /**
     * Information about a group.
     */
    export interface GroupSummary {
      group_name: string;
      group_id: GroupId;
      /**
       * External ID of group. This is an arbitrary ID that an admin can attach
       * to a group.
       */
      group_external_id?: GroupExternalId;
      /**
       * The number of members in the group.
       */
      member_count?: number;
      /**
       * Who is allowed to manage the group.
       */
      group_management_type: GroupManagementType;
    }

    /**
     * A group to which team members are automatically added. Applicable to
     * [team folders]{@link https://www.dropbox.com/help/986} only.
     */
    export interface GroupTypeTeam {
      '.tag': 'team';
    }

    /**
     * A group is created and managed by a user.
     */
    export interface GroupTypeUserManaged {
      '.tag': 'user_managed';
    }

    export interface GroupTypeOther {
      '.tag': 'other';
    }

    /**
     * The group type determines how a group is created and managed.
     */
    export type GroupType = GroupTypeTeam | GroupTypeUserManaged | GroupTypeOther;

    /**
     * Time range.
     */
    export interface TimeRange {
      /**
       * Optional starting time (inclusive).
       */
      start_time?: common.DropboxTimestamp;
      /**
       * Optional ending time (exclusive).
       */
      end_time?: common.DropboxTimestamp;
    }

    export type GroupExternalId = string;

    export type GroupId = string;

    export type MemberExternalId = string;

    export type ResellerId = string;

    export type TeamMemberId = string;

  }

  namespace team_log {
    /**
     * End user session details.
     */
    export interface AccessMethodLogInfoEndUser {
      '.tag': 'end_user';
      end_user: WebSessionLogInfoReference|DesktopSessionLogInfoReference|MobileSessionLogInfoReference|SessionLogInfoReference;
    }

    /**
     * Sign in as session details.
     */
    export interface AccessMethodLogInfoSignInAs {
      '.tag': 'sign_in_as';
      sign_in_as: WebSessionLogInfo;
    }

    /**
     * Content manager session details.
     */
    export interface AccessMethodLogInfoContentManager {
      '.tag': 'content_manager';
      content_manager: WebSessionLogInfo;
    }

    /**
     * Admin console session details.
     */
    export interface AccessMethodLogInfoAdminConsole {
      '.tag': 'admin_console';
      admin_console: WebSessionLogInfo;
    }

    /**
     * Api session details.
     */
    export interface AccessMethodLogInfoApi {
      '.tag': 'api';
      api: ApiSessionLogInfo;
    }

    export interface AccessMethodLogInfoOther {
      '.tag': 'other';
    }

    /**
     * Indicates the method in which the action was performed.
     */
    export type AccessMethodLogInfo = AccessMethodLogInfoEndUser | AccessMethodLogInfoSignInAs | AccessMethodLogInfoContentManager | AccessMethodLogInfoAdminConsole | AccessMethodLogInfoApi | AccessMethodLogInfoOther;

    export interface AccountCaptureAvailabilityUnavailable {
      '.tag': 'unavailable';
    }

    export interface AccountCaptureAvailabilityAvailable {
      '.tag': 'available';
    }

    export interface AccountCaptureAvailabilityOther {
      '.tag': 'other';
    }

    export type AccountCaptureAvailability = AccountCaptureAvailabilityUnavailable | AccountCaptureAvailabilityAvailable | AccountCaptureAvailabilityOther;

    /**
     * Granted or revoked the option to enable account capture on domains
     * belonging to the team.
     */
    export interface AccountCaptureChangeAvailabilityDetails {
      /**
       * New account capture availabilty value.
       */
      new_value: AccountCaptureAvailability;
      /**
       * Previous account capture availabilty value. Might be missing due to
       * historical data gap.
       */
      previous_value?: AccountCaptureAvailability;
    }

    /**
     * Changed the account capture policy on a domain belonging to the team.
     */
    export interface AccountCaptureChangePolicyDetails {
      /**
       * New account capture policy.
       */
      new_value: AccountCapturePolicy;
      /**
       * Previous account capture policy. Might be missing due to historical
       * data gap.
       */
      previous_value?: AccountCapturePolicy;
    }

    /**
     * Account captured user migrated their account to the team.
     */
    export interface AccountCaptureMigrateAccountDetails {
      /**
       * Domain name.
       */
      domain_name: string;
    }

    export interface AccountCapturePolicyDisabled {
      '.tag': 'disabled';
    }

    export interface AccountCapturePolicyInvitedUsers {
      '.tag': 'invited_users';
    }

    export interface AccountCapturePolicyAllUsers {
      '.tag': 'all_users';
    }

    export interface AccountCapturePolicyOther {
      '.tag': 'other';
    }

    export type AccountCapturePolicy = AccountCapturePolicyDisabled | AccountCapturePolicyInvitedUsers | AccountCapturePolicyAllUsers | AccountCapturePolicyOther;

    /**
     * Account captured user relinquished their account by changing the email
     * address associated with it.
     */
    export interface AccountCaptureRelinquishAccountDetails {
      /**
       * Domain name.
       */
      domain_name: string;
    }

    /**
     * The user who did the action.
     */
    export interface ActorLogInfoUser {
      '.tag': 'user';
      user: TeamMemberLogInfoReference|NonTeamMemberLogInfoReference|UserLogInfoReference;
    }

    /**
     * The admin who did the action.
     */
    export interface ActorLogInfoAdmin {
      '.tag': 'admin';
      admin: TeamMemberLogInfoReference|NonTeamMemberLogInfoReference|UserLogInfoReference;
    }

    /**
     * The application who did the action.
     */
    export interface ActorLogInfoApp {
      '.tag': 'app';
      app: UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference;
    }

    /**
     * Action done by reseller.
     */
    export interface ActorLogInfoReseller {
      '.tag': 'reseller';
      reseller: ResellerLogInfo;
    }

    /**
     * Action done by Dropbox.
     */
    export interface ActorLogInfoDropbox {
      '.tag': 'dropbox';
    }

    export interface ActorLogInfoOther {
      '.tag': 'other';
    }

    /**
     * The entity who performed the action.
     */
    export type ActorLogInfo = ActorLogInfoUser | ActorLogInfoAdmin | ActorLogInfoApp | ActorLogInfoReseller | ActorLogInfoDropbox | ActorLogInfoOther;

    export interface AdminRoleUser {
      '.tag': 'user';
    }

    export interface AdminRoleLimitedAdmin {
      '.tag': 'limited_admin';
    }

    export interface AdminRoleSupportAdmin {
      '.tag': 'support_admin';
    }

    export interface AdminRoleUserManagementAdmin {
      '.tag': 'user_management_admin';
    }

    export interface AdminRoleTeamAdmin {
      '.tag': 'team_admin';
    }

    export interface AdminRoleOther {
      '.tag': 'other';
    }

    export type AdminRole = AdminRoleUser | AdminRoleLimitedAdmin | AdminRoleSupportAdmin | AdminRoleUserManagementAdmin | AdminRoleTeamAdmin | AdminRoleOther;

    /**
     * Disabled allow downloads.
     */
    export interface AllowDownloadDisabledDetails {
    }

    /**
     * Enabled allow downloads.
     */
    export interface AllowDownloadEnabledDetails {
    }

    /**
     * Api session.
     */
    export interface ApiSessionLogInfo {
      /**
       * Api request ID.
       */
      request_id: RequestId;
    }

    /**
     * Linked an app for team.
     */
    export interface AppLinkTeamDetails {
      /**
       * Relevant application details.
       */
      app_info: UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference;
    }

    /**
     * Linked an app for team member.
     */
    export interface AppLinkUserDetails {
      /**
       * Relevant application details.
       */
      app_info: UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference;
    }

    /**
     * App's logged information.
     */
    export interface AppLogInfo {
      /**
       * App unique ID. Might be missing due to historical data gap.
       */
      app_id?: AppId;
      /**
       * App display name. Might be missing due to historical data gap.
       */
      display_name?: string;
    }

    /**
     * Reference to the AppLogInfo polymorphic type. Contains a .tag property to
     * let you discriminate between possible subtypes.
     */
    export interface AppLogInfoReference extends AppLogInfo {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "user_or_team_linked_app"|"user_linked_app"|"team_linked_app";
    }

    /**
     * Unlinked an app for team.
     */
    export interface AppUnlinkTeamDetails {
      /**
       * Relevant application details.
       */
      app_info: UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference;
    }

    /**
     * Unlinked an app for team member.
     */
    export interface AppUnlinkUserDetails {
      /**
       * Relevant application details.
       */
      app_info: UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference;
    }

    /**
     * File's details.
     */
    export interface AssetLogInfoFile {
      '.tag': 'file';
      file: FileLogInfo;
    }

    /**
     * Folder's details.
     */
    export interface AssetLogInfoFolder {
      '.tag': 'folder';
      folder: FolderLogInfo;
    }

    /**
     * Paper docuement's details.
     */
    export interface AssetLogInfoPaperDocument {
      '.tag': 'paper_document';
      paper_document: PaperDocumentLogInfo;
    }

    /**
     * Paper folder's details.
     */
    export interface AssetLogInfoPaperFolder {
      '.tag': 'paper_folder';
      paper_folder: PaperFolderLogInfo;
    }

    export interface AssetLogInfoOther {
      '.tag': 'other';
    }

    /**
     * Asset details.
     */
    export type AssetLogInfo = AssetLogInfoFile | AssetLogInfoFolder | AssetLogInfoPaperDocument | AssetLogInfoPaperFolder | AssetLogInfoOther;

    /**
     * Certificate details.
     */
    export interface Certificate {
      /**
       * Certificate subject.
       */
      subject: string;
      /**
       * Certificate issuer.
       */
      issuer: string;
      /**
       * Certificate issue date.
       */
      issue_date: string;
      /**
       * Certificate expiration date.
       */
      expiration_date: string;
      /**
       * Certificate serial number.
       */
      serial_number: string;
      /**
       * Certificate sha1 fingerprint.
       */
      sha1_fingerprint: string;
      /**
       * Certificate common name.
       */
      common_name?: string;
    }

    /**
     * Shared an album.
     */
    export interface CollectionShareDetails {
      /**
       * Album name.
       */
      album_name: string;
    }

    export interface ConfidentialityConfidential {
      '.tag': 'confidential';
    }

    export interface ConfidentialityNonConfidential {
      '.tag': 'non_confidential';
    }

    export interface ConfidentialityOther {
      '.tag': 'other';
    }

    export type Confidentiality = ConfidentialityConfidential | ConfidentialityNonConfidential | ConfidentialityOther;

    export interface ContentPermanentDeletePolicyDisabled {
      '.tag': 'disabled';
    }

    export interface ContentPermanentDeletePolicyEnabled {
      '.tag': 'enabled';
    }

    export interface ContentPermanentDeletePolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for pemanent content deletion
     */
    export type ContentPermanentDeletePolicy = ContentPermanentDeletePolicyDisabled | ContentPermanentDeletePolicyEnabled | ContentPermanentDeletePolicyOther;

    /**
     * Action was done on behalf of a team member.
     */
    export interface ContextLogInfoTeamMember {
      '.tag': 'team_member';
      team_member: TeamMemberLogInfo;
    }

    /**
     * Action was done on behalf of a non team member.
     */
    export interface ContextLogInfoNonTeamMember {
      '.tag': 'non_team_member';
      non_team_member: NonTeamMemberLogInfo;
    }

    /**
     * Action was done on behalf of the team.
     */
    export interface ContextLogInfoTeam {
      '.tag': 'team';
    }

    export interface ContextLogInfoOther {
      '.tag': 'other';
    }

    /**
     * The primary entity on which the action was done.
     */
    export type ContextLogInfo = ContextLogInfoTeamMember | ContextLogInfoNonTeamMember | ContextLogInfoTeam | ContextLogInfoOther;

    /**
     * Created folders.
     */
    export interface CreateFolderDetails {
    }

    /**
     * Set a restriction policy regarding the location of data centers where
     * team data resides.
     */
    export interface DataPlacementRestrictionChangePolicyDetails {
      /**
       * Previous placement restriction.
       */
      previous_value: PlacementRestriction;
      /**
       * New placement restriction.
       */
      new_value: PlacementRestriction;
    }

    /**
     * Satisfied a previously set restriction policy regarding the location of
     * data centers where team data resides (i.e. all data have been migrated
     * according to the restriction placed).
     */
    export interface DataPlacementRestrictionSatisfyPolicyDetails {
      /**
       * Placement restriction.
       */
      placement_restriction: PlacementRestriction;
    }

    /**
     * Desktop session.
     */
    export interface DesktopSessionLogInfo extends SessionLogInfo {
    }

    /**
     * Reference to the DesktopSessionLogInfo type, identified by the value of
     * the .tag property.
     */
    export interface DesktopSessionLogInfoReference extends DesktopSessionLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'desktop';
    }

    /**
     * Set or removed a limit on the number of computers each team member can
     * link to their work Dropbox account.
     */
    export interface DeviceApprovalsChangeDesktopPolicyDetails {
      /**
       * New desktop device approvals policy. Might be missing due to historical
       * data gap.
       */
      new_value?: DeviceApprovalsPolicy;
      /**
       * Previous desktop device approvals policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: DeviceApprovalsPolicy;
    }

    /**
     * Set or removed a limit on the number of mobiles devices each team member
     * can link to their work Dropbox account.
     */
    export interface DeviceApprovalsChangeMobilePolicyDetails {
      /**
       * New mobile device approvals policy. Might be missing due to historical
       * data gap.
       */
      new_value?: DeviceApprovalsPolicy;
      /**
       * Previous mobile device approvals policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: DeviceApprovalsPolicy;
    }

    /**
     * Changed the action taken when a team member is already over the limits
     * (e.g when they join the team, an admin lowers limits, etc.).
     */
    export interface DeviceApprovalsChangeOverageActionDetails {
      /**
       * New over the limits policy. Might be missing due to historical data
       * gap.
       */
      new_value?: team_policies.RolloutMethod;
      /**
       * Previous over the limit policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: team_policies.RolloutMethod;
    }

    /**
     * Changed the action taken with respect to approval limits when a team
     * member unlinks an approved device.
     */
    export interface DeviceApprovalsChangeUnlinkActionDetails {
      /**
       * New device unlink policy. Might be missing due to historical data gap.
       */
      new_value?: DeviceUnlinkPolicy;
      /**
       * Previous device unlink policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: DeviceUnlinkPolicy;
    }

    export interface DeviceApprovalsPolicyUnlimited {
      '.tag': 'unlimited';
    }

    export interface DeviceApprovalsPolicyLimited {
      '.tag': 'limited';
    }

    export interface DeviceApprovalsPolicyOther {
      '.tag': 'other';
    }

    export type DeviceApprovalsPolicy = DeviceApprovalsPolicyUnlimited | DeviceApprovalsPolicyLimited | DeviceApprovalsPolicyOther;

    /**
     * IP address associated with active desktop session changed.
     */
    export interface DeviceChangeIpDesktopDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
    }

    /**
     * IP address associated with active mobile session changed.
     */
    export interface DeviceChangeIpMobileDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
    }

    /**
     * IP address associated with active Web session changed.
     */
    export interface DeviceChangeIpWebDetails {
      /**
       * Device information. Might be missing due to historical data gap.
       */
      device_info?: DeviceLogInfo;
      /**
       * Web browser name.
       */
      user_agent: string;
    }

    /**
     * Failed to delete all files from an unlinked device.
     */
    export interface DeviceDeleteOnUnlinkFailDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
      /**
       * The number of times that remote file deletion failed.
       */
      num_failures: number;
    }

    /**
     * Deleted all files from an unlinked device.
     */
    export interface DeviceDeleteOnUnlinkSuccessDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
    }

    /**
     * Failed to link a device.
     */
    export interface DeviceLinkFailDetails {
      /**
       * Device information. Might be missing due to historical data gap.
       */
      device_info?: DeviceLogInfo;
      /**
       * A description of the device used while user approval blocked.
       */
      device_type: DeviceType;
    }

    /**
     * Linked a device.
     */
    export interface DeviceLinkSuccessDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
    }

    /**
     * Device's logged information.
     */
    export interface DeviceLogInfo {
      /**
       * Device unique id. Might be missing due to historical data gap.
       */
      device_id?: string;
      /**
       * Device display name. Might be missing due to historical data gap.
       */
      display_name?: string;
      /**
       * True if this device is emm managed, false otherwise. Might be missing
       * due to historical data gap.
       */
      is_emm_managed?: boolean;
      /**
       * Device platform name. Might be missing due to historical data gap.
       */
      platform?: string;
      /**
       * Device mac address. Might be missing due to historical data gap.
       */
      mac_address?: string;
      /**
       * Device OS version. Might be missing due to historical data gap.
       */
      os_version?: string;
      /**
       * Device type. Might be missing due to historical data gap.
       */
      device_type?: string;
      /**
       * IP address. Might be missing due to historical data gap.
       */
      ip_address?: IpAddress;
      /**
       * Last activity. Might be missing due to historical data gap.
       */
      last_activity?: string;
      /**
       * Linking app version. Might be missing due to historical data gap.
       */
      app_version?: string;
    }

    /**
     * Disable Device Management.
     */
    export interface DeviceManagementDisabledDetails {
    }

    /**
     * Enable Device Management.
     */
    export interface DeviceManagementEnabledDetails {
    }

    export interface DeviceTypeDesktop {
      '.tag': 'desktop';
    }

    export interface DeviceTypeMobile {
      '.tag': 'mobile';
    }

    export interface DeviceTypeOther {
      '.tag': 'other';
    }

    export type DeviceType = DeviceTypeDesktop | DeviceTypeMobile | DeviceTypeOther;

    /**
     * Disconnected a device.
     */
    export interface DeviceUnlinkDetails {
      /**
       * Device information.
       */
      device_info: DeviceLogInfo;
      /**
       * True if the user requested to delete data after device unlink, false
       * otherwise.
       */
      delete_data: boolean;
    }

    export interface DeviceUnlinkPolicyRemove {
      '.tag': 'remove';
    }

    export interface DeviceUnlinkPolicyKeep {
      '.tag': 'keep';
    }

    export interface DeviceUnlinkPolicyOther {
      '.tag': 'other';
    }

    export type DeviceUnlinkPolicy = DeviceUnlinkPolicyRemove | DeviceUnlinkPolicyKeep | DeviceUnlinkPolicyOther;

    /**
     * Disabled domain invites.
     */
    export interface DisabledDomainInvitesDetails {
    }

    /**
     * Approved a member's request to join the team.
     */
    export interface DomainInvitesApproveRequestToJoinTeamDetails {
    }

    /**
     * Declined a user's request to join the team.
     */
    export interface DomainInvitesDeclineRequestToJoinTeamDetails {
    }

    /**
     * Sent domain invites to existing domain accounts.
     */
    export interface DomainInvitesEmailExistingUsersDetails {
      /**
       * Domain names.
       */
      domain_name: Array<string>;
      /**
       * Number of recipients.
       */
      num_recipients: number;
    }

    /**
     * Asked to join the team.
     */
    export interface DomainInvitesRequestToJoinTeamDetails {
    }

    /**
     * Turned off u201cAutomatically invite new usersu201d.
     */
    export interface DomainInvitesSetInviteNewUserPrefToNoDetails {
    }

    /**
     * Turned on u201cAutomatically invite new usersu201d.
     */
    export interface DomainInvitesSetInviteNewUserPrefToYesDetails {
    }

    /**
     * Failed to verify a domain belonging to the team.
     */
    export interface DomainVerificationAddDomainFailDetails {
      /**
       * Domain name.
       */
      domain_name: string;
      /**
       * Domain name verification method. Might be missing due to historical
       * data gap.
       */
      verification_method?: string;
    }

    /**
     * Verified a domain belonging to the team.
     */
    export interface DomainVerificationAddDomainSuccessDetails {
      /**
       * Domain names.
       */
      domain_names: Array<string>;
      /**
       * Domain name verification method. Might be missing due to historical
       * data gap.
       */
      verification_method?: string;
    }

    /**
     * Removed a domain from the list of verified domains belonging to the team.
     */
    export interface DomainVerificationRemoveDomainDetails {
      /**
       * Domain names.
       */
      domain_names: Array<string>;
    }

    /**
     * Represents a time duration: unit and amount
     */
    export interface DurationLogInfo {
      /**
       * Time unit.
       */
      unit: TimeUnit;
      /**
       * Amount of time.
       */
      amount: number;
    }

    /**
     * Added an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EmmAddExceptionDetails {
    }

    /**
     * Enabled or disabled enterprise mobility management for team members.
     */
    export interface EmmChangePolicyDetails {
      /**
       * New enterprise mobility management policy.
       */
      new_value: team_policies.EmmState;
      /**
       * Previous enterprise mobility management policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: team_policies.EmmState;
    }

    /**
     * EMM excluded users report created.
     */
    export interface EmmCreateExceptionsReportDetails {
    }

    /**
     * EMM mobile app usage report created.
     */
    export interface EmmCreateUsageReportDetails {
    }

    /**
     * Failed to sign in via EMM.
     */
    export interface EmmErrorDetails {
      /**
       * Error details.
       */
      error_details: FailureDetailsLogInfo;
    }

    /**
     * Refreshed the auth token used for setting up enterprise mobility
     * management.
     */
    export interface EmmRefreshAuthTokenDetails {
    }

    /**
     * Removed an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EmmRemoveExceptionDetails {
    }

    /**
     * Enabled domain invites.
     */
    export interface EnabledDomainInvitesDetails {
    }

    /**
     * Events that have to do with account capture and invite enforcement on
     * team-owned domains.
     */
    export interface EventCategoryAccountCapture {
      '.tag': 'account_capture';
    }

    /**
     * Events that relate to team and team member account administration or team
     * administration. Note that these actions are not necessarily performed by
     * team admins. They might also be performed by Dropbox Support or System or
     * by team members on their own accounts.
     */
    export interface EventCategoryAdministration {
      '.tag': 'administration';
    }

    /**
     * Events that apply to management of linked apps.
     */
    export interface EventCategoryApps {
      '.tag': 'apps';
    }

    /**
     * Events that apply to user authentication in some way.
     */
    export interface EventCategoryAuthentication {
      '.tag': 'authentication';
    }

    /**
     * Events that have to do with comments on files and Paper documents.
     */
    export interface EventCategoryComments {
      '.tag': 'comments';
    }

    /**
     * Events that apply to changes how people can access content on Dropbox as
     * well as actions that represent actually accessing content.
     */
    export interface EventCategoryContentAccess {
      '.tag': 'content_access';
    }

    /**
     * Events that apply to linked devices on mobile, desktop and Web platforms.
     */
    export interface EventCategoryDevices {
      '.tag': 'devices';
    }

    /**
     * Events that concern device approvals and device management.
     */
    export interface EventCategoryDeviceApprovals {
      '.tag': 'device_approvals';
    }

    /**
     * Events that involve domain management feature: domain verification,
     * invite enforcement and account capture.
     */
    export interface EventCategoryDomains {
      '.tag': 'domains';
    }

    /**
     * Events that involve enterprise mobility management and the Dropbox EMM
     * app.
     */
    export interface EventCategoryEmm {
      '.tag': 'emm';
    }

    /**
     * Events that mark some type of unexpected outcome.
     */
    export interface EventCategoryErrors {
      '.tag': 'errors';
    }

    /**
     * Events that mark a user's interaction with files and folders on Dropbox.
     */
    export interface EventCategoryFiles {
      '.tag': 'files';
    }

    /**
     * Events that have to do with filesystem operations on files and folders:
     * copy, move, delete, etc.
     */
    export interface EventCategoryFileOperations {
      '.tag': 'file_operations';
    }

    /**
     * Events that apply to the file requests feature.
     */
    export interface EventCategoryFileRequests {
      '.tag': 'file_requests';
    }

    /**
     * Events that involve group management.
     */
    export interface EventCategoryGroups {
      '.tag': 'groups';
    }

    /**
     * Events that involve users signing in to or out of Dropbox.
     */
    export interface EventCategoryLogins {
      '.tag': 'logins';
    }

    /**
     * Events that involve team member management.
     */
    export interface EventCategoryMembers {
      '.tag': 'members';
    }

    /**
     * Events that apply to Dropbox Paper.
     */
    export interface EventCategoryPaper {
      '.tag': 'paper';
    }

    /**
     * Events that involve using, changing or resetting passwords.
     */
    export interface EventCategoryPasswords {
      '.tag': 'passwords';
    }

    /**
     * Events that concern generation of admin reports, including team activity
     * and device usage.
     */
    export interface EventCategoryReports {
      '.tag': 'reports';
    }

    /**
     * Events that mark the beginning or end of sessions as well as those that
     * apply to an ongoing session.
     */
    export interface EventCategorySessions {
      '.tag': 'sessions';
    }

    /**
     * Events that specifically apply to shared files.
     */
    export interface EventCategorySharedFiles {
      '.tag': 'shared_files';
    }

    /**
     * Events that specifically apply to shared folders.
     */
    export interface EventCategorySharedFolders {
      '.tag': 'shared_folders';
    }

    /**
     * Events that specifically apply to link sharing.
     */
    export interface EventCategorySharedLinks {
      '.tag': 'shared_links';
    }

    /**
     * Events that apply to all types of sharing and collaboration.
     */
    export interface EventCategorySharing {
      '.tag': 'sharing';
    }

    /**
     * Events that concern policies that affect sharing - both at the team level
     * and at the folder level.
     */
    export interface EventCategorySharingPolicies {
      '.tag': 'sharing_policies';
    }

    /**
     * Events that involve using or configuring single sign-on as well as
     * administrative policies concerning single sign-on.
     */
    export interface EventCategorySso {
      '.tag': 'sso';
    }

    /**
     * Events that involve team folder management.
     */
    export interface EventCategoryTeamFolders {
      '.tag': 'team_folders';
    }

    /**
     * Events that involve a change in team-wide policies.
     */
    export interface EventCategoryTeamPolicies {
      '.tag': 'team_policies';
    }

    /**
     * Events that involve a change in the team profile.
     */
    export interface EventCategoryTeamProfile {
      '.tag': 'team_profile';
    }

    /**
     * Events that involve using or configuring two factor authentication as
     * well as administrative policies concerning two factor authentication.
     */
    export interface EventCategoryTfa {
      '.tag': 'tfa';
    }

    export interface EventCategoryOther {
      '.tag': 'other';
    }

    /**
     * Category of events in event audit log.
     */
    export type EventCategory = EventCategoryAccountCapture | EventCategoryAdministration | EventCategoryApps | EventCategoryAuthentication | EventCategoryComments | EventCategoryContentAccess | EventCategoryDevices | EventCategoryDeviceApprovals | EventCategoryDomains | EventCategoryEmm | EventCategoryErrors | EventCategoryFiles | EventCategoryFileOperations | EventCategoryFileRequests | EventCategoryGroups | EventCategoryLogins | EventCategoryMembers | EventCategoryPaper | EventCategoryPasswords | EventCategoryReports | EventCategorySessions | EventCategorySharedFiles | EventCategorySharedFolders | EventCategorySharedLinks | EventCategorySharing | EventCategorySharingPolicies | EventCategorySso | EventCategoryTeamFolders | EventCategoryTeamPolicies | EventCategoryTeamProfile | EventCategoryTfa | EventCategoryOther;

    /**
     * Changed the membership type (limited vs full) for team member.
     */
    export interface EventDetailsMemberChangeMembershipTypeDetails {
      '.tag': 'member_change_membership_type_details';
      member_change_membership_type_details: MemberChangeMembershipTypeDetails;
    }

    /**
     * Permanently deleted contents of a removed team member account.
     */
    export interface EventDetailsMemberPermanentlyDeleteAccountContentsDetails {
      '.tag': 'member_permanently_delete_account_contents_details';
      member_permanently_delete_account_contents_details: MemberPermanentlyDeleteAccountContentsDetails;
    }

    /**
     * Changed the status with respect to whether the team member is under or
     * over storage quota specified by policy.
     */
    export interface EventDetailsMemberSpaceLimitsChangeStatusDetails {
      '.tag': 'member_space_limits_change_status_details';
      member_space_limits_change_status_details: MemberSpaceLimitsChangeStatusDetails;
    }

    /**
     * Transferred contents of a removed team member account to another member.
     */
    export interface EventDetailsMemberTransferAccountContentsDetails {
      '.tag': 'member_transfer_account_contents_details';
      member_transfer_account_contents_details: MemberTransferAccountContentsDetails;
    }

    /**
     * Exported all Paper documents in the team.
     */
    export interface EventDetailsPaperAdminExportStartDetails {
      '.tag': 'paper_admin_export_start_details';
      paper_admin_export_start_details: PaperAdminExportStartDetails;
    }

    /**
     * Users added to Paper enabled users list.
     */
    export interface EventDetailsPaperEnabledUsersGroupAdditionDetails {
      '.tag': 'paper_enabled_users_group_addition_details';
      paper_enabled_users_group_addition_details: PaperEnabledUsersGroupAdditionDetails;
    }

    /**
     * Users removed from Paper enabled users list.
     */
    export interface EventDetailsPaperEnabledUsersGroupRemovalDetails {
      '.tag': 'paper_enabled_users_group_removal_details';
      paper_enabled_users_group_removal_details: PaperEnabledUsersGroupRemovalDetails;
    }

    /**
     * Paper external sharing policy changed: anyone.
     */
    export interface EventDetailsPaperExternalViewAllowDetails {
      '.tag': 'paper_external_view_allow_details';
      paper_external_view_allow_details: PaperExternalViewAllowDetails;
    }

    /**
     * Paper external sharing policy changed: default team.
     */
    export interface EventDetailsPaperExternalViewDefaultTeamDetails {
      '.tag': 'paper_external_view_default_team_details';
      paper_external_view_default_team_details: PaperExternalViewDefaultTeamDetails;
    }

    /**
     * Paper external sharing policy changed: team-only.
     */
    export interface EventDetailsPaperExternalViewForbidDetails {
      '.tag': 'paper_external_view_forbid_details';
      paper_external_view_forbid_details: PaperExternalViewForbidDetails;
    }

    /**
     * Admin settings: team members see a warning before sharing folders outside
     * the team (DEPRECATED FEATURE).
     */
    export interface EventDetailsSfExternalInviteWarnDetails {
      '.tag': 'sf_external_invite_warn_details';
      sf_external_invite_warn_details: SfExternalInviteWarnDetails;
    }

    /**
     * Merged another team into this team.
     */
    export interface EventDetailsTeamMergeFromDetails {
      '.tag': 'team_merge_from_details';
      team_merge_from_details: TeamMergeFromDetails;
    }

    /**
     * Merged this team into another team.
     */
    export interface EventDetailsTeamMergeToDetails {
      '.tag': 'team_merge_to_details';
      team_merge_to_details: TeamMergeToDetails;
    }

    /**
     * Linked an app for team.
     */
    export interface EventDetailsAppLinkTeamDetails {
      '.tag': 'app_link_team_details';
      app_link_team_details: AppLinkTeamDetails;
    }

    /**
     * Linked an app for team member.
     */
    export interface EventDetailsAppLinkUserDetails {
      '.tag': 'app_link_user_details';
      app_link_user_details: AppLinkUserDetails;
    }

    /**
     * Unlinked an app for team.
     */
    export interface EventDetailsAppUnlinkTeamDetails {
      '.tag': 'app_unlink_team_details';
      app_unlink_team_details: AppUnlinkTeamDetails;
    }

    /**
     * Unlinked an app for team member.
     */
    export interface EventDetailsAppUnlinkUserDetails {
      '.tag': 'app_unlink_user_details';
      app_unlink_user_details: AppUnlinkUserDetails;
    }

    /**
     * Added a file comment.
     */
    export interface EventDetailsFileAddCommentDetails {
      '.tag': 'file_add_comment_details';
      file_add_comment_details: FileAddCommentDetails;
    }

    /**
     * Subscribed to or unsubscribed from comment notifications for file.
     */
    export interface EventDetailsFileChangeCommentSubscriptionDetails {
      '.tag': 'file_change_comment_subscription_details';
      file_change_comment_subscription_details: FileChangeCommentSubscriptionDetails;
    }

    /**
     * Deleted a file comment.
     */
    export interface EventDetailsFileDeleteCommentDetails {
      '.tag': 'file_delete_comment_details';
      file_delete_comment_details: FileDeleteCommentDetails;
    }

    /**
     * Liked a file comment.
     */
    export interface EventDetailsFileLikeCommentDetails {
      '.tag': 'file_like_comment_details';
      file_like_comment_details: FileLikeCommentDetails;
    }

    /**
     * Resolved a file comment.
     */
    export interface EventDetailsFileResolveCommentDetails {
      '.tag': 'file_resolve_comment_details';
      file_resolve_comment_details: FileResolveCommentDetails;
    }

    /**
     * Unliked a file comment.
     */
    export interface EventDetailsFileUnlikeCommentDetails {
      '.tag': 'file_unlike_comment_details';
      file_unlike_comment_details: FileUnlikeCommentDetails;
    }

    /**
     * Unresolved a file comment.
     */
    export interface EventDetailsFileUnresolveCommentDetails {
      '.tag': 'file_unresolve_comment_details';
      file_unresolve_comment_details: FileUnresolveCommentDetails;
    }

    /**
     * IP address associated with active desktop session changed.
     */
    export interface EventDetailsDeviceChangeIpDesktopDetails {
      '.tag': 'device_change_ip_desktop_details';
      device_change_ip_desktop_details: DeviceChangeIpDesktopDetails;
    }

    /**
     * IP address associated with active mobile session changed.
     */
    export interface EventDetailsDeviceChangeIpMobileDetails {
      '.tag': 'device_change_ip_mobile_details';
      device_change_ip_mobile_details: DeviceChangeIpMobileDetails;
    }

    /**
     * IP address associated with active Web session changed.
     */
    export interface EventDetailsDeviceChangeIpWebDetails {
      '.tag': 'device_change_ip_web_details';
      device_change_ip_web_details: DeviceChangeIpWebDetails;
    }

    /**
     * Failed to delete all files from an unlinked device.
     */
    export interface EventDetailsDeviceDeleteOnUnlinkFailDetails {
      '.tag': 'device_delete_on_unlink_fail_details';
      device_delete_on_unlink_fail_details: DeviceDeleteOnUnlinkFailDetails;
    }

    /**
     * Deleted all files from an unlinked device.
     */
    export interface EventDetailsDeviceDeleteOnUnlinkSuccessDetails {
      '.tag': 'device_delete_on_unlink_success_details';
      device_delete_on_unlink_success_details: DeviceDeleteOnUnlinkSuccessDetails;
    }

    /**
     * Failed to link a device.
     */
    export interface EventDetailsDeviceLinkFailDetails {
      '.tag': 'device_link_fail_details';
      device_link_fail_details: DeviceLinkFailDetails;
    }

    /**
     * Linked a device.
     */
    export interface EventDetailsDeviceLinkSuccessDetails {
      '.tag': 'device_link_success_details';
      device_link_success_details: DeviceLinkSuccessDetails;
    }

    /**
     * Disable Device Management.
     */
    export interface EventDetailsDeviceManagementDisabledDetails {
      '.tag': 'device_management_disabled_details';
      device_management_disabled_details: DeviceManagementDisabledDetails;
    }

    /**
     * Enable Device Management.
     */
    export interface EventDetailsDeviceManagementEnabledDetails {
      '.tag': 'device_management_enabled_details';
      device_management_enabled_details: DeviceManagementEnabledDetails;
    }

    /**
     * Disconnected a device.
     */
    export interface EventDetailsDeviceUnlinkDetails {
      '.tag': 'device_unlink_details';
      device_unlink_details: DeviceUnlinkDetails;
    }

    /**
     * Refreshed the auth token used for setting up enterprise mobility
     * management.
     */
    export interface EventDetailsEmmRefreshAuthTokenDetails {
      '.tag': 'emm_refresh_auth_token_details';
      emm_refresh_auth_token_details: EmmRefreshAuthTokenDetails;
    }

    /**
     * Granted or revoked the option to enable account capture on domains
     * belonging to the team.
     */
    export interface EventDetailsAccountCaptureChangeAvailabilityDetails {
      '.tag': 'account_capture_change_availability_details';
      account_capture_change_availability_details: AccountCaptureChangeAvailabilityDetails;
    }

    /**
     * Account captured user migrated their account to the team.
     */
    export interface EventDetailsAccountCaptureMigrateAccountDetails {
      '.tag': 'account_capture_migrate_account_details';
      account_capture_migrate_account_details: AccountCaptureMigrateAccountDetails;
    }

    /**
     * Account captured user relinquished their account by changing the email
     * address associated with it.
     */
    export interface EventDetailsAccountCaptureRelinquishAccountDetails {
      '.tag': 'account_capture_relinquish_account_details';
      account_capture_relinquish_account_details: AccountCaptureRelinquishAccountDetails;
    }

    /**
     * Disabled domain invites.
     */
    export interface EventDetailsDisabledDomainInvitesDetails {
      '.tag': 'disabled_domain_invites_details';
      disabled_domain_invites_details: DisabledDomainInvitesDetails;
    }

    /**
     * Approved a member's request to join the team.
     */
    export interface EventDetailsDomainInvitesApproveRequestToJoinTeamDetails {
      '.tag': 'domain_invites_approve_request_to_join_team_details';
      domain_invites_approve_request_to_join_team_details: DomainInvitesApproveRequestToJoinTeamDetails;
    }

    /**
     * Declined a user's request to join the team.
     */
    export interface EventDetailsDomainInvitesDeclineRequestToJoinTeamDetails {
      '.tag': 'domain_invites_decline_request_to_join_team_details';
      domain_invites_decline_request_to_join_team_details: DomainInvitesDeclineRequestToJoinTeamDetails;
    }

    /**
     * Sent domain invites to existing domain accounts.
     */
    export interface EventDetailsDomainInvitesEmailExistingUsersDetails {
      '.tag': 'domain_invites_email_existing_users_details';
      domain_invites_email_existing_users_details: DomainInvitesEmailExistingUsersDetails;
    }

    /**
     * Asked to join the team.
     */
    export interface EventDetailsDomainInvitesRequestToJoinTeamDetails {
      '.tag': 'domain_invites_request_to_join_team_details';
      domain_invites_request_to_join_team_details: DomainInvitesRequestToJoinTeamDetails;
    }

    /**
     * Turned off u201cAutomatically invite new usersu201d.
     */
    export interface EventDetailsDomainInvitesSetInviteNewUserPrefToNoDetails {
      '.tag': 'domain_invites_set_invite_new_user_pref_to_no_details';
      domain_invites_set_invite_new_user_pref_to_no_details: DomainInvitesSetInviteNewUserPrefToNoDetails;
    }

    /**
     * Turned on u201cAutomatically invite new usersu201d.
     */
    export interface EventDetailsDomainInvitesSetInviteNewUserPrefToYesDetails {
      '.tag': 'domain_invites_set_invite_new_user_pref_to_yes_details';
      domain_invites_set_invite_new_user_pref_to_yes_details: DomainInvitesSetInviteNewUserPrefToYesDetails;
    }

    /**
     * Failed to verify a domain belonging to the team.
     */
    export interface EventDetailsDomainVerificationAddDomainFailDetails {
      '.tag': 'domain_verification_add_domain_fail_details';
      domain_verification_add_domain_fail_details: DomainVerificationAddDomainFailDetails;
    }

    /**
     * Verified a domain belonging to the team.
     */
    export interface EventDetailsDomainVerificationAddDomainSuccessDetails {
      '.tag': 'domain_verification_add_domain_success_details';
      domain_verification_add_domain_success_details: DomainVerificationAddDomainSuccessDetails;
    }

    /**
     * Removed a domain from the list of verified domains belonging to the team.
     */
    export interface EventDetailsDomainVerificationRemoveDomainDetails {
      '.tag': 'domain_verification_remove_domain_details';
      domain_verification_remove_domain_details: DomainVerificationRemoveDomainDetails;
    }

    /**
     * Enabled domain invites.
     */
    export interface EventDetailsEnabledDomainInvitesDetails {
      '.tag': 'enabled_domain_invites_details';
      enabled_domain_invites_details: EnabledDomainInvitesDetails;
    }

    /**
     * Created folders.
     */
    export interface EventDetailsCreateFolderDetails {
      '.tag': 'create_folder_details';
      create_folder_details: CreateFolderDetails;
    }

    /**
     * Added files and/or folders.
     */
    export interface EventDetailsFileAddDetails {
      '.tag': 'file_add_details';
      file_add_details: FileAddDetails;
    }

    /**
     * Copied files and/or folders.
     */
    export interface EventDetailsFileCopyDetails {
      '.tag': 'file_copy_details';
      file_copy_details: FileCopyDetails;
    }

    /**
     * Deleted files and/or folders.
     */
    export interface EventDetailsFileDeleteDetails {
      '.tag': 'file_delete_details';
      file_delete_details: FileDeleteDetails;
    }

    /**
     * Downloaded files and/or folders.
     */
    export interface EventDetailsFileDownloadDetails {
      '.tag': 'file_download_details';
      file_download_details: FileDownloadDetails;
    }

    /**
     * Edited files.
     */
    export interface EventDetailsFileEditDetails {
      '.tag': 'file_edit_details';
      file_edit_details: FileEditDetails;
    }

    /**
     * Create a copy reference to a file or folder.
     */
    export interface EventDetailsFileGetCopyReferenceDetails {
      '.tag': 'file_get_copy_reference_details';
      file_get_copy_reference_details: FileGetCopyReferenceDetails;
    }

    /**
     * Moved files and/or folders.
     */
    export interface EventDetailsFileMoveDetails {
      '.tag': 'file_move_details';
      file_move_details: FileMoveDetails;
    }

    /**
     * Permanently deleted files and/or folders.
     */
    export interface EventDetailsFilePermanentlyDeleteDetails {
      '.tag': 'file_permanently_delete_details';
      file_permanently_delete_details: FilePermanentlyDeleteDetails;
    }

    /**
     * Previewed files and/or folders.
     */
    export interface EventDetailsFilePreviewDetails {
      '.tag': 'file_preview_details';
      file_preview_details: FilePreviewDetails;
    }

    /**
     * Renamed files and/or folders.
     */
    export interface EventDetailsFileRenameDetails {
      '.tag': 'file_rename_details';
      file_rename_details: FileRenameDetails;
    }

    /**
     * Restored deleted files and/or folders.
     */
    export interface EventDetailsFileRestoreDetails {
      '.tag': 'file_restore_details';
      file_restore_details: FileRestoreDetails;
    }

    /**
     * Reverted files to a previous version.
     */
    export interface EventDetailsFileRevertDetails {
      '.tag': 'file_revert_details';
      file_revert_details: FileRevertDetails;
    }

    /**
     * Rolled back file change location changes.
     */
    export interface EventDetailsFileRollbackChangesDetails {
      '.tag': 'file_rollback_changes_details';
      file_rollback_changes_details: FileRollbackChangesDetails;
    }

    /**
     * Save a file or folder using a copy reference.
     */
    export interface EventDetailsFileSaveCopyReferenceDetails {
      '.tag': 'file_save_copy_reference_details';
      file_save_copy_reference_details: FileSaveCopyReferenceDetails;
    }

    /**
     * Added a deadline to a file request.
     */
    export interface EventDetailsFileRequestAddDeadlineDetails {
      '.tag': 'file_request_add_deadline_details';
      file_request_add_deadline_details: FileRequestAddDeadlineDetails;
    }

    /**
     * Change a file request.
     */
    export interface EventDetailsFileRequestChangeDetails {
      '.tag': 'file_request_change_details';
      file_request_change_details: FileRequestChangeDetails;
    }

    /**
     * Changed the file request folder.
     */
    export interface EventDetailsFileRequestChangeFolderDetails {
      '.tag': 'file_request_change_folder_details';
      file_request_change_folder_details: FileRequestChangeFolderDetails;
    }

    /**
     * Closed a file request.
     */
    export interface EventDetailsFileRequestCloseDetails {
      '.tag': 'file_request_close_details';
      file_request_close_details: FileRequestCloseDetails;
    }

    /**
     * Created a file request.
     */
    export interface EventDetailsFileRequestCreateDetails {
      '.tag': 'file_request_create_details';
      file_request_create_details: FileRequestCreateDetails;
    }

    /**
     * Received files for a file request.
     */
    export interface EventDetailsFileRequestReceiveFileDetails {
      '.tag': 'file_request_receive_file_details';
      file_request_receive_file_details: FileRequestReceiveFileDetails;
    }

    /**
     * Removed the file request deadline.
     */
    export interface EventDetailsFileRequestRemoveDeadlineDetails {
      '.tag': 'file_request_remove_deadline_details';
      file_request_remove_deadline_details: FileRequestRemoveDeadlineDetails;
    }

    /**
     * Sent file request to users via email.
     */
    export interface EventDetailsFileRequestSendDetails {
      '.tag': 'file_request_send_details';
      file_request_send_details: FileRequestSendDetails;
    }

    /**
     * Added an external ID for group.
     */
    export interface EventDetailsGroupAddExternalIdDetails {
      '.tag': 'group_add_external_id_details';
      group_add_external_id_details: GroupAddExternalIdDetails;
    }

    /**
     * Added team members to a group.
     */
    export interface EventDetailsGroupAddMemberDetails {
      '.tag': 'group_add_member_details';
      group_add_member_details: GroupAddMemberDetails;
    }

    /**
     * Changed the external ID for group.
     */
    export interface EventDetailsGroupChangeExternalIdDetails {
      '.tag': 'group_change_external_id_details';
      group_change_external_id_details: GroupChangeExternalIdDetails;
    }

    /**
     * Changed group management type.
     */
    export interface EventDetailsGroupChangeManagementTypeDetails {
      '.tag': 'group_change_management_type_details';
      group_change_management_type_details: GroupChangeManagementTypeDetails;
    }

    /**
     * Changed the manager permissions belonging to a group member.
     */
    export interface EventDetailsGroupChangeMemberRoleDetails {
      '.tag': 'group_change_member_role_details';
      group_change_member_role_details: GroupChangeMemberRoleDetails;
    }

    /**
     * Created a group.
     */
    export interface EventDetailsGroupCreateDetails {
      '.tag': 'group_create_details';
      group_create_details: GroupCreateDetails;
    }

    /**
     * Deleted a group.
     */
    export interface EventDetailsGroupDeleteDetails {
      '.tag': 'group_delete_details';
      group_delete_details: GroupDeleteDetails;
    }

    /**
     * Moved a group.
     */
    export interface EventDetailsGroupMovedDetails {
      '.tag': 'group_moved_details';
      group_moved_details: GroupMovedDetails;
    }

    /**
     * Removed the external ID for group.
     */
    export interface EventDetailsGroupRemoveExternalIdDetails {
      '.tag': 'group_remove_external_id_details';
      group_remove_external_id_details: GroupRemoveExternalIdDetails;
    }

    /**
     * Removed team members from a group.
     */
    export interface EventDetailsGroupRemoveMemberDetails {
      '.tag': 'group_remove_member_details';
      group_remove_member_details: GroupRemoveMemberDetails;
    }

    /**
     * Renamed a group.
     */
    export interface EventDetailsGroupRenameDetails {
      '.tag': 'group_rename_details';
      group_rename_details: GroupRenameDetails;
    }

    /**
     * Failed to sign in via EMM.
     */
    export interface EventDetailsEmmErrorDetails {
      '.tag': 'emm_error_details';
      emm_error_details: EmmErrorDetails;
    }

    /**
     * Failed to sign in.
     */
    export interface EventDetailsLoginFailDetails {
      '.tag': 'login_fail_details';
      login_fail_details: LoginFailDetails;
    }

    /**
     * Signed in.
     */
    export interface EventDetailsLoginSuccessDetails {
      '.tag': 'login_success_details';
      login_success_details: LoginSuccessDetails;
    }

    /**
     * Signed out.
     */
    export interface EventDetailsLogoutDetails {
      '.tag': 'logout_details';
      logout_details: LogoutDetails;
    }

    /**
     * Ended reseller support session.
     */
    export interface EventDetailsResellerSupportSessionEndDetails {
      '.tag': 'reseller_support_session_end_details';
      reseller_support_session_end_details: ResellerSupportSessionEndDetails;
    }

    /**
     * Started reseller support session.
     */
    export interface EventDetailsResellerSupportSessionStartDetails {
      '.tag': 'reseller_support_session_start_details';
      reseller_support_session_start_details: ResellerSupportSessionStartDetails;
    }

    /**
     * Ended admin sign-in-as session.
     */
    export interface EventDetailsSignInAsSessionEndDetails {
      '.tag': 'sign_in_as_session_end_details';
      sign_in_as_session_end_details: SignInAsSessionEndDetails;
    }

    /**
     * Started admin sign-in-as session.
     */
    export interface EventDetailsSignInAsSessionStartDetails {
      '.tag': 'sign_in_as_session_start_details';
      sign_in_as_session_start_details: SignInAsSessionStartDetails;
    }

    /**
     * Failed to sign in via SSO.
     */
    export interface EventDetailsSsoErrorDetails {
      '.tag': 'sso_error_details';
      sso_error_details: SsoErrorDetails;
    }

    /**
     * Set team member name when joining team.
     */
    export interface EventDetailsMemberAddNameDetails {
      '.tag': 'member_add_name_details';
      member_add_name_details: MemberAddNameDetails;
    }

    /**
     * Change the admin role belonging to team member.
     */
    export interface EventDetailsMemberChangeAdminRoleDetails {
      '.tag': 'member_change_admin_role_details';
      member_change_admin_role_details: MemberChangeAdminRoleDetails;
    }

    /**
     * Changed team member email address.
     */
    export interface EventDetailsMemberChangeEmailDetails {
      '.tag': 'member_change_email_details';
      member_change_email_details: MemberChangeEmailDetails;
    }

    /**
     * Changed team member name.
     */
    export interface EventDetailsMemberChangeNameDetails {
      '.tag': 'member_change_name_details';
      member_change_name_details: MemberChangeNameDetails;
    }

    /**
     * Changed the membership status of a team member.
     */
    export interface EventDetailsMemberChangeStatusDetails {
      '.tag': 'member_change_status_details';
      member_change_status_details: MemberChangeStatusDetails;
    }

    /**
     * Suggested a new team member to be added to the team.
     */
    export interface EventDetailsMemberSuggestDetails {
      '.tag': 'member_suggest_details';
      member_suggest_details: MemberSuggestDetails;
    }

    /**
     * Added users to the membership of a Paper doc or folder.
     */
    export interface EventDetailsPaperContentAddMemberDetails {
      '.tag': 'paper_content_add_member_details';
      paper_content_add_member_details: PaperContentAddMemberDetails;
    }

    /**
     * Added Paper doc or folder to a folder.
     */
    export interface EventDetailsPaperContentAddToFolderDetails {
      '.tag': 'paper_content_add_to_folder_details';
      paper_content_add_to_folder_details: PaperContentAddToFolderDetails;
    }

    /**
     * Archived Paper doc or folder.
     */
    export interface EventDetailsPaperContentArchiveDetails {
      '.tag': 'paper_content_archive_details';
      paper_content_archive_details: PaperContentArchiveDetails;
    }

    /**
     * Created a Paper doc or folder.
     */
    export interface EventDetailsPaperContentCreateDetails {
      '.tag': 'paper_content_create_details';
      paper_content_create_details: PaperContentCreateDetails;
    }

    /**
     * Permanently deleted a Paper doc or folder.
     */
    export interface EventDetailsPaperContentPermanentlyDeleteDetails {
      '.tag': 'paper_content_permanently_delete_details';
      paper_content_permanently_delete_details: PaperContentPermanentlyDeleteDetails;
    }

    /**
     * Removed Paper doc or folder from a folder.
     */
    export interface EventDetailsPaperContentRemoveFromFolderDetails {
      '.tag': 'paper_content_remove_from_folder_details';
      paper_content_remove_from_folder_details: PaperContentRemoveFromFolderDetails;
    }

    /**
     * Removed a user from the membership of a Paper doc or folder.
     */
    export interface EventDetailsPaperContentRemoveMemberDetails {
      '.tag': 'paper_content_remove_member_details';
      paper_content_remove_member_details: PaperContentRemoveMemberDetails;
    }

    /**
     * Renamed Paper doc or folder.
     */
    export interface EventDetailsPaperContentRenameDetails {
      '.tag': 'paper_content_rename_details';
      paper_content_rename_details: PaperContentRenameDetails;
    }

    /**
     * Restored an archived Paper doc or folder.
     */
    export interface EventDetailsPaperContentRestoreDetails {
      '.tag': 'paper_content_restore_details';
      paper_content_restore_details: PaperContentRestoreDetails;
    }

    /**
     * Added a Paper doc comment.
     */
    export interface EventDetailsPaperDocAddCommentDetails {
      '.tag': 'paper_doc_add_comment_details';
      paper_doc_add_comment_details: PaperDocAddCommentDetails;
    }

    /**
     * Changed the access type of a Paper doc member.
     */
    export interface EventDetailsPaperDocChangeMemberRoleDetails {
      '.tag': 'paper_doc_change_member_role_details';
      paper_doc_change_member_role_details: PaperDocChangeMemberRoleDetails;
    }

    /**
     * Changed the sharing policy for Paper doc.
     */
    export interface EventDetailsPaperDocChangeSharingPolicyDetails {
      '.tag': 'paper_doc_change_sharing_policy_details';
      paper_doc_change_sharing_policy_details: PaperDocChangeSharingPolicyDetails;
    }

    /**
     * Followed or unfollowed a Paper doc.
     */
    export interface EventDetailsPaperDocChangeSubscriptionDetails {
      '.tag': 'paper_doc_change_subscription_details';
      paper_doc_change_subscription_details: PaperDocChangeSubscriptionDetails;
    }

    /**
     * Paper doc archived.
     */
    export interface EventDetailsPaperDocDeletedDetails {
      '.tag': 'paper_doc_deleted_details';
      paper_doc_deleted_details: PaperDocDeletedDetails;
    }

    /**
     * Deleted a Paper doc comment.
     */
    export interface EventDetailsPaperDocDeleteCommentDetails {
      '.tag': 'paper_doc_delete_comment_details';
      paper_doc_delete_comment_details: PaperDocDeleteCommentDetails;
    }

    /**
     * Downloaded a Paper doc in a particular output format.
     */
    export interface EventDetailsPaperDocDownloadDetails {
      '.tag': 'paper_doc_download_details';
      paper_doc_download_details: PaperDocDownloadDetails;
    }

    /**
     * Edited a Paper doc.
     */
    export interface EventDetailsPaperDocEditDetails {
      '.tag': 'paper_doc_edit_details';
      paper_doc_edit_details: PaperDocEditDetails;
    }

    /**
     * Edited a Paper doc comment.
     */
    export interface EventDetailsPaperDocEditCommentDetails {
      '.tag': 'paper_doc_edit_comment_details';
      paper_doc_edit_comment_details: PaperDocEditCommentDetails;
    }

    /**
     * Followed a Paper doc.
     */
    export interface EventDetailsPaperDocFollowedDetails {
      '.tag': 'paper_doc_followed_details';
      paper_doc_followed_details: PaperDocFollowedDetails;
    }

    /**
     * Mentioned a member in a Paper doc.
     */
    export interface EventDetailsPaperDocMentionDetails {
      '.tag': 'paper_doc_mention_details';
      paper_doc_mention_details: PaperDocMentionDetails;
    }

    /**
     * Requested to be a member on a Paper doc.
     */
    export interface EventDetailsPaperDocRequestAccessDetails {
      '.tag': 'paper_doc_request_access_details';
      paper_doc_request_access_details: PaperDocRequestAccessDetails;
    }

    /**
     * Paper doc comment resolved.
     */
    export interface EventDetailsPaperDocResolveCommentDetails {
      '.tag': 'paper_doc_resolve_comment_details';
      paper_doc_resolve_comment_details: PaperDocResolveCommentDetails;
    }

    /**
     * Restored a Paper doc to previous revision.
     */
    export interface EventDetailsPaperDocRevertDetails {
      '.tag': 'paper_doc_revert_details';
      paper_doc_revert_details: PaperDocRevertDetails;
    }

    /**
     * Paper doc link shared via slack.
     */
    export interface EventDetailsPaperDocSlackShareDetails {
      '.tag': 'paper_doc_slack_share_details';
      paper_doc_slack_share_details: PaperDocSlackShareDetails;
    }

    /**
     * Paper doc shared with team member.
     */
    export interface EventDetailsPaperDocTeamInviteDetails {
      '.tag': 'paper_doc_team_invite_details';
      paper_doc_team_invite_details: PaperDocTeamInviteDetails;
    }

    /**
     * Paper doc trashed.
     */
    export interface EventDetailsPaperDocTrashedDetails {
      '.tag': 'paper_doc_trashed_details';
      paper_doc_trashed_details: PaperDocTrashedDetails;
    }

    /**
     * Unresolved a Paper doc comment.
     */
    export interface EventDetailsPaperDocUnresolveCommentDetails {
      '.tag': 'paper_doc_unresolve_comment_details';
      paper_doc_unresolve_comment_details: PaperDocUnresolveCommentDetails;
    }

    /**
     * Paper doc untrashed.
     */
    export interface EventDetailsPaperDocUntrashedDetails {
      '.tag': 'paper_doc_untrashed_details';
      paper_doc_untrashed_details: PaperDocUntrashedDetails;
    }

    /**
     * Viewed Paper doc.
     */
    export interface EventDetailsPaperDocViewDetails {
      '.tag': 'paper_doc_view_details';
      paper_doc_view_details: PaperDocViewDetails;
    }

    /**
     * Followed or unfollowed a Paper folder.
     */
    export interface EventDetailsPaperFolderChangeSubscriptionDetails {
      '.tag': 'paper_folder_change_subscription_details';
      paper_folder_change_subscription_details: PaperFolderChangeSubscriptionDetails;
    }

    /**
     * Paper folder archived.
     */
    export interface EventDetailsPaperFolderDeletedDetails {
      '.tag': 'paper_folder_deleted_details';
      paper_folder_deleted_details: PaperFolderDeletedDetails;
    }

    /**
     * Followed a Paper folder.
     */
    export interface EventDetailsPaperFolderFollowedDetails {
      '.tag': 'paper_folder_followed_details';
      paper_folder_followed_details: PaperFolderFollowedDetails;
    }

    /**
     * Paper folder shared with team member.
     */
    export interface EventDetailsPaperFolderTeamInviteDetails {
      '.tag': 'paper_folder_team_invite_details';
      paper_folder_team_invite_details: PaperFolderTeamInviteDetails;
    }

    /**
     * Changed password.
     */
    export interface EventDetailsPasswordChangeDetails {
      '.tag': 'password_change_details';
      password_change_details: PasswordChangeDetails;
    }

    /**
     * Reset password.
     */
    export interface EventDetailsPasswordResetDetails {
      '.tag': 'password_reset_details';
      password_reset_details: PasswordResetDetails;
    }

    /**
     * Reset all team member passwords.
     */
    export interface EventDetailsPasswordResetAllDetails {
      '.tag': 'password_reset_all_details';
      password_reset_all_details: PasswordResetAllDetails;
    }

    /**
     * EMM excluded users report created.
     */
    export interface EventDetailsEmmCreateExceptionsReportDetails {
      '.tag': 'emm_create_exceptions_report_details';
      emm_create_exceptions_report_details: EmmCreateExceptionsReportDetails;
    }

    /**
     * EMM mobile app usage report created.
     */
    export interface EventDetailsEmmCreateUsageReportDetails {
      '.tag': 'emm_create_usage_report_details';
      emm_create_usage_report_details: EmmCreateUsageReportDetails;
    }

    /**
     * Smart Sync non-admin devices report created.
     */
    export interface EventDetailsSmartSyncCreateAdminPrivilegeReportDetails {
      '.tag': 'smart_sync_create_admin_privilege_report_details';
      smart_sync_create_admin_privilege_report_details: SmartSyncCreateAdminPrivilegeReportDetails;
    }

    /**
     * Created a team activity report.
     */
    export interface EventDetailsTeamActivityCreateReportDetails {
      '.tag': 'team_activity_create_report_details';
      team_activity_create_report_details: TeamActivityCreateReportDetails;
    }

    /**
     * Shared an album.
     */
    export interface EventDetailsCollectionShareDetails {
      '.tag': 'collection_share_details';
      collection_share_details: CollectionShareDetails;
    }

    /**
     * Changed a Paper document to be invite-only.
     */
    export interface EventDetailsNoteAclInviteOnlyDetails {
      '.tag': 'note_acl_invite_only_details';
      note_acl_invite_only_details: NoteAclInviteOnlyDetails;
    }

    /**
     * Changed a Paper document to be link accessible.
     */
    export interface EventDetailsNoteAclLinkDetails {
      '.tag': 'note_acl_link_details';
      note_acl_link_details: NoteAclLinkDetails;
    }

    /**
     * Changed a Paper document to be link accessible for the team.
     */
    export interface EventDetailsNoteAclTeamLinkDetails {
      '.tag': 'note_acl_team_link_details';
      note_acl_team_link_details: NoteAclTeamLinkDetails;
    }

    /**
     * Shared a Paper doc.
     */
    export interface EventDetailsNoteSharedDetails {
      '.tag': 'note_shared_details';
      note_shared_details: NoteSharedDetails;
    }

    /**
     * Shared Paper document received.
     */
    export interface EventDetailsNoteShareReceiveDetails {
      '.tag': 'note_share_receive_details';
      note_share_receive_details: NoteShareReceiveDetails;
    }

    /**
     * Opened a shared Paper doc.
     */
    export interface EventDetailsOpenNoteSharedDetails {
      '.tag': 'open_note_shared_details';
      open_note_shared_details: OpenNoteSharedDetails;
    }

    /**
     * Added the team to a shared folder.
     */
    export interface EventDetailsSfAddGroupDetails {
      '.tag': 'sf_add_group_details';
      sf_add_group_details: SfAddGroupDetails;
    }

    /**
     * Allowed non collaborators to view links to files in a shared folder.
     */
    export interface EventDetailsSfAllowNonMembersToViewSharedLinksDetails {
      '.tag': 'sf_allow_non_members_to_view_shared_links_details';
      sf_allow_non_members_to_view_shared_links_details: SfAllowNonMembersToViewSharedLinksDetails;
    }

    /**
     * Invited a group to a shared folder.
     */
    export interface EventDetailsSfInviteGroupDetails {
      '.tag': 'sf_invite_group_details';
      sf_invite_group_details: SfInviteGroupDetails;
    }

    /**
     * Changed parent of shared folder.
     */
    export interface EventDetailsSfNestDetails {
      '.tag': 'sf_nest_details';
      sf_nest_details: SfNestDetails;
    }

    /**
     * Declined a team member's invitation to a shared folder.
     */
    export interface EventDetailsSfTeamDeclineDetails {
      '.tag': 'sf_team_decline_details';
      sf_team_decline_details: SfTeamDeclineDetails;
    }

    /**
     * Granted access to a shared folder.
     */
    export interface EventDetailsSfTeamGrantAccessDetails {
      '.tag': 'sf_team_grant_access_details';
      sf_team_grant_access_details: SfTeamGrantAccessDetails;
    }

    /**
     * Invited team members to a shared folder.
     */
    export interface EventDetailsSfTeamInviteDetails {
      '.tag': 'sf_team_invite_details';
      sf_team_invite_details: SfTeamInviteDetails;
    }

    /**
     * Changed a team member's role in a shared folder.
     */
    export interface EventDetailsSfTeamInviteChangeRoleDetails {
      '.tag': 'sf_team_invite_change_role_details';
      sf_team_invite_change_role_details: SfTeamInviteChangeRoleDetails;
    }

    /**
     * Joined a team member's shared folder.
     */
    export interface EventDetailsSfTeamJoinDetails {
      '.tag': 'sf_team_join_details';
      sf_team_join_details: SfTeamJoinDetails;
    }

    /**
     * Joined a team member's shared folder from a link.
     */
    export interface EventDetailsSfTeamJoinFromOobLinkDetails {
      '.tag': 'sf_team_join_from_oob_link_details';
      sf_team_join_from_oob_link_details: SfTeamJoinFromOobLinkDetails;
    }

    /**
     * Unshared a folder with a team member.
     */
    export interface EventDetailsSfTeamUninviteDetails {
      '.tag': 'sf_team_uninvite_details';
      sf_team_uninvite_details: SfTeamUninviteDetails;
    }

    /**
     * Sent an email invitation to the membership of a shared file or folder.
     */
    export interface EventDetailsSharedContentAddInviteesDetails {
      '.tag': 'shared_content_add_invitees_details';
      shared_content_add_invitees_details: SharedContentAddInviteesDetails;
    }

    /**
     * Added an expiry to the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentAddLinkExpiryDetails {
      '.tag': 'shared_content_add_link_expiry_details';
      shared_content_add_link_expiry_details: SharedContentAddLinkExpiryDetails;
    }

    /**
     * Added a password to the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentAddLinkPasswordDetails {
      '.tag': 'shared_content_add_link_password_details';
      shared_content_add_link_password_details: SharedContentAddLinkPasswordDetails;
    }

    /**
     * Added users and/or groups to the membership of a shared file or folder.
     */
    export interface EventDetailsSharedContentAddMemberDetails {
      '.tag': 'shared_content_add_member_details';
      shared_content_add_member_details: SharedContentAddMemberDetails;
    }

    /**
     * Changed whether members can download the shared file or folder.
     */
    export interface EventDetailsSharedContentChangeDownloadsPolicyDetails {
      '.tag': 'shared_content_change_downloads_policy_details';
      shared_content_change_downloads_policy_details: SharedContentChangeDownloadsPolicyDetails;
    }

    /**
     * Changed the access type of an invitee to a shared file or folder before
     * the invitation was claimed.
     */
    export interface EventDetailsSharedContentChangeInviteeRoleDetails {
      '.tag': 'shared_content_change_invitee_role_details';
      shared_content_change_invitee_role_details: SharedContentChangeInviteeRoleDetails;
    }

    /**
     * Changed the audience of the link for a shared file or folder.
     */
    export interface EventDetailsSharedContentChangeLinkAudienceDetails {
      '.tag': 'shared_content_change_link_audience_details';
      shared_content_change_link_audience_details: SharedContentChangeLinkAudienceDetails;
    }

    /**
     * Changed the expiry of the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentChangeLinkExpiryDetails {
      '.tag': 'shared_content_change_link_expiry_details';
      shared_content_change_link_expiry_details: SharedContentChangeLinkExpiryDetails;
    }

    /**
     * Changed the password on the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentChangeLinkPasswordDetails {
      '.tag': 'shared_content_change_link_password_details';
      shared_content_change_link_password_details: SharedContentChangeLinkPasswordDetails;
    }

    /**
     * Changed the access type of a shared file or folder member.
     */
    export interface EventDetailsSharedContentChangeMemberRoleDetails {
      '.tag': 'shared_content_change_member_role_details';
      shared_content_change_member_role_details: SharedContentChangeMemberRoleDetails;
    }

    /**
     * Changed whether members can see who viewed the shared file or folder.
     */
    export interface EventDetailsSharedContentChangeViewerInfoPolicyDetails {
      '.tag': 'shared_content_change_viewer_info_policy_details';
      shared_content_change_viewer_info_policy_details: SharedContentChangeViewerInfoPolicyDetails;
    }

    /**
     * Claimed membership to a team member's shared folder.
     */
    export interface EventDetailsSharedContentClaimInvitationDetails {
      '.tag': 'shared_content_claim_invitation_details';
      shared_content_claim_invitation_details: SharedContentClaimInvitationDetails;
    }

    /**
     * Copied the shared file or folder to own Dropbox.
     */
    export interface EventDetailsSharedContentCopyDetails {
      '.tag': 'shared_content_copy_details';
      shared_content_copy_details: SharedContentCopyDetails;
    }

    /**
     * Downloaded the shared file or folder.
     */
    export interface EventDetailsSharedContentDownloadDetails {
      '.tag': 'shared_content_download_details';
      shared_content_download_details: SharedContentDownloadDetails;
    }

    /**
     * Left the membership of a shared file or folder.
     */
    export interface EventDetailsSharedContentRelinquishMembershipDetails {
      '.tag': 'shared_content_relinquish_membership_details';
      shared_content_relinquish_membership_details: SharedContentRelinquishMembershipDetails;
    }

    /**
     * Removed an invitee from the membership of a shared file or folder before
     * it was claimed.
     */
    export interface EventDetailsSharedContentRemoveInviteeDetails {
      '.tag': 'shared_content_remove_invitee_details';
      shared_content_remove_invitee_details: SharedContentRemoveInviteeDetails;
    }

    /**
     * Removed the expiry of the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentRemoveLinkExpiryDetails {
      '.tag': 'shared_content_remove_link_expiry_details';
      shared_content_remove_link_expiry_details: SharedContentRemoveLinkExpiryDetails;
    }

    /**
     * Removed the password on the link for the shared file or folder.
     */
    export interface EventDetailsSharedContentRemoveLinkPasswordDetails {
      '.tag': 'shared_content_remove_link_password_details';
      shared_content_remove_link_password_details: SharedContentRemoveLinkPasswordDetails;
    }

    /**
     * Removed a user or a group from the membership of a shared file or folder.
     */
    export interface EventDetailsSharedContentRemoveMemberDetails {
      '.tag': 'shared_content_remove_member_details';
      shared_content_remove_member_details: SharedContentRemoveMemberDetails;
    }

    /**
     * Requested to be on the membership of a shared file or folder.
     */
    export interface EventDetailsSharedContentRequestAccessDetails {
      '.tag': 'shared_content_request_access_details';
      shared_content_request_access_details: SharedContentRequestAccessDetails;
    }

    /**
     * Unshared a shared file or folder by clearing its membership and turning
     * off its link.
     */
    export interface EventDetailsSharedContentUnshareDetails {
      '.tag': 'shared_content_unshare_details';
      shared_content_unshare_details: SharedContentUnshareDetails;
    }

    /**
     * Previewed the shared file or folder.
     */
    export interface EventDetailsSharedContentViewDetails {
      '.tag': 'shared_content_view_details';
      shared_content_view_details: SharedContentViewDetails;
    }

    /**
     * Set or unset the confidential flag on a shared folder.
     */
    export interface EventDetailsSharedFolderChangeConfidentialityDetails {
      '.tag': 'shared_folder_change_confidentiality_details';
      shared_folder_change_confidentiality_details: SharedFolderChangeConfidentialityDetails;
    }

    /**
     * Changed who can access the shared folder via a link.
     */
    export interface EventDetailsSharedFolderChangeLinkPolicyDetails {
      '.tag': 'shared_folder_change_link_policy_details';
      shared_folder_change_link_policy_details: SharedFolderChangeLinkPolicyDetails;
    }

    /**
     * Changed who can manage the membership of a shared folder.
     */
    export interface EventDetailsSharedFolderChangeMemberManagementPolicyDetails {
      '.tag': 'shared_folder_change_member_management_policy_details';
      shared_folder_change_member_management_policy_details: SharedFolderChangeMemberManagementPolicyDetails;
    }

    /**
     * Changed who can become a member of the shared folder.
     */
    export interface EventDetailsSharedFolderChangeMemberPolicyDetails {
      '.tag': 'shared_folder_change_member_policy_details';
      shared_folder_change_member_policy_details: SharedFolderChangeMemberPolicyDetails;
    }

    /**
     * Created a shared folder.
     */
    export interface EventDetailsSharedFolderCreateDetails {
      '.tag': 'shared_folder_create_details';
      shared_folder_create_details: SharedFolderCreateDetails;
    }

    /**
     * Added a shared folder to own Dropbox.
     */
    export interface EventDetailsSharedFolderMountDetails {
      '.tag': 'shared_folder_mount_details';
      shared_folder_mount_details: SharedFolderMountDetails;
    }

    /**
     * Transferred the ownership of a shared folder to another member.
     */
    export interface EventDetailsSharedFolderTransferOwnershipDetails {
      '.tag': 'shared_folder_transfer_ownership_details';
      shared_folder_transfer_ownership_details: SharedFolderTransferOwnershipDetails;
    }

    /**
     * Deleted a shared folder from Dropbox.
     */
    export interface EventDetailsSharedFolderUnmountDetails {
      '.tag': 'shared_folder_unmount_details';
      shared_folder_unmount_details: SharedFolderUnmountDetails;
    }

    /**
     * Shared Paper document was opened.
     */
    export interface EventDetailsSharedNoteOpenedDetails {
      '.tag': 'shared_note_opened_details';
      shared_note_opened_details: SharedNoteOpenedDetails;
    }

    /**
     * Created a link to a file using an app.
     */
    export interface EventDetailsShmodelAppCreateDetails {
      '.tag': 'shmodel_app_create_details';
      shmodel_app_create_details: ShmodelAppCreateDetails;
    }

    /**
     * Created a new link.
     */
    export interface EventDetailsShmodelCreateDetails {
      '.tag': 'shmodel_create_details';
      shmodel_create_details: ShmodelCreateDetails;
    }

    /**
     * Removed a link.
     */
    export interface EventDetailsShmodelDisableDetails {
      '.tag': 'shmodel_disable_details';
      shmodel_disable_details: ShmodelDisableDetails;
    }

    /**
     * Shared a link with Facebook users.
     */
    export interface EventDetailsShmodelFbShareDetails {
      '.tag': 'shmodel_fb_share_details';
      shmodel_fb_share_details: ShmodelFbShareDetails;
    }

    /**
     * Shared a link with a group.
     */
    export interface EventDetailsShmodelGroupShareDetails {
      '.tag': 'shmodel_group_share_details';
      shmodel_group_share_details: ShmodelGroupShareDetails;
    }

    /**
     * Removed the expiration date from a link.
     */
    export interface EventDetailsShmodelRemoveExpirationDetails {
      '.tag': 'shmodel_remove_expiration_details';
      shmodel_remove_expiration_details: ShmodelRemoveExpirationDetails;
    }

    /**
     * Added an expiration date to a link.
     */
    export interface EventDetailsShmodelSetExpirationDetails {
      '.tag': 'shmodel_set_expiration_details';
      shmodel_set_expiration_details: ShmodelSetExpirationDetails;
    }

    /**
     * Added a team member's file/folder to their Dropbox from a link.
     */
    export interface EventDetailsShmodelTeamCopyDetails {
      '.tag': 'shmodel_team_copy_details';
      shmodel_team_copy_details: ShmodelTeamCopyDetails;
    }

    /**
     * Downloaded a team member's file/folder from a link.
     */
    export interface EventDetailsShmodelTeamDownloadDetails {
      '.tag': 'shmodel_team_download_details';
      shmodel_team_download_details: ShmodelTeamDownloadDetails;
    }

    /**
     * Shared a link with team members.
     */
    export interface EventDetailsShmodelTeamShareDetails {
      '.tag': 'shmodel_team_share_details';
      shmodel_team_share_details: ShmodelTeamShareDetails;
    }

    /**
     * Opened a team member's link.
     */
    export interface EventDetailsShmodelTeamViewDetails {
      '.tag': 'shmodel_team_view_details';
      shmodel_team_view_details: ShmodelTeamViewDetails;
    }

    /**
     * Password-protected a link.
     */
    export interface EventDetailsShmodelVisibilityPasswordDetails {
      '.tag': 'shmodel_visibility_password_details';
      shmodel_visibility_password_details: ShmodelVisibilityPasswordDetails;
    }

    /**
     * Made a file/folder visible to anyone with the link.
     */
    export interface EventDetailsShmodelVisibilityPublicDetails {
      '.tag': 'shmodel_visibility_public_details';
      shmodel_visibility_public_details: ShmodelVisibilityPublicDetails;
    }

    /**
     * Made a file/folder visible only to team members with the link.
     */
    export interface EventDetailsShmodelVisibilityTeamOnlyDetails {
      '.tag': 'shmodel_visibility_team_only_details';
      shmodel_visibility_team_only_details: ShmodelVisibilityTeamOnlyDetails;
    }

    /**
     * Added the X.509 certificate for SSO.
     */
    export interface EventDetailsSsoAddCertDetails {
      '.tag': 'sso_add_cert_details';
      sso_add_cert_details: SsoAddCertDetails;
    }

    /**
     * Added sign-in URL for SSO.
     */
    export interface EventDetailsSsoAddLoginUrlDetails {
      '.tag': 'sso_add_login_url_details';
      sso_add_login_url_details: SsoAddLoginUrlDetails;
    }

    /**
     * Added sign-out URL for SSO.
     */
    export interface EventDetailsSsoAddLogoutUrlDetails {
      '.tag': 'sso_add_logout_url_details';
      sso_add_logout_url_details: SsoAddLogoutUrlDetails;
    }

    /**
     * Changed the X.509 certificate for SSO.
     */
    export interface EventDetailsSsoChangeCertDetails {
      '.tag': 'sso_change_cert_details';
      sso_change_cert_details: SsoChangeCertDetails;
    }

    /**
     * Changed the sign-in URL for SSO.
     */
    export interface EventDetailsSsoChangeLoginUrlDetails {
      '.tag': 'sso_change_login_url_details';
      sso_change_login_url_details: SsoChangeLoginUrlDetails;
    }

    /**
     * Changed the sign-out URL for SSO.
     */
    export interface EventDetailsSsoChangeLogoutUrlDetails {
      '.tag': 'sso_change_logout_url_details';
      sso_change_logout_url_details: SsoChangeLogoutUrlDetails;
    }

    /**
     * Changed the SAML identity mode for SSO.
     */
    export interface EventDetailsSsoChangeSamlIdentityModeDetails {
      '.tag': 'sso_change_saml_identity_mode_details';
      sso_change_saml_identity_mode_details: SsoChangeSamlIdentityModeDetails;
    }

    /**
     * Removed the X.509 certificate for SSO.
     */
    export interface EventDetailsSsoRemoveCertDetails {
      '.tag': 'sso_remove_cert_details';
      sso_remove_cert_details: SsoRemoveCertDetails;
    }

    /**
     * Removed the sign-in URL for SSO.
     */
    export interface EventDetailsSsoRemoveLoginUrlDetails {
      '.tag': 'sso_remove_login_url_details';
      sso_remove_login_url_details: SsoRemoveLoginUrlDetails;
    }

    /**
     * Removed single sign-on logout URL.
     */
    export interface EventDetailsSsoRemoveLogoutUrlDetails {
      '.tag': 'sso_remove_logout_url_details';
      sso_remove_logout_url_details: SsoRemoveLogoutUrlDetails;
    }

    /**
     * Changed the archival status of a team folder.
     */
    export interface EventDetailsTeamFolderChangeStatusDetails {
      '.tag': 'team_folder_change_status_details';
      team_folder_change_status_details: TeamFolderChangeStatusDetails;
    }

    /**
     * Created a new team folder in active status.
     */
    export interface EventDetailsTeamFolderCreateDetails {
      '.tag': 'team_folder_create_details';
      team_folder_create_details: TeamFolderCreateDetails;
    }

    /**
     * Downgraded a team folder to a regular shared folder.
     */
    export interface EventDetailsTeamFolderDowngradeDetails {
      '.tag': 'team_folder_downgrade_details';
      team_folder_downgrade_details: TeamFolderDowngradeDetails;
    }

    /**
     * Permanently deleted an archived team folder.
     */
    export interface EventDetailsTeamFolderPermanentlyDeleteDetails {
      '.tag': 'team_folder_permanently_delete_details';
      team_folder_permanently_delete_details: TeamFolderPermanentlyDeleteDetails;
    }

    /**
     * Renamed an active or archived team folder.
     */
    export interface EventDetailsTeamFolderRenameDetails {
      '.tag': 'team_folder_rename_details';
      team_folder_rename_details: TeamFolderRenameDetails;
    }

    /**
     * Changed the account capture policy on a domain belonging to the team.
     */
    export interface EventDetailsAccountCaptureChangePolicyDetails {
      '.tag': 'account_capture_change_policy_details';
      account_capture_change_policy_details: AccountCaptureChangePolicyDetails;
    }

    /**
     * Disabled allow downloads.
     */
    export interface EventDetailsAllowDownloadDisabledDetails {
      '.tag': 'allow_download_disabled_details';
      allow_download_disabled_details: AllowDownloadDisabledDetails;
    }

    /**
     * Enabled allow downloads.
     */
    export interface EventDetailsAllowDownloadEnabledDetails {
      '.tag': 'allow_download_enabled_details';
      allow_download_enabled_details: AllowDownloadEnabledDetails;
    }

    /**
     * Set a restriction policy regarding the location of data centers where
     * team data resides.
     */
    export interface EventDetailsDataPlacementRestrictionChangePolicyDetails {
      '.tag': 'data_placement_restriction_change_policy_details';
      data_placement_restriction_change_policy_details: DataPlacementRestrictionChangePolicyDetails;
    }

    /**
     * Satisfied a previously set restriction policy regarding the location of
     * data centers where team data resides (i.e. all data have been migrated
     * according to the restriction placed).
     */
    export interface EventDetailsDataPlacementRestrictionSatisfyPolicyDetails {
      '.tag': 'data_placement_restriction_satisfy_policy_details';
      data_placement_restriction_satisfy_policy_details: DataPlacementRestrictionSatisfyPolicyDetails;
    }

    /**
     * Set or removed a limit on the number of computers each team member can
     * link to their work Dropbox account.
     */
    export interface EventDetailsDeviceApprovalsChangeDesktopPolicyDetails {
      '.tag': 'device_approvals_change_desktop_policy_details';
      device_approvals_change_desktop_policy_details: DeviceApprovalsChangeDesktopPolicyDetails;
    }

    /**
     * Set or removed a limit on the number of mobiles devices each team member
     * can link to their work Dropbox account.
     */
    export interface EventDetailsDeviceApprovalsChangeMobilePolicyDetails {
      '.tag': 'device_approvals_change_mobile_policy_details';
      device_approvals_change_mobile_policy_details: DeviceApprovalsChangeMobilePolicyDetails;
    }

    /**
     * Changed the action taken when a team member is already over the limits
     * (e.g when they join the team, an admin lowers limits, etc.).
     */
    export interface EventDetailsDeviceApprovalsChangeOverageActionDetails {
      '.tag': 'device_approvals_change_overage_action_details';
      device_approvals_change_overage_action_details: DeviceApprovalsChangeOverageActionDetails;
    }

    /**
     * Changed the action taken with respect to approval limits when a team
     * member unlinks an approved device.
     */
    export interface EventDetailsDeviceApprovalsChangeUnlinkActionDetails {
      '.tag': 'device_approvals_change_unlink_action_details';
      device_approvals_change_unlink_action_details: DeviceApprovalsChangeUnlinkActionDetails;
    }

    /**
     * Added an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EventDetailsEmmAddExceptionDetails {
      '.tag': 'emm_add_exception_details';
      emm_add_exception_details: EmmAddExceptionDetails;
    }

    /**
     * Enabled or disabled enterprise mobility management for team members.
     */
    export interface EventDetailsEmmChangePolicyDetails {
      '.tag': 'emm_change_policy_details';
      emm_change_policy_details: EmmChangePolicyDetails;
    }

    /**
     * Removed an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EventDetailsEmmRemoveExceptionDetails {
      '.tag': 'emm_remove_exception_details';
      emm_remove_exception_details: EmmRemoveExceptionDetails;
    }

    /**
     * Accepted or opted out of extended version history.
     */
    export interface EventDetailsExtendedVersionHistoryChangePolicyDetails {
      '.tag': 'extended_version_history_change_policy_details';
      extended_version_history_change_policy_details: ExtendedVersionHistoryChangePolicyDetails;
    }

    /**
     * Enabled or disabled commenting on team files.
     */
    export interface EventDetailsFileCommentsChangePolicyDetails {
      '.tag': 'file_comments_change_policy_details';
      file_comments_change_policy_details: FileCommentsChangePolicyDetails;
    }

    /**
     * Enabled or disabled file requests.
     */
    export interface EventDetailsFileRequestsChangePolicyDetails {
      '.tag': 'file_requests_change_policy_details';
      file_requests_change_policy_details: FileRequestsChangePolicyDetails;
    }

    /**
     * Enabled file request emails for everyone.
     */
    export interface EventDetailsFileRequestsEmailsEnabledDetails {
      '.tag': 'file_requests_emails_enabled_details';
      file_requests_emails_enabled_details: FileRequestsEmailsEnabledDetails;
    }

    /**
     * Allowed file request emails for the team.
     */
    export interface EventDetailsFileRequestsEmailsRestrictedToTeamOnlyDetails {
      '.tag': 'file_requests_emails_restricted_to_team_only_details';
      file_requests_emails_restricted_to_team_only_details: FileRequestsEmailsRestrictedToTeamOnlyDetails;
    }

    /**
     * Enabled or disabled Google single sign-on for the team.
     */
    export interface EventDetailsGoogleSsoChangePolicyDetails {
      '.tag': 'google_sso_change_policy_details';
      google_sso_change_policy_details: GoogleSsoChangePolicyDetails;
    }

    /**
     * Changed who can create groups.
     */
    export interface EventDetailsGroupUserManagementChangePolicyDetails {
      '.tag': 'group_user_management_change_policy_details';
      group_user_management_change_policy_details: GroupUserManagementChangePolicyDetails;
    }

    /**
     * Changed whether users can find the team when not invited.
     */
    export interface EventDetailsMemberRequestsChangePolicyDetails {
      '.tag': 'member_requests_change_policy_details';
      member_requests_change_policy_details: MemberRequestsChangePolicyDetails;
    }

    /**
     * Added an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface EventDetailsMemberSpaceLimitsAddExceptionDetails {
      '.tag': 'member_space_limits_add_exception_details';
      member_space_limits_add_exception_details: MemberSpaceLimitsAddExceptionDetails;
    }

    /**
     * Changed the team default limit level.
     */
    export interface EventDetailsMemberSpaceLimitsChangePolicyDetails {
      '.tag': 'member_space_limits_change_policy_details';
      member_space_limits_change_policy_details: MemberSpaceLimitsChangePolicyDetails;
    }

    /**
     * Removed an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface EventDetailsMemberSpaceLimitsRemoveExceptionDetails {
      '.tag': 'member_space_limits_remove_exception_details';
      member_space_limits_remove_exception_details: MemberSpaceLimitsRemoveExceptionDetails;
    }

    /**
     * Enabled or disabled the option for team members to suggest new members to
     * add to the team.
     */
    export interface EventDetailsMemberSuggestionsChangePolicyDetails {
      '.tag': 'member_suggestions_change_policy_details';
      member_suggestions_change_policy_details: MemberSuggestionsChangePolicyDetails;
    }

    /**
     * Enabled or disabled the Microsoft Office add-in, which lets team members
     * save files to Dropbox directly from Microsoft Office.
     */
    export interface EventDetailsMicrosoftOfficeAddinChangePolicyDetails {
      '.tag': 'microsoft_office_addin_change_policy_details';
      microsoft_office_addin_change_policy_details: MicrosoftOfficeAddinChangePolicyDetails;
    }

    /**
     * Enabled or disabled network control.
     */
    export interface EventDetailsNetworkControlChangePolicyDetails {
      '.tag': 'network_control_change_policy_details';
      network_control_change_policy_details: NetworkControlChangePolicyDetails;
    }

    /**
     * Changed whether Dropbox Paper, when enabled, is deployed to all teams or
     * to specific members of the team.
     */
    export interface EventDetailsPaperChangeDeploymentPolicyDetails {
      '.tag': 'paper_change_deployment_policy_details';
      paper_change_deployment_policy_details: PaperChangeDeploymentPolicyDetails;
    }

    /**
     * Changed whether non team members can view Paper documents using a link.
     */
    export interface EventDetailsPaperChangeMemberLinkPolicyDetails {
      '.tag': 'paper_change_member_link_policy_details';
      paper_change_member_link_policy_details: PaperChangeMemberLinkPolicyDetails;
    }

    /**
     * Changed whether team members can share Paper documents externally (i.e.
     * outside the team), and if so, whether they should be accessible only by
     * team members or anyone by default.
     */
    export interface EventDetailsPaperChangeMemberPolicyDetails {
      '.tag': 'paper_change_member_policy_details';
      paper_change_member_policy_details: PaperChangeMemberPolicyDetails;
    }

    /**
     * Enabled or disabled Dropbox Paper for the team.
     */
    export interface EventDetailsPaperChangePolicyDetails {
      '.tag': 'paper_change_policy_details';
      paper_change_policy_details: PaperChangePolicyDetails;
    }

    /**
     * Enabled or disabled the ability of team members to permanently delete
     * content.
     */
    export interface EventDetailsPermanentDeleteChangePolicyDetails {
      '.tag': 'permanent_delete_change_policy_details';
      permanent_delete_change_policy_details: PermanentDeleteChangePolicyDetails;
    }

    /**
     * Changed whether team members can join shared folders owned externally
     * (i.e. outside the team).
     */
    export interface EventDetailsSharingChangeFolderJoinPolicyDetails {
      '.tag': 'sharing_change_folder_join_policy_details';
      sharing_change_folder_join_policy_details: SharingChangeFolderJoinPolicyDetails;
    }

    /**
     * Changed whether team members can share links externally (i.e. outside the
     * team), and if so, whether links should be accessible only by team members
     * or anyone by default.
     */
    export interface EventDetailsSharingChangeLinkPolicyDetails {
      '.tag': 'sharing_change_link_policy_details';
      sharing_change_link_policy_details: SharingChangeLinkPolicyDetails;
    }

    /**
     * Changed whether team members can share files and folders externally (i.e.
     * outside the team).
     */
    export interface EventDetailsSharingChangeMemberPolicyDetails {
      '.tag': 'sharing_change_member_policy_details';
      sharing_change_member_policy_details: SharingChangeMemberPolicyDetails;
    }

    /**
     * Changed the default Smart Sync policy for team members.
     */
    export interface EventDetailsSmartSyncChangePolicyDetails {
      '.tag': 'smart_sync_change_policy_details';
      smart_sync_change_policy_details: SmartSyncChangePolicyDetails;
    }

    /**
     * Opted team into Smart Sync.
     */
    export interface EventDetailsSmartSyncNotOptOutDetails {
      '.tag': 'smart_sync_not_opt_out_details';
      smart_sync_not_opt_out_details: SmartSyncNotOptOutDetails;
    }

    /**
     * Opted team out of Smart Sync.
     */
    export interface EventDetailsSmartSyncOptOutDetails {
      '.tag': 'smart_sync_opt_out_details';
      smart_sync_opt_out_details: SmartSyncOptOutDetails;
    }

    /**
     * Change the single sign-on policy for the team.
     */
    export interface EventDetailsSsoChangePolicyDetails {
      '.tag': 'sso_change_policy_details';
      sso_change_policy_details: SsoChangePolicyDetails;
    }

    /**
     * Change two-step verification policy for the team.
     */
    export interface EventDetailsTfaChangePolicyDetails {
      '.tag': 'tfa_change_policy_details';
      tfa_change_policy_details: TfaChangePolicyDetails;
    }

    /**
     * Enabled or disabled the option for team members to link a personal
     * Dropbox account in addition to their work account to the same computer.
     */
    export interface EventDetailsTwoAccountChangePolicyDetails {
      '.tag': 'two_account_change_policy_details';
      two_account_change_policy_details: TwoAccountChangePolicyDetails;
    }

    /**
     * Changed how long team members can stay signed in to Dropbox on the web.
     */
    export interface EventDetailsWebSessionsChangeFixedLengthPolicyDetails {
      '.tag': 'web_sessions_change_fixed_length_policy_details';
      web_sessions_change_fixed_length_policy_details: WebSessionsChangeFixedLengthPolicyDetails;
    }

    /**
     * Changed how long team members can be idle while signed in to Dropbox on
     * the web.
     */
    export interface EventDetailsWebSessionsChangeIdleLengthPolicyDetails {
      '.tag': 'web_sessions_change_idle_length_policy_details';
      web_sessions_change_idle_length_policy_details: WebSessionsChangeIdleLengthPolicyDetails;
    }

    /**
     * Added a team logo to be displayed on shared link headers.
     */
    export interface EventDetailsTeamProfileAddLogoDetails {
      '.tag': 'team_profile_add_logo_details';
      team_profile_add_logo_details: TeamProfileAddLogoDetails;
    }

    /**
     * Changed the default language for the team.
     */
    export interface EventDetailsTeamProfileChangeDefaultLanguageDetails {
      '.tag': 'team_profile_change_default_language_details';
      team_profile_change_default_language_details: TeamProfileChangeDefaultLanguageDetails;
    }

    /**
     * Changed the team logo to be displayed on shared link headers.
     */
    export interface EventDetailsTeamProfileChangeLogoDetails {
      '.tag': 'team_profile_change_logo_details';
      team_profile_change_logo_details: TeamProfileChangeLogoDetails;
    }

    /**
     * Changed the team name.
     */
    export interface EventDetailsTeamProfileChangeNameDetails {
      '.tag': 'team_profile_change_name_details';
      team_profile_change_name_details: TeamProfileChangeNameDetails;
    }

    /**
     * Removed the team logo to be displayed on shared link headers.
     */
    export interface EventDetailsTeamProfileRemoveLogoDetails {
      '.tag': 'team_profile_remove_logo_details';
      team_profile_remove_logo_details: TeamProfileRemoveLogoDetails;
    }

    /**
     * Added a backup phone for two-step verification.
     */
    export interface EventDetailsTfaAddBackupPhoneDetails {
      '.tag': 'tfa_add_backup_phone_details';
      tfa_add_backup_phone_details: TfaAddBackupPhoneDetails;
    }

    /**
     * Added a security key for two-step verification.
     */
    export interface EventDetailsTfaAddSecurityKeyDetails {
      '.tag': 'tfa_add_security_key_details';
      tfa_add_security_key_details: TfaAddSecurityKeyDetails;
    }

    /**
     * Changed the backup phone for two-step verification.
     */
    export interface EventDetailsTfaChangeBackupPhoneDetails {
      '.tag': 'tfa_change_backup_phone_details';
      tfa_change_backup_phone_details: TfaChangeBackupPhoneDetails;
    }

    /**
     * Enabled, disabled or changed the configuration for two-step verification.
     */
    export interface EventDetailsTfaChangeStatusDetails {
      '.tag': 'tfa_change_status_details';
      tfa_change_status_details: TfaChangeStatusDetails;
    }

    /**
     * Removed the backup phone for two-step verification.
     */
    export interface EventDetailsTfaRemoveBackupPhoneDetails {
      '.tag': 'tfa_remove_backup_phone_details';
      tfa_remove_backup_phone_details: TfaRemoveBackupPhoneDetails;
    }

    /**
     * Removed a security key for two-step verification.
     */
    export interface EventDetailsTfaRemoveSecurityKeyDetails {
      '.tag': 'tfa_remove_security_key_details';
      tfa_remove_security_key_details: TfaRemoveSecurityKeyDetails;
    }

    /**
     * Reset two-step verification for team member.
     */
    export interface EventDetailsTfaResetDetails {
      '.tag': 'tfa_reset_details';
      tfa_reset_details: TfaResetDetails;
    }

    /**
     * Hints that this event was returned with missing details due to an
     * internal error.
     */
    export interface EventDetailsMissingDetails {
      '.tag': 'missing_details';
      missing_details: MissingDetails;
    }

    export interface EventDetailsOther {
      '.tag': 'other';
    }

    /**
     * Additional fields depending on the event type.
     */
    export type EventDetails = EventDetailsMemberChangeMembershipTypeDetails | EventDetailsMemberPermanentlyDeleteAccountContentsDetails | EventDetailsMemberSpaceLimitsChangeStatusDetails | EventDetailsMemberTransferAccountContentsDetails | EventDetailsPaperAdminExportStartDetails | EventDetailsPaperEnabledUsersGroupAdditionDetails | EventDetailsPaperEnabledUsersGroupRemovalDetails | EventDetailsPaperExternalViewAllowDetails | EventDetailsPaperExternalViewDefaultTeamDetails | EventDetailsPaperExternalViewForbidDetails | EventDetailsSfExternalInviteWarnDetails | EventDetailsTeamMergeFromDetails | EventDetailsTeamMergeToDetails | EventDetailsAppLinkTeamDetails | EventDetailsAppLinkUserDetails | EventDetailsAppUnlinkTeamDetails | EventDetailsAppUnlinkUserDetails | EventDetailsFileAddCommentDetails | EventDetailsFileChangeCommentSubscriptionDetails | EventDetailsFileDeleteCommentDetails | EventDetailsFileLikeCommentDetails | EventDetailsFileResolveCommentDetails | EventDetailsFileUnlikeCommentDetails | EventDetailsFileUnresolveCommentDetails | EventDetailsDeviceChangeIpDesktopDetails | EventDetailsDeviceChangeIpMobileDetails | EventDetailsDeviceChangeIpWebDetails | EventDetailsDeviceDeleteOnUnlinkFailDetails | EventDetailsDeviceDeleteOnUnlinkSuccessDetails | EventDetailsDeviceLinkFailDetails | EventDetailsDeviceLinkSuccessDetails | EventDetailsDeviceManagementDisabledDetails | EventDetailsDeviceManagementEnabledDetails | EventDetailsDeviceUnlinkDetails | EventDetailsEmmRefreshAuthTokenDetails | EventDetailsAccountCaptureChangeAvailabilityDetails | EventDetailsAccountCaptureMigrateAccountDetails | EventDetailsAccountCaptureRelinquishAccountDetails | EventDetailsDisabledDomainInvitesDetails | EventDetailsDomainInvitesApproveRequestToJoinTeamDetails | EventDetailsDomainInvitesDeclineRequestToJoinTeamDetails | EventDetailsDomainInvitesEmailExistingUsersDetails | EventDetailsDomainInvitesRequestToJoinTeamDetails | EventDetailsDomainInvitesSetInviteNewUserPrefToNoDetails | EventDetailsDomainInvitesSetInviteNewUserPrefToYesDetails | EventDetailsDomainVerificationAddDomainFailDetails | EventDetailsDomainVerificationAddDomainSuccessDetails | EventDetailsDomainVerificationRemoveDomainDetails | EventDetailsEnabledDomainInvitesDetails | EventDetailsCreateFolderDetails | EventDetailsFileAddDetails | EventDetailsFileCopyDetails | EventDetailsFileDeleteDetails | EventDetailsFileDownloadDetails | EventDetailsFileEditDetails | EventDetailsFileGetCopyReferenceDetails | EventDetailsFileMoveDetails | EventDetailsFilePermanentlyDeleteDetails | EventDetailsFilePreviewDetails | EventDetailsFileRenameDetails | EventDetailsFileRestoreDetails | EventDetailsFileRevertDetails | EventDetailsFileRollbackChangesDetails | EventDetailsFileSaveCopyReferenceDetails | EventDetailsFileRequestAddDeadlineDetails | EventDetailsFileRequestChangeDetails | EventDetailsFileRequestChangeFolderDetails | EventDetailsFileRequestCloseDetails | EventDetailsFileRequestCreateDetails | EventDetailsFileRequestReceiveFileDetails | EventDetailsFileRequestRemoveDeadlineDetails | EventDetailsFileRequestSendDetails | EventDetailsGroupAddExternalIdDetails | EventDetailsGroupAddMemberDetails | EventDetailsGroupChangeExternalIdDetails | EventDetailsGroupChangeManagementTypeDetails | EventDetailsGroupChangeMemberRoleDetails | EventDetailsGroupCreateDetails | EventDetailsGroupDeleteDetails | EventDetailsGroupMovedDetails | EventDetailsGroupRemoveExternalIdDetails | EventDetailsGroupRemoveMemberDetails | EventDetailsGroupRenameDetails | EventDetailsEmmErrorDetails | EventDetailsLoginFailDetails | EventDetailsLoginSuccessDetails | EventDetailsLogoutDetails | EventDetailsResellerSupportSessionEndDetails | EventDetailsResellerSupportSessionStartDetails | EventDetailsSignInAsSessionEndDetails | EventDetailsSignInAsSessionStartDetails | EventDetailsSsoErrorDetails | EventDetailsMemberAddNameDetails | EventDetailsMemberChangeAdminRoleDetails | EventDetailsMemberChangeEmailDetails | EventDetailsMemberChangeNameDetails | EventDetailsMemberChangeStatusDetails | EventDetailsMemberSuggestDetails | EventDetailsPaperContentAddMemberDetails | EventDetailsPaperContentAddToFolderDetails | EventDetailsPaperContentArchiveDetails | EventDetailsPaperContentCreateDetails | EventDetailsPaperContentPermanentlyDeleteDetails | EventDetailsPaperContentRemoveFromFolderDetails | EventDetailsPaperContentRemoveMemberDetails | EventDetailsPaperContentRenameDetails | EventDetailsPaperContentRestoreDetails | EventDetailsPaperDocAddCommentDetails | EventDetailsPaperDocChangeMemberRoleDetails | EventDetailsPaperDocChangeSharingPolicyDetails | EventDetailsPaperDocChangeSubscriptionDetails | EventDetailsPaperDocDeletedDetails | EventDetailsPaperDocDeleteCommentDetails | EventDetailsPaperDocDownloadDetails | EventDetailsPaperDocEditDetails | EventDetailsPaperDocEditCommentDetails | EventDetailsPaperDocFollowedDetails | EventDetailsPaperDocMentionDetails | EventDetailsPaperDocRequestAccessDetails | EventDetailsPaperDocResolveCommentDetails | EventDetailsPaperDocRevertDetails | EventDetailsPaperDocSlackShareDetails | EventDetailsPaperDocTeamInviteDetails | EventDetailsPaperDocTrashedDetails | EventDetailsPaperDocUnresolveCommentDetails | EventDetailsPaperDocUntrashedDetails | EventDetailsPaperDocViewDetails | EventDetailsPaperFolderChangeSubscriptionDetails | EventDetailsPaperFolderDeletedDetails | EventDetailsPaperFolderFollowedDetails | EventDetailsPaperFolderTeamInviteDetails | EventDetailsPasswordChangeDetails | EventDetailsPasswordResetDetails | EventDetailsPasswordResetAllDetails | EventDetailsEmmCreateExceptionsReportDetails | EventDetailsEmmCreateUsageReportDetails | EventDetailsSmartSyncCreateAdminPrivilegeReportDetails | EventDetailsTeamActivityCreateReportDetails | EventDetailsCollectionShareDetails | EventDetailsNoteAclInviteOnlyDetails | EventDetailsNoteAclLinkDetails | EventDetailsNoteAclTeamLinkDetails | EventDetailsNoteSharedDetails | EventDetailsNoteShareReceiveDetails | EventDetailsOpenNoteSharedDetails | EventDetailsSfAddGroupDetails | EventDetailsSfAllowNonMembersToViewSharedLinksDetails | EventDetailsSfInviteGroupDetails | EventDetailsSfNestDetails | EventDetailsSfTeamDeclineDetails | EventDetailsSfTeamGrantAccessDetails | EventDetailsSfTeamInviteDetails | EventDetailsSfTeamInviteChangeRoleDetails | EventDetailsSfTeamJoinDetails | EventDetailsSfTeamJoinFromOobLinkDetails | EventDetailsSfTeamUninviteDetails | EventDetailsSharedContentAddInviteesDetails | EventDetailsSharedContentAddLinkExpiryDetails | EventDetailsSharedContentAddLinkPasswordDetails | EventDetailsSharedContentAddMemberDetails | EventDetailsSharedContentChangeDownloadsPolicyDetails | EventDetailsSharedContentChangeInviteeRoleDetails | EventDetailsSharedContentChangeLinkAudienceDetails | EventDetailsSharedContentChangeLinkExpiryDetails | EventDetailsSharedContentChangeLinkPasswordDetails | EventDetailsSharedContentChangeMemberRoleDetails | EventDetailsSharedContentChangeViewerInfoPolicyDetails | EventDetailsSharedContentClaimInvitationDetails | EventDetailsSharedContentCopyDetails | EventDetailsSharedContentDownloadDetails | EventDetailsSharedContentRelinquishMembershipDetails | EventDetailsSharedContentRemoveInviteeDetails | EventDetailsSharedContentRemoveLinkExpiryDetails | EventDetailsSharedContentRemoveLinkPasswordDetails | EventDetailsSharedContentRemoveMemberDetails | EventDetailsSharedContentRequestAccessDetails | EventDetailsSharedContentUnshareDetails | EventDetailsSharedContentViewDetails | EventDetailsSharedFolderChangeConfidentialityDetails | EventDetailsSharedFolderChangeLinkPolicyDetails | EventDetailsSharedFolderChangeMemberManagementPolicyDetails | EventDetailsSharedFolderChangeMemberPolicyDetails | EventDetailsSharedFolderCreateDetails | EventDetailsSharedFolderMountDetails | EventDetailsSharedFolderTransferOwnershipDetails | EventDetailsSharedFolderUnmountDetails | EventDetailsSharedNoteOpenedDetails | EventDetailsShmodelAppCreateDetails | EventDetailsShmodelCreateDetails | EventDetailsShmodelDisableDetails | EventDetailsShmodelFbShareDetails | EventDetailsShmodelGroupShareDetails | EventDetailsShmodelRemoveExpirationDetails | EventDetailsShmodelSetExpirationDetails | EventDetailsShmodelTeamCopyDetails | EventDetailsShmodelTeamDownloadDetails | EventDetailsShmodelTeamShareDetails | EventDetailsShmodelTeamViewDetails | EventDetailsShmodelVisibilityPasswordDetails | EventDetailsShmodelVisibilityPublicDetails | EventDetailsShmodelVisibilityTeamOnlyDetails | EventDetailsSsoAddCertDetails | EventDetailsSsoAddLoginUrlDetails | EventDetailsSsoAddLogoutUrlDetails | EventDetailsSsoChangeCertDetails | EventDetailsSsoChangeLoginUrlDetails | EventDetailsSsoChangeLogoutUrlDetails | EventDetailsSsoChangeSamlIdentityModeDetails | EventDetailsSsoRemoveCertDetails | EventDetailsSsoRemoveLoginUrlDetails | EventDetailsSsoRemoveLogoutUrlDetails | EventDetailsTeamFolderChangeStatusDetails | EventDetailsTeamFolderCreateDetails | EventDetailsTeamFolderDowngradeDetails | EventDetailsTeamFolderPermanentlyDeleteDetails | EventDetailsTeamFolderRenameDetails | EventDetailsAccountCaptureChangePolicyDetails | EventDetailsAllowDownloadDisabledDetails | EventDetailsAllowDownloadEnabledDetails | EventDetailsDataPlacementRestrictionChangePolicyDetails | EventDetailsDataPlacementRestrictionSatisfyPolicyDetails | EventDetailsDeviceApprovalsChangeDesktopPolicyDetails | EventDetailsDeviceApprovalsChangeMobilePolicyDetails | EventDetailsDeviceApprovalsChangeOverageActionDetails | EventDetailsDeviceApprovalsChangeUnlinkActionDetails | EventDetailsEmmAddExceptionDetails | EventDetailsEmmChangePolicyDetails | EventDetailsEmmRemoveExceptionDetails | EventDetailsExtendedVersionHistoryChangePolicyDetails | EventDetailsFileCommentsChangePolicyDetails | EventDetailsFileRequestsChangePolicyDetails | EventDetailsFileRequestsEmailsEnabledDetails | EventDetailsFileRequestsEmailsRestrictedToTeamOnlyDetails | EventDetailsGoogleSsoChangePolicyDetails | EventDetailsGroupUserManagementChangePolicyDetails | EventDetailsMemberRequestsChangePolicyDetails | EventDetailsMemberSpaceLimitsAddExceptionDetails | EventDetailsMemberSpaceLimitsChangePolicyDetails | EventDetailsMemberSpaceLimitsRemoveExceptionDetails | EventDetailsMemberSuggestionsChangePolicyDetails | EventDetailsMicrosoftOfficeAddinChangePolicyDetails | EventDetailsNetworkControlChangePolicyDetails | EventDetailsPaperChangeDeploymentPolicyDetails | EventDetailsPaperChangeMemberLinkPolicyDetails | EventDetailsPaperChangeMemberPolicyDetails | EventDetailsPaperChangePolicyDetails | EventDetailsPermanentDeleteChangePolicyDetails | EventDetailsSharingChangeFolderJoinPolicyDetails | EventDetailsSharingChangeLinkPolicyDetails | EventDetailsSharingChangeMemberPolicyDetails | EventDetailsSmartSyncChangePolicyDetails | EventDetailsSmartSyncNotOptOutDetails | EventDetailsSmartSyncOptOutDetails | EventDetailsSsoChangePolicyDetails | EventDetailsTfaChangePolicyDetails | EventDetailsTwoAccountChangePolicyDetails | EventDetailsWebSessionsChangeFixedLengthPolicyDetails | EventDetailsWebSessionsChangeIdleLengthPolicyDetails | EventDetailsTeamProfileAddLogoDetails | EventDetailsTeamProfileChangeDefaultLanguageDetails | EventDetailsTeamProfileChangeLogoDetails | EventDetailsTeamProfileChangeNameDetails | EventDetailsTeamProfileRemoveLogoDetails | EventDetailsTfaAddBackupPhoneDetails | EventDetailsTfaAddSecurityKeyDetails | EventDetailsTfaChangeBackupPhoneDetails | EventDetailsTfaChangeStatusDetails | EventDetailsTfaRemoveBackupPhoneDetails | EventDetailsTfaRemoveSecurityKeyDetails | EventDetailsTfaResetDetails | EventDetailsMissingDetails | EventDetailsOther;

    /**
     * Changed the membership type (limited vs full) for team member. This event
     * is deprecated and will not be logged going forward as the associated
     * product functionality no longer exists.
     */
    export interface EventTypeMemberChangeMembershipType {
      '.tag': 'member_change_membership_type';
    }

    /**
     * Permanently deleted contents of a removed team member account.
     */
    export interface EventTypeMemberPermanentlyDeleteAccountContents {
      '.tag': 'member_permanently_delete_account_contents';
    }

    /**
     * Changed the status with respect to whether the team member is under or
     * over storage quota specified by policy.
     */
    export interface EventTypeMemberSpaceLimitsChangeStatus {
      '.tag': 'member_space_limits_change_status';
    }

    /**
     * Transferred contents of a removed team member account to another member.
     */
    export interface EventTypeMemberTransferAccountContents {
      '.tag': 'member_transfer_account_contents';
    }

    /**
     * Exported all Paper documents in the team.
     */
    export interface EventTypePaperAdminExportStart {
      '.tag': 'paper_admin_export_start';
    }

    /**
     * Users added to Paper enabled users list.
     */
    export interface EventTypePaperEnabledUsersGroupAddition {
      '.tag': 'paper_enabled_users_group_addition';
    }

    /**
     * Users removed from Paper enabled users list.
     */
    export interface EventTypePaperEnabledUsersGroupRemoval {
      '.tag': 'paper_enabled_users_group_removal';
    }

    /**
     * Paper external sharing policy changed: anyone. This event is deprecated
     * and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypePaperExternalViewAllow {
      '.tag': 'paper_external_view_allow';
    }

    /**
     * Paper external sharing policy changed: default team. This event is
     * deprecated and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypePaperExternalViewDefaultTeam {
      '.tag': 'paper_external_view_default_team';
    }

    /**
     * Paper external sharing policy changed: team-only. This event is
     * deprecated and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypePaperExternalViewForbid {
      '.tag': 'paper_external_view_forbid';
    }

    /**
     * Admin settings: team members see a warning before sharing folders outside
     * the team (DEPRECATED FEATURE). This event is deprecated and will not be
     * logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeSfExternalInviteWarn {
      '.tag': 'sf_external_invite_warn';
    }

    /**
     * Merged another team into this team.
     */
    export interface EventTypeTeamMergeFrom {
      '.tag': 'team_merge_from';
    }

    /**
     * Merged this team into another team.
     */
    export interface EventTypeTeamMergeTo {
      '.tag': 'team_merge_to';
    }

    /**
     * Linked an app for team.
     */
    export interface EventTypeAppLinkTeam {
      '.tag': 'app_link_team';
    }

    /**
     * Linked an app for team member.
     */
    export interface EventTypeAppLinkUser {
      '.tag': 'app_link_user';
    }

    /**
     * Unlinked an app for team.
     */
    export interface EventTypeAppUnlinkTeam {
      '.tag': 'app_unlink_team';
    }

    /**
     * Unlinked an app for team member.
     */
    export interface EventTypeAppUnlinkUser {
      '.tag': 'app_unlink_user';
    }

    /**
     * Added a file comment.
     */
    export interface EventTypeFileAddComment {
      '.tag': 'file_add_comment';
    }

    /**
     * Subscribed to or unsubscribed from comment notifications for file.
     */
    export interface EventTypeFileChangeCommentSubscription {
      '.tag': 'file_change_comment_subscription';
    }

    /**
     * Deleted a file comment.
     */
    export interface EventTypeFileDeleteComment {
      '.tag': 'file_delete_comment';
    }

    /**
     * Liked a file comment. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeFileLikeComment {
      '.tag': 'file_like_comment';
    }

    /**
     * Resolved a file comment.
     */
    export interface EventTypeFileResolveComment {
      '.tag': 'file_resolve_comment';
    }

    /**
     * Unliked a file comment. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeFileUnlikeComment {
      '.tag': 'file_unlike_comment';
    }

    /**
     * Unresolved a file comment.
     */
    export interface EventTypeFileUnresolveComment {
      '.tag': 'file_unresolve_comment';
    }

    /**
     * IP address associated with active desktop session changed.
     */
    export interface EventTypeDeviceChangeIpDesktop {
      '.tag': 'device_change_ip_desktop';
    }

    /**
     * IP address associated with active mobile session changed.
     */
    export interface EventTypeDeviceChangeIpMobile {
      '.tag': 'device_change_ip_mobile';
    }

    /**
     * IP address associated with active Web session changed.
     */
    export interface EventTypeDeviceChangeIpWeb {
      '.tag': 'device_change_ip_web';
    }

    /**
     * Failed to delete all files from an unlinked device.
     */
    export interface EventTypeDeviceDeleteOnUnlinkFail {
      '.tag': 'device_delete_on_unlink_fail';
    }

    /**
     * Deleted all files from an unlinked device.
     */
    export interface EventTypeDeviceDeleteOnUnlinkSuccess {
      '.tag': 'device_delete_on_unlink_success';
    }

    /**
     * Failed to link a device.
     */
    export interface EventTypeDeviceLinkFail {
      '.tag': 'device_link_fail';
    }

    /**
     * Linked a device.
     */
    export interface EventTypeDeviceLinkSuccess {
      '.tag': 'device_link_success';
    }

    /**
     * Disable Device Management. This event is deprecated and will not be
     * logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeDeviceManagementDisabled {
      '.tag': 'device_management_disabled';
    }

    /**
     * Enable Device Management. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeDeviceManagementEnabled {
      '.tag': 'device_management_enabled';
    }

    /**
     * Disconnected a device.
     */
    export interface EventTypeDeviceUnlink {
      '.tag': 'device_unlink';
    }

    /**
     * Refreshed the auth token used for setting up enterprise mobility
     * management.
     */
    export interface EventTypeEmmRefreshAuthToken {
      '.tag': 'emm_refresh_auth_token';
    }

    /**
     * Granted or revoked the option to enable account capture on domains
     * belonging to the team.
     */
    export interface EventTypeAccountCaptureChangeAvailability {
      '.tag': 'account_capture_change_availability';
    }

    /**
     * Account captured user migrated their account to the team.
     */
    export interface EventTypeAccountCaptureMigrateAccount {
      '.tag': 'account_capture_migrate_account';
    }

    /**
     * Account captured user relinquished their account by changing the email
     * address associated with it.
     */
    export interface EventTypeAccountCaptureRelinquishAccount {
      '.tag': 'account_capture_relinquish_account';
    }

    /**
     * Disabled domain invites. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeDisabledDomainInvites {
      '.tag': 'disabled_domain_invites';
    }

    /**
     * Approved a member's request to join the team.
     */
    export interface EventTypeDomainInvitesApproveRequestToJoinTeam {
      '.tag': 'domain_invites_approve_request_to_join_team';
    }

    /**
     * Declined a user's request to join the team.
     */
    export interface EventTypeDomainInvitesDeclineRequestToJoinTeam {
      '.tag': 'domain_invites_decline_request_to_join_team';
    }

    /**
     * Sent domain invites to existing domain accounts.
     */
    export interface EventTypeDomainInvitesEmailExistingUsers {
      '.tag': 'domain_invites_email_existing_users';
    }

    /**
     * Asked to join the team.
     */
    export interface EventTypeDomainInvitesRequestToJoinTeam {
      '.tag': 'domain_invites_request_to_join_team';
    }

    /**
     * Turned off u201cAutomatically invite new usersu201d. This event is
     * deprecated and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypeDomainInvitesSetInviteNewUserPrefToNo {
      '.tag': 'domain_invites_set_invite_new_user_pref_to_no';
    }

    /**
     * Turned on u201cAutomatically invite new usersu201d. This event is
     * deprecated and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypeDomainInvitesSetInviteNewUserPrefToYes {
      '.tag': 'domain_invites_set_invite_new_user_pref_to_yes';
    }

    /**
     * Failed to verify a domain belonging to the team.
     */
    export interface EventTypeDomainVerificationAddDomainFail {
      '.tag': 'domain_verification_add_domain_fail';
    }

    /**
     * Verified a domain belonging to the team.
     */
    export interface EventTypeDomainVerificationAddDomainSuccess {
      '.tag': 'domain_verification_add_domain_success';
    }

    /**
     * Removed a domain from the list of verified domains belonging to the team.
     */
    export interface EventTypeDomainVerificationRemoveDomain {
      '.tag': 'domain_verification_remove_domain';
    }

    /**
     * Enabled domain invites. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeEnabledDomainInvites {
      '.tag': 'enabled_domain_invites';
    }

    /**
     * Created folders. This event is deprecated and will not be logged going
     * forward as the associated product functionality no longer exists.
     */
    export interface EventTypeCreateFolder {
      '.tag': 'create_folder';
    }

    /**
     * Added files and/or folders.
     */
    export interface EventTypeFileAdd {
      '.tag': 'file_add';
    }

    /**
     * Copied files and/or folders.
     */
    export interface EventTypeFileCopy {
      '.tag': 'file_copy';
    }

    /**
     * Deleted files and/or folders.
     */
    export interface EventTypeFileDelete {
      '.tag': 'file_delete';
    }

    /**
     * Downloaded files and/or folders.
     */
    export interface EventTypeFileDownload {
      '.tag': 'file_download';
    }

    /**
     * Edited files.
     */
    export interface EventTypeFileEdit {
      '.tag': 'file_edit';
    }

    /**
     * Create a copy reference to a file or folder.
     */
    export interface EventTypeFileGetCopyReference {
      '.tag': 'file_get_copy_reference';
    }

    /**
     * Moved files and/or folders.
     */
    export interface EventTypeFileMove {
      '.tag': 'file_move';
    }

    /**
     * Permanently deleted files and/or folders.
     */
    export interface EventTypeFilePermanentlyDelete {
      '.tag': 'file_permanently_delete';
    }

    /**
     * Previewed files and/or folders.
     */
    export interface EventTypeFilePreview {
      '.tag': 'file_preview';
    }

    /**
     * Renamed files and/or folders.
     */
    export interface EventTypeFileRename {
      '.tag': 'file_rename';
    }

    /**
     * Restored deleted files and/or folders.
     */
    export interface EventTypeFileRestore {
      '.tag': 'file_restore';
    }

    /**
     * Reverted files to a previous version.
     */
    export interface EventTypeFileRevert {
      '.tag': 'file_revert';
    }

    /**
     * Rolled back file change location changes.
     */
    export interface EventTypeFileRollbackChanges {
      '.tag': 'file_rollback_changes';
    }

    /**
     * Save a file or folder using a copy reference.
     */
    export interface EventTypeFileSaveCopyReference {
      '.tag': 'file_save_copy_reference';
    }

    /**
     * Added a deadline to a file request. This event is replaced by
     * file_request_change and will not be logged going forward.
     */
    export interface EventTypeFileRequestAddDeadline {
      '.tag': 'file_request_add_deadline';
    }

    /**
     * Change a file request.
     */
    export interface EventTypeFileRequestChange {
      '.tag': 'file_request_change';
    }

    /**
     * Changed the file request folder. This event is replaced by
     * file_request_change and will not be logged going forward.
     */
    export interface EventTypeFileRequestChangeFolder {
      '.tag': 'file_request_change_folder';
    }

    /**
     * Closed a file request.
     */
    export interface EventTypeFileRequestClose {
      '.tag': 'file_request_close';
    }

    /**
     * Created a file request.
     */
    export interface EventTypeFileRequestCreate {
      '.tag': 'file_request_create';
    }

    /**
     * Received files for a file request.
     */
    export interface EventTypeFileRequestReceiveFile {
      '.tag': 'file_request_receive_file';
    }

    /**
     * Removed the file request deadline. This event is replaced by
     * file_request_change and will not be logged going forward.
     */
    export interface EventTypeFileRequestRemoveDeadline {
      '.tag': 'file_request_remove_deadline';
    }

    /**
     * Sent file request to users via email. This event is replaced by
     * file_request_change and will not be logged going forward.
     */
    export interface EventTypeFileRequestSend {
      '.tag': 'file_request_send';
    }

    /**
     * Added an external ID for group.
     */
    export interface EventTypeGroupAddExternalId {
      '.tag': 'group_add_external_id';
    }

    /**
     * Added team members to a group.
     */
    export interface EventTypeGroupAddMember {
      '.tag': 'group_add_member';
    }

    /**
     * Changed the external ID for group.
     */
    export interface EventTypeGroupChangeExternalId {
      '.tag': 'group_change_external_id';
    }

    /**
     * Changed group management type.
     */
    export interface EventTypeGroupChangeManagementType {
      '.tag': 'group_change_management_type';
    }

    /**
     * Changed the manager permissions belonging to a group member.
     */
    export interface EventTypeGroupChangeMemberRole {
      '.tag': 'group_change_member_role';
    }

    /**
     * Created a group.
     */
    export interface EventTypeGroupCreate {
      '.tag': 'group_create';
    }

    /**
     * Deleted a group.
     */
    export interface EventTypeGroupDelete {
      '.tag': 'group_delete';
    }

    /**
     * Moved a group. This event is deprecated and will not be logged going
     * forward as the associated product functionality no longer exists.
     */
    export interface EventTypeGroupMoved {
      '.tag': 'group_moved';
    }

    /**
     * Removed the external ID for group.
     */
    export interface EventTypeGroupRemoveExternalId {
      '.tag': 'group_remove_external_id';
    }

    /**
     * Removed team members from a group.
     */
    export interface EventTypeGroupRemoveMember {
      '.tag': 'group_remove_member';
    }

    /**
     * Renamed a group.
     */
    export interface EventTypeGroupRename {
      '.tag': 'group_rename';
    }

    /**
     * Failed to sign in via EMM. This event is replaced by login_fail and will
     * not be logged going forward.
     */
    export interface EventTypeEmmError {
      '.tag': 'emm_error';
    }

    /**
     * Failed to sign in.
     */
    export interface EventTypeLoginFail {
      '.tag': 'login_fail';
    }

    /**
     * Signed in.
     */
    export interface EventTypeLoginSuccess {
      '.tag': 'login_success';
    }

    /**
     * Signed out.
     */
    export interface EventTypeLogout {
      '.tag': 'logout';
    }

    /**
     * Ended reseller support session.
     */
    export interface EventTypeResellerSupportSessionEnd {
      '.tag': 'reseller_support_session_end';
    }

    /**
     * Started reseller support session.
     */
    export interface EventTypeResellerSupportSessionStart {
      '.tag': 'reseller_support_session_start';
    }

    /**
     * Ended admin sign-in-as session.
     */
    export interface EventTypeSignInAsSessionEnd {
      '.tag': 'sign_in_as_session_end';
    }

    /**
     * Started admin sign-in-as session.
     */
    export interface EventTypeSignInAsSessionStart {
      '.tag': 'sign_in_as_session_start';
    }

    /**
     * Failed to sign in via SSO. This event is replaced by login_fail and will
     * not be logged going forward.
     */
    export interface EventTypeSsoError {
      '.tag': 'sso_error';
    }

    /**
     * Set team member name when joining team.
     */
    export interface EventTypeMemberAddName {
      '.tag': 'member_add_name';
    }

    /**
     * Change the admin role belonging to team member.
     */
    export interface EventTypeMemberChangeAdminRole {
      '.tag': 'member_change_admin_role';
    }

    /**
     * Changed team member email address.
     */
    export interface EventTypeMemberChangeEmail {
      '.tag': 'member_change_email';
    }

    /**
     * Changed team member name.
     */
    export interface EventTypeMemberChangeName {
      '.tag': 'member_change_name';
    }

    /**
     * Changed the membership status of a team member.
     */
    export interface EventTypeMemberChangeStatus {
      '.tag': 'member_change_status';
    }

    /**
     * Suggested a new team member to be added to the team.
     */
    export interface EventTypeMemberSuggest {
      '.tag': 'member_suggest';
    }

    /**
     * Added users to the membership of a Paper doc or folder.
     */
    export interface EventTypePaperContentAddMember {
      '.tag': 'paper_content_add_member';
    }

    /**
     * Added Paper doc or folder to a folder.
     */
    export interface EventTypePaperContentAddToFolder {
      '.tag': 'paper_content_add_to_folder';
    }

    /**
     * Archived Paper doc or folder.
     */
    export interface EventTypePaperContentArchive {
      '.tag': 'paper_content_archive';
    }

    /**
     * Created a Paper doc or folder.
     */
    export interface EventTypePaperContentCreate {
      '.tag': 'paper_content_create';
    }

    /**
     * Permanently deleted a Paper doc or folder.
     */
    export interface EventTypePaperContentPermanentlyDelete {
      '.tag': 'paper_content_permanently_delete';
    }

    /**
     * Removed Paper doc or folder from a folder.
     */
    export interface EventTypePaperContentRemoveFromFolder {
      '.tag': 'paper_content_remove_from_folder';
    }

    /**
     * Removed a user from the membership of a Paper doc or folder.
     */
    export interface EventTypePaperContentRemoveMember {
      '.tag': 'paper_content_remove_member';
    }

    /**
     * Renamed Paper doc or folder.
     */
    export interface EventTypePaperContentRename {
      '.tag': 'paper_content_rename';
    }

    /**
     * Restored an archived Paper doc or folder.
     */
    export interface EventTypePaperContentRestore {
      '.tag': 'paper_content_restore';
    }

    /**
     * Added a Paper doc comment.
     */
    export interface EventTypePaperDocAddComment {
      '.tag': 'paper_doc_add_comment';
    }

    /**
     * Changed the access type of a Paper doc member.
     */
    export interface EventTypePaperDocChangeMemberRole {
      '.tag': 'paper_doc_change_member_role';
    }

    /**
     * Changed the sharing policy for Paper doc.
     */
    export interface EventTypePaperDocChangeSharingPolicy {
      '.tag': 'paper_doc_change_sharing_policy';
    }

    /**
     * Followed or unfollowed a Paper doc.
     */
    export interface EventTypePaperDocChangeSubscription {
      '.tag': 'paper_doc_change_subscription';
    }

    /**
     * Paper doc archived. This event is deprecated and will not be logged going
     * forward as the associated product functionality no longer exists.
     */
    export interface EventTypePaperDocDeleted {
      '.tag': 'paper_doc_deleted';
    }

    /**
     * Deleted a Paper doc comment.
     */
    export interface EventTypePaperDocDeleteComment {
      '.tag': 'paper_doc_delete_comment';
    }

    /**
     * Downloaded a Paper doc in a particular output format.
     */
    export interface EventTypePaperDocDownload {
      '.tag': 'paper_doc_download';
    }

    /**
     * Edited a Paper doc.
     */
    export interface EventTypePaperDocEdit {
      '.tag': 'paper_doc_edit';
    }

    /**
     * Edited a Paper doc comment.
     */
    export interface EventTypePaperDocEditComment {
      '.tag': 'paper_doc_edit_comment';
    }

    /**
     * Followed a Paper doc. This event is replaced by
     * paper_doc_change_subscription and will not be logged going forward.
     */
    export interface EventTypePaperDocFollowed {
      '.tag': 'paper_doc_followed';
    }

    /**
     * Mentioned a member in a Paper doc.
     */
    export interface EventTypePaperDocMention {
      '.tag': 'paper_doc_mention';
    }

    /**
     * Requested to be a member on a Paper doc.
     */
    export interface EventTypePaperDocRequestAccess {
      '.tag': 'paper_doc_request_access';
    }

    /**
     * Paper doc comment resolved.
     */
    export interface EventTypePaperDocResolveComment {
      '.tag': 'paper_doc_resolve_comment';
    }

    /**
     * Restored a Paper doc to previous revision.
     */
    export interface EventTypePaperDocRevert {
      '.tag': 'paper_doc_revert';
    }

    /**
     * Paper doc link shared via slack.
     */
    export interface EventTypePaperDocSlackShare {
      '.tag': 'paper_doc_slack_share';
    }

    /**
     * Paper doc shared with team member. This event is deprecated and will not
     * be logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypePaperDocTeamInvite {
      '.tag': 'paper_doc_team_invite';
    }

    /**
     * Paper doc trashed.
     */
    export interface EventTypePaperDocTrashed {
      '.tag': 'paper_doc_trashed';
    }

    /**
     * Unresolved a Paper doc comment.
     */
    export interface EventTypePaperDocUnresolveComment {
      '.tag': 'paper_doc_unresolve_comment';
    }

    /**
     * Paper doc untrashed.
     */
    export interface EventTypePaperDocUntrashed {
      '.tag': 'paper_doc_untrashed';
    }

    /**
     * Viewed Paper doc.
     */
    export interface EventTypePaperDocView {
      '.tag': 'paper_doc_view';
    }

    /**
     * Followed or unfollowed a Paper folder.
     */
    export interface EventTypePaperFolderChangeSubscription {
      '.tag': 'paper_folder_change_subscription';
    }

    /**
     * Paper folder archived. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypePaperFolderDeleted {
      '.tag': 'paper_folder_deleted';
    }

    /**
     * Followed a Paper folder. This event is replaced by
     * paper_folder_change_subscription and will not be logged going forward.
     */
    export interface EventTypePaperFolderFollowed {
      '.tag': 'paper_folder_followed';
    }

    /**
     * Paper folder shared with team member. This event is deprecated and will
     * not be logged going forward as the associated product functionality no
     * longer exists.
     */
    export interface EventTypePaperFolderTeamInvite {
      '.tag': 'paper_folder_team_invite';
    }

    /**
     * Changed password.
     */
    export interface EventTypePasswordChange {
      '.tag': 'password_change';
    }

    /**
     * Reset password.
     */
    export interface EventTypePasswordReset {
      '.tag': 'password_reset';
    }

    /**
     * Reset all team member passwords.
     */
    export interface EventTypePasswordResetAll {
      '.tag': 'password_reset_all';
    }

    /**
     * EMM excluded users report created.
     */
    export interface EventTypeEmmCreateExceptionsReport {
      '.tag': 'emm_create_exceptions_report';
    }

    /**
     * EMM mobile app usage report created.
     */
    export interface EventTypeEmmCreateUsageReport {
      '.tag': 'emm_create_usage_report';
    }

    /**
     * Smart Sync non-admin devices report created.
     */
    export interface EventTypeSmartSyncCreateAdminPrivilegeReport {
      '.tag': 'smart_sync_create_admin_privilege_report';
    }

    /**
     * Created a team activity report.
     */
    export interface EventTypeTeamActivityCreateReport {
      '.tag': 'team_activity_create_report';
    }

    /**
     * Shared an album.
     */
    export interface EventTypeCollectionShare {
      '.tag': 'collection_share';
    }

    /**
     * Changed a Paper document to be invite-only. This event is deprecated and
     * will not be logged going forward as the associated product functionality
     * no longer exists.
     */
    export interface EventTypeNoteAclInviteOnly {
      '.tag': 'note_acl_invite_only';
    }

    /**
     * Changed a Paper document to be link accessible. This event is deprecated
     * and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypeNoteAclLink {
      '.tag': 'note_acl_link';
    }

    /**
     * Changed a Paper document to be link accessible for the team. This event
     * is deprecated and will not be logged going forward as the associated
     * product functionality no longer exists.
     */
    export interface EventTypeNoteAclTeamLink {
      '.tag': 'note_acl_team_link';
    }

    /**
     * Shared a Paper doc. This event is deprecated and will not be logged going
     * forward as the associated product functionality no longer exists.
     */
    export interface EventTypeNoteShared {
      '.tag': 'note_shared';
    }

    /**
     * Shared Paper document received. This event is deprecated and will not be
     * logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeNoteShareReceive {
      '.tag': 'note_share_receive';
    }

    /**
     * Opened a shared Paper doc. This event is deprecated and will not be
     * logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeOpenNoteShared {
      '.tag': 'open_note_shared';
    }

    /**
     * Added the team to a shared folder.
     */
    export interface EventTypeSfAddGroup {
      '.tag': 'sf_add_group';
    }

    /**
     * Allowed non collaborators to view links to files in a shared folder. This
     * event is deprecated and will not be logged going forward as the
     * associated product functionality no longer exists.
     */
    export interface EventTypeSfAllowNonMembersToViewSharedLinks {
      '.tag': 'sf_allow_non_members_to_view_shared_links';
    }

    /**
     * Invited a group to a shared folder. This event is deprecated and will not
     * be logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeSfInviteGroup {
      '.tag': 'sf_invite_group';
    }

    /**
     * Changed parent of shared folder.
     */
    export interface EventTypeSfNest {
      '.tag': 'sf_nest';
    }

    /**
     * Declined a team member's invitation to a shared folder.
     */
    export interface EventTypeSfTeamDecline {
      '.tag': 'sf_team_decline';
    }

    /**
     * Granted access to a shared folder. This event is deprecated and will not
     * be logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeSfTeamGrantAccess {
      '.tag': 'sf_team_grant_access';
    }

    /**
     * Invited team members to a shared folder. This event is deprecated and
     * will not be logged going forward as the associated product functionality
     * no longer exists.
     */
    export interface EventTypeSfTeamInvite {
      '.tag': 'sf_team_invite';
    }

    /**
     * Changed a team member's role in a shared folder. This event is deprecated
     * and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypeSfTeamInviteChangeRole {
      '.tag': 'sf_team_invite_change_role';
    }

    /**
     * Joined a team member's shared folder. This event is deprecated and will
     * not be logged going forward as the associated product functionality no
     * longer exists.
     */
    export interface EventTypeSfTeamJoin {
      '.tag': 'sf_team_join';
    }

    /**
     * Joined a team member's shared folder from a link. This event is
     * deprecated and will not be logged going forward as the associated product
     * functionality no longer exists.
     */
    export interface EventTypeSfTeamJoinFromOobLink {
      '.tag': 'sf_team_join_from_oob_link';
    }

    /**
     * Unshared a folder with a team member. This event is deprecated and will
     * not be logged going forward as the associated product functionality no
     * longer exists.
     */
    export interface EventTypeSfTeamUninvite {
      '.tag': 'sf_team_uninvite';
    }

    /**
     * Sent an email invitation to the membership of a shared file or folder.
     */
    export interface EventTypeSharedContentAddInvitees {
      '.tag': 'shared_content_add_invitees';
    }

    /**
     * Added an expiry to the link for the shared file or folder.
     */
    export interface EventTypeSharedContentAddLinkExpiry {
      '.tag': 'shared_content_add_link_expiry';
    }

    /**
     * Added a password to the link for the shared file or folder.
     */
    export interface EventTypeSharedContentAddLinkPassword {
      '.tag': 'shared_content_add_link_password';
    }

    /**
     * Added users and/or groups to the membership of a shared file or folder.
     */
    export interface EventTypeSharedContentAddMember {
      '.tag': 'shared_content_add_member';
    }

    /**
     * Changed whether members can download the shared file or folder.
     */
    export interface EventTypeSharedContentChangeDownloadsPolicy {
      '.tag': 'shared_content_change_downloads_policy';
    }

    /**
     * Changed the access type of an invitee to a shared file or folder before
     * the invitation was claimed.
     */
    export interface EventTypeSharedContentChangeInviteeRole {
      '.tag': 'shared_content_change_invitee_role';
    }

    /**
     * Changed the audience of the link for a shared file or folder.
     */
    export interface EventTypeSharedContentChangeLinkAudience {
      '.tag': 'shared_content_change_link_audience';
    }

    /**
     * Changed the expiry of the link for the shared file or folder.
     */
    export interface EventTypeSharedContentChangeLinkExpiry {
      '.tag': 'shared_content_change_link_expiry';
    }

    /**
     * Changed the password on the link for the shared file or folder.
     */
    export interface EventTypeSharedContentChangeLinkPassword {
      '.tag': 'shared_content_change_link_password';
    }

    /**
     * Changed the access type of a shared file or folder member.
     */
    export interface EventTypeSharedContentChangeMemberRole {
      '.tag': 'shared_content_change_member_role';
    }

    /**
     * Changed whether members can see who viewed the shared file or folder.
     */
    export interface EventTypeSharedContentChangeViewerInfoPolicy {
      '.tag': 'shared_content_change_viewer_info_policy';
    }

    /**
     * Claimed membership to a team member's shared folder.
     */
    export interface EventTypeSharedContentClaimInvitation {
      '.tag': 'shared_content_claim_invitation';
    }

    /**
     * Copied the shared file or folder to own Dropbox.
     */
    export interface EventTypeSharedContentCopy {
      '.tag': 'shared_content_copy';
    }

    /**
     * Downloaded the shared file or folder.
     */
    export interface EventTypeSharedContentDownload {
      '.tag': 'shared_content_download';
    }

    /**
     * Left the membership of a shared file or folder.
     */
    export interface EventTypeSharedContentRelinquishMembership {
      '.tag': 'shared_content_relinquish_membership';
    }

    /**
     * Removed an invitee from the membership of a shared file or folder before
     * it was claimed.
     */
    export interface EventTypeSharedContentRemoveInvitee {
      '.tag': 'shared_content_remove_invitee';
    }

    /**
     * Removed the expiry of the link for the shared file or folder.
     */
    export interface EventTypeSharedContentRemoveLinkExpiry {
      '.tag': 'shared_content_remove_link_expiry';
    }

    /**
     * Removed the password on the link for the shared file or folder.
     */
    export interface EventTypeSharedContentRemoveLinkPassword {
      '.tag': 'shared_content_remove_link_password';
    }

    /**
     * Removed a user or a group from the membership of a shared file or folder.
     */
    export interface EventTypeSharedContentRemoveMember {
      '.tag': 'shared_content_remove_member';
    }

    /**
     * Requested to be on the membership of a shared file or folder.
     */
    export interface EventTypeSharedContentRequestAccess {
      '.tag': 'shared_content_request_access';
    }

    /**
     * Unshared a shared file or folder by clearing its membership and turning
     * off its link.
     */
    export interface EventTypeSharedContentUnshare {
      '.tag': 'shared_content_unshare';
    }

    /**
     * Previewed the shared file or folder.
     */
    export interface EventTypeSharedContentView {
      '.tag': 'shared_content_view';
    }

    /**
     * Set or unset the confidential flag on a shared folder.
     */
    export interface EventTypeSharedFolderChangeConfidentiality {
      '.tag': 'shared_folder_change_confidentiality';
    }

    /**
     * Changed who can access the shared folder via a link.
     */
    export interface EventTypeSharedFolderChangeLinkPolicy {
      '.tag': 'shared_folder_change_link_policy';
    }

    /**
     * Changed who can manage the membership of a shared folder.
     */
    export interface EventTypeSharedFolderChangeMemberManagementPolicy {
      '.tag': 'shared_folder_change_member_management_policy';
    }

    /**
     * Changed who can become a member of the shared folder.
     */
    export interface EventTypeSharedFolderChangeMemberPolicy {
      '.tag': 'shared_folder_change_member_policy';
    }

    /**
     * Created a shared folder.
     */
    export interface EventTypeSharedFolderCreate {
      '.tag': 'shared_folder_create';
    }

    /**
     * Added a shared folder to own Dropbox.
     */
    export interface EventTypeSharedFolderMount {
      '.tag': 'shared_folder_mount';
    }

    /**
     * Transferred the ownership of a shared folder to another member.
     */
    export interface EventTypeSharedFolderTransferOwnership {
      '.tag': 'shared_folder_transfer_ownership';
    }

    /**
     * Deleted a shared folder from Dropbox.
     */
    export interface EventTypeSharedFolderUnmount {
      '.tag': 'shared_folder_unmount';
    }

    /**
     * Shared Paper document was opened. This event is deprecated and will not
     * be logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeSharedNoteOpened {
      '.tag': 'shared_note_opened';
    }

    /**
     * Created a link to a file using an app.
     */
    export interface EventTypeShmodelAppCreate {
      '.tag': 'shmodel_app_create';
    }

    /**
     * Created a new link.
     */
    export interface EventTypeShmodelCreate {
      '.tag': 'shmodel_create';
    }

    /**
     * Removed a link.
     */
    export interface EventTypeShmodelDisable {
      '.tag': 'shmodel_disable';
    }

    /**
     * Shared a link with Facebook users.
     */
    export interface EventTypeShmodelFbShare {
      '.tag': 'shmodel_fb_share';
    }

    /**
     * Shared a link with a group. This event is deprecated and will not be
     * logged going forward as the associated product functionality no longer
     * exists.
     */
    export interface EventTypeShmodelGroupShare {
      '.tag': 'shmodel_group_share';
    }

    /**
     * Removed the expiration date from a link.
     */
    export interface EventTypeShmodelRemoveExpiration {
      '.tag': 'shmodel_remove_expiration';
    }

    /**
     * Added an expiration date to a link.
     */
    export interface EventTypeShmodelSetExpiration {
      '.tag': 'shmodel_set_expiration';
    }

    /**
     * Added a team member's file/folder to their Dropbox from a link.
     */
    export interface EventTypeShmodelTeamCopy {
      '.tag': 'shmodel_team_copy';
    }

    /**
     * Downloaded a team member's file/folder from a link.
     */
    export interface EventTypeShmodelTeamDownload {
      '.tag': 'shmodel_team_download';
    }

    /**
     * Shared a link with team members.
     */
    export interface EventTypeShmodelTeamShare {
      '.tag': 'shmodel_team_share';
    }

    /**
     * Opened a team member's link.
     */
    export interface EventTypeShmodelTeamView {
      '.tag': 'shmodel_team_view';
    }

    /**
     * Password-protected a link.
     */
    export interface EventTypeShmodelVisibilityPassword {
      '.tag': 'shmodel_visibility_password';
    }

    /**
     * Made a file/folder visible to anyone with the link.
     */
    export interface EventTypeShmodelVisibilityPublic {
      '.tag': 'shmodel_visibility_public';
    }

    /**
     * Made a file/folder visible only to team members with the link.
     */
    export interface EventTypeShmodelVisibilityTeamOnly {
      '.tag': 'shmodel_visibility_team_only';
    }

    /**
     * Added the X.509 certificate for SSO.
     */
    export interface EventTypeSsoAddCert {
      '.tag': 'sso_add_cert';
    }

    /**
     * Added sign-in URL for SSO.
     */
    export interface EventTypeSsoAddLoginUrl {
      '.tag': 'sso_add_login_url';
    }

    /**
     * Added sign-out URL for SSO.
     */
    export interface EventTypeSsoAddLogoutUrl {
      '.tag': 'sso_add_logout_url';
    }

    /**
     * Changed the X.509 certificate for SSO.
     */
    export interface EventTypeSsoChangeCert {
      '.tag': 'sso_change_cert';
    }

    /**
     * Changed the sign-in URL for SSO.
     */
    export interface EventTypeSsoChangeLoginUrl {
      '.tag': 'sso_change_login_url';
    }

    /**
     * Changed the sign-out URL for SSO.
     */
    export interface EventTypeSsoChangeLogoutUrl {
      '.tag': 'sso_change_logout_url';
    }

    /**
     * Changed the SAML identity mode for SSO.
     */
    export interface EventTypeSsoChangeSamlIdentityMode {
      '.tag': 'sso_change_saml_identity_mode';
    }

    /**
     * Removed the X.509 certificate for SSO.
     */
    export interface EventTypeSsoRemoveCert {
      '.tag': 'sso_remove_cert';
    }

    /**
     * Removed the sign-in URL for SSO.
     */
    export interface EventTypeSsoRemoveLoginUrl {
      '.tag': 'sso_remove_login_url';
    }

    /**
     * Removed single sign-on logout URL.
     */
    export interface EventTypeSsoRemoveLogoutUrl {
      '.tag': 'sso_remove_logout_url';
    }

    /**
     * Changed the archival status of a team folder.
     */
    export interface EventTypeTeamFolderChangeStatus {
      '.tag': 'team_folder_change_status';
    }

    /**
     * Created a new team folder in active status.
     */
    export interface EventTypeTeamFolderCreate {
      '.tag': 'team_folder_create';
    }

    /**
     * Downgraded a team folder to a regular shared folder.
     */
    export interface EventTypeTeamFolderDowngrade {
      '.tag': 'team_folder_downgrade';
    }

    /**
     * Permanently deleted an archived team folder.
     */
    export interface EventTypeTeamFolderPermanentlyDelete {
      '.tag': 'team_folder_permanently_delete';
    }

    /**
     * Renamed an active or archived team folder.
     */
    export interface EventTypeTeamFolderRename {
      '.tag': 'team_folder_rename';
    }

    /**
     * Changed the account capture policy on a domain belonging to the team.
     */
    export interface EventTypeAccountCaptureChangePolicy {
      '.tag': 'account_capture_change_policy';
    }

    /**
     * Disabled allow downloads. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeAllowDownloadDisabled {
      '.tag': 'allow_download_disabled';
    }

    /**
     * Enabled allow downloads. This event is deprecated and will not be logged
     * going forward as the associated product functionality no longer exists.
     */
    export interface EventTypeAllowDownloadEnabled {
      '.tag': 'allow_download_enabled';
    }

    /**
     * Set a restriction policy regarding the location of data centers where
     * team data resides.
     */
    export interface EventTypeDataPlacementRestrictionChangePolicy {
      '.tag': 'data_placement_restriction_change_policy';
    }

    /**
     * Satisfied a previously set restriction policy regarding the location of
     * data centers where team data resides (i.e. all data have been migrated
     * according to the restriction placed).
     */
    export interface EventTypeDataPlacementRestrictionSatisfyPolicy {
      '.tag': 'data_placement_restriction_satisfy_policy';
    }

    /**
     * Set or removed a limit on the number of computers each team member can
     * link to their work Dropbox account.
     */
    export interface EventTypeDeviceApprovalsChangeDesktopPolicy {
      '.tag': 'device_approvals_change_desktop_policy';
    }

    /**
     * Set or removed a limit on the number of mobiles devices each team member
     * can link to their work Dropbox account.
     */
    export interface EventTypeDeviceApprovalsChangeMobilePolicy {
      '.tag': 'device_approvals_change_mobile_policy';
    }

    /**
     * Changed the action taken when a team member is already over the limits
     * (e.g when they join the team, an admin lowers limits, etc.).
     */
    export interface EventTypeDeviceApprovalsChangeOverageAction {
      '.tag': 'device_approvals_change_overage_action';
    }

    /**
     * Changed the action taken with respect to approval limits when a team
     * member unlinks an approved device.
     */
    export interface EventTypeDeviceApprovalsChangeUnlinkAction {
      '.tag': 'device_approvals_change_unlink_action';
    }

    /**
     * Added an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EventTypeEmmAddException {
      '.tag': 'emm_add_exception';
    }

    /**
     * Enabled or disabled enterprise mobility management for team members.
     */
    export interface EventTypeEmmChangePolicy {
      '.tag': 'emm_change_policy';
    }

    /**
     * Removed an exception for one or more team members to optionally use the
     * regular Dropbox app when EMM is enabled.
     */
    export interface EventTypeEmmRemoveException {
      '.tag': 'emm_remove_exception';
    }

    /**
     * Accepted or opted out of extended version history.
     */
    export interface EventTypeExtendedVersionHistoryChangePolicy {
      '.tag': 'extended_version_history_change_policy';
    }

    /**
     * Enabled or disabled commenting on team files.
     */
    export interface EventTypeFileCommentsChangePolicy {
      '.tag': 'file_comments_change_policy';
    }

    /**
     * Enabled or disabled file requests.
     */
    export interface EventTypeFileRequestsChangePolicy {
      '.tag': 'file_requests_change_policy';
    }

    /**
     * Enabled file request emails for everyone. This event is deprecated and
     * will not be logged going forward as the associated product functionality
     * no longer exists.
     */
    export interface EventTypeFileRequestsEmailsEnabled {
      '.tag': 'file_requests_emails_enabled';
    }

    /**
     * Allowed file request emails for the team. This event is deprecated and
     * will not be logged going forward as the associated product functionality
     * no longer exists.
     */
    export interface EventTypeFileRequestsEmailsRestrictedToTeamOnly {
      '.tag': 'file_requests_emails_restricted_to_team_only';
    }

    /**
     * Enabled or disabled Google single sign-on for the team.
     */
    export interface EventTypeGoogleSsoChangePolicy {
      '.tag': 'google_sso_change_policy';
    }

    /**
     * Changed who can create groups.
     */
    export interface EventTypeGroupUserManagementChangePolicy {
      '.tag': 'group_user_management_change_policy';
    }

    /**
     * Changed whether users can find the team when not invited.
     */
    export interface EventTypeMemberRequestsChangePolicy {
      '.tag': 'member_requests_change_policy';
    }

    /**
     * Added an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface EventTypeMemberSpaceLimitsAddException {
      '.tag': 'member_space_limits_add_exception';
    }

    /**
     * Changed the team default limit level.
     */
    export interface EventTypeMemberSpaceLimitsChangePolicy {
      '.tag': 'member_space_limits_change_policy';
    }

    /**
     * Removed an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface EventTypeMemberSpaceLimitsRemoveException {
      '.tag': 'member_space_limits_remove_exception';
    }

    /**
     * Enabled or disabled the option for team members to suggest new members to
     * add to the team.
     */
    export interface EventTypeMemberSuggestionsChangePolicy {
      '.tag': 'member_suggestions_change_policy';
    }

    /**
     * Enabled or disabled the Microsoft Office add-in, which lets team members
     * save files to Dropbox directly from Microsoft Office.
     */
    export interface EventTypeMicrosoftOfficeAddinChangePolicy {
      '.tag': 'microsoft_office_addin_change_policy';
    }

    /**
     * Enabled or disabled network control.
     */
    export interface EventTypeNetworkControlChangePolicy {
      '.tag': 'network_control_change_policy';
    }

    /**
     * Changed whether Dropbox Paper, when enabled, is deployed to all teams or
     * to specific members of the team.
     */
    export interface EventTypePaperChangeDeploymentPolicy {
      '.tag': 'paper_change_deployment_policy';
    }

    /**
     * Changed whether non team members can view Paper documents using a link.
     * This event is deprecated and will not be logged going forward as the
     * associated product functionality no longer exists.
     */
    export interface EventTypePaperChangeMemberLinkPolicy {
      '.tag': 'paper_change_member_link_policy';
    }

    /**
     * Changed whether team members can share Paper documents externally (i.e.
     * outside the team), and if so, whether they should be accessible only by
     * team members or anyone by default.
     */
    export interface EventTypePaperChangeMemberPolicy {
      '.tag': 'paper_change_member_policy';
    }

    /**
     * Enabled or disabled Dropbox Paper for the team.
     */
    export interface EventTypePaperChangePolicy {
      '.tag': 'paper_change_policy';
    }

    /**
     * Enabled or disabled the ability of team members to permanently delete
     * content.
     */
    export interface EventTypePermanentDeleteChangePolicy {
      '.tag': 'permanent_delete_change_policy';
    }

    /**
     * Changed whether team members can join shared folders owned externally
     * (i.e. outside the team).
     */
    export interface EventTypeSharingChangeFolderJoinPolicy {
      '.tag': 'sharing_change_folder_join_policy';
    }

    /**
     * Changed whether team members can share links externally (i.e. outside the
     * team), and if so, whether links should be accessible only by team members
     * or anyone by default.
     */
    export interface EventTypeSharingChangeLinkPolicy {
      '.tag': 'sharing_change_link_policy';
    }

    /**
     * Changed whether team members can share files and folders externally (i.e.
     * outside the team).
     */
    export interface EventTypeSharingChangeMemberPolicy {
      '.tag': 'sharing_change_member_policy';
    }

    /**
     * Changed the default Smart Sync policy for team members.
     */
    export interface EventTypeSmartSyncChangePolicy {
      '.tag': 'smart_sync_change_policy';
    }

    /**
     * Opted team into Smart Sync.
     */
    export interface EventTypeSmartSyncNotOptOut {
      '.tag': 'smart_sync_not_opt_out';
    }

    /**
     * Opted team out of Smart Sync.
     */
    export interface EventTypeSmartSyncOptOut {
      '.tag': 'smart_sync_opt_out';
    }

    /**
     * Change the single sign-on policy for the team.
     */
    export interface EventTypeSsoChangePolicy {
      '.tag': 'sso_change_policy';
    }

    /**
     * Change two-step verification policy for the team.
     */
    export interface EventTypeTfaChangePolicy {
      '.tag': 'tfa_change_policy';
    }

    /**
     * Enabled or disabled the option for team members to link a personal
     * Dropbox account in addition to their work account to the same computer.
     */
    export interface EventTypeTwoAccountChangePolicy {
      '.tag': 'two_account_change_policy';
    }

    /**
     * Changed how long team members can stay signed in to Dropbox on the web.
     */
    export interface EventTypeWebSessionsChangeFixedLengthPolicy {
      '.tag': 'web_sessions_change_fixed_length_policy';
    }

    /**
     * Changed how long team members can be idle while signed in to Dropbox on
     * the web.
     */
    export interface EventTypeWebSessionsChangeIdleLengthPolicy {
      '.tag': 'web_sessions_change_idle_length_policy';
    }

    /**
     * Added a team logo to be displayed on shared link headers.
     */
    export interface EventTypeTeamProfileAddLogo {
      '.tag': 'team_profile_add_logo';
    }

    /**
     * Changed the default language for the team.
     */
    export interface EventTypeTeamProfileChangeDefaultLanguage {
      '.tag': 'team_profile_change_default_language';
    }

    /**
     * Changed the team logo to be displayed on shared link headers.
     */
    export interface EventTypeTeamProfileChangeLogo {
      '.tag': 'team_profile_change_logo';
    }

    /**
     * Changed the team name.
     */
    export interface EventTypeTeamProfileChangeName {
      '.tag': 'team_profile_change_name';
    }

    /**
     * Removed the team logo to be displayed on shared link headers.
     */
    export interface EventTypeTeamProfileRemoveLogo {
      '.tag': 'team_profile_remove_logo';
    }

    /**
     * Added a backup phone for two-step verification.
     */
    export interface EventTypeTfaAddBackupPhone {
      '.tag': 'tfa_add_backup_phone';
    }

    /**
     * Added a security key for two-step verification.
     */
    export interface EventTypeTfaAddSecurityKey {
      '.tag': 'tfa_add_security_key';
    }

    /**
     * Changed the backup phone for two-step verification.
     */
    export interface EventTypeTfaChangeBackupPhone {
      '.tag': 'tfa_change_backup_phone';
    }

    /**
     * Enabled, disabled or changed the configuration for two-step verification.
     */
    export interface EventTypeTfaChangeStatus {
      '.tag': 'tfa_change_status';
    }

    /**
     * Removed the backup phone for two-step verification.
     */
    export interface EventTypeTfaRemoveBackupPhone {
      '.tag': 'tfa_remove_backup_phone';
    }

    /**
     * Removed a security key for two-step verification.
     */
    export interface EventTypeTfaRemoveSecurityKey {
      '.tag': 'tfa_remove_security_key';
    }

    /**
     * Reset two-step verification for team member.
     */
    export interface EventTypeTfaReset {
      '.tag': 'tfa_reset';
    }

    export interface EventTypeOther {
      '.tag': 'other';
    }

    /**
     * The type of the event.
     */
    export type EventType = EventTypeMemberChangeMembershipType | EventTypeMemberPermanentlyDeleteAccountContents | EventTypeMemberSpaceLimitsChangeStatus | EventTypeMemberTransferAccountContents | EventTypePaperAdminExportStart | EventTypePaperEnabledUsersGroupAddition | EventTypePaperEnabledUsersGroupRemoval | EventTypePaperExternalViewAllow | EventTypePaperExternalViewDefaultTeam | EventTypePaperExternalViewForbid | EventTypeSfExternalInviteWarn | EventTypeTeamMergeFrom | EventTypeTeamMergeTo | EventTypeAppLinkTeam | EventTypeAppLinkUser | EventTypeAppUnlinkTeam | EventTypeAppUnlinkUser | EventTypeFileAddComment | EventTypeFileChangeCommentSubscription | EventTypeFileDeleteComment | EventTypeFileLikeComment | EventTypeFileResolveComment | EventTypeFileUnlikeComment | EventTypeFileUnresolveComment | EventTypeDeviceChangeIpDesktop | EventTypeDeviceChangeIpMobile | EventTypeDeviceChangeIpWeb | EventTypeDeviceDeleteOnUnlinkFail | EventTypeDeviceDeleteOnUnlinkSuccess | EventTypeDeviceLinkFail | EventTypeDeviceLinkSuccess | EventTypeDeviceManagementDisabled | EventTypeDeviceManagementEnabled | EventTypeDeviceUnlink | EventTypeEmmRefreshAuthToken | EventTypeAccountCaptureChangeAvailability | EventTypeAccountCaptureMigrateAccount | EventTypeAccountCaptureRelinquishAccount | EventTypeDisabledDomainInvites | EventTypeDomainInvitesApproveRequestToJoinTeam | EventTypeDomainInvitesDeclineRequestToJoinTeam | EventTypeDomainInvitesEmailExistingUsers | EventTypeDomainInvitesRequestToJoinTeam | EventTypeDomainInvitesSetInviteNewUserPrefToNo | EventTypeDomainInvitesSetInviteNewUserPrefToYes | EventTypeDomainVerificationAddDomainFail | EventTypeDomainVerificationAddDomainSuccess | EventTypeDomainVerificationRemoveDomain | EventTypeEnabledDomainInvites | EventTypeCreateFolder | EventTypeFileAdd | EventTypeFileCopy | EventTypeFileDelete | EventTypeFileDownload | EventTypeFileEdit | EventTypeFileGetCopyReference | EventTypeFileMove | EventTypeFilePermanentlyDelete | EventTypeFilePreview | EventTypeFileRename | EventTypeFileRestore | EventTypeFileRevert | EventTypeFileRollbackChanges | EventTypeFileSaveCopyReference | EventTypeFileRequestAddDeadline | EventTypeFileRequestChange | EventTypeFileRequestChangeFolder | EventTypeFileRequestClose | EventTypeFileRequestCreate | EventTypeFileRequestReceiveFile | EventTypeFileRequestRemoveDeadline | EventTypeFileRequestSend | EventTypeGroupAddExternalId | EventTypeGroupAddMember | EventTypeGroupChangeExternalId | EventTypeGroupChangeManagementType | EventTypeGroupChangeMemberRole | EventTypeGroupCreate | EventTypeGroupDelete | EventTypeGroupMoved | EventTypeGroupRemoveExternalId | EventTypeGroupRemoveMember | EventTypeGroupRename | EventTypeEmmError | EventTypeLoginFail | EventTypeLoginSuccess | EventTypeLogout | EventTypeResellerSupportSessionEnd | EventTypeResellerSupportSessionStart | EventTypeSignInAsSessionEnd | EventTypeSignInAsSessionStart | EventTypeSsoError | EventTypeMemberAddName | EventTypeMemberChangeAdminRole | EventTypeMemberChangeEmail | EventTypeMemberChangeName | EventTypeMemberChangeStatus | EventTypeMemberSuggest | EventTypePaperContentAddMember | EventTypePaperContentAddToFolder | EventTypePaperContentArchive | EventTypePaperContentCreate | EventTypePaperContentPermanentlyDelete | EventTypePaperContentRemoveFromFolder | EventTypePaperContentRemoveMember | EventTypePaperContentRename | EventTypePaperContentRestore | EventTypePaperDocAddComment | EventTypePaperDocChangeMemberRole | EventTypePaperDocChangeSharingPolicy | EventTypePaperDocChangeSubscription | EventTypePaperDocDeleted | EventTypePaperDocDeleteComment | EventTypePaperDocDownload | EventTypePaperDocEdit | EventTypePaperDocEditComment | EventTypePaperDocFollowed | EventTypePaperDocMention | EventTypePaperDocRequestAccess | EventTypePaperDocResolveComment | EventTypePaperDocRevert | EventTypePaperDocSlackShare | EventTypePaperDocTeamInvite | EventTypePaperDocTrashed | EventTypePaperDocUnresolveComment | EventTypePaperDocUntrashed | EventTypePaperDocView | EventTypePaperFolderChangeSubscription | EventTypePaperFolderDeleted | EventTypePaperFolderFollowed | EventTypePaperFolderTeamInvite | EventTypePasswordChange | EventTypePasswordReset | EventTypePasswordResetAll | EventTypeEmmCreateExceptionsReport | EventTypeEmmCreateUsageReport | EventTypeSmartSyncCreateAdminPrivilegeReport | EventTypeTeamActivityCreateReport | EventTypeCollectionShare | EventTypeNoteAclInviteOnly | EventTypeNoteAclLink | EventTypeNoteAclTeamLink | EventTypeNoteShared | EventTypeNoteShareReceive | EventTypeOpenNoteShared | EventTypeSfAddGroup | EventTypeSfAllowNonMembersToViewSharedLinks | EventTypeSfInviteGroup | EventTypeSfNest | EventTypeSfTeamDecline | EventTypeSfTeamGrantAccess | EventTypeSfTeamInvite | EventTypeSfTeamInviteChangeRole | EventTypeSfTeamJoin | EventTypeSfTeamJoinFromOobLink | EventTypeSfTeamUninvite | EventTypeSharedContentAddInvitees | EventTypeSharedContentAddLinkExpiry | EventTypeSharedContentAddLinkPassword | EventTypeSharedContentAddMember | EventTypeSharedContentChangeDownloadsPolicy | EventTypeSharedContentChangeInviteeRole | EventTypeSharedContentChangeLinkAudience | EventTypeSharedContentChangeLinkExpiry | EventTypeSharedContentChangeLinkPassword | EventTypeSharedContentChangeMemberRole | EventTypeSharedContentChangeViewerInfoPolicy | EventTypeSharedContentClaimInvitation | EventTypeSharedContentCopy | EventTypeSharedContentDownload | EventTypeSharedContentRelinquishMembership | EventTypeSharedContentRemoveInvitee | EventTypeSharedContentRemoveLinkExpiry | EventTypeSharedContentRemoveLinkPassword | EventTypeSharedContentRemoveMember | EventTypeSharedContentRequestAccess | EventTypeSharedContentUnshare | EventTypeSharedContentView | EventTypeSharedFolderChangeConfidentiality | EventTypeSharedFolderChangeLinkPolicy | EventTypeSharedFolderChangeMemberManagementPolicy | EventTypeSharedFolderChangeMemberPolicy | EventTypeSharedFolderCreate | EventTypeSharedFolderMount | EventTypeSharedFolderTransferOwnership | EventTypeSharedFolderUnmount | EventTypeSharedNoteOpened | EventTypeShmodelAppCreate | EventTypeShmodelCreate | EventTypeShmodelDisable | EventTypeShmodelFbShare | EventTypeShmodelGroupShare | EventTypeShmodelRemoveExpiration | EventTypeShmodelSetExpiration | EventTypeShmodelTeamCopy | EventTypeShmodelTeamDownload | EventTypeShmodelTeamShare | EventTypeShmodelTeamView | EventTypeShmodelVisibilityPassword | EventTypeShmodelVisibilityPublic | EventTypeShmodelVisibilityTeamOnly | EventTypeSsoAddCert | EventTypeSsoAddLoginUrl | EventTypeSsoAddLogoutUrl | EventTypeSsoChangeCert | EventTypeSsoChangeLoginUrl | EventTypeSsoChangeLogoutUrl | EventTypeSsoChangeSamlIdentityMode | EventTypeSsoRemoveCert | EventTypeSsoRemoveLoginUrl | EventTypeSsoRemoveLogoutUrl | EventTypeTeamFolderChangeStatus | EventTypeTeamFolderCreate | EventTypeTeamFolderDowngrade | EventTypeTeamFolderPermanentlyDelete | EventTypeTeamFolderRename | EventTypeAccountCaptureChangePolicy | EventTypeAllowDownloadDisabled | EventTypeAllowDownloadEnabled | EventTypeDataPlacementRestrictionChangePolicy | EventTypeDataPlacementRestrictionSatisfyPolicy | EventTypeDeviceApprovalsChangeDesktopPolicy | EventTypeDeviceApprovalsChangeMobilePolicy | EventTypeDeviceApprovalsChangeOverageAction | EventTypeDeviceApprovalsChangeUnlinkAction | EventTypeEmmAddException | EventTypeEmmChangePolicy | EventTypeEmmRemoveException | EventTypeExtendedVersionHistoryChangePolicy | EventTypeFileCommentsChangePolicy | EventTypeFileRequestsChangePolicy | EventTypeFileRequestsEmailsEnabled | EventTypeFileRequestsEmailsRestrictedToTeamOnly | EventTypeGoogleSsoChangePolicy | EventTypeGroupUserManagementChangePolicy | EventTypeMemberRequestsChangePolicy | EventTypeMemberSpaceLimitsAddException | EventTypeMemberSpaceLimitsChangePolicy | EventTypeMemberSpaceLimitsRemoveException | EventTypeMemberSuggestionsChangePolicy | EventTypeMicrosoftOfficeAddinChangePolicy | EventTypeNetworkControlChangePolicy | EventTypePaperChangeDeploymentPolicy | EventTypePaperChangeMemberLinkPolicy | EventTypePaperChangeMemberPolicy | EventTypePaperChangePolicy | EventTypePermanentDeleteChangePolicy | EventTypeSharingChangeFolderJoinPolicy | EventTypeSharingChangeLinkPolicy | EventTypeSharingChangeMemberPolicy | EventTypeSmartSyncChangePolicy | EventTypeSmartSyncNotOptOut | EventTypeSmartSyncOptOut | EventTypeSsoChangePolicy | EventTypeTfaChangePolicy | EventTypeTwoAccountChangePolicy | EventTypeWebSessionsChangeFixedLengthPolicy | EventTypeWebSessionsChangeIdleLengthPolicy | EventTypeTeamProfileAddLogo | EventTypeTeamProfileChangeDefaultLanguage | EventTypeTeamProfileChangeLogo | EventTypeTeamProfileChangeName | EventTypeTeamProfileRemoveLogo | EventTypeTfaAddBackupPhone | EventTypeTfaAddSecurityKey | EventTypeTfaChangeBackupPhone | EventTypeTfaChangeStatus | EventTypeTfaRemoveBackupPhone | EventTypeTfaRemoveSecurityKey | EventTypeTfaReset | EventTypeOther;

    /**
     * Accepted or opted out of extended version history.
     */
    export interface ExtendedVersionHistoryChangePolicyDetails {
      /**
       * New extended version history policy.
       */
      new_value: ExtendedVersionHistoryPolicy;
      /**
       * Previous extended version history policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: ExtendedVersionHistoryPolicy;
    }

    export interface ExtendedVersionHistoryPolicyExplicitlyLimited {
      '.tag': 'explicitly_limited';
    }

    export interface ExtendedVersionHistoryPolicyExplicitlyUnlimited {
      '.tag': 'explicitly_unlimited';
    }

    export interface ExtendedVersionHistoryPolicyImplicitlyLimited {
      '.tag': 'implicitly_limited';
    }

    export interface ExtendedVersionHistoryPolicyOther {
      '.tag': 'other';
    }

    export type ExtendedVersionHistoryPolicy = ExtendedVersionHistoryPolicyExplicitlyLimited | ExtendedVersionHistoryPolicyExplicitlyUnlimited | ExtendedVersionHistoryPolicyImplicitlyLimited | ExtendedVersionHistoryPolicyOther;

    /**
     * Provides details about a failure
     */
    export interface FailureDetailsLogInfo {
      /**
       * A user friendly explanation of the error. Might be missing due to
       * historical data gap.
       */
      user_friendly_message?: string;
      /**
       * A technical explanation of the error. This is relevant for some errors.
       */
      technical_error_message?: string;
    }

    /**
     * Added a file comment.
     */
    export interface FileAddCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Added files and/or folders.
     */
    export interface FileAddDetails {
    }

    /**
     * Subscribed to or unsubscribed from comment notifications for file.
     */
    export interface FileChangeCommentSubscriptionDetails {
      /**
       * New file comment subscription.
       */
      new_value: FileCommentNotificationPolicy;
      /**
       * Previous file comment subscription. Might be missing due to historical
       * data gap.
       */
      previous_value?: FileCommentNotificationPolicy;
    }

    export interface FileCommentNotificationPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface FileCommentNotificationPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface FileCommentNotificationPolicyOther {
      '.tag': 'other';
    }

    /**
     * Enable or disable file comments notifications
     */
    export type FileCommentNotificationPolicy = FileCommentNotificationPolicyDisabled | FileCommentNotificationPolicyEnabled | FileCommentNotificationPolicyOther;

    /**
     * Enabled or disabled commenting on team files.
     */
    export interface FileCommentsChangePolicyDetails {
      /**
       * New commenting on team files policy.
       */
      new_value: FileCommentsPolicy;
      /**
       * Previous commenting on team files policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: FileCommentsPolicy;
    }

    export interface FileCommentsPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface FileCommentsPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface FileCommentsPolicyOther {
      '.tag': 'other';
    }

    /**
     * File comments policy
     */
    export type FileCommentsPolicy = FileCommentsPolicyDisabled | FileCommentsPolicyEnabled | FileCommentsPolicyOther;

    /**
     * Copied files and/or folders.
     */
    export interface FileCopyDetails {
      /**
       * Relocate action details.
       */
      relocate_action_details: Array<RelocateAssetReferencesLogInfo>;
    }

    /**
     * Deleted a file comment.
     */
    export interface FileDeleteCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Deleted files and/or folders.
     */
    export interface FileDeleteDetails {
    }

    /**
     * Downloaded files and/or folders.
     */
    export interface FileDownloadDetails {
    }

    /**
     * Edited files.
     */
    export interface FileEditDetails {
    }

    /**
     * Create a copy reference to a file or folder.
     */
    export interface FileGetCopyReferenceDetails {
    }

    /**
     * Liked a file comment.
     */
    export interface FileLikeCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * File's logged information.
     */
    export interface FileLogInfo extends FileOrFolderLogInfo {
    }

    /**
     * Moved files and/or folders.
     */
    export interface FileMoveDetails {
      /**
       * Relocate action details.
       */
      relocate_action_details: Array<RelocateAssetReferencesLogInfo>;
    }

    /**
     * Generic information relevant both for files and folders
     */
    export interface FileOrFolderLogInfo {
      /**
       * Path relative to event context.
       */
      path: PathLogInfo;
      /**
       * Display name. Might be missing due to historical data gap.
       */
      display_name?: string;
      /**
       * Unique ID. Might be missing due to historical data gap.
       */
      file_id?: string;
    }

    /**
     * Permanently deleted files and/or folders.
     */
    export interface FilePermanentlyDeleteDetails {
    }

    /**
     * Previewed files and/or folders.
     */
    export interface FilePreviewDetails {
    }

    /**
     * Renamed files and/or folders.
     */
    export interface FileRenameDetails {
      /**
       * Relocate action details.
       */
      relocate_action_details: Array<RelocateAssetReferencesLogInfo>;
    }

    /**
     * Added a deadline to a file request.
     */
    export interface FileRequestAddDeadlineDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request title.
       */
      request_title?: string;
    }

    /**
     * Change a file request.
     */
    export interface FileRequestChangeDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * Previous file request details. Might be missing due to historical data
       * gap.
       */
      previous_details?: FileRequestDetails;
      /**
       * New file request details.
       */
      new_details: FileRequestDetails;
    }

    /**
     * Changed the file request folder.
     */
    export interface FileRequestChangeFolderDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request title.
       */
      request_title?: string;
    }

    /**
     * Closed a file request.
     */
    export interface FileRequestCloseDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * Previous file request details. Might be missing due to historical data
       * gap.
       */
      previous_details?: FileRequestDetails;
    }

    /**
     * Created a file request.
     */
    export interface FileRequestCreateDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request details. Might be missing due to historical data gap.
       */
      request_details?: FileRequestDetails;
    }

    /**
     * File request details
     */
    export interface FileRequestDetails {
      /**
       * File request title.
       */
      request_title?: string;
      /**
       * Asset position in the Assets list.
       */
      asset_index: number;
      /**
       * File request deadline. Might be missing due to historical data gap.
       */
      deadline?: common.DropboxTimestamp;
    }

    /**
     * Received files for a file request.
     */
    export interface FileRequestReceiveFileDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request title.
       */
      request_title?: string;
      /**
       * Submitted file names.
       */
      submitted_file_names: Array<string>;
    }

    /**
     * Removed the file request deadline.
     */
    export interface FileRequestRemoveDeadlineDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request title.
       */
      request_title?: string;
    }

    /**
     * Sent file request to users via email.
     */
    export interface FileRequestSendDetails {
      /**
       * File request id. Might be missing due to historical data gap.
       */
      file_request_id?: file_requests.FileRequestId;
      /**
       * File request title.
       */
      request_title?: string;
    }

    /**
     * Enabled or disabled file requests.
     */
    export interface FileRequestsChangePolicyDetails {
      /**
       * New file requests policy.
       */
      new_value: FileRequestsPolicy;
      /**
       * Previous file requests policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: FileRequestsPolicy;
    }

    /**
     * Enabled file request emails for everyone.
     */
    export interface FileRequestsEmailsEnabledDetails {
    }

    /**
     * Allowed file request emails for the team.
     */
    export interface FileRequestsEmailsRestrictedToTeamOnlyDetails {
    }

    export interface FileRequestsPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface FileRequestsPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface FileRequestsPolicyOther {
      '.tag': 'other';
    }

    /**
     * File requests policy
     */
    export type FileRequestsPolicy = FileRequestsPolicyDisabled | FileRequestsPolicyEnabled | FileRequestsPolicyOther;

    /**
     * Resolved a file comment.
     */
    export interface FileResolveCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Restored deleted files and/or folders.
     */
    export interface FileRestoreDetails {
    }

    /**
     * Reverted files to a previous version.
     */
    export interface FileRevertDetails {
    }

    /**
     * Rolled back file change location changes.
     */
    export interface FileRollbackChangesDetails {
    }

    /**
     * Save a file or folder using a copy reference.
     */
    export interface FileSaveCopyReferenceDetails {
      /**
       * Relocate action details.
       */
      relocate_action_details: Array<RelocateAssetReferencesLogInfo>;
    }

    /**
     * Unliked a file comment.
     */
    export interface FileUnlikeCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Unresolved a file comment.
     */
    export interface FileUnresolveCommentDetails {
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Folder's logged information.
     */
    export interface FolderLogInfo extends FileOrFolderLogInfo {
    }

    /**
     * Geographic location details.
     */
    export interface GeoLocationLogInfo {
      /**
       * City name.
       */
      city?: string;
      /**
       * Region name.
       */
      region?: string;
      /**
       * Country code.
       */
      country?: string;
      /**
       * IP address.
       */
      ip_address: IpAddress;
    }

    export interface GetTeamEventsArg {
      /**
       * Defaults to 1000.
       */
      limit?: number;
      /**
       * Filter the events by account ID. Return ony events with this account_id
       * as either Actor, Context, or Participants.
       */
      account_id?: users_common.AccountId;
      /**
       * Filter by time range.
       */
      time?: team_common.TimeRange;
      /**
       * Filter the returned events to a single category.
       */
      category?: EventCategory;
    }

    export interface GetTeamEventsContinueArg {
      /**
       * Indicates from what point to get the next set of events.
       */
      cursor: string;
    }

    /**
     * Bad cursor.
     */
    export interface GetTeamEventsContinueErrorBadCursor {
      '.tag': 'bad_cursor';
    }

    export interface GetTeamEventsContinueErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors that can be raised when calling getEventsContinue().
     */
    export type GetTeamEventsContinueError = GetTeamEventsContinueErrorBadCursor | GetTeamEventsContinueErrorOther;

    /**
     * No user found matching the provided account_id.
     */
    export interface GetTeamEventsErrorAccountIdNotFound {
      '.tag': 'account_id_not_found';
    }

    /**
     * Invalid time range.
     */
    export interface GetTeamEventsErrorInvalidTimeRange {
      '.tag': 'invalid_time_range';
    }

    export interface GetTeamEventsErrorOther {
      '.tag': 'other';
    }

    /**
     * Errors that can be raised when calling getEvents().
     */
    export type GetTeamEventsError = GetTeamEventsErrorAccountIdNotFound | GetTeamEventsErrorInvalidTimeRange | GetTeamEventsErrorOther;

    export interface GetTeamEventsResult {
      /**
       * List of events.
       */
      events: Array<TeamEvent>;
      /**
       * Pass the cursor into getEventsContinue() to obtain additional events.
       */
      cursor: string;
      /**
       * Is true if there are additional events that have not been returned yet.
       * An additional call to getEventsContinue() can retrieve them.
       */
      has_more: boolean;
    }

    /**
     * Enabled or disabled Google single sign-on for the team.
     */
    export interface GoogleSsoChangePolicyDetails {
      /**
       * New Google single sign-on policy.
       */
      new_value: GoogleSsoPolicy;
      /**
       * Previous Google single sign-on policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: GoogleSsoPolicy;
    }

    export interface GoogleSsoPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface GoogleSsoPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface GoogleSsoPolicyOther {
      '.tag': 'other';
    }

    /**
     * Google SSO policy
     */
    export type GoogleSsoPolicy = GoogleSsoPolicyDisabled | GoogleSsoPolicyEnabled | GoogleSsoPolicyOther;

    /**
     * Added an external ID for group.
     */
    export interface GroupAddExternalIdDetails {
      /**
       * Current external id.
       */
      new_value: team_common.GroupExternalId;
    }

    /**
     * Added team members to a group.
     */
    export interface GroupAddMemberDetails {
      /**
       * Is group owner.
       */
      is_group_owner: boolean;
    }

    /**
     * Changed the external ID for group.
     */
    export interface GroupChangeExternalIdDetails {
      /**
       * Current external id.
       */
      new_value: team_common.GroupExternalId;
      /**
       * Old external id.
       */
      previous_value: team_common.GroupExternalId;
    }

    /**
     * Changed group management type.
     */
    export interface GroupChangeManagementTypeDetails {
      /**
       * New group management type.
       */
      new_value: team_common.GroupManagementType;
      /**
       * Previous group management type. Might be missing due to historical data
       * gap.
       */
      previous_value?: team_common.GroupManagementType;
    }

    /**
     * Changed the manager permissions belonging to a group member.
     */
    export interface GroupChangeMemberRoleDetails {
      /**
       * Is group owner.
       */
      is_group_owner: boolean;
    }

    /**
     * Created a group.
     */
    export interface GroupCreateDetails {
      /**
       * Is company managed group. Might be missing due to historical data gap.
       */
      is_company_managed?: boolean;
      /**
       * Group join policy.
       */
      join_policy: GroupJoinPolicy;
    }

    /**
     * Deleted a group.
     */
    export interface GroupDeleteDetails {
      /**
       * Is company managed group. Might be missing due to historical data gap.
       */
      is_company_managed?: boolean;
    }

    export interface GroupJoinPolicyOpen {
      '.tag': 'open';
    }

    export interface GroupJoinPolicyRequestToJoin {
      '.tag': 'request_to_join';
    }

    export interface GroupJoinPolicyOther {
      '.tag': 'other';
    }

    export type GroupJoinPolicy = GroupJoinPolicyOpen | GroupJoinPolicyRequestToJoin | GroupJoinPolicyOther;

    /**
     * Group's logged information.
     */
    export interface GroupLogInfo {
      /**
       * The unique id of this group. Might be missing due to historical data
       * gap.
       */
      group_id?: team_common.GroupId;
      /**
       * The name of this group.
       */
      display_name: string;
      /**
       * External group ID. Might be missing due to historical data gap.
       */
      external_id?: team_common.GroupExternalId;
    }

    /**
     * Moved a group.
     */
    export interface GroupMovedDetails {
    }

    /**
     * Removed the external ID for group.
     */
    export interface GroupRemoveExternalIdDetails {
      /**
       * Old external id.
       */
      previous_value: team_common.GroupExternalId;
    }

    /**
     * Removed team members from a group.
     */
    export interface GroupRemoveMemberDetails {
    }

    /**
     * Renamed a group.
     */
    export interface GroupRenameDetails {
      /**
       * Previous display name.
       */
      previous_value: string;
      /**
       * New display name.
       */
      new_value: string;
    }

    /**
     * Changed who can create groups.
     */
    export interface GroupUserManagementChangePolicyDetails {
      /**
       * New group users management policy.
       */
      new_value: team_policies.GroupCreation;
      /**
       * Previous group users management policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: team_policies.GroupCreation;
    }

    /**
     * Additional information relevant when a new member joins the team.
     */
    export interface JoinTeamDetails {
      /**
       * Linked applications.
       */
      linked_apps: Array<UserOrTeamLinkedAppLogInfoReference|UserLinkedAppLogInfoReference|TeamLinkedAppLogInfoReference|AppLogInfoReference>;
      /**
       * Linked devices.
       */
      linked_devices: Array<DeviceLogInfo>;
      /**
       * Linked shared folders.
       */
      linked_shared_folders: Array<FolderLogInfo>;
    }

    export interface LinkAudiencePublic {
      '.tag': 'public';
    }

    export interface LinkAudienceTeam {
      '.tag': 'team';
    }

    export interface LinkAudienceMembers {
      '.tag': 'members';
    }

    export interface LinkAudienceOther {
      '.tag': 'other';
    }

    export type LinkAudience = LinkAudiencePublic | LinkAudienceTeam | LinkAudienceMembers | LinkAudienceOther;

    /**
     * Failed to sign in.
     */
    export interface LoginFailDetails {
      /**
       * Tells if the login device is EMM managed. Might be missing due to
       * historical data gap.
       */
      is_emm_managed?: boolean;
      /**
       * Login method.
       */
      login_method: LoginMethod;
      /**
       * Error details.
       */
      error_details: FailureDetailsLogInfo;
    }

    export interface LoginMethodPassword {
      '.tag': 'password';
    }

    export interface LoginMethodTwoFactorAuthentication {
      '.tag': 'two_factor_authentication';
    }

    export interface LoginMethodSaml {
      '.tag': 'saml';
    }

    export interface LoginMethodOther {
      '.tag': 'other';
    }

    export type LoginMethod = LoginMethodPassword | LoginMethodTwoFactorAuthentication | LoginMethodSaml | LoginMethodOther;

    /**
     * Signed in.
     */
    export interface LoginSuccessDetails {
      /**
       * Tells if the login device is EMM managed. Might be missing due to
       * historical data gap.
       */
      is_emm_managed?: boolean;
      /**
       * Login method.
       */
      login_method: LoginMethod;
    }

    /**
     * Signed out.
     */
    export interface LogoutDetails {
    }

    /**
     * Set team member name when joining team.
     */
    export interface MemberAddNameDetails {
      /**
       * User's name.
       */
      value: UserNameLogInfo;
    }

    /**
     * Change the admin role belonging to team member.
     */
    export interface MemberChangeAdminRoleDetails {
      /**
       * New admin role. This field is relevant when the admin role is changed
       * or whenthe user role changes from no admin rights to with admin rights.
       */
      new_value?: AdminRole;
      /**
       * Previous admin role. This field is relevant when the admin role is
       * changed or when the admin role is removed.
       */
      previous_value?: AdminRole;
    }

    /**
     * Changed team member email address.
     */
    export interface MemberChangeEmailDetails {
      /**
       * New email.
       */
      new_value: common.EmailAddress;
      /**
       * Previous email. Might be missing due to historical data gap.
       */
      previous_value?: common.EmailAddress;
    }

    /**
     * Changed the membership type (limited vs full) for team member.
     */
    export interface MemberChangeMembershipTypeDetails {
      /**
       * Previous membership type.
       */
      prev_value: TeamMembershipType;
      /**
       * New membership type.
       */
      new_value: TeamMembershipType;
    }

    /**
     * Changed team member name.
     */
    export interface MemberChangeNameDetails {
      /**
       * New user's name.
       */
      new_value: UserNameLogInfo;
      /**
       * Previous user's name. Might be missing due to historical data gap.
       */
      previous_value?: UserNameLogInfo;
    }

    /**
     * Changed the membership status of a team member.
     */
    export interface MemberChangeStatusDetails {
      /**
       * Previous member status. Might be missing due to historical data gap.
       */
      previous_value?: MemberStatus;
      /**
       * New member status.
       */
      new_value: MemberStatus;
      /**
       * Additional information relevant when a new member joins the team.
       */
      team_join_details?: JoinTeamDetails;
    }

    /**
     * Permanently deleted contents of a removed team member account.
     */
    export interface MemberPermanentlyDeleteAccountContentsDetails {
    }

    /**
     * Changed whether users can find the team when not invited.
     */
    export interface MemberRequestsChangePolicyDetails {
      /**
       * New member change requests policy.
       */
      new_value: MemberRequestsPolicy;
      /**
       * Previous member change requests policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: MemberRequestsPolicy;
    }

    export interface MemberRequestsPolicyAutoAccept {
      '.tag': 'auto_accept';
    }

    export interface MemberRequestsPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface MemberRequestsPolicyRequireApproval {
      '.tag': 'require_approval';
    }

    export interface MemberRequestsPolicyOther {
      '.tag': 'other';
    }

    export type MemberRequestsPolicy = MemberRequestsPolicyAutoAccept | MemberRequestsPolicyDisabled | MemberRequestsPolicyRequireApproval | MemberRequestsPolicyOther;

    /**
     * Added an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface MemberSpaceLimitsAddExceptionDetails {
    }

    /**
     * Changed the team default limit level.
     */
    export interface MemberSpaceLimitsChangePolicyDetails {
      /**
       * Previous team default limit value in bytes. Might be missing due to
       * historical data gap.
       */
      previous_value?: number;
      /**
       * New team default limit value in bytes. Might be missing due to
       * historical data gap.
       */
      new_value?: number;
    }

    /**
     * Changed the status with respect to whether the team member is under or
     * over storage quota specified by policy.
     */
    export interface MemberSpaceLimitsChangeStatusDetails {
      /**
       * Previous storage quota status.
       */
      previous_value: SpaceLimitsStatus;
      /**
       * New storage quota status.
       */
      new_value: SpaceLimitsStatus;
    }

    /**
     * Removed an exception for one or more team members to bypass space limits
     * imposed by policy.
     */
    export interface MemberSpaceLimitsRemoveExceptionDetails {
    }

    export interface MemberStatusNotJoined {
      '.tag': 'not_joined';
    }

    export interface MemberStatusInvited {
      '.tag': 'invited';
    }

    export interface MemberStatusActive {
      '.tag': 'active';
    }

    export interface MemberStatusSuspended {
      '.tag': 'suspended';
    }

    export interface MemberStatusRemoved {
      '.tag': 'removed';
    }

    export interface MemberStatusOther {
      '.tag': 'other';
    }

    export type MemberStatus = MemberStatusNotJoined | MemberStatusInvited | MemberStatusActive | MemberStatusSuspended | MemberStatusRemoved | MemberStatusOther;

    /**
     * Suggested a new team member to be added to the team.
     */
    export interface MemberSuggestDetails {
    }

    /**
     * Enabled or disabled the option for team members to suggest new members to
     * add to the team.
     */
    export interface MemberSuggestionsChangePolicyDetails {
      /**
       * New team member suggestions policy.
       */
      new_value: MemberSuggestionsPolicy;
      /**
       * Previous team member suggestions policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: MemberSuggestionsPolicy;
    }

    export interface MemberSuggestionsPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface MemberSuggestionsPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface MemberSuggestionsPolicyOther {
      '.tag': 'other';
    }

    /**
     * Member suggestions policy
     */
    export type MemberSuggestionsPolicy = MemberSuggestionsPolicyDisabled | MemberSuggestionsPolicyEnabled | MemberSuggestionsPolicyOther;

    /**
     * Transferred contents of a removed team member account to another member.
     */
    export interface MemberTransferAccountContentsDetails {
      /**
       * Source participant position in the Participants list.
       */
      src_participant_index: number;
      /**
       * Destination participant position in the Participants list.
       */
      dest_participant_index: number;
    }

    /**
     * Enabled or disabled the Microsoft Office add-in, which lets team members
     * save files to Dropbox directly from Microsoft Office.
     */
    export interface MicrosoftOfficeAddinChangePolicyDetails {
      /**
       * New Microsoft Office addin policy.
       */
      new_value: MicrosoftOfficeAddinPolicy;
      /**
       * Previous Microsoft Office addin policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: MicrosoftOfficeAddinPolicy;
    }

    export interface MicrosoftOfficeAddinPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface MicrosoftOfficeAddinPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface MicrosoftOfficeAddinPolicyOther {
      '.tag': 'other';
    }

    /**
     * Microsoft Office addin policy
     */
    export type MicrosoftOfficeAddinPolicy = MicrosoftOfficeAddinPolicyDisabled | MicrosoftOfficeAddinPolicyEnabled | MicrosoftOfficeAddinPolicyOther;

    /**
     * An indication that an event was returned with missing details
     */
    export interface MissingDetails {
    }

    /**
     * Mobile session.
     */
    export interface MobileSessionLogInfo extends SessionLogInfo {
    }

    /**
     * Reference to the MobileSessionLogInfo type, identified by the value of
     * the .tag property.
     */
    export interface MobileSessionLogInfoReference extends MobileSessionLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'mobile';
    }

    /**
     * Namespace relative path details.
     */
    export interface NamespaceRelativePathLogInfo {
      /**
       * Namespace ID. Might be missing due to historical data gap.
       */
      ns_id?: common.NamespaceId;
      /**
       * A path relative to the specified namespace ID. Might be missing due to
       * historical data gap.
       */
      relative_path?: FilePath;
    }

    /**
     * Enabled or disabled network control.
     */
    export interface NetworkControlChangePolicyDetails {
      /**
       * New network control policy.
       */
      new_value: NetworkControlPolicy;
      /**
       * Previous network control policy. Might be missing due to historical
       * data gap.
       */
      previous_value?: NetworkControlPolicy;
    }

    export interface NetworkControlPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface NetworkControlPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface NetworkControlPolicyOther {
      '.tag': 'other';
    }

    /**
     * Network control policy
     */
    export type NetworkControlPolicy = NetworkControlPolicyDisabled | NetworkControlPolicyEnabled | NetworkControlPolicyOther;

    /**
     * Non team member's logged information.
     */
    export interface NonTeamMemberLogInfo extends UserLogInfo {
    }

    /**
     * Reference to the NonTeamMemberLogInfo type, identified by the value of
     * the .tag property.
     */
    export interface NonTeamMemberLogInfoReference extends NonTeamMemberLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'non_team_member';
    }

    /**
     * Changed a Paper document to be invite-only.
     */
    export interface NoteAclInviteOnlyDetails {
    }

    /**
     * Changed a Paper document to be link accessible.
     */
    export interface NoteAclLinkDetails {
    }

    /**
     * Changed a Paper document to be link accessible for the team.
     */
    export interface NoteAclTeamLinkDetails {
    }

    /**
     * Shared Paper document received.
     */
    export interface NoteShareReceiveDetails {
    }

    /**
     * Shared a Paper doc.
     */
    export interface NoteSharedDetails {
    }

    /**
     * Opened a shared Paper doc.
     */
    export interface OpenNoteSharedDetails {
    }

    /**
     * The origin from which the actor performed the action.
     */
    export interface OriginLogInfo {
      /**
       * Geographic location details.
       */
      geo_location?: GeoLocationLogInfo;
      /**
       * The method that was used to perform the action.
       */
      access_method: AccessMethodLogInfo;
    }

    export interface PaperAccessTypeViewer {
      '.tag': 'viewer';
    }

    export interface PaperAccessTypeCommenter {
      '.tag': 'commenter';
    }

    export interface PaperAccessTypeEditor {
      '.tag': 'editor';
    }

    export interface PaperAccessTypeOther {
      '.tag': 'other';
    }

    export type PaperAccessType = PaperAccessTypeViewer | PaperAccessTypeCommenter | PaperAccessTypeEditor | PaperAccessTypeOther;

    /**
     * Exported all Paper documents in the team.
     */
    export interface PaperAdminExportStartDetails {
    }

    /**
     * Changed whether Dropbox Paper, when enabled, is deployed to all teams or
     * to specific members of the team.
     */
    export interface PaperChangeDeploymentPolicyDetails {
      /**
       * New Dropbox Paper deployment policy.
       */
      new_value: team_policies.PaperDeploymentPolicy;
      /**
       * Previous Dropbox Paper deployment policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: team_policies.PaperDeploymentPolicy;
    }

    /**
     * Changed whether non team members can view Paper documents using a link.
     */
    export interface PaperChangeMemberLinkPolicyDetails {
      /**
       * New paper external link accessibility policy.
       */
      new_value: PaperMemberPolicy;
    }

    /**
     * Changed whether team members can share Paper documents externally (i.e.
     * outside the team), and if so, whether they should be accessible only by
     * team members or anyone by default.
     */
    export interface PaperChangeMemberPolicyDetails {
      /**
       * New paper external accessibility policy.
       */
      new_value: PaperMemberPolicy;
      /**
       * Previous paper external accessibility policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: PaperMemberPolicy;
    }

    /**
     * Enabled or disabled Dropbox Paper for the team.
     */
    export interface PaperChangePolicyDetails {
      /**
       * New Dropbox Paper policy.
       */
      new_value: team_policies.PaperEnabledPolicy;
      /**
       * Previous Dropbox Paper policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: team_policies.PaperEnabledPolicy;
    }

    /**
     * Added users to the membership of a Paper doc or folder.
     */
    export interface PaperContentAddMemberDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Added Paper doc or folder to a folder.
     */
    export interface PaperContentAddToFolderDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Parent asset position in the Assets list.
       */
      parent_asset_index: number;
    }

    /**
     * Archived Paper doc or folder.
     */
    export interface PaperContentArchiveDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Created a Paper doc or folder.
     */
    export interface PaperContentCreateDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Permanently deleted a Paper doc or folder.
     */
    export interface PaperContentPermanentlyDeleteDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Removed Paper doc or folder from a folder.
     */
    export interface PaperContentRemoveFromFolderDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Removed a user from the membership of a Paper doc or folder.
     */
    export interface PaperContentRemoveMemberDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Renamed Paper doc or folder.
     */
    export interface PaperContentRenameDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Restored an archived Paper doc or folder.
     */
    export interface PaperContentRestoreDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Added a Paper doc comment.
     */
    export interface PaperDocAddCommentDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Changed the access type of a Paper doc member.
     */
    export interface PaperDocChangeMemberRoleDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Paper doc access type.
       */
      access_type: PaperAccessType;
    }

    /**
     * Changed the sharing policy for Paper doc.
     */
    export interface PaperDocChangeSharingPolicyDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Sharing policy with external users. Might be missing due to historical
       * data gap.
       */
      public_sharing_policy?: string;
      /**
       * Sharing policy with team. Might be missing due to historical data gap.
       */
      team_sharing_policy?: string;
    }

    /**
     * Followed or unfollowed a Paper doc.
     */
    export interface PaperDocChangeSubscriptionDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * New doc subscription level.
       */
      new_subscription_level: string;
      /**
       * Previous doc subscription level. Might be missing due to historical
       * data gap.
       */
      previous_subscription_level?: string;
    }

    /**
     * Deleted a Paper doc comment.
     */
    export interface PaperDocDeleteCommentDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Paper doc archived.
     */
    export interface PaperDocDeletedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Downloaded a Paper doc in a particular output format.
     */
    export interface PaperDocDownloadDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Export file format.
       */
      export_file_format: PaperDownloadFormat;
    }

    /**
     * Edited a Paper doc comment.
     */
    export interface PaperDocEditCommentDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Edited a Paper doc.
     */
    export interface PaperDocEditDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Followed a Paper doc.
     */
    export interface PaperDocFollowedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Mentioned a member in a Paper doc.
     */
    export interface PaperDocMentionDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Requested to be a member on a Paper doc.
     */
    export interface PaperDocRequestAccessDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper doc comment resolved.
     */
    export interface PaperDocResolveCommentDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Restored a Paper doc to previous revision.
     */
    export interface PaperDocRevertDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper doc link shared via slack.
     */
    export interface PaperDocSlackShareDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper doc shared with team member.
     */
    export interface PaperDocTeamInviteDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper doc trashed.
     */
    export interface PaperDocTrashedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Unresolved a Paper doc comment.
     */
    export interface PaperDocUnresolveCommentDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * Comment text. Might be missing due to historical data gap.
       */
      comment_text?: string;
    }

    /**
     * Paper doc untrashed.
     */
    export interface PaperDocUntrashedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Viewed Paper doc.
     */
    export interface PaperDocViewDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper document's logged information.
     */
    export interface PaperDocumentLogInfo {
      /**
       * Papers document Id.
       */
      doc_id: string;
      /**
       * Paper document title.
       */
      doc_title: string;
    }

    export interface PaperDownloadFormatDocx {
      '.tag': 'docx';
    }

    export interface PaperDownloadFormatHtml {
      '.tag': 'html';
    }

    export interface PaperDownloadFormatMarkdown {
      '.tag': 'markdown';
    }

    export interface PaperDownloadFormatOther {
      '.tag': 'other';
    }

    export type PaperDownloadFormat = PaperDownloadFormatDocx | PaperDownloadFormatHtml | PaperDownloadFormatMarkdown | PaperDownloadFormatOther;

    /**
     * Users added to Paper enabled users list.
     */
    export interface PaperEnabledUsersGroupAdditionDetails {
    }

    /**
     * Users removed from Paper enabled users list.
     */
    export interface PaperEnabledUsersGroupRemovalDetails {
    }

    /**
     * Paper external sharing policy changed: anyone.
     */
    export interface PaperExternalViewAllowDetails {
    }

    /**
     * Paper external sharing policy changed: default team.
     */
    export interface PaperExternalViewDefaultTeamDetails {
    }

    /**
     * Paper external sharing policy changed: team-only.
     */
    export interface PaperExternalViewForbidDetails {
    }

    /**
     * Followed or unfollowed a Paper folder.
     */
    export interface PaperFolderChangeSubscriptionDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
      /**
       * New folder subscription level.
       */
      new_subscription_level: string;
      /**
       * Previous folder subscription level. Might be missing due to historical
       * data gap.
       */
      previous_subscription_level?: string;
    }

    /**
     * Paper folder archived.
     */
    export interface PaperFolderDeletedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Followed a Paper folder.
     */
    export interface PaperFolderFollowedDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    /**
     * Paper folder's logged information.
     */
    export interface PaperFolderLogInfo {
      /**
       * Papers folder Id.
       */
      folder_id: string;
      /**
       * Paper folder name.
       */
      folder_name: string;
    }

    /**
     * Paper folder shared with team member.
     */
    export interface PaperFolderTeamInviteDetails {
      /**
       * Event unique identifier.
       */
      event_uuid: string;
    }

    export interface PaperMemberPolicyAnyoneWithLink {
      '.tag': 'anyone_with_link';
    }

    export interface PaperMemberPolicyOnlyTeam {
      '.tag': 'only_team';
    }

    export interface PaperMemberPolicyTeamAndExplicitlyShared {
      '.tag': 'team_and_explicitly_shared';
    }

    export interface PaperMemberPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for controlling if team members can share Paper documents
     * externally.
     */
    export type PaperMemberPolicy = PaperMemberPolicyAnyoneWithLink | PaperMemberPolicyOnlyTeam | PaperMemberPolicyTeamAndExplicitlyShared | PaperMemberPolicyOther;

    /**
     * User details.
     */
    export interface ParticipantLogInfoUser {
      '.tag': 'user';
      user: TeamMemberLogInfoReference|NonTeamMemberLogInfoReference|UserLogInfoReference;
    }

    /**
     * Group details.
     */
    export interface ParticipantLogInfoGroup {
      '.tag': 'group';
      group: GroupLogInfo;
    }

    export interface ParticipantLogInfoOther {
      '.tag': 'other';
    }

    /**
     * A user or group
     */
    export type ParticipantLogInfo = ParticipantLogInfoUser | ParticipantLogInfoGroup | ParticipantLogInfoOther;

    /**
     * Changed password.
     */
    export interface PasswordChangeDetails {
    }

    /**
     * Reset all team member passwords.
     */
    export interface PasswordResetAllDetails {
    }

    /**
     * Reset password.
     */
    export interface PasswordResetDetails {
    }

    /**
     * Path's details.
     */
    export interface PathLogInfo {
      /**
       * Fully qualified path relative to event's context. Might be missing due
       * to historical data gap.
       */
      contextual?: FilePath;
      /**
       * Path relative to the namespace containing the content.
       */
      namespace_relative: NamespaceRelativePathLogInfo;
    }

    /**
     * Enabled or disabled the ability of team members to permanently delete
     * content.
     */
    export interface PermanentDeleteChangePolicyDetails {
      /**
       * New permanent delete content policy.
       */
      new_value: ContentPermanentDeletePolicy;
      /**
       * Previous permanent delete content policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: ContentPermanentDeletePolicy;
    }

    export interface PlacementRestrictionEuropeOnly {
      '.tag': 'europe_only';
    }

    export interface PlacementRestrictionNone {
      '.tag': 'none';
    }

    export interface PlacementRestrictionOther {
      '.tag': 'other';
    }

    export type PlacementRestriction = PlacementRestrictionEuropeOnly | PlacementRestrictionNone | PlacementRestrictionOther;

    /**
     * Provides the indices of the source asset and the destination asset for a
     * relocate action.
     */
    export interface RelocateAssetReferencesLogInfo {
      /**
       * Source asset position in the Assets list.
       */
      src_asset_index: number;
      /**
       * Destination asset position in the Assets list.
       */
      dest_asset_index: number;
    }

    /**
     * Reseller information.
     */
    export interface ResellerLogInfo {
      /**
       * Reseller name.
       */
      reseller_name: string;
      /**
       * Reseller email.
       */
      reseller_email: common.EmailAddress;
    }

    /**
     * Ended reseller support session.
     */
    export interface ResellerSupportSessionEndDetails {
    }

    /**
     * Started reseller support session.
     */
    export interface ResellerSupportSessionStartDetails {
    }

    /**
     * Session's logged information.
     */
    export interface SessionLogInfo {
      /**
       * Session ID. Might be missing due to historical data gap.
       */
      session_id?: common.SessionId;
    }

    /**
     * Reference to the SessionLogInfo polymorphic type. Contains a .tag
     * property to let you discriminate between possible subtypes.
     */
    export interface SessionLogInfoReference extends SessionLogInfo {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "web"|"desktop"|"mobile";
    }

    /**
     * Added the team to a shared folder.
     */
    export interface SfAddGroupDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Team name.
       */
      team_name: string;
    }

    /**
     * Allowed non collaborators to view links to files in a shared folder.
     */
    export interface SfAllowNonMembersToViewSharedLinksDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Admin settings: team members see a warning before sharing folders outside
     * the team (DEPRECATED FEATURE).
     */
    export interface SfExternalInviteWarnDetails {
    }

    /**
     * Invited a group to a shared folder.
     */
    export interface SfInviteGroupDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
    }

    /**
     * Changed parent of shared folder.
     */
    export interface SfNestDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Previous parent namespace ID. Might be missing due to historical data
       * gap.
       */
      prev_parent_ns_id?: common.NamespaceId;
      /**
       * New parent namespace ID. Might be missing due to historical data gap.
       */
      new_parent_ns_id?: common.NamespaceId;
    }

    /**
     * Declined a team member's invitation to a shared folder.
     */
    export interface SfTeamDeclineDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Granted access to a shared folder.
     */
    export interface SfTeamGrantAccessDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Changed a team member's role in a shared folder.
     */
    export interface SfTeamInviteChangeRoleDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * New sharing permission. Might be missing due to historical data gap.
       */
      new_sharing_permission?: string;
      /**
       * Previous sharing permission. Might be missing due to historical data
       * gap.
       */
      previous_sharing_permission?: string;
    }

    /**
     * Invited team members to a shared folder.
     */
    export interface SfTeamInviteDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
    }

    /**
     * Joined a team member's shared folder.
     */
    export interface SfTeamJoinDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Joined a team member's shared folder from a link.
     */
    export interface SfTeamJoinFromOobLinkDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Shared link token key.
       */
      token_key?: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
    }

    /**
     * Unshared a folder with a team member.
     */
    export interface SfTeamUninviteDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Sent an email invitation to the membership of a shared file or folder.
     */
    export interface SharedContentAddInviteesDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
    }

    /**
     * Added an expiry to the link for the shared file or folder.
     */
    export interface SharedContentAddLinkExpiryDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * Expiration starting date.
       */
      expiration_start_date: string;
      /**
       * The number of days from the starting expiration date after which the
       * link will expire.
       */
      expiration_days: number;
    }

    /**
     * Added a password to the link for the shared file or folder.
     */
    export interface SharedContentAddLinkPasswordDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Added users and/or groups to the membership of a shared file or folder.
     */
    export interface SharedContentAddMemberDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Changed whether members can download the shared file or folder.
     */
    export interface SharedContentChangeDownloadsPolicyDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New downlaod policy.
       */
      new_value: SharedContentDownloadsPolicy;
      /**
       * Previous downlaod policy. Might be missing due to historical data gap.
       */
      previous_value?: SharedContentDownloadsPolicy;
    }

    /**
     * Changed the access type of an invitee to a shared file or folder before
     * the invitation was claimed.
     */
    export interface SharedContentChangeInviteeRoleDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * New sharing permission. Might be missing due to historical data gap.
       */
      new_sharing_permission?: string;
      /**
       * Previous sharing permission. Might be missing due to historical data
       * gap.
       */
      previous_sharing_permission?: string;
    }

    /**
     * Changed the audience of the link for a shared file or folder.
     */
    export interface SharedContentChangeLinkAudienceDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New link audience value.
       */
      new_value: LinkAudience;
      /**
       * Previous link audience value. Might be missing due to historical data
       * gap.
       */
      previous_value?: LinkAudience;
    }

    /**
     * Changed the expiry of the link for the shared file or folder.
     */
    export interface SharedContentChangeLinkExpiryDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * Expiration starting date.
       */
      expiration_start_date: string;
      /**
       * The number of days from the starting expiration date after which the
       * link will expire.
       */
      expiration_days: number;
    }

    /**
     * Changed the password on the link for the shared file or folder.
     */
    export interface SharedContentChangeLinkPasswordDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Changed the access type of a shared file or folder member.
     */
    export interface SharedContentChangeMemberRoleDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * New sharing permission. Might be missing due to historical data gap.
       */
      new_sharing_permission?: string;
      /**
       * Previous sharing permission. Might be missing due to historical data
       * gap.
       */
      previous_sharing_permission?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Changed whether members can see who viewed the shared file or folder.
     */
    export interface SharedContentChangeViewerInfoPolicyDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New viewer info policy.
       */
      new_value: SharedContentViewerInfoPolicy;
      /**
       * Previous view info policy. Might be missing due to historical data gap.
       */
      previous_value?: SharedContentViewerInfoPolicy;
    }

    /**
     * Claimed membership to a team member's shared folder.
     */
    export interface SharedContentClaimInvitationDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared content link.
       */
      shared_content_link?: string;
    }

    /**
     * Copied the shared file or folder to own Dropbox.
     */
    export interface SharedContentCopyDetails {
      /**
       * Shared content link.
       */
      shared_content_link: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Specifies the source and destination indices in the assets list.
       */
      relocate_action_details: RelocateAssetReferencesLogInfo;
    }

    /**
     * Downloaded the shared file or folder.
     */
    export interface SharedContentDownloadDetails {
      /**
       * Shared content link.
       */
      shared_content_link: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
    }

    export interface SharedContentDownloadsPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface SharedContentDownloadsPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface SharedContentDownloadsPolicyOther {
      '.tag': 'other';
    }

    /**
     * Shared content downloads policy
     */
    export type SharedContentDownloadsPolicy = SharedContentDownloadsPolicyDisabled | SharedContentDownloadsPolicyEnabled | SharedContentDownloadsPolicyOther;

    /**
     * Left the membership of a shared file or folder.
     */
    export interface SharedContentRelinquishMembershipDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Removed an invitee from the membership of a shared file or folder before
     * it was claimed.
     */
    export interface SharedContentRemoveInviteeDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Removed the expiry of the link for the shared file or folder.
     */
    export interface SharedContentRemoveLinkExpiryDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Removed the password on the link for the shared file or folder.
     */
    export interface SharedContentRemoveLinkPasswordDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Removed a user or a group from the membership of a shared file or folder.
     */
    export interface SharedContentRemoveMemberDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
    }

    /**
     * Requested to be on the membership of a shared file or folder.
     */
    export interface SharedContentRequestAccessDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
      /**
       * Shared content link.
       */
      shared_content_link?: string;
    }

    /**
     * Unshared a shared file or folder by clearing its membership and turning
     * off its link.
     */
    export interface SharedContentUnshareDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name?: string;
    }

    /**
     * Previewed the shared file or folder.
     */
    export interface SharedContentViewDetails {
      /**
       * Shared content link.
       */
      shared_content_link: string;
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
    }

    export interface SharedContentViewerInfoPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface SharedContentViewerInfoPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface SharedContentViewerInfoPolicyOther {
      '.tag': 'other';
    }

    /**
     * Shared content viewer info policy
     */
    export type SharedContentViewerInfoPolicy = SharedContentViewerInfoPolicyDisabled | SharedContentViewerInfoPolicyEnabled | SharedContentViewerInfoPolicyOther;

    /**
     * Set or unset the confidential flag on a shared folder.
     */
    export interface SharedFolderChangeConfidentialityDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * New confidentiality value.
       */
      new_value: Confidentiality;
      /**
       * Previous confidentiality value. Might be missing due to historical data
       * gap.
       */
      previous_value?: Confidentiality;
    }

    /**
     * Changed who can access the shared folder via a link.
     */
    export interface SharedFolderChangeLinkPolicyDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New shared folder link policy.
       */
      new_value: SharedFolderLinkPolicy;
      /**
       * Previous shared folder link policy. Might be missing due to historical
       * data gap.
       */
      previous_value?: SharedFolderLinkPolicy;
    }

    /**
     * Changed who can manage the membership of a shared folder.
     */
    export interface SharedFolderChangeMemberManagementPolicyDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New membership management policy.
       */
      new_value: SharedFolderMembershipManagementPolicy;
      /**
       * Previous membership management policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: SharedFolderMembershipManagementPolicy;
    }

    /**
     * Changed who can become a member of the shared folder.
     */
    export interface SharedFolderChangeMemberPolicyDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
      /**
       * Shared folder type. Might be missing due to historical data gap.
       */
      shared_folder_type?: string;
      /**
       * New external invite policy.
       */
      new_value: SharedFolderMemberPolicy;
      /**
       * Previous external invite policy. Might be missing due to historical
       * data gap.
       */
      previous_value?: SharedFolderMemberPolicy;
    }

    /**
     * Created a shared folder.
     */
    export interface SharedFolderCreateDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Parent namespace ID. Might be missing due to historical data gap.
       */
      parent_ns_id?: common.NamespaceId;
    }

    export interface SharedFolderLinkPolicyMembersOnly {
      '.tag': 'members_only';
    }

    export interface SharedFolderLinkPolicyMembersAndTeam {
      '.tag': 'members_and_team';
    }

    export interface SharedFolderLinkPolicyAnyone {
      '.tag': 'anyone';
    }

    export interface SharedFolderLinkPolicyOther {
      '.tag': 'other';
    }

    export type SharedFolderLinkPolicy = SharedFolderLinkPolicyMembersOnly | SharedFolderLinkPolicyMembersAndTeam | SharedFolderLinkPolicyAnyone | SharedFolderLinkPolicyOther;

    export interface SharedFolderMemberPolicyTeamOnly {
      '.tag': 'team_only';
    }

    export interface SharedFolderMemberPolicyAnyone {
      '.tag': 'anyone';
    }

    export interface SharedFolderMemberPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for controlling who can become a member of a shared folder
     */
    export type SharedFolderMemberPolicy = SharedFolderMemberPolicyTeamOnly | SharedFolderMemberPolicyAnyone | SharedFolderMemberPolicyOther;

    export interface SharedFolderMembershipManagementPolicyOwner {
      '.tag': 'owner';
    }

    export interface SharedFolderMembershipManagementPolicyEditors {
      '.tag': 'editors';
    }

    export interface SharedFolderMembershipManagementPolicyOther {
      '.tag': 'other';
    }

    export type SharedFolderMembershipManagementPolicy = SharedFolderMembershipManagementPolicyOwner | SharedFolderMembershipManagementPolicyEditors | SharedFolderMembershipManagementPolicyOther;

    /**
     * Added a shared folder to own Dropbox.
     */
    export interface SharedFolderMountDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Transferred the ownership of a shared folder to another member.
     */
    export interface SharedFolderTransferOwnershipDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Deleted a shared folder from Dropbox.
     */
    export interface SharedFolderUnmountDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
      /**
       * Original shared folder name.
       */
      original_folder_name: string;
    }

    /**
     * Shared Paper document was opened.
     */
    export interface SharedNoteOpenedDetails {
    }

    /**
     * Changed whether team members can join shared folders owned externally
     * (i.e. outside the team).
     */
    export interface SharingChangeFolderJoinPolicyDetails {
      /**
       * New external join policy.
       */
      new_value: SharingFolderJoinPolicy;
      /**
       * Previous external join policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: SharingFolderJoinPolicy;
    }

    /**
     * Changed whether team members can share links externally (i.e. outside the
     * team), and if so, whether links should be accessible only by team members
     * or anyone by default.
     */
    export interface SharingChangeLinkPolicyDetails {
      /**
       * New external link accessibility policy.
       */
      new_value: SharingLinkPolicy;
      /**
       * Previous external link accessibility policy. Might be missing due to
       * historical data gap.
       */
      previous_value?: SharingLinkPolicy;
    }

    /**
     * Changed whether team members can share files and folders externally (i.e.
     * outside the team).
     */
    export interface SharingChangeMemberPolicyDetails {
      /**
       * New external invite policy.
       */
      new_value: SharingMemberPolicy;
      /**
       * Previous external invite policy. Might be missing due to historical
       * data gap.
       */
      previous_value?: SharingMemberPolicy;
    }

    export interface SharingFolderJoinPolicyFromAnyone {
      '.tag': 'from_anyone';
    }

    export interface SharingFolderJoinPolicyFromTeamOnly {
      '.tag': 'from_team_only';
    }

    export interface SharingFolderJoinPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for controlling if team members can join shared folders owned by
     * non team members.
     */
    export type SharingFolderJoinPolicy = SharingFolderJoinPolicyFromAnyone | SharingFolderJoinPolicyFromTeamOnly | SharingFolderJoinPolicyOther;

    export interface SharingLinkPolicyDefaultPrivate {
      '.tag': 'default_private';
    }

    export interface SharingLinkPolicyDefaultPublic {
      '.tag': 'default_public';
    }

    export interface SharingLinkPolicyOnlyPrivate {
      '.tag': 'only_private';
    }

    export interface SharingLinkPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for controlling if team members can share links externally
     */
    export type SharingLinkPolicy = SharingLinkPolicyDefaultPrivate | SharingLinkPolicyDefaultPublic | SharingLinkPolicyOnlyPrivate | SharingLinkPolicyOther;

    export interface SharingMemberPolicyAllow {
      '.tag': 'allow';
    }

    export interface SharingMemberPolicyForbid {
      '.tag': 'forbid';
    }

    export interface SharingMemberPolicyOther {
      '.tag': 'other';
    }

    /**
     * External sharing policy
     */
    export type SharingMemberPolicy = SharingMemberPolicyAllow | SharingMemberPolicyForbid | SharingMemberPolicyOther;

    /**
     * Created a link to a file using an app.
     */
    export interface ShmodelAppCreateDetails {
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Shared link token key.
       */
      token_key?: string;
    }

    /**
     * Created a new link.
     */
    export interface ShmodelCreateDetails {
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Shared link token key.
       */
      token_key?: string;
    }

    /**
     * Removed a link.
     */
    export interface ShmodelDisableDetails {
      /**
       * Sharing permission. Might be missing due to historical data gap.
       */
      sharing_permission?: string;
      /**
       * Shared link token key.
       */
      token_key?: string;
    }

    /**
     * Shared a link with Facebook users.
     */
    export interface ShmodelFbShareDetails {
      /**
       * Sharing non member recipients.
       */
      sharing_non_member_recipients: Array<NonTeamMemberLogInfo>;
    }

    /**
     * Shared a link with a group.
     */
    export interface ShmodelGroupShareDetails {
    }

    /**
     * Removed the expiration date from a link.
     */
    export interface ShmodelRemoveExpirationDetails {
    }

    /**
     * Added an expiration date to a link.
     */
    export interface ShmodelSetExpirationDetails {
      /**
       * Expiration starting date.
       */
      expiration_start_date: string;
      /**
       * The number of days from the starting expiration date after which the
       * link will expire.
       */
      expiration_days: number;
    }

    /**
     * Added a team member's file/folder to their Dropbox from a link.
     */
    export interface ShmodelTeamCopyDetails {
    }

    /**
     * Downloaded a team member's file/folder from a link.
     */
    export interface ShmodelTeamDownloadDetails {
    }

    /**
     * Shared a link with team members.
     */
    export interface ShmodelTeamShareDetails {
    }

    /**
     * Opened a team member's link.
     */
    export interface ShmodelTeamViewDetails {
    }

    /**
     * Password-protected a link.
     */
    export interface ShmodelVisibilityPasswordDetails {
    }

    /**
     * Made a file/folder visible to anyone with the link.
     */
    export interface ShmodelVisibilityPublicDetails {
    }

    /**
     * Made a file/folder visible only to team members with the link.
     */
    export interface ShmodelVisibilityTeamOnlyDetails {
    }

    /**
     * Ended admin sign-in-as session.
     */
    export interface SignInAsSessionEndDetails {
    }

    /**
     * Started admin sign-in-as session.
     */
    export interface SignInAsSessionStartDetails {
    }

    /**
     * Changed the default Smart Sync policy for team members.
     */
    export interface SmartSyncChangePolicyDetails {
      /**
       * New smart sync policy.
       */
      new_value: team_policies.SmartSyncPolicy;
      /**
       * Previous smart sync policy.
       */
      previous_value?: team_policies.SmartSyncPolicy;
    }

    /**
     * Smart Sync non-admin devices report created.
     */
    export interface SmartSyncCreateAdminPrivilegeReportDetails {
    }

    /**
     * Opted team into Smart Sync.
     */
    export interface SmartSyncNotOptOutDetails {
      /**
       * Previous Smart Sync opt out policy.
       */
      previous_value: SmartSyncOptOutPolicy;
      /**
       * New Smart Sync opt out policy.
       */
      new_value: SmartSyncOptOutPolicy;
    }

    /**
     * Opted team out of Smart Sync.
     */
    export interface SmartSyncOptOutDetails {
      /**
       * Previous Smart Sync opt out policy.
       */
      previous_value: SmartSyncOptOutPolicy;
      /**
       * New Smart Sync opt out policy.
       */
      new_value: SmartSyncOptOutPolicy;
    }

    export interface SmartSyncOptOutPolicyDefault {
      '.tag': 'default';
    }

    export interface SmartSyncOptOutPolicyOptedOut {
      '.tag': 'opted_out';
    }

    export interface SmartSyncOptOutPolicyOther {
      '.tag': 'other';
    }

    export type SmartSyncOptOutPolicy = SmartSyncOptOutPolicyDefault | SmartSyncOptOutPolicyOptedOut | SmartSyncOptOutPolicyOther;

    export interface SpaceLimitsStatusWithinQuota {
      '.tag': 'within_quota';
    }

    export interface SpaceLimitsStatusNearQuota {
      '.tag': 'near_quota';
    }

    export interface SpaceLimitsStatusOverQuota {
      '.tag': 'over_quota';
    }

    export interface SpaceLimitsStatusOther {
      '.tag': 'other';
    }

    export type SpaceLimitsStatus = SpaceLimitsStatusWithinQuota | SpaceLimitsStatusNearQuota | SpaceLimitsStatusOverQuota | SpaceLimitsStatusOther;

    /**
     * Added the X.509 certificate for SSO.
     */
    export interface SsoAddCertDetails {
      /**
       * SSO certificate details.
       */
      certificate_details: Certificate;
    }

    /**
     * Added sign-in URL for SSO.
     */
    export interface SsoAddLoginUrlDetails {
      /**
       * New single sign-on login URL.
       */
      new_value: string;
    }

    /**
     * Added sign-out URL for SSO.
     */
    export interface SsoAddLogoutUrlDetails {
      /**
       * New single sign-on logout URL. Might be missing due to historical data
       * gap.
       */
      new_value?: string;
    }

    /**
     * Changed the X.509 certificate for SSO.
     */
    export interface SsoChangeCertDetails {
      /**
       * Previous SSO certificate details. Might be missing due to historical
       * data gap.
       */
      previous_certificate_details?: Certificate;
      /**
       * New SSO certificate details.
       */
      new_certificate_details: Certificate;
    }

    /**
     * Changed the sign-in URL for SSO.
     */
    export interface SsoChangeLoginUrlDetails {
      /**
       * Previous single sign-on login URL.
       */
      previous_value: string;
      /**
       * New single sign-on login URL.
       */
      new_value: string;
    }

    /**
     * Changed the sign-out URL for SSO.
     */
    export interface SsoChangeLogoutUrlDetails {
      /**
       * Previous single sign-on logout URL. Might be missing due to historical
       * data gap.
       */
      previous_value?: string;
      /**
       * New single sign-on logout URL. Might be missing due to historical data
       * gap.
       */
      new_value?: string;
    }

    /**
     * Change the single sign-on policy for the team.
     */
    export interface SsoChangePolicyDetails {
      /**
       * New single sign-on policy.
       */
      new_value: team_policies.SsoPolicy;
      /**
       * Previous single sign-on policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: team_policies.SsoPolicy;
    }

    /**
     * Changed the SAML identity mode for SSO.
     */
    export interface SsoChangeSamlIdentityModeDetails {
      /**
       * Previous single sign-on identity mode.
       */
      previous_value: number;
      /**
       * New single sign-on identity mode.
       */
      new_value: number;
    }

    /**
     * Failed to sign in via SSO.
     */
    export interface SsoErrorDetails {
      /**
       * Error details.
       */
      error_details: FailureDetailsLogInfo;
    }

    /**
     * Removed the X.509 certificate for SSO.
     */
    export interface SsoRemoveCertDetails {
    }

    /**
     * Removed the sign-in URL for SSO.
     */
    export interface SsoRemoveLoginUrlDetails {
      /**
       * Previous single sign-on login URL.
       */
      previous_value: string;
    }

    /**
     * Removed single sign-on logout URL.
     */
    export interface SsoRemoveLogoutUrlDetails {
      /**
       * Previous single sign-on logout URL.
       */
      previous_value: string;
    }

    /**
     * Created a team activity report.
     */
    export interface TeamActivityCreateReportDetails {
      /**
       * Report start date.
       */
      start_date: common.DropboxTimestamp;
      /**
       * Report end date.
       */
      end_date: common.DropboxTimestamp;
    }

    /**
     * An audit log event.
     */
    export interface TeamEvent {
      /**
       * The Dropbox timestamp representing when the action was taken.
       */
      timestamp: common.DropboxTimestamp;
      /**
       * The category that this type of action belongs to.
       */
      event_category: EventCategory;
      /**
       * The entity who actually performed the action.
       */
      actor: ActorLogInfo;
      /**
       * The origin from which the actor performed the action including
       * information about host, ip address, location, session, etc. If the
       * action was performed programmatically via the API the origin represents
       * the API client.
       */
      origin?: OriginLogInfo;
      /**
       * True if the action involved a non team member either as the actor or as
       * one of the affected users.
       */
      involve_non_team_member: boolean;
      /**
       * The user or team on whose behalf the actor performed the action.
       */
      context: ContextLogInfo;
      /**
       * Zero or more users and/or groups that are affected by the action. Note
       * that this list doesn't include any actors or users in context.
       */
      participants?: Array<ParticipantLogInfo>;
      /**
       * Zero or more content assets involved in the action. Currently these
       * include Dropbox files and folders but in the future we might add other
       * asset types such as Paper documents, folders, projects, etc.
       */
      assets?: Array<AssetLogInfo>;
      /**
       * The particular type of action taken.
       */
      event_type: EventType;
      /**
       * The variable event schema applicable to this type of action,
       * instantiated with respect to this particular action.
       */
      details: EventDetails;
    }

    /**
     * Changed the archival status of a team folder.
     */
    export interface TeamFolderChangeStatusDetails {
      /**
       * New team folder status.
       */
      new_value: TeamFolderStatus;
      /**
       * Previous team folder status. Might be missing due to historical data
       * gap.
       */
      previous_value?: TeamFolderStatus;
    }

    /**
     * Created a new team folder in active status.
     */
    export interface TeamFolderCreateDetails {
    }

    /**
     * Downgraded a team folder to a regular shared folder.
     */
    export interface TeamFolderDowngradeDetails {
      /**
       * Target asset position in the Assets list.
       */
      target_asset_index: number;
    }

    /**
     * Permanently deleted an archived team folder.
     */
    export interface TeamFolderPermanentlyDeleteDetails {
    }

    /**
     * Renamed an active or archived team folder.
     */
    export interface TeamFolderRenameDetails {
      /**
       * Specifies the source and destination indices in the assets list.
       */
      relocate_action_details: RelocateAssetReferencesLogInfo;
    }

    export interface TeamFolderStatusArchive {
      '.tag': 'archive';
    }

    export interface TeamFolderStatusUnarchive {
      '.tag': 'unarchive';
    }

    export interface TeamFolderStatusOther {
      '.tag': 'other';
    }

    export type TeamFolderStatus = TeamFolderStatusArchive | TeamFolderStatusUnarchive | TeamFolderStatusOther;

    /**
     * Team linked app
     */
    export interface TeamLinkedAppLogInfo extends AppLogInfo {
    }

    /**
     * Reference to the TeamLinkedAppLogInfo type, identified by the value of
     * the .tag property.
     */
    export interface TeamLinkedAppLogInfoReference extends TeamLinkedAppLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'team_linked_app';
    }

    /**
     * Team member's logged information.
     */
    export interface TeamMemberLogInfo extends UserLogInfo {
      /**
       * Team member ID. Might be missing due to historical data gap.
       */
      team_member_id?: team_common.TeamMemberId;
      /**
       * Team member external ID.
       */
      member_external_id?: team_common.MemberExternalId;
    }

    /**
     * Reference to the TeamMemberLogInfo type, identified by the value of the
     * .tag property.
     */
    export interface TeamMemberLogInfoReference extends TeamMemberLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'team_member';
    }

    export interface TeamMembershipTypeFree {
      '.tag': 'free';
    }

    export interface TeamMembershipTypeFull {
      '.tag': 'full';
    }

    export interface TeamMembershipTypeOther {
      '.tag': 'other';
    }

    export type TeamMembershipType = TeamMembershipTypeFree | TeamMembershipTypeFull | TeamMembershipTypeOther;

    /**
     * Merged another team into this team.
     */
    export interface TeamMergeFromDetails {
      /**
       * The name of the team that was merged into this team.
       */
      team_name: string;
    }

    /**
     * Merged this team into another team.
     */
    export interface TeamMergeToDetails {
      /**
       * The name of the team that this team was merged into.
       */
      team_name: string;
    }

    /**
     * Team name details
     */
    export interface TeamName {
      /**
       * Team's display name.
       */
      team_display_name: string;
      /**
       * Team's legal name.
       */
      team_legal_name: string;
    }

    /**
     * Added a team logo to be displayed on shared link headers.
     */
    export interface TeamProfileAddLogoDetails {
    }

    /**
     * Changed the default language for the team.
     */
    export interface TeamProfileChangeDefaultLanguageDetails {
      /**
       * New team's default language.
       */
      new_value: common.LanguageCode;
      /**
       * Previous team's default language.
       */
      previous_value: common.LanguageCode;
    }

    /**
     * Changed the team logo to be displayed on shared link headers.
     */
    export interface TeamProfileChangeLogoDetails {
    }

    /**
     * Changed the team name.
     */
    export interface TeamProfileChangeNameDetails {
      /**
       * Previous teams name. Might be missing due to historical data gap.
       */
      previous_value?: TeamName;
      /**
       * New team name.
       */
      new_value: TeamName;
    }

    /**
     * Removed the team logo to be displayed on shared link headers.
     */
    export interface TeamProfileRemoveLogoDetails {
    }

    /**
     * Added a backup phone for two-step verification.
     */
    export interface TfaAddBackupPhoneDetails {
    }

    /**
     * Added a security key for two-step verification.
     */
    export interface TfaAddSecurityKeyDetails {
    }

    /**
     * Changed the backup phone for two-step verification.
     */
    export interface TfaChangeBackupPhoneDetails {
    }

    /**
     * Change two-step verification policy for the team.
     */
    export interface TfaChangePolicyDetails {
      /**
       * New change policy.
       */
      new_value: team_policies.TwoStepVerificationPolicy;
      /**
       * Previous change policy. Might be missing due to historical data gap.
       */
      previous_value?: team_policies.TwoStepVerificationPolicy;
    }

    /**
     * Enabled, disabled or changed the configuration for two-step verification.
     */
    export interface TfaChangeStatusDetails {
      /**
       * The new two factor authentication configuration.
       */
      new_value: TfaConfiguration;
      /**
       * The previous two factor authentication configuration. Might be missing
       * due to historical data gap.
       */
      previous_value?: TfaConfiguration;
      /**
       * Used two factor authentication rescue code. This flag is relevant when
       * the two factor authentication configuration is disabled.
       */
      used_rescue_code?: boolean;
    }

    export interface TfaConfigurationDisabled {
      '.tag': 'disabled';
    }

    export interface TfaConfigurationEnabled {
      '.tag': 'enabled';
    }

    export interface TfaConfigurationSms {
      '.tag': 'sms';
    }

    export interface TfaConfigurationAuthenticator {
      '.tag': 'authenticator';
    }

    export interface TfaConfigurationOther {
      '.tag': 'other';
    }

    /**
     * Two factor authentication configuration. Note: the enabled option is
     * deprecated.
     */
    export type TfaConfiguration = TfaConfigurationDisabled | TfaConfigurationEnabled | TfaConfigurationSms | TfaConfigurationAuthenticator | TfaConfigurationOther;

    /**
     * Removed the backup phone for two-step verification.
     */
    export interface TfaRemoveBackupPhoneDetails {
    }

    /**
     * Removed a security key for two-step verification.
     */
    export interface TfaRemoveSecurityKeyDetails {
    }

    /**
     * Reset two-step verification for team member.
     */
    export interface TfaResetDetails {
    }

    export interface TimeUnitMilliseconds {
      '.tag': 'milliseconds';
    }

    export interface TimeUnitSeconds {
      '.tag': 'seconds';
    }

    export interface TimeUnitMinutes {
      '.tag': 'minutes';
    }

    export interface TimeUnitHours {
      '.tag': 'hours';
    }

    export interface TimeUnitDays {
      '.tag': 'days';
    }

    export interface TimeUnitWeeks {
      '.tag': 'weeks';
    }

    export interface TimeUnitMonths {
      '.tag': 'months';
    }

    export interface TimeUnitYears {
      '.tag': 'years';
    }

    export interface TimeUnitOther {
      '.tag': 'other';
    }

    export type TimeUnit = TimeUnitMilliseconds | TimeUnitSeconds | TimeUnitMinutes | TimeUnitHours | TimeUnitDays | TimeUnitWeeks | TimeUnitMonths | TimeUnitYears | TimeUnitOther;

    /**
     * Enabled or disabled the option for team members to link a personal
     * Dropbox account in addition to their work account to the same computer.
     */
    export interface TwoAccountChangePolicyDetails {
      /**
       * New two account policy.
       */
      new_value: TwoAccountPolicy;
      /**
       * Previous two account policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: TwoAccountPolicy;
    }

    export interface TwoAccountPolicyDisabled {
      '.tag': 'disabled';
    }

    export interface TwoAccountPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface TwoAccountPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy for pairing personal account to work account
     */
    export type TwoAccountPolicy = TwoAccountPolicyDisabled | TwoAccountPolicyEnabled | TwoAccountPolicyOther;

    /**
     * User linked app
     */
    export interface UserLinkedAppLogInfo extends AppLogInfo {
    }

    /**
     * Reference to the UserLinkedAppLogInfo type, identified by the value of
     * the .tag property.
     */
    export interface UserLinkedAppLogInfoReference extends UserLinkedAppLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'user_linked_app';
    }

    /**
     * User's logged information.
     */
    export interface UserLogInfo {
      /**
       * User unique ID. Might be missing due to historical data gap.
       */
      account_id?: users_common.AccountId;
      /**
       * User display name. Might be missing due to historical data gap.
       */
      display_name?: common.DisplayNameLegacy;
      /**
       * User email address. Might be missing due to historical data gap.
       */
      email?: common.EmailAddress;
    }

    /**
     * Reference to the UserLogInfo polymorphic type. Contains a .tag property
     * to let you discriminate between possible subtypes.
     */
    export interface UserLogInfoReference extends UserLogInfo {
      /**
       * Tag identifying the subtype variant.
       */
      '.tag': "team_member"|"non_team_member";
    }

    /**
     * User's name logged information
     */
    export interface UserNameLogInfo {
      /**
       * Given name.
       */
      given_name: string;
      /**
       * Surname.
       */
      surname: string;
      /**
       * Locale. Might be missing due to historical data gap.
       */
      locale?: string;
    }

    /**
     * User or team linked app. Used when linked type is missing due to
     * historical data gap.
     */
    export interface UserOrTeamLinkedAppLogInfo extends AppLogInfo {
    }

    /**
     * Reference to the UserOrTeamLinkedAppLogInfo type, identified by the value
     * of the .tag property.
     */
    export interface UserOrTeamLinkedAppLogInfoReference extends UserOrTeamLinkedAppLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'user_or_team_linked_app';
    }

    /**
     * Web session.
     */
    export interface WebSessionLogInfo extends SessionLogInfo {
    }

    /**
     * Reference to the WebSessionLogInfo type, identified by the value of the
     * .tag property.
     */
    export interface WebSessionLogInfoReference extends WebSessionLogInfo {
      /**
       * Tag identifying this subtype variant. This field is only present when
       * needed to discriminate between multiple possible subtypes.
       */
      '.tag': 'web';
    }

    /**
     * Changed how long team members can stay signed in to Dropbox on the web.
     */
    export interface WebSessionsChangeFixedLengthPolicyDetails {
      /**
       * New session length policy. Might be missing due to historical data gap.
       */
      new_value?: WebSessionsFixedLengthPolicy;
      /**
       * Previous session length policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: WebSessionsFixedLengthPolicy;
    }

    /**
     * Changed how long team members can be idle while signed in to Dropbox on
     * the web.
     */
    export interface WebSessionsChangeIdleLengthPolicyDetails {
      /**
       * New idle length policy. Might be missing due to historical data gap.
       */
      new_value?: WebSessionsIdleLengthPolicy;
      /**
       * Previous idle length policy. Might be missing due to historical data
       * gap.
       */
      previous_value?: WebSessionsIdleLengthPolicy;
    }

    /**
     * Defined fixed session length.
     */
    export interface WebSessionsFixedLengthPolicyDefined {
      '.tag': 'defined';
      defined: DurationLogInfo;
    }

    /**
     * Undefined fixed session length.
     */
    export interface WebSessionsFixedLengthPolicyUndefined {
      '.tag': 'undefined';
    }

    export interface WebSessionsFixedLengthPolicyOther {
      '.tag': 'other';
    }

    /**
     * Web sessions fixed length policy.
     */
    export type WebSessionsFixedLengthPolicy = WebSessionsFixedLengthPolicyDefined | WebSessionsFixedLengthPolicyUndefined | WebSessionsFixedLengthPolicyOther;

    /**
     * Defined idle session length.
     */
    export interface WebSessionsIdleLengthPolicyDefined {
      '.tag': 'defined';
      defined: DurationLogInfo;
    }

    /**
     * Undefined idle session length.
     */
    export interface WebSessionsIdleLengthPolicyUndefined {
      '.tag': 'undefined';
    }

    export interface WebSessionsIdleLengthPolicyOther {
      '.tag': 'other';
    }

    /**
     * Web sessions idle length policy.
     */
    export type WebSessionsIdleLengthPolicy = WebSessionsIdleLengthPolicyDefined | WebSessionsIdleLengthPolicyUndefined | WebSessionsIdleLengthPolicyOther;

    export type AppId = string;

    export type FilePath = string;

    export type IpAddress = string;

    export type RequestId = string;

    export type TeamEventList = Array<TeamEvent>;

  }

  namespace team_policies {
    /**
     * Emm token is disabled.
     */
    export interface EmmStateDisabled {
      '.tag': 'disabled';
    }

    /**
     * Emm token is optional.
     */
    export interface EmmStateOptional {
      '.tag': 'optional';
    }

    /**
     * Emm token is required.
     */
    export interface EmmStateRequired {
      '.tag': 'required';
    }

    export interface EmmStateOther {
      '.tag': 'other';
    }

    export type EmmState = EmmStateDisabled | EmmStateOptional | EmmStateRequired | EmmStateOther;

    /**
     * Team admins and members can create groups.
     */
    export interface GroupCreationAdminsAndMembers {
      '.tag': 'admins_and_members';
    }

    /**
     * Only team admins can create groups.
     */
    export interface GroupCreationAdminsOnly {
      '.tag': 'admins_only';
    }

    export type GroupCreation = GroupCreationAdminsAndMembers | GroupCreationAdminsOnly;

    /**
     * Office Add-In is disabled.
     */
    export interface OfficeAddInPolicyDisabled {
      '.tag': 'disabled';
    }

    /**
     * Office Add-In is enabled.
     */
    export interface OfficeAddInPolicyEnabled {
      '.tag': 'enabled';
    }

    export interface OfficeAddInPolicyOther {
      '.tag': 'other';
    }

    export type OfficeAddInPolicy = OfficeAddInPolicyDisabled | OfficeAddInPolicyEnabled | OfficeAddInPolicyOther;

    /**
     * All team members have access to Paper.
     */
    export interface PaperDeploymentPolicyFull {
      '.tag': 'full';
    }

    /**
     * Only whitelisted team members can access Paper. To see which user is
     * whitelisted, check 'is_paper_whitelisted' on 'account/info'.
     */
    export interface PaperDeploymentPolicyPartial {
      '.tag': 'partial';
    }

    export interface PaperDeploymentPolicyOther {
      '.tag': 'other';
    }

    export type PaperDeploymentPolicy = PaperDeploymentPolicyFull | PaperDeploymentPolicyPartial | PaperDeploymentPolicyOther;

    /**
     * Paper is disabled.
     */
    export interface PaperEnabledPolicyDisabled {
      '.tag': 'disabled';
    }

    /**
     * Paper is enabled.
     */
    export interface PaperEnabledPolicyEnabled {
      '.tag': 'enabled';
    }

    /**
     * Unspecified policy.
     */
    export interface PaperEnabledPolicyUnspecified {
      '.tag': 'unspecified';
    }

    export interface PaperEnabledPolicyOther {
      '.tag': 'other';
    }

    export type PaperEnabledPolicy = PaperEnabledPolicyDisabled | PaperEnabledPolicyEnabled | PaperEnabledPolicyUnspecified | PaperEnabledPolicyOther;

    /**
     * User passwords will adhere to the minimal password strength policy.
     */
    export interface PasswordStrengthPolicyMinimalRequirements {
      '.tag': 'minimal_requirements';
    }

    /**
     * User passwords will adhere to the moderate password strength policy.
     */
    export interface PasswordStrengthPolicyModeratePassword {
      '.tag': 'moderate_password';
    }

    /**
     * User passwords will adhere to the very strong password strength policy.
     */
    export interface PasswordStrengthPolicyStrongPassword {
      '.tag': 'strong_password';
    }

    export interface PasswordStrengthPolicyOther {
      '.tag': 'other';
    }

    export type PasswordStrengthPolicy = PasswordStrengthPolicyMinimalRequirements | PasswordStrengthPolicyModeratePassword | PasswordStrengthPolicyStrongPassword | PasswordStrengthPolicyOther;

    /**
     * Unlink all.
     */
    export interface RolloutMethodUnlinkAll {
      '.tag': 'unlink_all';
    }

    /**
     * Unlink devices with the most inactivity.
     */
    export interface RolloutMethodUnlinkMostInactive {
      '.tag': 'unlink_most_inactive';
    }

    /**
     * Add member to Exceptions.
     */
    export interface RolloutMethodAddMemberToExceptions {
      '.tag': 'add_member_to_exceptions';
    }

    export type RolloutMethod = RolloutMethodUnlinkAll | RolloutMethodUnlinkMostInactive | RolloutMethodAddMemberToExceptions;

    /**
     * Team members can only join folders shared by teammates.
     */
    export interface SharedFolderJoinPolicyFromTeamOnly {
      '.tag': 'from_team_only';
    }

    /**
     * Team members can join any shared folder, including those shared by users
     * outside the team.
     */
    export interface SharedFolderJoinPolicyFromAnyone {
      '.tag': 'from_anyone';
    }

    export interface SharedFolderJoinPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy governing which shared folders a team member can join.
     */
    export type SharedFolderJoinPolicy = SharedFolderJoinPolicyFromTeamOnly | SharedFolderJoinPolicyFromAnyone | SharedFolderJoinPolicyOther;

    /**
     * Only a teammate can be a member of a folder shared by a team member.
     */
    export interface SharedFolderMemberPolicyTeam {
      '.tag': 'team';
    }

    /**
     * Anyone can be a member of a folder shared by a team member.
     */
    export interface SharedFolderMemberPolicyAnyone {
      '.tag': 'anyone';
    }

    export interface SharedFolderMemberPolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy governing who can be a member of a folder shared by a team member.
     */
    export type SharedFolderMemberPolicy = SharedFolderMemberPolicyTeam | SharedFolderMemberPolicyAnyone | SharedFolderMemberPolicyOther;

    /**
     * By default, anyone can access newly created shared links. No login will
     * be required to access the shared links unless overridden.
     */
    export interface SharedLinkCreatePolicyDefaultPublic {
      '.tag': 'default_public';
    }

    /**
     * By default, only members of the same team can access newly created shared
     * links. Login will be required to access the shared links unless
     * overridden.
     */
    export interface SharedLinkCreatePolicyDefaultTeamOnly {
      '.tag': 'default_team_only';
    }

    /**
     * Only members of the same team can access all shared links. Login will be
     * required to access all shared links.
     */
    export interface SharedLinkCreatePolicyTeamOnly {
      '.tag': 'team_only';
    }

    export interface SharedLinkCreatePolicyOther {
      '.tag': 'other';
    }

    /**
     * Policy governing the visibility of shared links. This policy can apply to
     * newly created shared links, or all shared links.
     */
    export type SharedLinkCreatePolicy = SharedLinkCreatePolicyDefaultPublic | SharedLinkCreatePolicyDefaultTeamOnly | SharedLinkCreatePolicyTeamOnly | SharedLinkCreatePolicyOther;

    /**
     * The specified content will be synced as local files by default.
     */
    export interface SmartSyncPolicyLocal {
      '.tag': 'local';
    }

    /**
     * The specified content will be synced as on-demand files by default.
     */
    export interface SmartSyncPolicyOnDemand {
      '.tag': 'on_demand';
    }

    export interface SmartSyncPolicyOther {
      '.tag': 'other';
    }

    export type SmartSyncPolicy = SmartSyncPolicyLocal | SmartSyncPolicyOnDemand | SmartSyncPolicyOther;

    /**
     * Users will be able to sign in with their Dropbox credentials.
     */
    export interface SsoPolicyDisabled {
      '.tag': 'disabled';
    }

    /**
     * Users will be able to sign in with either their Dropbox or single sign-on
     * credentials.
     */
    export interface SsoPolicyOptional {
      '.tag': 'optional';
    }

    /**
     * Users will be required to sign in with their single sign-on credentials.
     */
    export interface SsoPolicyRequired {
      '.tag': 'required';
    }

    export interface SsoPolicyOther {
      '.tag': 'other';
    }

    export type SsoPolicy = SsoPolicyDisabled | SsoPolicyOptional | SsoPolicyRequired | SsoPolicyOther;

    /**
     * Policies governing team members.
     */
    export interface TeamMemberPolicies {
      /**
       * Policies governing sharing.
       */
      sharing: TeamSharingPolicies;
      /**
       * This describes the Enterprise Mobility Management (EMM) state for this
       * team. This information can be used to understand if an organization is
       * integrating with a third-party EMM vendor to further manage and apply
       * restrictions upon the team's Dropbox usage on mobile devices. This is a
       * new feature and in the future we'll be adding more new fields and
       * additional documentation.
       */
      emm_state: EmmState;
      /**
       * The admin policy around the Dropbox Office Add-In for this team.
       */
      office_addin: OfficeAddInPolicy;
    }

    /**
     * Policies governing sharing within and outside of the team.
     */
    export interface TeamSharingPolicies {
      /**
       * Who can join folders shared by team members.
       */
      shared_folder_member_policy: SharedFolderMemberPolicy;
      /**
       * Which shared folders team members can join.
       */
      shared_folder_join_policy: SharedFolderJoinPolicy;
      /**
       * Who can view shared links owned by team members.
       */
      shared_link_create_policy: SharedLinkCreatePolicy;
    }

    /**
     * Enabled require two factor authorization.
     */
    export interface TwoStepVerificationPolicyRequireTfaEnable {
      '.tag': 'require_tfa_enable';
    }

    /**
     * Disabled require two factor authorization.
     */
    export interface TwoStepVerificationPolicyRequireTfaDisable {
      '.tag': 'require_tfa_disable';
    }

    export interface TwoStepVerificationPolicyOther {
      '.tag': 'other';
    }

    export type TwoStepVerificationPolicy = TwoStepVerificationPolicyRequireTfaEnable | TwoStepVerificationPolicyRequireTfaDisable | TwoStepVerificationPolicyOther;

  }

  /**
   * This namespace contains endpoints and data types for user management.
   */
  namespace users {
    /**
     * The amount of detail revealed about an account depends on the user being
     * queried and the user making the query.
     */
    export interface Account {
      /**
       * The user's unique Dropbox ID.
       */
      account_id: users_common.AccountId;
      /**
       * Details of a user's name.
       */
      name: Name;
      /**
       * The user's e-mail address. Do not rely on this without checking the
       * email_verified field. Even then, it's possible that the user has since
       * lost access to their e-mail.
       */
      email: string;
      /**
       * Whether the user has verified their e-mail address.
       */
      email_verified: boolean;
      /**
       * URL for the photo representing the user, if one is set.
       */
      profile_photo_url?: string;
      /**
       * Whether the user has been disabled.
       */
      disabled: boolean;
    }

    /**
     * Basic information about any account.
     */
    export interface BasicAccount extends Account {
      /**
       * Whether this user is a teammate of the current user. If this account is
       * the current user's account, then this will be true.
       */
      is_teammate: boolean;
      /**
       * The user's unique team member id. This field will only be present if
       * the user is part of a team and is_teammate is true.
       */
      team_member_id?: string;
    }

    /**
     * Detailed information about the current user's account.
     */
    export interface FullAccount extends Account {
      /**
       * The user's two-letter country code, if available. Country codes are
       * based on [ISO 3166-1]{@link http://en.wikipedia.org/wiki/ISO_3166-1}.
       */
      country?: string;
      /**
       * The language that the user specified. Locale tags will be [IETF
       * language tags]{@link http://en.wikipedia.org/wiki/IETF_language_tag}.
       */
      locale: string;
      /**
       * The user's [referral link]{@link https://www.dropbox.com/referrals}.
       */
      referral_link: string;
      /**
       * If this account is a member of a team, information about that team.
       */
      team?: FullTeam;
      /**
       * This account's unique team member id. This field will only be present
       * if team is present.
       */
      team_member_id?: string;
      /**
       * Whether the user has a personal and work account. If the current
       * account is personal, then team will always be null, but is_paired will
       * indicate if a work account is linked.
       */
      is_paired: boolean;
      /**
       * What type of account this user has.
       */
      account_type: users_common.AccountType;
      /**
       * The root info for this account.
       */
      root_info: common.TeamRootInfoReference|common.UserRootInfoReference|common.RootInfoReference;
    }

    /**
     * Detailed information about a team.
     */
    export interface FullTeam extends Team {
      /**
       * Team policies governing sharing.
       */
      sharing_policies: team_policies.TeamSharingPolicies;
      /**
       * Team policy governing the use of the Office Add-In.
       */
      office_addin_policy: team_policies.OfficeAddInPolicy;
    }

    export interface GetAccountArg {
      /**
       * A user's account identifier.
       */
      account_id: users_common.AccountId;
    }

    export interface GetAccountBatchArg {
      /**
       * List of user account identifiers.  Should not contain any duplicate
       * account IDs.
       */
      account_ids: Array<users_common.AccountId>;
    }

    /**
     * The value is an account ID specified in GetAccountBatchArg.account_ids
     * that does not exist.
     */
    export interface GetAccountBatchErrorNoAccount {
      '.tag': 'no_account';
      no_account: users_common.AccountId;
    }

    export interface GetAccountBatchErrorOther {
      '.tag': 'other';
    }

    export type GetAccountBatchError = GetAccountBatchErrorNoAccount | GetAccountBatchErrorOther;

    /**
     * The specified GetAccountArg.account_id does not exist.
     */
    export interface GetAccountErrorNoAccount {
      '.tag': 'no_account';
    }

    export interface GetAccountErrorOther {
      '.tag': 'other';
    }

    export type GetAccountError = GetAccountErrorNoAccount | GetAccountErrorOther;

    export interface IndividualSpaceAllocation {
      /**
       * The total space allocated to the user's account (bytes).
       */
      allocated: number;
    }

    /**
     * Representations for a person's name to assist with internationalization.
     */
    export interface Name {
      /**
       * Also known as a first name.
       */
      given_name: string;
      /**
       * Also known as a last name or family name.
       */
      surname: string;
      /**
       * Locale-dependent name. In the US, a person's familiar name is their
       * given_name, but elsewhere, it could be any combination of a person's
       * given_name and surname.
       */
      familiar_name: string;
      /**
       * A name that can be used directly to represent the name of a user's
       * Dropbox account.
       */
      display_name: string;
      /**
       * An abbreviated form of the person's name. Their initials in most
       * locales.
       */
      abbreviated_name: string;
    }

    /**
     * The user's space allocation applies only to their individual account.
     */
    export interface SpaceAllocationIndividual {
      '.tag': 'individual';
      individual: IndividualSpaceAllocation;
    }

    /**
     * The user shares space with other members of their team.
     */
    export interface SpaceAllocationTeam {
      '.tag': 'team';
      team: TeamSpaceAllocation;
    }

    export interface SpaceAllocationOther {
      '.tag': 'other';
    }

    /**
     * Space is allocated differently based on the type of account.
     */
    export type SpaceAllocation = SpaceAllocationIndividual | SpaceAllocationTeam | SpaceAllocationOther;

    /**
     * Information about a user's space usage and quota.
     */
    export interface SpaceUsage {
      /**
       * The user's total space usage (bytes).
       */
      used: number;
      /**
       * The user's space allocation.
       */
      allocation: SpaceAllocation;
    }

    /**
     * Information about a team.
     */
    export interface Team {
      /**
       * The team's unique ID.
       */
      id: string;
      /**
       * The name of the team.
       */
      name: string;
    }

    export interface TeamSpaceAllocation {
      /**
       * The total space currently used by the user's team (bytes).
       */
      used: number;
      /**
       * The total space allocated to the user's team (bytes).
       */
      allocated: number;
    }

    export type GetAccountBatchResult = Array<BasicAccount>;

  }

  /**
   * This namespace contains common data types used within the users namespace.
   */
  namespace users_common {
    /**
     * The basic account type.
     */
    export interface AccountTypeBasic {
      '.tag': 'basic';
    }

    /**
     * The Dropbox Pro account type.
     */
    export interface AccountTypePro {
      '.tag': 'pro';
    }

    /**
     * The Dropbox Business account type.
     */
    export interface AccountTypeBusiness {
      '.tag': 'business';
    }

    /**
     * What type of account this user has.
     */
    export type AccountType = AccountTypeBasic | AccountTypePro | AccountTypeBusiness;

    export type AccountId = string;

  }

}
