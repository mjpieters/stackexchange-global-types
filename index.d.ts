import "@stackoverflow/stacks/dist/js/stacks.js";
import "jquery";

declare global {
    namespace CHAT {
        interface User {
            /** Get whether the current user can kick others out of the room */
            canKick(): boolean;
            /** Get whether the current user has moderator privileges */
            canModerate(): boolean;
            /**
             * Get whether the current user has moderator privileges. See
             * {@link https://meta.stackexchange.com/q/258038|What is a 'superping'?}
             */
            canSuperPing(): boolean;
            /** Get whether the current user can talk during a timeout */
            canTalkDuringTimeout(): boolean;
            /** Get the current user's name */
            getName(): string;
            /** Get whether the current user is logged in */
            isLoggedIn(): boolean;
            /** Get whether the current user is a room owner */
            isOwner(): boolean;
        }

        /** The id of the current chat room */
        const CURRENT_ROOM_ID: number;
        /** The id of the current user */
        const CURRENT_USER_ID: number;
        /** Whether or not the current chat room is a "live chat room" */
        const IS_LIVE_CHAT: boolean;
        /** Whether the user is on mobile */
        const IS_MOBILE: boolean;
        /** The user id of the host of the "live chat room" (0 if IS_LIVE_CHAT is false) */
        const LIVE_CHAT_HOST_ID: number;
        /** Information about the current user */
        const user: User;
    }

    namespace Stacks {
        type BasicPlacement = "auto" | "top" | "right" | "bottom" | "left";
        // Minimum TypeScript Version: 4.1
        type AllPlacements =
            | BasicPlacement
            | `${BasicPlacement}-start`
            | `${BasicPlacement}-end`;

        class ModalController extends StacksController {
            /** Toggles the visibility of the modal */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the modal */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the modal */
            hide(dispatcher?: Event | Element | null): void;
        }

        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */
        function showModal(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         */

        function hideModal(element: HTMLElement): void;
        /**
         * Helper to manually show an s-modal element via external JS
         * @param element the element the `data-controller="s-modal"` attribute is on
         * @param show whether to force show/hide the modal; toggles the modal if left undefined
         */
        function toggleModal(element: HTMLElement, show?: boolean): void;

        abstract class BasePopoverController extends StacksController {
            /** Returns true if the if the popover is currently visible */
            isVisible: boolean;
            /** Gets whether the element is visible in the browser's viewport */
            isInViewPort: boolean;

            /** Toggles the visibility of the popover */
            toggle(dispatcher?: Event | Element | null): void;
            /** Shows the popover if not already visible */
            show(dispatcher?: Event | Element | null): void;
            /** Hides the popover if not already hidden */
            hide(dispatcher?: Event | Element | null): void;
        }

        class PopoverController extends BasePopoverController {}

        interface PopoverOptions {
            /** When true, the `click->s-popover#toggle` action will be attached to the controller element or reference element */
            toggleOnClick?: boolean;
            /** When set, `data-s-popover-placement` will be set to this value on the controller element */
            placement?: AllPlacements;
            /** When true, the popover will appear immediately when the controller connects */
            autoShow?: boolean;
        }

        interface GetPopoverResult {
            /** Indicates whether or not the element has s-popover in its `data-controller` class */
            isPopover: boolean;
            /** Returns the element's existing `PopoverController` or null if it has not been configured yet */
            controller: PopoverController | null;
            /** Returns the popover's reference element as would live in `referenceSelector` or null if it is invalid */
            referenceElement: Element | null;
            /** Returns the popover currently associated with the controller, or null if one does not exist in the DOM */
            popover: HTMLElement | null;
        }

        /**
         * Helper to manually show an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function showPopover(element: HTMLElement): void;
        /**
         * Helper to manually hide an s-popover element via external JS
         * @param element the element the `data-controller="s-popover"` attribute is on
         */
        function hidePopover(element: Element): void;
        /**
         * Attaches a popover to an element and performs additional configuration.
         * @param element the element that will receive the `data-controller="s-popover"` attribute.
         * @param popover an element with the `.s-popover` class or HTML string containing a single element with the `.s-popover` class.
         *                If the popover does not have a parent element, it will be inserted as a immediately after the reference element.
         * @param options an optional collection of options to use when configuring the popover.
         */
        function attachPopover(
            element: Element,
            popover: Element | string,
            options?: PopoverOptions
        ): void;
        /**
         * Removes the popover controller from an element and removes the popover from the DOM.
         * @param element the element that has the `data-controller="s-popover"` attribute.
         * @returns The popover that was attached to the element.
         */
        function detachPopover(element: Element): GetPopoverResult["popover"];
        /**
         * Gets the current state of an element that may be or is intended to be an s-popover controller
         * so it can be configured either directly or via the DOM.
         * @param element An element that may have `data-controller="s-popover"`.
         */
        function getPopover(element: Element): GetPopoverResult;
        /**
         * Adds or removes the controller from an element's [data-controller] attribute without altering existing entries
         * @param el The element to alter
         * @param controllerName The name of the controller to add/remove
         * @param include Whether to add the controllerName value
         */
        function toggleController(
            el: Element,
            controllerName: string,
            include: boolean
        ): void;

        class TooltipController extends BasePopoverController {
            /** Sets up a tooltip popover show after a delay */
            scheduleShow(dispatcher: Event | Element | null = null): void;
            /** Applies data-s-tooltip-html-title and title attributes */
            applyTitleAttributes(): HTMLElement | null;
        }

        interface TooltipOptions {
            /** The position to place the tooltip */
            placement: AllPlacements;
        }

        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param html An HTML string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipHtml(
            element: Element,
            html: string,
            options?: TooltipOptions
        ): void;
        /**
         * Adds or updates a Stacks tooltip on a given element, initializing the controller if necessary
         * @param element The element to add a tooltip to.
         * @param text A plain text string to populate the tooltip with.
         * @param options Options for rendering the tooltip.
         */
        function setTooltipText(
            element: Element,
            text: string,
            options?: TooltipOptions
        ): void;
    }

    // initial definition of the StackExchange global by double-beep https://github.com/double-beep from:
    // https://github.com/SOBotics/AdvancedFlagging/blob/1945787f9d3d01b5aa84bc6cff3f1da358aaf8c0/src/GlobalVars.ts

    namespace StackExchange {
        interface ModalType {
            /** The modal's title */
            title: string;
            /** The modal's HTML body */
            bodyHtml: string;
            /** The text of the primary button in the modal's footer */
            buttonLabel: string;
        }

        interface ShowModalOptions {
            /** Whether to fade out and remove any Stacks modals in the body */
            closeOthers: boolean;
            /** The element to return focus to when the modal is closed */
            returnElements: JQuery;
            /** Function that will be called after the modal has been displayed */
            shown: () => void;
            /** Function that will be called if the message is dismissed by pressing escape */
            dismissing: () => void;
            /** Function that will be called right before the modal is displayed */
            showing: () => void;
            /** Function that will be bound to the modal's fadeOutAndRemove()'s 'removing' event */
            removing: () => void;
        }

        interface ToastActions {
            /** The button's HTML content */
            labelContent: JQuery;
            /** Function that is called when the button is clicked */
            click: () => void;
            /** The button's aria-label attribute */
            ariaLabel: string;
            /** Space-separated button classes */
            jsClass: string;
        }

        interface ShowToastOptions {
            /** The color/style of the toast (default is info) */
            type: "info" | "success" | "warning" | "danger";
            /** Whether the popup can be dismissed (default is true) */
            dismissable: boolean;
            // SE uses $toast.appendTo($parent), so this is not necessarily a jQuery element
            // however we assume it is intended to be one because of the $
            // and a $parent.length === 0 if condition
            /** The element to append the toast to */
            $parent: JQuery;
            /** Used to find the closest s-modal element to append the toast to */
            $source: JQuery;
            /** If true, the toast will fade away on its own after a short while (default is true) */
            transient: boolean;
            /** How long the toast will fade in ms (default is 20000) */
            transientTimeout: boolean;
            /** An array of action buttons */
            actions: ToastActions[];
        }

        const helpers: {
            /** Hides any visible toasts from the page */
            hideToasts(): void;
            /**
             * Returns true if the parameter url's host is in the Stack Exchange network
             * @param url The URL to check
             */
            isInNetwork(url: string): boolean;
            /**
             * Returns an anchor element whose href is the given URL
             * @param url The URL
             */
            parseUrl(url: string): HTMLAnchorElement;
            /**
             * Shows a Stacks confirmation modal
             * @param modalOptions The modal options
             */
            showConfirmModal(modalOptions: ModalType): Promise<boolean>;
            /**
             * Shows a modal that already exists in the DOM
             * @param elementOrSelector The modal's HTML element or its selector
             */
            showModal(
                elementOrSelector: string | JQuery | Element | null,
                displayOptions?: Partial<ShowModalOptions>
            ): void;
            /**
             * Shows a Stacks toast
             * @param messageHtml The message's HTML content
             * @param toastOptions Some toast options
             */
            showToast(
                messageHtml: string,
                toastOptions: Partial<ShowToastOptions>
            ): void;
        };

        // NOTE: optional fields do not appear if the user has logged out
        interface UserInfo {
            /** The StackExchange fkey */
            fkey: string;
            /** The current user's current id (doesn't exist if the user is anonymous) */
            userId?: number;
            /** Whether the current user is a moderator */
            isModerator?: boolean;
            /** Whether the current user is registered */
            isRegistered?: boolean;
            /** The current user's StackExchange account id */
            accountId?: number;
            /** Whether the user has the privilege to see deleted posts */
            canSeeDeletedPosts?: boolean;
            /** The user's gravatar element stringified */
            gravatar?: string;
            /** Whether keyboard shortcuts are enabled. See {@link https://meta.stackexchange.com/q/237166|the official announcement} */
            keyboardShortcuts?: boolean;
            /** The current user's profile URL */
            profileUrl?: string;
            /** The current user's reputation (0 for anonymous users) */
            rep: number;
            /** Tracking id, used for tracking with Google Analytics */
            tid: string;
            /** The current user's type */
            userType?: number;
            // following two do not exist if the user is logged in!!
            /** Whether the user is anonymous */
            isAnonymous?: boolean;
            /** Whether the user is anonymous network-wide */
            isAnonymousNetworkWide?: boolean;
        }

        interface RealtimeInfo {
            active: boolean;
            newest: boolean;
            tagged: boolean;
            staleDisconnectIntervalInHours: number;
        }

        interface SiteInfo {
            childUrl: string;
            cookieDomain: string;
            description: string;
            enableNewTagCreationWarning: boolean;
            enableSocialMediaInSharePopup: boolean;
            id: number;
            insertSpaceAfterNameTabCompletion: boolean;
            isNoticesTabEnabled: boolean;
            name: string;
            negativeVoteScoreFloor: null;
            protocol: "http" | "https";
            styleCodeWithHighlightjs: boolean;
        }

        interface JobPreferences {
            maxNumDeveloperRoles: number;
            maxNumIndustries: number;
        }

        interface Story {
            dislikedTagsMaxLength: number;
            likedTagsMaxLength: number;
            minCompleteBodyLength: number;
        }

        interface Events {
            postEditionSection: { title: 1; body: 2; tags: 3 };
            postType: { question: 1 };
        }

        const options: {
            user: UserInfo;
            jobPreferences: JobPreferences;
            locale: string;
            networkMetaHostname: string;
            realtime: RealtimeInfo;
            routeName: string;
            serverTime: number;
            serverTimeOffsetSec: number;
            events: Events;
            site: SiteInfo;
            story: Story;
            svgIconHash: string;
            svgIconPath: string;
        };

        const comments: {
            uiForPost(comments: JQuery): {
                addShow(value1: boolean, value2: boolean): void;
                showComments(
                    value1: string,
                    value2: string | null,
                    value3: boolean,
                    value4: boolean
                ): void;
            };
        };

        const question: {
            /** Get the question id of the current question */
            getQuestionId(): number;
            /** Get whether the user can view the individual up and down votes */
            canViewVoteCounts(): boolean;
            /**
             * Scroll to a given post
             * @param postId The id of the post
             */
            scrollToPost(postId: number): boolean;
        };

        interface AccountSettings {
            currentPasswordRequiredForChangingStackIdPassword: boolean;
        }

        interface FlagSettings {
            allowRetractingCommentFlags: boolean;
            allowRetractingFlags: boolean;
        }

        interface MarkdownSettings {
            enableTables: boolean;
        }

        interface SiteSettings {
            allowImageUploads: boolean;
            enableImgurHttps: boolean;
            enableUserHovercards: boolean;
            forceHttpsImages: boolean;
            styleCode: boolean;
        }

        /** Site settings */
        const settings: {
            accounts: AccountSettings;
            flags: FlagSettings;
            markdown: MarkdownSettings;
            site: SiteSettings;
        };
    }
}

export {};
