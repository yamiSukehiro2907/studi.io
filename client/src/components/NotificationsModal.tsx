export const NotificationsModal = () => {
  return (
    <div className="space-y-6 relative">
      {/* Coming Soon Banner */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="font-semibold">
          Coming Soon! This feature is currently under development.
        </span>
      </div>

      <div>
        <h4 className="text-2xl font-bold mb-2">Notification Preferences</h4>
        <p className="text-base-content/70">
          Choose how you want to be notified about activities
        </p>
      </div>

      <div className="divider"></div>

      {/* Disabled overlay effect */}
      <div className="space-y-4 opacity-60 pointer-events-none select-none">
        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Email Notifications
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Receive notifications via email
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-lg"
              defaultChecked
              disabled
            />
          </label>
        </div>

        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Push Notifications
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Get push notifications on your device
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-lg"
              defaultChecked
              disabled
            />
          </label>
        </div>

        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Message Notifications
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Get notified when someone messages you
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-lg"
              defaultChecked
              disabled
            />
          </label>
        </div>

        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Comment Notifications
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Get notified about new comments
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-lg"
              disabled
            />
          </label>
        </div>
      </div>
    </div>
  );
};
