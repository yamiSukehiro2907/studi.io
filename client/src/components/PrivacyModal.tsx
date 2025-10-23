export const PrivacyModal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-2xl font-bold mb-2">Privacy Settings</h4>
        <p className="text-base-content/70">
          Control who can see your information and activities
        </p>
      </div>

      <div className="divider"></div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">
            Profile Visibility
          </span>
        </label>
        <select className="select select-bordered w-full">
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
          <input type="checkbox" className="toggle toggle-primary toggle-lg" />
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
          />
        </label>
      </div>

      <button className="btn btn-primary px-8">Save Changes</button>
    </div>
  );
};
