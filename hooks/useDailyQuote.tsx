import { useEffect, useState } from "react";
import { quotes } from "./quotes";

export function useDailyQuote() {
  const [dailyQuote, setDailyQuote] = useState(quotes[0]);

  useEffect(() => {
    const currentDate = new Date();
    const start = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    setDailyQuote(quotes[day % quotes.length]);
  }, []);

  return dailyQuote;
}
