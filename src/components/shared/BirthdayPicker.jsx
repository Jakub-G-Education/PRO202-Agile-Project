import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import "react-day-picker/dist/style.css";

const css = `
.my-today {
  font-weight: bold;
  font-size: 100%; 
  color: red;
  background-size: cover;
}
.my-selected:not([disabled]) {
  font-weight: bold; 
  color: var(--kpmg-blue);
  border: 2px solid currentColor;
  background-size: cover;
}
.rdp-datepicker {
  width: 100%
}
`;

function BirthdayPicker({ selected, setSelected }) {
  let footer = <p>Velg bursdagsdato</p>;
  if (selected) {
    footer = <p>Du har valgt {format(selected, "PP", { locale: nb })}.</p>;
  }

  const handleSelect = (date) => {
    if (date) {
      const adjustedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      setSelected(adjustedDate);
    }
  };

  return (
    <div>
      <style>{css}</style>
      <DayPicker
        className="datepicker"
        captionLayout="dropdown-buttons"
        fromYear={1950}
        toYear={2024}
        disabled={{ after: new Date() }}
        weekStartsOn={1}
        locale={nb}
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        footer={footer}
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        showOutsideDays
      />
    </div>
  );
}
export default BirthdayPicker;
