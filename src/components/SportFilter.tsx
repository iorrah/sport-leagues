interface Props {
  sports: string[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

export const SportFilter = ({ sports, value, onChange, disabled }: Props) => (
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <select
      id="sport-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="min-w-64 text-neutral-400 flex-1 sm:flex-none h-10 px-3 h-12 rounded-sm border border-neutral-200 bg-background text-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <option value="all">All sports</option>
      {sports.map((sport) => (
        <option key={sport} value={sport}>
          {sport}
        </option>
      ))}
    </select>
  </div>
);
