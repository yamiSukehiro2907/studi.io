export const NotificationsModal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-2xl font-bold mb-2">Notification Preferences</h4>
        <p className="text-base-content/70">
          Choose how you want to be notified about activities
        </p>
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
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
            />
          </label>
        </div>
      </div>
    </div>
  );
};
