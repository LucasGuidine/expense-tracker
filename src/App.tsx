import * as C from "./App.styles";
import { Category } from "./types/Category";
import { Item } from "./types/Item";
import { Categories } from "./data/Categories";
import { items } from "./data/items";
import { useEffect, useState } from "react";
import { getCurrentMonth, filterListByMonth } from "./helpers/DateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";

const App = () => {
  const onMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const [list, setList] = useState(items);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [filteredList, setFilteredList] = useState<Item[]>([]);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea onMonthChange={onMonthChange} currentMonth={currentMonth} />
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
};

export default App;
