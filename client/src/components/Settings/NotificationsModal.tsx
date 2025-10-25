export const NotificationsModal = () => {
  return (
    <div className="space-y-6 relative bg-gray-900 p-6 rounded-xl shadow-md">
      {/* Coming Soon Banner */}
      <div className="alert alert-info bg-gray-800 text-emerald-400 border-emerald-500 shadow-sm">
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
        <h4 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
          Notification Preferences
        </h4>
        <p className="text-gray-400 text-base">
          Choose how you want to be notified about activities
        </p>
      </div>

      <div className="divider border-gray-700"></div>

      {/* Disabled overlay effect */}
      <div className="space-y-4 opacity-60 pointer-events-none select-none">
        {[
          {
            title: "Email Notifications",
            desc: "Receive notifications via email",
            checked: true,
          },
          {
            title: "Push Notifications",
            desc: "Get push notifications on your device",
            checked: true,
          },
          {
            title: "Message Notifications",
            desc: "Get notified when someone messages you",
            checked: true,
          },
          {
            title: "Comment Notifications",
            desc: "Get notified about new comments",
            checked: false,
          },
        ].map((notif, idx) => (
          <div
            key={idx}
            className="form-control bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <label className="label cursor-pointer justify-between">
              <div className="flex flex-col items-start">
                <span className="label-text font-semibold text-emerald-400">
                  {notif.title}
                </span>
                <span className="label-text-alt text-gray-400 mt-1">
                  {notif.desc}
                </span>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-emerald toggle-lg"
                defaultChecked={notif.checked}
                disabled
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
