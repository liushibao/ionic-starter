export const TODO_ACTIONS: { [key: string]: { name: string, iconName: string, color: string, hasDetail: boolean } } = {
    NOTIFICATION_ONLY: { name: "NOTIFICATION_ONLY", iconName: "apps-outline", color: "primary", hasDetail: false },
    OPEN_CONSUMER_PACKAGE_LIST: { name: "OPEN_CONSUMER_PACKAGE_LIST", iconName: "book-outline", color: "primary", hasDetail: true },
    SHOW_PACKAGE_CHECK_IN_CONFIRMATION: { name: "SHOW_PACKAGE_CHECK_IN_CONFIRMATION", iconName: "checkmark-circle-outline", color: "warning", hasDetail: true }
}