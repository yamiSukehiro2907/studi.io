export const PrivacyModal = () => {
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
          Privacy Settings
        </h4>
        <p className="text-gray-400 text-base">
          Control who can see your information and activities
        </p>
      </div>

      <div className="divider border-gray-700"></div>

      {/* Disabled content */}
      <div className="space-y-6 opacity-60 pointer-events-none select-none">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-emerald-400 text-base">
              Profile Visibility
            </span>
          </label>
          <select
            className="select select-bordered w-full bg-gray-800 border-gray-700 text-white"
            disabled
          >
            <option>Public - Anyone can view your profile</option>
            <option>Friends Only - Only friends can view</option>
            <option>Private - Only you can view</option>
          </select>
        </div>

        <div className="form-control bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-emerald-400">
                Show Email
              </span>
              <span className="label-text-alt text-gray-400 mt-1">
                Display your email on your profile
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-emerald toggle-lg"
              disabled
            />
          </label>
        </div>

        <div className="form-control bg-gray-800 p-4 rounded-lg border border-gray-700">
          <label className="label cursor-pointer justify-between">
            <div className="flex flex-col items-start">
              <span className="label-text font-semibold text-emerald-400">
                Show Activity Status
              </span>
              <span className="label-text-alt text-gray-400 mt-1">
                Let others see when you're active
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-emerald toggle-lg"
              defaultChecked
              disabled
            />
          </label>
        </div>

        <button
          className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 px-8 rounded-xl shadow-md disabled:opacity-50"
          disabled
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
