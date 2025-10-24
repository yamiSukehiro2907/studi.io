export const PrivacyModal = () => {
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
        <h4 className="text-2xl font-bold mb-2">Privacy Settings</h4>
        <p className="text-base-content/70">
          Control who can see your information and activities
        </p>
      </div>

      <div className="divider"></div>

      {/* Disabled content */}
      <div className="space-y-6 opacity-60 pointer-events-none select-none">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">
              Profile Visibility
            </span>
          </label>
          <select className="select select-bordered w-full" disabled>
            <option>Public - Anyone can view your profile</option>
            <option>Friends Only - Only friends can view</option>
            <option>Private - Only you can view</option>
          </select>
        </div>

        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Show Email
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Display your email on your profile
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-lg"
              disabled
            />
          </label>
        </div>

        <div className="form-control bg-base-200 p-4 rounded-lg">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-base">
                Show Activity Status
              </span>
              <span className="label-text-alt text-base-content/60 mt-1">
                Let others see when you're active
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

        <button className="btn btn-primary px-8" disabled>
          Save Changes
        </button>
      </div>
    </div>
  );
};
