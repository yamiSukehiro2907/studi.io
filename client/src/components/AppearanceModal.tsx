export const AppearanceModal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-2xl font-bold mb-2">Appearance Settings</h4>
        <p className="text-base-content/70">
          Customize how the app looks and feels for you
        </p>
      </div>

      <div className="divider"></div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">Theme</span>
        </label>
        <select className="select select-bordered w-full">
          <option>Light - Clean and bright</option>
          <option>Dark - Easy on the eyes</option>
          <option>Auto - Follow system preference</option>
        </select>
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Choose your preferred color scheme
          </span>
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base">Language</span>
        </label>
        <select className="select select-bordered w-full">
          <option>English (US)</option>
          <option>Spanish (Español)</option>
          <option>French (Français)</option>
          <option>German (Deutsch)</option>
          <option>Japanese (日本語)</option>
        </select>
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Select your preferred language
          </span>
        </label>
      </div>

      <button className="btn btn-primary px-8">Save Changes</button>
    </div>
  );
};
