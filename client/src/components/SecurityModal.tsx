export const SecurityModal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-2xl font-bold mb-2">Security Settings</h4>
        <p className="text-base-content/70">
          Keep your account secure with a strong password
        </p>
      </div>

      <div className="divider"></div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">
            Current Password
          </span>
        </label>
        <input
          type="password"
          placeholder="Enter current password"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">
            New Password
          </span>
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          className="input input-bordered w-full"
        />
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Must be at least 8 characters
          </span>
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">
            Confirm New Password
          </span>
        </label>
        <input
          type="password"
          placeholder="Confirm new password"
          className="input input-bordered w-full"
        />
      </div>

      <button className="btn btn-primary px-8">Change Password</button>
    </div>
  );
};
