import { useContext, useEffect } from "react";
import { EventsContext } from "../../contexts/EventsContext";

const SocialList = () => {
  const { events } = useContext(EventsContext);

  const getEventsJSX = () => {
    if (!events || events.length === 0) {
      return null;
    }

    const eventsJSX = events.map((_events, i) => (
      <option key={i} value={_events.id}>
        {_events.title}
      </option>
    ));
    return eventsJSX;
  };

  return getEventsJSX();
};

export default SocialList;
